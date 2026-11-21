import { stageInfo, TEMPERATURE_LABELS } from "@/lib/crm/stages";
import { APPOINTMENT_STATUS_LABELS } from "@/lib/crm/types";
import type { AppointmentStatus } from "@/lib/crm/types";

const base = "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap";

const STAGE_STYLES: Record<string, string> = {
  nuevo: "bg-sky-500/10 text-sky-300 ring-sky-500/30",
  contactado: "bg-indigo-500/10 text-indigo-300 ring-indigo-500/30",
  reunion: "bg-violet-500/10 text-violet-300 ring-violet-500/30",
  propuesta: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  negociacion: "bg-orange-500/10 text-orange-300 ring-orange-500/30",
  ganado: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  perdido: "bg-zinc-500/10 text-zinc-400 ring-zinc-500/30",
};

export function StageBadge({ stage }: { stage: string }) {
  return <span className={`${base} ${STAGE_STYLES[stage] ?? STAGE_STYLES.perdido}`}>{stageInfo(stage).label}</span>;
}

const TEMP_STYLES: Record<string, string> = {
  caliente: "bg-red-500/10 text-red-300 ring-red-500/30",
  tibio: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  frio: "bg-zinc-500/10 text-zinc-400 ring-zinc-600/40",
};

export function TemperatureBadge({ temperature, score }: { temperature: string; score?: number }) {
  return (
    <span className={`${base} ${TEMP_STYLES[temperature] ?? TEMP_STYLES.frio}`} title="Puntaje de 0 a 100 calculado con lo que sabemos del lead">
      {TEMPERATURE_LABELS[temperature] ?? temperature}
      {typeof score === "number" && <span className="tabular-nums opacity-80">· {score}</span>}
    </span>
  );
}

const APT_STYLES: Record<AppointmentStatus, string> = {
  pendiente: "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  confirmada: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
  completada: "bg-sky-500/10 text-sky-300 ring-sky-500/30",
  no_asistio: "bg-red-500/10 text-red-300 ring-red-500/30",
  cancelada: "bg-zinc-500/10 text-zinc-400 ring-zinc-600/40",
};

export function AppointmentBadge({ status }: { status: AppointmentStatus }) {
  return <span className={`${base} ${APT_STYLES[status] ?? APT_STYLES.cancelada}`}>{APPOINTMENT_STATUS_LABELS[status] ?? status}</span>;
}

export function Kpi({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-white tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-zinc-800 bg-zinc-900/40">
      <header className="flex items-center justify-between gap-3 px-4 py-3 border-b border-zinc-800">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {action}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-zinc-500 py-6 text-center">{children}</p>;
}

/** "hace 3 h", "en 2 días", relativo a ahora. */
export function relativeTime(iso: string | null | undefined, now: number = Date.now()): string {
  if (!iso) return "—";
  const diff = new Date(iso).getTime() - now;
  const abs = Math.abs(diff);
  const fmt = new Intl.RelativeTimeFormat("es-PE", { numeric: "auto" });
  if (abs < 3_600_000) return fmt.format(Math.round(diff / 60_000), "minute");
  if (abs < 86_400_000) return fmt.format(Math.round(diff / 3_600_000), "hour");
  return fmt.format(Math.round(diff / 86_400_000), "day");
}

export function limaDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
