import { CheckCircle2, CircleAlert } from "lucide-react";
import { getStaffContext } from "@/lib/crm/auth";
import { Panel } from "@/components/crm/badges";

export const metadata = { title: "Configuración" };

/**
 * Estado real de la configuración (antes esta página mostraba textos fijos como
 * "RLS activado" aunque no fuera cierto). Solo indica si cada variable existe, nunca su valor.
 */
export default async function SettingsPage() {
  const ctx = await getStaffContext();
  const has = (k: string) => Boolean(process.env[k]);
  const checks = [
    {
      label: "Base de datos del CRM",
      ok: Boolean(ctx?.dbReady),
      help: "Ejecutar supabase/migrations/20261121_arm_crm.sql en Supabase (SQL Editor).",
    },
    {
      label: "Guardado de leads desde la web (SUPABASE_SERVICE_ROLE_KEY)",
      ok: has("SUPABASE_SERVICE_ROLE_KEY"),
      help: "Supabase > Project Settings > API > service_role. Pegarla en Vercel > Settings > Environment Variables. Nunca en el código.",
    },
    {
      label: "Redacción con IA del asistente (GEMINI_API_KEY)",
      ok: has("GEMINI_API_KEY"),
      help: "Opcional. Sin ella el asistente responde con su motor propio, sin IA.",
    },
    {
      label: "Avisos al celular por Telegram (TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID)",
      ok: has("TELEGRAM_BOT_TOKEN") && has("TELEGRAM_CHAT_ID"),
      help: "Opcional, recomendado: crear un bot con @BotFather y agregar las dos variables.",
    },
    {
      label: "Webhook de avisos (CRM_NOTIFY_WEBHOOK_URL)",
      ok: has("CRM_NOTIFY_WEBHOOK_URL"),
      help: "Opcional: Make, Zapier, n8n, Slack o Discord.",
    },
    {
      label: "Dominio canónico (NEXT_PUBLIC_SITE_URL)",
      ok: has("NEXT_PUBLIC_SITE_URL"),
      help: "Debe coincidir con el dominio principal de Vercel (con o sin www).",
    },
  ];

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-white">Configuración</h1>
        <p className="text-sm text-zinc-400">Qué está activo en este despliegue. Sesión: {ctx?.email}</p>
      </div>
      <Panel title="Estado del sistema">
        <ul className="space-y-4">
          {checks.map((c) => (
            <li key={c.label} className="flex gap-3">
              {c.ok ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-label="Activo" />
              ) : (
                <CircleAlert className="w-5 h-5 text-amber-400 shrink-0" aria-label="Pendiente" />
              )}
              <div>
                <p className="text-sm text-white">{c.label}</p>
                {!c.ok && <p className="text-xs text-zinc-400">{c.help}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Panel>
      <Panel title="Acceso del equipo">
        <p className="text-sm text-zinc-300">
          Solo las cuentas de la tabla <code>crm_staff</code> entran al CRM. Para agregar a alguien: créale una cuenta en
          Supabase (Authentication &gt; Users) y ejecuta en SQL Editor:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-zinc-950 p-3 text-xs text-zinc-300">
{`insert into public.crm_staff (user_id, email)
select id, email from auth.users where email = 'correo@ejemplo.com';`}
        </pre>
        <p className="mt-3 text-xs text-zinc-400">
          Recomendado: en Supabase &gt; Authentication &gt; Sign In / Providers, desactiva “Allow new users to sign up”.
        </p>
      </Panel>
    </div>
  );
}
