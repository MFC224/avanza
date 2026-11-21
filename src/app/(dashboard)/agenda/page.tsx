import Link from "next/link";
import { listAppointments, requestTime } from "@/lib/crm/queries";
import { formatLimaDate, utcToLima } from "@/lib/arm/scheduling";
import { formatPhone, whatsappLink, WHATSAPP_TEMPLATES } from "@/lib/crm/whatsapp";
import { AppointmentBadge, EmptyState, limaDateTime } from "@/components/crm/badges";
import type { AppointmentRow } from "@/lib/crm/types";
import { updateAppointment } from "./actions";

export const metadata = { title: "Agenda" };

const confirmTemplate = WHATSAPP_TEMPLATES.find((t) => t.id === "confirmar_reunion")!;

function AppointmentItem({ a, past }: { a: AppointmentRow; past: boolean }) {
  const lima = utcToLima(a.scheduled_at);
  const wa = whatsappLink(
    a.client_contact,
    confirmTemplate.build({ name: a.client_name, date: `${formatLimaDate(lima.date)} a las ${lima.time}`, meetUrl: a.meet_url })
  );
  const active = a.status === "pendiente" || a.status === "confirmada";
  return (
    <li className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-white font-medium">{limaDateTime(a.scheduled_at)} · {a.duration_minutes} min</p>
          <p className="text-sm text-zinc-400">
            {a.lead_id ? <Link href={`/leads/${a.lead_id}`} className="hover:underline">{a.client_name}</Link> : a.client_name} ·{" "}
            {formatPhone(a.client_contact)}
          </p>
          {a.client_notes && <p className="text-sm text-zinc-400 mt-1">“{a.client_notes}”</p>}
        </div>
        <AppointmentBadge status={a.status} />
      </div>

      {active && !past && (
        <form action={updateAppointment} className="flex flex-wrap gap-2">
          <input type="hidden" name="id" value={a.id} />
          <label htmlFor={`meet-${a.id}`} className="sr-only">Enlace de la videollamada</label>
          <input
            id={`meet-${a.id}`}
            name="meet_url"
            type="url"
            defaultValue={a.meet_url ?? ""}
            placeholder="https://meet.google.com/abc-defg-hij"
            className="flex-1 min-w-[220px] rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-sm text-zinc-100"
          />
          <button type="submit" className="rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-1.5 text-sm text-white cursor-pointer">
            {a.meet_url ? "Actualizar enlace" : "Confirmar con enlace"}
          </button>
        </form>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {wa && active && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white">
            Enviar confirmación por WhatsApp
          </a>
        )}
        {active && (
          <form action={updateAppointment} className="flex flex-wrap gap-2">
            <input type="hidden" name="id" value={a.id} />
            <button name="status" value="completada" className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer">Se realizó</button>
            <button name="status" value="no_asistio" className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer">No asistió</button>
            <button name="status" value="cancelada" className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 cursor-pointer">Cancelar</button>
          </form>
        )}
      </div>
    </li>
  );
}

export default async function AgendaPage() {
  const { appointments, error } = await listAppointments();
  const now = requestTime();
  const upcoming = appointments.filter((a) => new Date(a.scheduled_at).getTime() >= now - 3_600_000);
  const past = appointments.filter((a) => new Date(a.scheduled_at).getTime() < now - 3_600_000).reverse();
  const toConfirm = upcoming.filter((a) => a.status === "pendiente").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Agenda</h1>
        <p className="text-sm text-zinc-400">
          Videollamadas que reservan los clientes desde el asistente. {toConfirm > 0 && <span className="text-amber-300">{toConfirm} por confirmar: crea la reunión en Google Meet y pega el enlace.</span>}
        </p>
      </div>
      {error && <p role="alert" className="text-sm text-red-300">No se pudo cargar la agenda: {error}</p>}

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Próximas</h2>
        {upcoming.length === 0 ? <EmptyState>No hay videollamadas próximas.</EmptyState> : (
          <ul className="space-y-3">{upcoming.map((a) => <AppointmentItem key={a.id} a={a} past={false} />)}</ul>
        )}
      </section>

      {past.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-zinc-300">Últimos 30 días</h2>
          <ul className="space-y-3">{past.map((a) => <AppointmentItem key={a.id} a={a} past />)}</ul>
        </section>
      )}
    </div>
  );
}
