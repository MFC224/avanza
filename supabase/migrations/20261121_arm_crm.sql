-- =============================================================================
-- ARM CRM v2 — embudo de ventas, actividades, agenda y conversaciones del asistente
-- =============================================================================
-- Ejecutar UNA vez en Supabase: SQL Editor > New query > pegar todo > Run.
-- Es idempotente: se puede volver a ejecutar sin perder datos.
--
-- Qué hace:
--   1. Crea la lista de personas del equipo con acceso al CRM (crm_staff).
--   2. Amplía la tabla leads (antes "Calificado por ARM" y "Cita Agendada"
--      chocaban con las restricciones y los leads del robot no se guardaban).
--   3. Crea lead_activities, appointments y arm_conversations.
--   4. Cierra la tabla clients, que estaba abierta a lectura pública.
--   5. Activa RLS en todas las tablas internas: solo el equipo puede leerlas.
--      El sitio público escribe a través del servidor con la service role key.
-- =============================================================================

-- 1. EQUIPO CON ACCESO ----------------------------------------------------------
create table if not exists public.crm_staff (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now()
);
alter table public.crm_staff enable row level security;
revoke all on table public.crm_staff from anon, authenticated;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.crm_staff where user_id = auth.uid());
$$;
grant execute on function public.is_staff() to anon, authenticated;

-- ANTES DE EJECUTAR: deja en esta lista SOLO los correos con los que el equipo inicia sesión
-- en el panel (Authentication > Users). Nadie más tendrá acceso a los datos de clientes.
-- (No se da acceso automático a todas las cuentas existentes: podría haber cuentas ajenas.)
insert into public.crm_staff (user_id, email)
select id, email from auth.users
where lower(email) in ('magno@avanzape.com', 'manuel@avanzape.com')
on conflict do nothing;

-- Función genérica para updated_at
create or replace function public.crm_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- 2. LEADS ----------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads
  add column if not exists contact_email text,
  add column if not exists phone text,
  add column if not exists company_name text,
  add column if not exists source text not null default 'manual',
  add column if not exists stage text not null default 'nuevo',
  add column if not exists service_id text,
  add column if not exists service_name text,
  add column if not exists business_type text,
  add column if not exists need_summary text,
  add column if not exists budget_pen numeric(12,2),
  add column if not exists timeline text,
  add column if not exists estimated_value numeric(12,2),
  add column if not exists score integer not null default 0,
  add column if not exists temperature text not null default 'frio',
  add column if not exists score_reasons text[] not null default '{}',
  add column if not exists next_action text,
  add column if not exists next_action_at timestamptz,
  add column if not exists last_contact_at timestamptz,
  add column if not exists lost_reason text,
  add column if not exists won_at timestamptz,
  add column if not exists closed_at timestamptz,
  add column if not exists consent_at timestamptz,
  add column if not exists arm_session_id text,
  add column if not exists landing_page text,
  add column if not exists owner_email text,
  add column if not exists updated_at timestamptz not null default now();

-- El esquema v2 exigía correo y valores fijos que el robot no respetaba.
alter table public.leads alter column contact_email drop not null;
alter table public.leads drop constraint if exists leads_interest_level_check;
alter table public.leads drop constraint if exists leads_funnel_status_check;

-- Pasar los estados antiguos a las nuevas etapas (solo filas sin etapa real).
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'leads' and column_name = 'funnel_status'
  ) then
    update public.leads set stage = case funnel_status
        when 'Reunión Agendada' then 'reunion'
        when 'Cita Agendada' then 'reunion'
        when 'Propuesta Enviada' then 'propuesta'
        when 'Negociación' then 'negociacion'
        when 'Ganado' then 'ganado'
        when 'Perdido' then 'perdido'
        else 'nuevo' end
    where stage = 'nuevo' and funnel_status is not null;
  end if;
end $$;

-- Los correos inventados (912345678@lead-whatsapp.avanzape.com) pasan a teléfono.
update public.leads
set phone = coalesce(phone, regexp_replace(split_part(contact_email, '@', 1), '\D', '', 'g')),
    contact_email = null
where contact_email ~* '@lead-[a-z]+\.avanzape\.com$';

-- Mismo formato que usa la web (solo dígitos, celular peruano con 51) para no duplicar leads.
update public.leads
set phone = case
    when regexp_replace(phone, '\D', '', 'g') ~ '^9\d{8}$' then '51' || regexp_replace(phone, '\D', '', 'g')
    else nullif(regexp_replace(phone, '\D', '', 'g'), '')
  end
where phone is not null and phone !~ '^51\d{9}$';

alter table public.leads drop constraint if exists leads_stage_check;
alter table public.leads add constraint leads_stage_check
  check (stage in ('nuevo','contactado','reunion','propuesta','negociacion','ganado','perdido'));
alter table public.leads drop constraint if exists leads_temperature_check;
alter table public.leads add constraint leads_temperature_check
  check (temperature in ('frio','tibio','caliente'));

create index if not exists leads_stage_idx on public.leads(stage);
create index if not exists leads_next_action_idx on public.leads(next_action_at) where stage not in ('ganado','perdido');
create index if not exists leads_created_idx on public.leads(created_at desc);
create index if not exists leads_phone_idx on public.leads(phone);
create index if not exists leads_email_idx on public.leads(lower(contact_email));

drop trigger if exists leads_touch_updated_at on public.leads;
create trigger leads_touch_updated_at before update on public.leads
  for each row execute function public.crm_touch_updated_at();

-- 3a. ACTIVIDADES (historial de cada lead) ----------------------------------------
create table if not exists public.lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  kind text not null check (kind in ('nota','llamada','whatsapp','correo','reunion','etapa','sistema','arm')),
  body text not null,
  created_by text,
  created_at timestamptz not null default now()
);
create index if not exists lead_activities_lead_idx on public.lead_activities(lead_id, created_at desc);

-- 3b. AGENDA ----------------------------------------------------------------------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  scheduled_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.appointments
  add column if not exists lead_id uuid references public.leads(id) on delete set null,
  add column if not exists duration_minutes integer not null default 25,
  add column if not exists status text not null default 'pendiente',
  add column if not exists client_name text not null default '',
  add column if not exists client_contact text not null default '',
  add column if not exists client_notes text,
  add column if not exists host_name text not null default 'Magno y Manuel',
  add column if not exists meet_url text,
  add column if not exists updated_at timestamptz not null default now();

alter table public.appointments drop constraint if exists appointments_status_check;
update public.appointments set status = case lower(status)
    when 'confirmada' then 'confirmada'
    when 'completada' then 'completada'
    when 'cancelada' then 'cancelada'
    when 'no-show' then 'no_asistio'
    when 'no_asistio' then 'no_asistio'
    when 'reprogramada' then 'cancelada'
    else 'pendiente' end;
alter table public.appointments add constraint appointments_status_check
  check (status in ('pendiente','confirmada','completada','no_asistio','cancelada'));

-- Evita la doble reserva en la base de datos, no solo en memoria.
create unique index if not exists appointments_active_slot_unique
  on public.appointments(scheduled_at) where status in ('pendiente','confirmada');
create index if not exists appointments_lead_idx on public.appointments(lead_id);

drop trigger if exists appointments_touch_updated_at on public.appointments;
create trigger appointments_touch_updated_at before update on public.appointments
  for each row execute function public.crm_touch_updated_at();

-- 3c. CONVERSACIONES DEL ASISTENTE ARM ---------------------------------------------
-- Sin datos personales mientras no haya consentimiento: servicio, puntaje y objeciones.
-- La transcripción solo se guarda cuando la persona deja sus datos y acepta la política.
create table if not exists public.arm_conversations (
  session_id text primary key,
  lead_id uuid references public.leads(id) on delete set null,
  service_id text,
  score integer not null default 0,
  temperature text not null default 'frio',
  objections text[] not null default '{}',
  message_count integer not null default 0,
  wants_meeting boolean not null default false,
  outcome text not null default 'en_curso'
    check (outcome in ('en_curso','contacto','cita','whatsapp')),
  transcript jsonb,
  page_path text,
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);
create index if not exists arm_conversations_last_idx on public.arm_conversations(last_message_at desc);

-- 4. CLIENTES ---------------------------------------------------------------------
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null default '',
  email text,
  status text not null default 'Activo',
  created_at timestamptz default now()
);
alter table public.clients
  add column if not exists phone text,
  add column if not exists lead_id uuid references public.leads(id) on delete set null,
  add column if not exists notes text,
  add column if not exists lifetime_value numeric(12,2) not null default 0;
alter table public.clients alter column email drop not null;

-- Estas dos políticas dejaban leer e insertar clientes a cualquiera con la clave pública.
drop policy if exists "Permitir lectura a todos" on public.clients;
drop policy if exists "Permitir inserción a todos" on public.clients;

-- 5. SEGURIDAD: solo el equipo lee y escribe las tablas internas ------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'leads','lead_activities','appointments','arm_conversations','clients',
    'companies','projects','sprints','qa_tests','financial_milestones','alerts','users','roles'
  ] loop
    if to_regclass('public.' || t) is not null then
      execute format('alter table public.%I enable row level security', t);
      execute format('revoke all on table public.%I from anon', t);
      execute format('drop policy if exists crm_staff_all on public.%I', t);
      execute format(
        'create policy crm_staff_all on public.%I for all to authenticated using (public.is_staff()) with check (public.is_staff())',
        t
      );
    end if;
  end loop;
end $$;

-- Libro de Reclamaciones: leer y responder también solo el equipo (antes: cualquier cuenta).
do $$
begin
  if to_regclass('public.complaints') is not null then
    drop policy if exists "complaints_read_staff" on public.complaints;
    create policy "complaints_read_staff" on public.complaints
      for select to authenticated using (public.is_staff());
    drop policy if exists "complaints_update_staff" on public.complaints;
    create policy "complaints_update_staff" on public.complaints
      for update to authenticated using (public.is_staff()) with check (public.is_staff());
  end if;
end $$;

-- 6. RETENCIÓN (política de privacidad, sección 6: 12 meses sin relación comercial) -----
-- Anonimiza leads no ganados sin movimiento en 12 meses y borra conversaciones viejas.
create or replace function public.crm_purge_stale_data()
returns table (leads_anonymized integer, conversations_deleted integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  n_leads integer;
  n_convs integer;
begin
  update public.leads
  set contact_name = 'Anonimizado', contact_email = null, phone = null, company_name = null,
      need_summary = null, arm_session_id = null, landing_page = null
  where stage <> 'ganado'
    and contact_name <> 'Anonimizado'
    and greatest(coalesce(last_contact_at, created_at), updated_at) < now() - interval '12 months';
  get diagnostics n_leads = row_count;

  delete from public.lead_activities a using public.leads l
  where a.lead_id = l.id and l.contact_name = 'Anonimizado';

  delete from public.arm_conversations where last_message_at < now() - interval '12 months';
  get diagnostics n_convs = row_count;

  return query select n_leads, n_convs;
end;
$$;
revoke all on function public.crm_purge_stale_data() from public, anon, authenticated;

-- Para que sea automática, activa la extensión pg_cron (Database > Extensions) y ejecuta una vez:
-- select cron.schedule('crm-purge-mensual', '0 8 1 * *', 'select public.crm_purge_stale_data()');

-- 7. VERIFICACIÓN -------------------------------------------------------------------
-- a) Quién tiene acceso al CRM (si sale vacío, revisa los correos del paso 1):
select email, created_at from public.crm_staff order by created_at;
-- b) Políticas activas en las tablas internas (no debería haber ninguna con "true" para anon):
-- select tablename, policyname, roles, qual from pg_policies where schemaname = 'public' order by tablename;
