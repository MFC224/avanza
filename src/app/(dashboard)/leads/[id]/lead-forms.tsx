import { ARM_SERVICES } from "@/lib/arm/catalog";
import { utcToLima } from "@/lib/arm/scheduling";
import { ACTIVITY_KINDS, LEAD_STAGES, LOST_REASONS } from "@/lib/crm/stages";
import type { LeadActivityRow, LeadRow } from "@/lib/crm/types";
import { Panel, limaDateTime } from "@/components/crm/badges";
import { changeStage, logActivity, updateLead } from "../actions";

const input = "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600";
const label = "text-xs text-zinc-400";

/** Mover el lead de etapa con un clic; "Perdido" pide el motivo para aprender de cada pérdida. */
export function StageForm({ leadId, stage }: { leadId: string; stage: string }) {
  return (
    <div className="space-y-3">
      <form action={changeStage} className="flex flex-wrap gap-1.5">
        <input type="hidden" name="id" value={leadId} />
        {LEAD_STAGES.filter((s) => s.id !== "perdido").map((s) => (
          <button
            key={s.id}
            type="submit"
            name="stage"
            value={s.id}
            disabled={s.id === stage}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium cursor-pointer disabled:cursor-default ${
              s.id === stage
                ? "bg-blue-600 text-white"
                : s.id === "ganado"
                  ? "border border-emerald-600/50 text-emerald-300 hover:bg-emerald-600/10"
                  : "border border-zinc-700 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {s.label}
          </button>
        ))}
      </form>
      {stage !== "perdido" && (
        <form action={changeStage} className="flex flex-wrap items-center gap-2">
          <input type="hidden" name="id" value={leadId} />
          <input type="hidden" name="stage" value="perdido" />
          <label htmlFor="lost-reason" className="sr-only">Motivo de pérdida</label>
          <select id="lost-reason" name="lost_reason" required defaultValue="" className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300">
            <option value="" disabled>Motivo de pérdida…</option>
            {LOST_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <button type="submit" className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:bg-zinc-800 cursor-pointer">
            Marcar perdido
          </button>
        </form>
      )}
    </div>
  );
}

export function ActivityPanel({ leadId, activities }: { leadId: string; activities: LeadActivityRow[] }) {
  return (
    <Panel title="Historial">
      <form action={logActivity} className="space-y-2 pb-4 mb-4 border-b border-zinc-800">
        <input type="hidden" name="id" value={leadId} />
        <label htmlFor="act-body" className="sr-only">Qué pasó</label>
        <textarea id="act-body" name="body" required rows={2} placeholder="Qué pasó: lo llamé, pidió la propuesta para el viernes…" className={input} />
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="act-kind" className="sr-only">Tipo</label>
          <select id="act-kind" name="kind" defaultValue="whatsapp" className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300">
            {["whatsapp", "llamada", "reunion", "correo", "nota"].map((k) => <option key={k} value={k}>{ACTIVITY_KINDS[k]}</option>)}
          </select>
          <label htmlFor="act-follow" className="sr-only">Próximo seguimiento</label>
          <select id="act-follow" name="follow_up_days" defaultValue="2" className="rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300">
            <option value="0">Sin recordatorio</option>
            <option value="1">Seguir mañana</option>
            <option value="2">Seguir en 2 días</option>
            <option value="7">Seguir en 1 semana</option>
            <option value="30">Seguir en 1 mes</option>
          </select>
          <button type="submit" className="ml-auto rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-white hover:bg-zinc-700 cursor-pointer">
            Guardar
          </button>
        </div>
      </form>
      {activities.length === 0 ? (
        <p className="text-sm text-zinc-500">Sin actividad todavía.</p>
      ) : (
        <ol className="space-y-3">
          {activities.map((a) => (
            <li key={a.id} className="text-sm">
              <p className="text-xs text-zinc-500">
                {ACTIVITY_KINDS[a.kind] ?? a.kind} · {limaDateTime(a.created_at)}
                {a.created_by ? ` · ${a.created_by}` : ""}
              </p>
              <p className="text-zinc-200 whitespace-pre-line">{a.body}</p>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
}

export function EditLeadForm({ lead }: { lead: LeadRow }) {
  const next = lead.next_action_at ? utcToLima(lead.next_action_at) : null;
  return (
    <form action={updateLead} className="space-y-3">
      <input type="hidden" name="id" value={lead.id} />
      <div className="space-y-1">
        <label htmlFor="ed-name" className={label}>Nombre</label>
        <input id="ed-name" name="contact_name" required defaultValue={lead.contact_name} className={input} />
      </div>
      <div className="space-y-1">
        <label htmlFor="ed-phone" className={label}>WhatsApp</label>
        <input id="ed-phone" name="phone" defaultValue={lead.phone ?? ""} inputMode="tel" className={input} />
      </div>
      <div className="space-y-1">
        <label htmlFor="ed-email" className={label}>Correo</label>
        <input id="ed-email" name="contact_email" type="email" defaultValue={lead.contact_email ?? ""} className={input} />
      </div>
      <div className="space-y-1">
        <label htmlFor="ed-company" className={label}>Empresa</label>
        <input id="ed-company" name="company_name" defaultValue={lead.company_name ?? ""} className={input} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label htmlFor="ed-service" className={label}>Servicio</label>
          <select id="ed-service" name="service_id" defaultValue={lead.service_id ?? ""} className={input}>
            <option value="">Por definir</option>
            {ARM_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.shortName}</option>)}
          </select>
        </div>
        <div className="space-y-1">
          <label htmlFor="ed-value" className={label}>Valor (S/)</label>
          <input id="ed-value" name="estimated_value" inputMode="numeric" defaultValue={lead.estimated_value ?? ""} className={input} />
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="ed-next" className={label}>Siguiente paso</label>
        <input id="ed-next" name="next_action" defaultValue={lead.next_action ?? ""} className={input} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label htmlFor="ed-date" className={label}>Fecha</label>
          <input id="ed-date" name="next_action_date" type="date" defaultValue={next?.date ?? ""} className={input} />
        </div>
        <div className="space-y-1">
          <label htmlFor="ed-time" className={label}>Hora (Lima)</label>
          <input id="ed-time" name="next_action_time" type="time" defaultValue={next?.time ?? ""} className={input} />
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="ed-need" className={label}>Qué necesita</label>
        <textarea id="ed-need" name="need_summary" rows={3} defaultValue={lead.need_summary ?? ""} className={input} />
      </div>
      <button type="submit" className="w-full rounded-lg bg-zinc-800 py-2 text-sm font-medium text-white hover:bg-zinc-700 cursor-pointer">
        Guardar cambios
      </button>
    </form>
  );
}
