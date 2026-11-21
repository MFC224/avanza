import Link from "next/link";
import { getDashboardData, requestTime } from "@/lib/crm/queries";
import { LEAD_STAGES, OPEN_STAGES, formatPEN, sourceLabel, weightedValue } from "@/lib/crm/stages";
import { getService } from "@/lib/arm/catalog";
import { formatPhone } from "@/lib/crm/whatsapp";
import { AppointmentBadge, EmptyState, Kpi, Panel, StageBadge, TemperatureBadge, limaDateTime, relativeTime } from "@/components/crm/badges";
import { WhatsappMenu } from "@/components/crm/whatsapp-menu";

export const metadata = { title: "Hoy" };

const OBJECTION_LABELS: Record<string, string> = {
  precio: "Precio",
  plazo: "Plazo",
  confianza: "Confianza",
  alternativa: "Plantillas / otra opción",
  mensualidad: "Mensualidades",
};

export default async function DashboardPage() {
  const d = await getDashboardData();
  const pipeline = d.openLeads.reduce((sum, l) => sum + weightedValue(l.estimated_value, l.stage), 0);
  const closed = d.wonCount + d.lostCount;
  const winRate = closed ? Math.round((d.wonCount / closed) * 100) : null;
  const armRate = d.arm.total ? Math.round((d.arm.withContact / d.arm.total) * 100) : null;
  const now = requestTime();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-white">Hoy</h1>
        <p className="text-sm text-zinc-400">A quién contactar, qué reuniones vienen y cómo va el embudo.</p>
      </div>

      {d.error && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
          No se pudieron leer los datos: {d.error}
        </p>
      )}

      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Kpi label="Leads nuevos (7 días)" value={String(d.newLast7)} />
        <Kpi label="Leads calientes abiertos" value={String(d.hotOpen)} hint="Puntaje de 60 o más" />
        <Kpi label="Embudo ponderado" value={formatPEN(pipeline)} hint="Valor × probabilidad de cada etapa" />
        <Kpi
          label="Tasa de cierre (90 días)"
          value={winRate === null ? "—" : `${winRate}%`}
          hint={`${d.wonCount} ganados · ${formatPEN(d.wonValue)}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Panel title={`Seguimientos para hoy (${d.followUps.length})`} action={<Link href="/leads" className="text-xs text-blue-400 hover:underline">Ver embudo</Link>}>
            {d.followUps.length === 0 ? (
              <EmptyState>No hay seguimientos pendientes. Buen momento para reactivar leads perdidos.</EmptyState>
            ) : (
              <ul className="divide-y divide-zinc-800">
                {d.followUps.slice(0, 15).map((l) => {
                  const overdue = new Date(l.next_action_at!).getTime() < now;
                  return (
                    <li key={l.id} className="py-3 flex flex-wrap items-center gap-3">
                      <div className="min-w-0 flex-1">
                        <Link href={`/leads/${l.id}`} className="font-medium text-white hover:underline">
                          {l.contact_name}
                        </Link>
                        <p className="text-xs text-zinc-400 truncate">
                          {l.next_action ?? "Hacer seguimiento"} ·{" "}
                          <span className={overdue ? "text-red-300" : "text-zinc-400"}>{relativeTime(l.next_action_at, now)}</span>
                        </p>
                      </div>
                      <StageBadge stage={l.stage} />
                      <TemperatureBadge temperature={l.temperature} score={l.score} />
                      <WhatsappMenu
                        compact
                        phone={l.phone}
                        stage={l.stage}
                        context={{ name: l.contact_name, service: getService(l.service_id)?.shortName ?? l.service_name }}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </Panel>
        </div>

        <Panel title="Próximas videollamadas" action={<Link href="/agenda" className="text-xs text-blue-400 hover:underline">Agenda</Link>}>
          {d.upcoming.length === 0 ? (
            <EmptyState>Sin reuniones agendadas.</EmptyState>
          ) : (
            <ul className="space-y-3">
              {d.upcoming.map((a) => (
                <li key={a.id} className="text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white">{limaDateTime(a.scheduled_at)}</span>
                    <AppointmentBadge status={a.status} />
                  </div>
                  <p className="text-xs text-zinc-400">
                    {a.lead_id ? <Link href={`/leads/${a.lead_id}`} className="hover:underline">{a.client_name}</Link> : a.client_name} ·{" "}
                    {formatPhone(a.client_contact)}
                  </p>
                  {!a.meet_url && <p className="text-xs text-amber-300">Falta enviar el enlace de Meet</p>}
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel title="Embudo abierto">
          <ul className="space-y-2.5">
            {LEAD_STAGES.filter((s) => OPEN_STAGES.includes(s.id)).map((s) => {
              const leads = d.openLeads.filter((l) => l.stage === s.id);
              const value = leads.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0);
              const max = Math.max(1, ...OPEN_STAGES.map((id) => d.openLeads.filter((l) => l.stage === id).length));
              return (
                <li key={s.id}>
                  <Link href={`/leads?stage=${s.id}`} className="flex justify-between text-sm hover:underline">
                    <span className="text-zinc-300">{s.label}</span>
                    <span className="text-zinc-400 tabular-nums">{leads.length} · {formatPEN(value)}</span>
                  </Link>
                  <div className="mt-1 h-1.5 rounded bg-zinc-800">
                    <div className="h-1.5 rounded bg-blue-500" style={{ width: `${(leads.length / max) * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel title="Asistente ARM (30 días)">
          <dl className="grid grid-cols-3 gap-2 text-center">
            <div><dt className="text-xs text-zinc-400">Conversaciones</dt><dd className="text-xl text-white tabular-nums">{d.arm.total}</dd></div>
            <div><dt className="text-xs text-zinc-400">Dejaron datos</dt><dd className="text-xl text-white tabular-nums">{armRate === null ? "—" : `${armRate}%`}</dd></div>
            <div><dt className="text-xs text-zinc-400">Se fueron</dt><dd className="text-xl text-white tabular-nums">{d.arm.abandoned}</dd></div>
          </dl>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="text-xs text-zinc-400 mb-1">Qué buscaban los que se fueron</p>
              {d.arm.abandonedServices.length === 0 ? <p className="text-zinc-500">—</p> : d.arm.abandonedServices.slice(0, 4).map(([id, n]) => (
                <p key={id} className="flex justify-between"><span>{getService(id)?.shortName ?? id}</span><span className="tabular-nums text-zinc-400">{n}</span></p>
              ))}
            </div>
            <div>
              <p className="text-xs text-zinc-400 mb-1">Objeciones más comunes</p>
              {d.arm.objections.length === 0 ? <p className="text-zinc-500">—</p> : d.arm.objections.slice(0, 4).map(([o, n]) => (
                <p key={o} className="flex justify-between"><span>{OBJECTION_LABELS[o] ?? o}</span><span className="tabular-nums text-zinc-400">{n}</span></p>
              ))}
            </div>
          </div>
        </Panel>

        <Panel title="De dónde llegan (90 días)">
          {d.sources.length === 0 ? <EmptyState>Aún no hay leads.</EmptyState> : (
            <ul className="space-y-1.5 text-sm">
              {d.sources.map(([source, n]) => (
                <li key={source} className="flex justify-between">
                  <Link href={`/leads?source=${source}`} className="hover:underline">{sourceLabel(source)}</Link>
                  <span className="tabular-nums text-zinc-400">{n}</span>
                </li>
              ))}
            </ul>
          )}
          {d.lostReasons.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-zinc-400 mb-1">Por qué perdimos</p>
              {d.lostReasons.slice(0, 4).map(([r, n]) => (
                <p key={r} className="flex justify-between text-sm"><span>{r}</span><span className="tabular-nums text-zinc-400">{n}</span></p>
              ))}
            </div>
          )}
        </Panel>
      </div>
    </div>
  );
}
