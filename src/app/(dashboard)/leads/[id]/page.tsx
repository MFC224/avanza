import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { getLeadDetail } from "@/lib/crm/queries";
import { getService } from "@/lib/arm/catalog";
import { TIMELINE_LABELS } from "@/lib/arm/engine";
import { formatLimaDate, utcToLima } from "@/lib/arm/scheduling";
import { formatPEN, sourceLabel, stageInfo } from "@/lib/crm/stages";
import { formatPhone } from "@/lib/crm/whatsapp";
import { AppointmentBadge, Panel, StageBadge, TemperatureBadge, limaDateTime } from "@/components/crm/badges";
import { WhatsappMenu } from "@/components/crm/whatsapp-menu";
import { ActivityPanel, EditLeadForm, StageForm } from "./lead-forms";

export const metadata = { title: "Ficha del lead" };

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const detail = await getLeadDetail(id);
  if (!detail) notFound();
  const { lead, activities, appointments, conversation, client } = detail;
  const service = getService(lead.service_id);
  const nextApt = appointments.find((a) => ["pendiente", "confirmada"].includes(a.status));
  const nextAptLima = nextApt ? utcToLima(nextApt.scheduled_at) : null;

  return (
    <div className="space-y-6">
      <Link href="/leads" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Embudo
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-semibold text-white">{lead.contact_name}</h1>
          <p className="text-sm text-zinc-400">
            {[lead.company_name, lead.business_type, sourceLabel(lead.source)].filter(Boolean).join(" · ")}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <StageBadge stage={lead.stage} />
            <TemperatureBadge temperature={lead.temperature} score={lead.score} />
            {client && <Link href="/clients" className="text-xs text-emerald-300 hover:underline">Ya es cliente</Link>}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <WhatsappMenu
            phone={lead.phone}
            stage={lead.stage}
            context={{
              name: lead.contact_name,
              service: service?.shortName ?? lead.service_name,
              date: nextAptLima ? `${formatLimaDate(nextAptLima.date)} a las ${nextAptLima.time}` : null,
              meetUrl: nextApt?.meet_url,
            }}
          />
          {lead.phone && (
            <a href={`tel:+${lead.phone}`} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
              <Phone className="w-4 h-4" aria-hidden="true" /> Llamar
            </a>
          )}
          {lead.contact_email && (
            <a href={`mailto:${lead.contact_email}`} className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 hover:bg-zinc-800">
              <Mail className="w-4 h-4" aria-hidden="true" /> Correo
            </a>
          )}
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Siguiente paso">
            <p className="text-sm text-white">{lead.next_action ?? stageInfo(lead.stage).hint}</p>
            <p className="text-xs text-zinc-400 mt-0.5">{lead.next_action_at ? limaDateTime(lead.next_action_at) : "Sin fecha"}</p>
            <div className="mt-4">
              <StageForm leadId={lead.id} stage={lead.stage} />
            </div>
          </Panel>

          <ActivityPanel leadId={lead.id} activities={activities} />

          {conversation?.transcript && conversation.transcript.length > 0 && (
            <Panel title="Conversación con el asistente ARM">
              <ol className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {conversation.transcript.map((t, i) => (
                  <li key={i} className={`text-sm rounded-lg px-3 py-2 whitespace-pre-line ${t.role === "user" ? "bg-blue-500/10 text-zinc-100 ml-8" : "bg-zinc-800/60 text-zinc-300 mr-8"}`}>
                    <span className="block text-[11px] text-zinc-500">{t.role === "user" ? lead.contact_name : "ARM"}</span>
                    {t.text}
                  </li>
                ))}
              </ol>
            </Panel>
          )}
        </div>

        <div className="space-y-6">
          <Panel title="Datos">
            <dl className="space-y-2 text-sm">
              {[
                ["WhatsApp", lead.phone ? formatPhone(lead.phone) : "—"],
                ["Correo", lead.contact_email ?? "—"],
                ["Servicio", service?.name ?? lead.service_name ?? "Por definir"],
                ["Valor estimado", formatPEN(lead.estimated_value)],
                ["Presupuesto dicho", formatPEN(lead.budget_pen)],
                ["Plazo", lead.timeline ? TIMELINE_LABELS[lead.timeline] ?? lead.timeline : "—"],
                ["Último contacto", lead.last_contact_at ? limaDateTime(lead.last_contact_at) : "—"],
                ["Creado", limaDateTime(lead.created_at)],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3">
                  <dt className="text-zinc-400">{k}</dt>
                  <dd className="text-zinc-100 text-right break-all">{v}</dd>
                </div>
              ))}
            </dl>
            {lead.need_summary && <p className="mt-3 text-sm text-zinc-300 border-t border-zinc-800 pt-3">“{lead.need_summary}”</p>}
            {lead.lost_reason && <p className="mt-2 text-sm text-zinc-400">Motivo de pérdida: {lead.lost_reason}</p>}
          </Panel>

          <Panel title="Por qué tiene este puntaje">
            {lead.score_reasons.length === 0 ? (
              <p className="text-sm text-zinc-500">Sin señales todavía.</p>
            ) : (
              <ul className="space-y-1 text-sm text-zinc-300">
                {lead.score_reasons.map((r) => <li key={r}>{r}</li>)}
              </ul>
            )}
          </Panel>

          {appointments.length > 0 && (
            <Panel title="Videollamadas" action={<Link href="/agenda" className="text-xs text-blue-400 hover:underline">Agenda</Link>}>
              <ul className="space-y-2 text-sm">
                {appointments.map((a) => (
                  <li key={a.id} className="flex items-center justify-between gap-2">
                    <span className="text-zinc-200">{limaDateTime(a.scheduled_at)}</span>
                    <AppointmentBadge status={a.status} />
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          <Panel title="Editar">
            <EditLeadForm lead={lead} />
          </Panel>
        </div>
      </div>
    </div>
  );
}
