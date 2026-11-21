import { getService, serviceMidpoint } from "../arm/catalog";
import type { Objection, Timeline } from "../arm/extract";

/**
 * Puntaje de 0 a 100 para ordenar a quién llamar primero.
 * Cada punto tiene un motivo legible, que se muestra en la ficha del lead.
 */

export type Temperature = "frio" | "tibio" | "caliente";

export interface ScoringInput {
  serviceId?: string | null;
  businessType?: string | null;
  budgetPEN?: number | null;
  timeline?: Timeline | string | null;
  objections?: readonly (Objection | string)[];
  wantsMeeting?: boolean;
  hasContact?: boolean;
  messageCount?: number;
}

export interface ScoringResult {
  score: number;
  temperature: Temperature;
  reasons: string[];
  estimatedValuePEN: number | null;
}

const HIGH_VALUE = new Set(["crm", "ai", "mobile", "migration"]);

export function scoreLead(input: ScoringInput): ScoringResult {
  let score = 0;
  const reasons: string[] = [];
  const add = (points: number, reason: string) => {
    score += points;
    reasons.push(`${points > 0 ? "+" : ""}${points} ${reason}`);
  };

  const service = getService(input.serviceId ?? undefined);
  if (service) {
    add(15, `sabe qué necesita (${service.shortName})`);
    if (HIGH_VALUE.has(service.id)) add(10, "servicio de mayor valor");
  }
  if (input.businessType) add(10, `rubro identificado (${input.businessType})`);

  if (typeof input.budgetPEN === "number") {
    add(10, "dio un presupuesto");
    if (service && input.budgetPEN >= service.minPricePEN) add(15, "el presupuesto alcanza el rango");
    else if (service && input.budgetPEN < service.minPricePEN * 0.6) add(-10, "presupuesto muy por debajo del rango");
  }

  switch (input.timeline) {
    case "urgente":
      add(15, "lo necesita ya");
      break;
    case "este_mes":
      add(12, "lo necesita este mes");
      break;
    case "1_3_meses":
      add(6, "lo necesita en 1 a 3 meses");
      break;
    case "explorando":
      add(-5, "solo está averiguando");
      break;
  }

  if (input.wantsMeeting) add(20, "pidió una reunión");
  if (input.hasContact) add(15, "dejó sus datos de contacto");
  if ((input.messageCount ?? 0) >= 4) add(5, "conversación activa");
  if (input.objections?.includes("precio")) add(-5, "objeción de precio");

  score = Math.max(0, Math.min(100, score));
  const temperature: Temperature = score >= 60 ? "caliente" : score >= 35 ? "tibio" : "frio";

  let estimatedValuePEN: number | null = null;
  if (typeof input.budgetPEN === "number") estimatedValuePEN = input.budgetPEN;
  else if (service) estimatedValuePEN = serviceMidpoint(service);

  return { score, temperature, reasons, estimatedValuePEN };
}
