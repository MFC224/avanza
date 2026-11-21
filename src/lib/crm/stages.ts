/**
 * Etapas del embudo de ventas, fuentes de leads y motivos de pérdida.
 * Los identificadores coinciden con las restricciones de supabase/migrations/20261121_arm_crm.sql.
 */

export const LEAD_STAGES = [
  { id: "nuevo", label: "Nuevo", probability: 0.1, hint: "Responder en menos de 1 hora" },
  { id: "contactado", label: "Contactado", probability: 0.2, hint: "Conseguir una reunión" },
  { id: "reunion", label: "Reunión", probability: 0.4, hint: "Preparar y realizar la reunión" },
  { id: "propuesta", label: "Propuesta enviada", probability: 0.6, hint: "Hacer seguimiento a los 2 días" },
  { id: "negociacion", label: "Negociación", probability: 0.8, hint: "Cerrar condiciones y anticipo" },
  { id: "ganado", label: "Ganado", probability: 1, hint: "Pasar a proyecto" },
  { id: "perdido", label: "Perdido", probability: 0, hint: "Reactivar en 60 días" },
] as const;

export type LeadStage = (typeof LEAD_STAGES)[number]["id"];

export const OPEN_STAGES: readonly LeadStage[] = ["nuevo", "contactado", "reunion", "propuesta", "negociacion"];
export const CLOSED_STAGES: readonly LeadStage[] = ["ganado", "perdido"];

export function isLeadStage(value: unknown): value is LeadStage {
  return typeof value === "string" && LEAD_STAGES.some((s) => s.id === value);
}

export function stageInfo(stage: string) {
  return LEAD_STAGES.find((s) => s.id === stage) ?? LEAD_STAGES[0];
}

export const LEAD_SOURCES: Record<string, string> = {
  arm: "Asistente ARM",
  agenda: "Agenda web",
  formulario: "Formulario web",
  whatsapp: "WhatsApp",
  referido: "Referido",
  redes: "Redes sociales",
  manual: "Registro manual",
};

export function sourceLabel(source: string | null | undefined): string {
  return (source && LEAD_SOURCES[source]) || "Otro";
}

export const LOST_REASONS = [
  "Precio",
  "Eligió otra opción",
  "No respondió",
  "Sin presupuesto por ahora",
  "No era lo que buscaba",
  "Postergó el proyecto",
] as const;

export const ACTIVITY_KINDS: Record<string, string> = {
  nota: "Nota",
  llamada: "Llamada",
  whatsapp: "WhatsApp",
  correo: "Correo",
  reunion: "Reunión",
  etapa: "Cambio de etapa",
  sistema: "Sistema",
  arm: "Asistente ARM",
};

export const TEMPERATURE_LABELS: Record<string, string> = {
  caliente: "Caliente",
  tibio: "Tibio",
  frio: "Frío",
};

/** Valor ponderado: valor estimado × probabilidad de la etapa. */
export function weightedValue(estimatedValue: number | null | undefined, stage: string): number {
  return Math.round((estimatedValue ?? 0) * stageInfo(stage).probability);
}

export function formatPEN(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—";
  return `S/ ${Math.round(value).toLocaleString("es-PE")}`;
}
