-- Libro de Reclamaciones Virtual (Ley N° 29571, D.S. N° 011-2011-PCM y modificatorias)
-- Ejecutar una vez en Supabase: SQL Editor > New query > pegar y "Run".
-- Guarda cada hoja con número correlativo y fecha. El público solo puede INSERTAR;
-- leer, responder y exportar se hace desde el panel interno con una cuenta autenticada.

create sequence if not exists complaints_correlative_seq start 1;

create table if not exists public.complaints (
  id uuid primary key default gen_random_uuid(),
  correlative bigint not null default nextval('complaints_correlative_seq') unique,
  code text generated always as ('REC-' || extract(year from created_at)::int || '-' || lpad(correlative::text, 6, '0')) stored,
  created_at timestamptz not null default now(),

  -- 1. Consumidor
  full_name text not null,
  document_type text not null check (document_type in ('DNI','CE','RUC','PASAPORTE')),
  document_number text not null,
  email text not null,
  phone text not null,
  address text not null,
  is_minor boolean not null default false,
  guardian_name text,
  guardian_document text,

  -- 2. Bien contratado
  service_type text not null check (service_type in ('SERVICIO','PRODUCTO')),
  amount_claimed text,
  service_description text,

  -- 3. Detalle
  complaint_type text not null check (complaint_type in ('RECLAMO','QUEJA')),
  description text not null,
  request text not null,

  -- 4. Respuesta del proveedor (se llena desde el panel)
  provider_observations text,
  responded_at timestamptz,
  response_channel text,

  constraint guardian_required check (not is_minor or (guardian_name is not null and guardian_document is not null))
);

alter table public.complaints enable row level security;

drop policy if exists "complaints_insert_public" on public.complaints;
create policy "complaints_insert_public" on public.complaints
  for insert to anon, authenticated
  with check (responded_at is null and provider_observations is null);

drop policy if exists "complaints_read_staff" on public.complaints;
create policy "complaints_read_staff" on public.complaints
  for select to authenticated
  using (true);

drop policy if exists "complaints_update_staff" on public.complaints;
create policy "complaints_update_staff" on public.complaints
  for update to authenticated
  using (true) with check (true);

-- La web necesita leer el código de su propia hoja justo después de insertarla.
create or replace function public.register_complaint(payload jsonb)
returns table (code text, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
declare
  new_row public.complaints;
begin
  insert into public.complaints (
    full_name, document_type, document_number, email, phone, address,
    is_minor, guardian_name, guardian_document,
    service_type, amount_claimed, service_description,
    complaint_type, description, request
  ) values (
    payload->>'full_name', payload->>'document_type', payload->>'document_number',
    payload->>'email', payload->>'phone', payload->>'address',
    coalesce((payload->>'is_minor')::boolean, false), nullif(payload->>'guardian_name',''), nullif(payload->>'guardian_document',''),
    payload->>'service_type', nullif(payload->>'amount_claimed',''), nullif(payload->>'service_description',''),
    payload->>'complaint_type', payload->>'description', payload->>'request'
  ) returning * into new_row;
  return query select new_row.code, new_row.created_at;
end;
$$;

grant execute on function public.register_complaint(jsonb) to anon, authenticated;
