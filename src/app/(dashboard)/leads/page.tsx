import Link from "next/link";
import { listLeads, requestTime } from "@/lib/crm/queries";
import { LEAD_SOURCES, LEAD_STAGES, OPEN_STAGES, TEMPERATURE_LABELS, formatPEN, sourceLabel, weightedValue } from "@/lib/crm/stages";
import { getService } from "@/lib/arm/catalog";
import { formatPhone } from "@/lib/crm/whatsapp";
import { EmptyState, StageBadge, TemperatureBadge, relativeTime } from "@/components/crm/badges";
import { NewLeadForm } from "./new-lead-form";
import type { LeadRow } from "@/lib/crm/types";

export const metadata = { title: "Embudo" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const select = "rounded-lg border border-zinc-800 bg-zinc-900 px-2.5 py-2 text-sm text-zinc-200";

function LeadCard({ lead, now }: { lead: LeadRow; now: number }) {
  const overdue = lead.next_action_at && new Date(lead.next_action_at).getTime() < now;
  return (
    <Link href={`/leads/${lead.id}`} className="block rounded-lg border border-zinc-800 bg-zinc-900 p-3 hover:border-zinc-600">
      <div className="flex items-start justify-between gap-2">
        <p className="font-medium text-white text-sm leading-snug">{lead.contact_name}</p>
        <TemperatureBadge temperature={lead.temperature} score={lead.score} />
      </div>
      {lead.company_name && <p className="text-xs text-zinc-400">{lead.company_name}</p>}
      <p className="mt-1 text-xs text-zinc-400">{getService(lead.service_id)?.shortName ?? lead.service_name ?? "Servicio por definir"}</p>
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-zinc-300 tabular-nums">{formatPEN(lead.estimated_value)}</span>
        <span className={overdue ? "text-red-300" : "text-zinc-500"}>{lead.next_action_at ? relativeTime(lead.next_action_at, now) : sourceLabel(lead.source)}</span>
      </div>
    </Link>
  );
}

export default async function LeadsPage({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const one = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);
  const filters = { q: one("q"), stage: one("stage"), temperature: one("temperature"), source: one("source") };
  const view = one("view") === "lista" || filters.stage === "ganado" || filters.stage === "perdido" ? "lista" : "tablero";
  const { leads, error } = await listLeads(filters);
  const now = requestTime();
  const open = leads.filter((l) => OPEN_STAGES.includes(l.stage));

  const qs = (extra: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    for (const [k, v] of Object.entries({ ...filters, view, ...extra })) if (v) p.set(k, v);
    return `/leads?${p.toString()}`;
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Embudo de ventas</h1>
          <p className="text-sm text-zinc-400">
            {open.length} abiertos · ponderado {formatPEN(open.reduce((s, l) => s + weightedValue(l.estimated_value, l.stage), 0))}
          </p>
        </div>
        <NewLeadForm />
      </div>

      <form method="get" action="/leads" className="flex flex-wrap gap-2 items-center">
        <label htmlFor="leads-q" className="sr-only">Buscar</label>
        <input id="leads-q" name="q" defaultValue={filters.q} placeholder="Buscar…" className={`${select} w-48`} />
        <label htmlFor="leads-temp" className="sr-only">Temperatura</label>
        <select id="leads-temp" name="temperature" defaultValue={filters.temperature ?? ""} className={select}>
          <option value="">Toda temperatura</option>
          {Object.entries(TEMPERATURE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <label htmlFor="leads-source" className="sr-only">Fuente</label>
        <select id="leads-source" name="source" defaultValue={filters.source ?? ""} className={select}>
          <option value="">Toda fuente</option>
          {Object.entries(LEAD_SOURCES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <label htmlFor="leads-stage" className="sr-only">Etapa</label>
        <select id="leads-stage" name="stage" defaultValue={filters.stage ?? ""} className={select}>
          <option value="">Toda etapa</option>
          {LEAD_STAGES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <input type="hidden" name="view" value={view} />
        <button type="submit" className="rounded-lg bg-zinc-800 px-3 py-2 text-sm text-white hover:bg-zinc-700 cursor-pointer">Filtrar</button>
        <Link href="/leads" className="text-sm text-zinc-400 hover:underline">Limpiar</Link>
        <span className="ml-auto flex rounded-lg border border-zinc-800 p-0.5 text-sm">
          <Link href={qs({ view: "tablero", stage: undefined })} className={`px-3 py-1.5 rounded-md ${view === "tablero" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}>Tablero</Link>
          <Link href={qs({ view: "lista" })} className={`px-3 py-1.5 rounded-md ${view === "lista" ? "bg-zinc-800 text-white" : "text-zinc-400"}`}>Lista</Link>
        </span>
      </form>

      {error && <p role="alert" className="text-sm text-red-300">No se pudieron cargar los leads: {error}</p>}

      {view === "tablero" ? (
        <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          {LEAD_STAGES.filter((s) => OPEN_STAGES.includes(s.id)).map((s) => {
            const column = open.filter((l) => l.stage === s.id);
            return (
              <section key={s.id} className="w-64 shrink-0 rounded-xl bg-zinc-900/40 border border-zinc-800 p-2.5" aria-label={s.label}>
                <header className="flex items-baseline justify-between px-1 pb-2">
                  <h2 className="text-sm font-medium text-white">{s.label} <span className="text-zinc-500">{column.length}</span></h2>
                  <span className="text-xs text-zinc-500 tabular-nums">{formatPEN(column.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0))}</span>
                </header>
                <p className="px-1 pb-2 text-[11px] text-zinc-500">{s.hint}</p>
                <div className="space-y-2">
                  {column.length === 0 ? <p className="px-1 py-4 text-xs text-zinc-600">Vacío</p> : column.map((l) => <LeadCard key={l.id} lead={l} now={now} />)}
                </div>
              </section>
            );
          })}
        </div>
      ) : leads.length === 0 ? (
        <EmptyState>No hay leads con estos filtros.</EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 text-left text-xs text-zinc-400">
              <tr>
                <th className="px-3 py-2.5 font-medium">Nombre</th>
                <th className="px-3 py-2.5 font-medium">Servicio</th>
                <th className="px-3 py-2.5 font-medium">Etapa</th>
                <th className="px-3 py-2.5 font-medium">Temperatura</th>
                <th className="px-3 py-2.5 font-medium">Valor</th>
                <th className="px-3 py-2.5 font-medium">Contacto</th>
                <th className="px-3 py-2.5 font-medium">Fuente</th>
                <th className="px-3 py-2.5 font-medium">Creado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-zinc-900/60">
                  <td className="px-3 py-2.5">
                    <Link href={`/leads/${l.id}`} className="text-white hover:underline">{l.contact_name}</Link>
                    {l.company_name && <span className="block text-xs text-zinc-500">{l.company_name}</span>}
                  </td>
                  <td className="px-3 py-2.5 text-zinc-300">{getService(l.service_id)?.shortName ?? l.service_name ?? "—"}</td>
                  <td className="px-3 py-2.5"><StageBadge stage={l.stage} /></td>
                  <td className="px-3 py-2.5"><TemperatureBadge temperature={l.temperature} score={l.score} /></td>
                  <td className="px-3 py-2.5 tabular-nums text-zinc-300">{formatPEN(l.estimated_value)}</td>
                  <td className="px-3 py-2.5 text-zinc-400 whitespace-nowrap">{l.phone ? formatPhone(l.phone) : l.contact_email ?? "—"}</td>
                  <td className="px-3 py-2.5 text-zinc-400">{sourceLabel(l.source)}</td>
                  <td className="px-3 py-2.5 text-zinc-500 whitespace-nowrap">{relativeTime(l.created_at, now)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
