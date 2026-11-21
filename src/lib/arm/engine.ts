import { ARM_CONTACT, ARM_GUARANTEES, ARM_SERVICES, getService } from "./catalog";
import type { ArmService } from "./catalog";
import {
  detectIntents,
  detectObjections,
  detectService,
  extractEmail,
  extractPhone,
  normalizeText,
} from "./extract";
import type { Objection } from "./extract";
import type { ArmProfile } from "./profile";

/**
 * Motor de conversación del asistente ARM.
 * Decide QUÉ hacer en cada turno (responder, calificar, pedir contacto, agendar o
 * derivar a WhatsApp). La IA, si está activa, solo redacta el texto: nunca decide
 * la acción ni inventa precios.
 */

export type ArmAction = "none" | "capture_contact" | "offer_booking" | "whatsapp_handoff";
export type QuestionKey = "need" | "business" | "timeline" | "budget" | "next_step";

export interface ArmPlan {
  reply: string;
  action: ArmAction;
  quickReplies: string[];
  asked: QuestionKey[];
}

interface Question {
  key: QuestionKey;
  text: string;
  chips: string[];
}

export const TIMELINE_CHIPS = ["Lo antes posible", "Este mes", "En 1 a 3 meses", "Solo estoy averiguando"];
export const BUDGET_CHIPS = ["Menos de S/ 2,000", "S/ 2,000 a S/ 5,000", "Más de S/ 5,000", "Aún no lo sé"];
export const NEXT_STEP_CHIPS = ["Agendar videollamada", "Que me escriban por WhatsApp"];
const SERVICE_CHIPS = ARM_SERVICES.slice(0, 4).map((s) => s.shortName);

export const WELCOME_MESSAGE =
  "Hola, soy ARM, el asistente de AVANZA. Te ayudo a estimar tu proyecto en un par de minutos y, si quieres, te conecto con Magno o Manuel. ¿Qué te gustaría resolver en tu negocio?";
export const WELCOME_CHIPS = ["Quiero una página web", "Quiero dejar el Excel", "Atender clientes con IA", "¿Cuánto cuesta?"];

function nextQuestion(profile: ArmProfile, asked: Set<QuestionKey>): Question | null {
  if (!profile.serviceId) {
    return {
      key: "need",
      text: "¿Qué te gustaría lograr? Por ejemplo: conseguir clientes por internet, dejar de llevar todo en Excel o atender mensajes de WhatsApp de forma automática.",
      chips: SERVICE_CHIPS,
    };
  }
  if (!profile.businessType && !asked.has("business")) {
    return { key: "business", text: "¿A qué se dedica tu negocio? Así te recomiendo lo que mejor le funciona a tu rubro.", chips: [] };
  }
  if (!profile.timeline && !asked.has("timeline")) {
    return { key: "timeline", text: "¿Para cuándo lo necesitas?", chips: TIMELINE_CHIPS };
  }
  if (profile.budgetPEN === undefined && !profile.budgetUnknown && !asked.has("budget")) {
    return {
      key: "budget",
      text: "¿Tienes un presupuesto aproximado? Así te propongo la opción que mejor encaje.",
      chips: BUDGET_CHIPS,
    };
  }
  if (!asked.has("next_step")) {
    return {
      key: "next_step",
      text: "Con esto ya podemos prepararte una propuesta sin costo. ¿Prefieres una videollamada de 25 minutos o que Magno te escriba por WhatsApp?",
      chips: NEXT_STEP_CHIPS,
    };
  }
  return null;
}

/** "Sistema web o CRM a medida" → "sistema web o CRM a medida" (sin bajar las siglas). */
function lowerFirst(text: string): string {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function servicePitch(service: ArmService): string {
  return `Para ${lowerFirst(service.name)} la inversión va de ${service.priceRange} y suele estar lista en ${service.deliveryDays}: ${service.pitch}. El precio final lo cerramos después de una llamada corta, sin costo.`;
}

function objectionReply(objection: Objection, service?: ArmService): string {
  switch (objection) {
    case "precio":
      return `Entiendo. Podemos empezar con una primera etapa más pequeña que resuelva lo más urgente y crecer después. Pagas 50% al empezar y 50% cuando apruebas el resultado.${service ? ` Para ${lowerFirst(service.shortName)} el rango va de ${service.priceRange}.` : ""}`;
    case "plazo":
      return `Trabajamos por etapas de una a dos semanas y cada semana ves el avance en un enlace en vivo.${service ? ` ${service.shortName} suele estar listo en ${service.deliveryDays}.` : ""}`;
    case "confianza":
      return `Es una duda razonable. Así trabajamos: ${ARM_GUARANTEES.join(" ")}`;
    case "alternativa":
      return "Una plantilla sirve para empezar, pero suele cobrar mensualidades, depende de complementos de terceros y cuesta adaptarla a tu forma de trabajar. Nosotros lo hacemos a la medida de tu negocio y el código queda a tu nombre.";
    case "mensualidad":
      return "No cobramos mensualidades obligatorias: pagas el proyecto y es tuyo. Solo pagarías servicios de terceros como el dominio y, si lo deseas, un plan de soporte opcional.";
  }
}

function withQuestion(base: string, q: Question | null): string {
  return q ? `${base}\n\n${q.text}` : base;
}

export function planTurn(input: {
  profile: ArmProfile;
  lastMessage: string;
  asked: readonly QuestionKey[];
  hasCapturedContact?: boolean;
}): ArmPlan {
  const { profile, lastMessage } = input;
  const asked = new Set<QuestionKey>(input.asked);
  const last = normalizeText(lastMessage);
  const intents = detectIntents(lastMessage);
  const service = getService(profile.serviceId);
  const askedList = () => Array.from(asked);
  const ask = (q: Question | null) => {
    if (q) asked.add(q.key);
    return q;
  };

  const wantsContactBack = /que me escriban|me contacten|me llamen|dejar mis datos|dejo mis datos|enviar(me)? (la )?propuesta|mandenme|envienme/.test(last);
  if (!input.hasCapturedContact && (extractPhone(lastMessage) || extractEmail(lastMessage) || wantsContactBack)) {
    const thanks = profile.name ? `Gracias, ${profile.name}.` : "Perfecto.";
    return {
      reply: `${thanks} Completa tus datos aquí abajo y confirma que aceptas nuestra política de privacidad. Magno te escribe en horario de oficina con una propuesta.`,
      action: "capture_contact",
      quickReplies: [],
      asked: askedList(),
    };
  }

  if (intents.wantsMeeting) {
    asked.add("next_step");
    return {
      reply: "Perfecto. Es una videollamada de 25 minutos con Magno y Manuel, sin costo: revisamos tu caso y te decimos cómo lo haríamos. Elige el día y la hora aquí abajo.",
      action: "offer_booking",
      quickReplies: [],
      asked: askedList(),
    };
  }

  if (intents.wantsHuman) {
    return {
      reply: `Claro. ${ARM_CONTACT.commercialName} lleva la parte comercial y responde por WhatsApp en horario de oficina. Te dejo el botón con un resumen de lo que conversamos, para que no tengas que repetirlo.`,
      action: "whatsapp_handoff",
      quickReplies: ["Prefiero agendar una videollamada"],
      asked: askedList(),
    };
  }

  const objections = detectObjections(lastMessage);
  if (objections.length > 0) {
    asked.add("next_step");
    return {
      reply: `${objectionReply(objections[0], service)}\n\n¿Te parece si lo vemos en una videollamada corta o prefieres que Magno te escriba?`,
      action: "none",
      quickReplies: NEXT_STEP_CHIPS,
      asked: askedList(),
    };
  }

  if (intents.asksPrice && !service) {
    const list = ARM_SERVICES.map((s) => `• ${s.shortName}: ${s.priceRange} (${s.deliveryDays})`).join("\n");
    const q = ask(nextQuestion(profile, asked));
    return {
      reply: withQuestion(`Estos son nuestros rangos de inversión:\n${list}\n\nEl precio final depende de lo que necesites.`, q),
      action: "none",
      quickReplies: q?.chips ?? [],
      asked: askedList(),
    };
  }

  if (service && (intents.asksPrice || detectService(lastMessage) === service.id)) {
    const q = ask(nextQuestion(profile, asked));
    return { reply: withQuestion(servicePitch(service), q), action: "none", quickReplies: q?.chips ?? [], asked: askedList() };
  }

  if (intents.asksProcess) {
    const q = ask(nextQuestion(profile, asked));
    const base = `Trabajamos por etapas de una a dos semanas. ${ARM_GUARANTEES.join(" ")}`;
    return { reply: withQuestion(base, q), action: "none", quickReplies: q?.chips ?? [], asked: askedList() };
  }

  const q = ask(nextQuestion(profile, asked));
  if (q) {
    const reply = intents.isGreeting ? `¡Hola! ${q.text}` : q.text;
    return { reply, action: "none", quickReplies: q.key === "need" ? WELCOME_CHIPS : q.chips, asked: askedList() };
  }

  return {
    reply: "Gracias por el detalle. Lo mejor ahora es que Magno o Manuel lo revisen contigo. ¿Agendamos una videollamada de 25 minutos o prefieres que te escriban por WhatsApp?",
    action: "none",
    quickReplies: NEXT_STEP_CHIPS,
    asked: askedList(),
  };
}

/** Resumen corto para el mensaje de WhatsApp y para la ficha del lead. */
export function summarizeProfile(profile: ArmProfile): string {
  const service = getService(profile.serviceId);
  const parts: string[] = [];
  if (service) parts.push(`Servicio: ${service.name}`);
  if (profile.businessType) parts.push(`Rubro: ${profile.businessType}`);
  if (profile.timeline) parts.push(`Plazo: ${TIMELINE_LABELS[profile.timeline]}`);
  if (profile.budgetPEN !== undefined) parts.push(`Presupuesto: S/ ${profile.budgetPEN.toLocaleString("es-PE")}`);
  if (profile.needSummary) parts.push(`Necesidad: ${profile.needSummary}`);
  return parts.join(" · ");
}

export const TIMELINE_LABELS: Record<string, string> = {
  urgente: "Lo antes posible",
  este_mes: "Este mes",
  "1_3_meses": "En 1 a 3 meses",
  explorando: "Solo averiguando",
};
