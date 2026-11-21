import { ARM_SERVICES } from "./catalog";
import type { ServiceId } from "./catalog";

/**
 * Lectura de señales comerciales en el texto del cliente.
 * Funciones puras: no guardan nada ni llaman a servicios externos.
 */

export type Timeline = "urgente" | "este_mes" | "1_3_meses" | "explorando";
export type Objection = "precio" | "plazo" | "confianza" | "alternativa" | "mensualidad";

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text: string, words: readonly string[]): boolean {
  return words.some((w) => new RegExp(`(^|[^a-z0-9])${w}([^a-z0-9]|$)`).test(text));
}

export function extractEmail(text: string): string | undefined {
  const match = text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
  return match ? match[0].toLowerCase() : undefined;
}

/** Celular peruano (9 dígitos que empiezan en 9) o número internacional con +. */
export function extractPhone(text: string): string | undefined {
  const compact = text.replace(/[\s().-]/g, "");
  const intl = compact.match(/\+\d{8,15}/);
  if (intl) return intl[0];
  const peru = compact.match(/(?:51)?9\d{8}(?!\d)/);
  if (peru) return peru[0].length === 9 ? `+51${peru[0]}` : `+${peru[0]}`;
  return undefined;
}

const USD_TO_PEN = 3.75;

/** Presupuesto en soles: "S/ 3,000", "3 mil soles", "$1500", "menos de S/ 2,000". */
export function extractBudget(text: string): number | undefined {
  const t = normalizeText(text).replace(/(\d),(\d{3})/g, "$1$2");
  if (/menos de s\/ ?2000/.test(t)) return 1500;
  if (/mas de s\/ ?5000/.test(t)) return 6000;
  const range = t.match(/s\/ ?(\d{3,6}) (?:a|-) s\/ ?(\d{3,6})/);
  if (range) return Math.round((Number(range[1]) + Number(range[2])) / 2);

  const patterns: { re: RegExp; usd: boolean; thousands: boolean }[] = [
    { re: /(\d+(?:\.\d+)?) ?mil (?:soles|s\/)/, usd: false, thousands: true },
    { re: /(\d+(?:\.\d+)?) ?k (?:soles)?/, usd: false, thousands: true },
    { re: /(\d+(?:\.\d+)?) ?mil (?:dolares|usd)/, usd: true, thousands: true },
    { re: /s\/ ?\.? ?(\d{3,6})/, usd: false, thousands: false },
    { re: /(\d{3,6}) ?(?:soles|pen)/, usd: false, thousands: false },
    { re: /(?:\$|usd ?)(\d{3,6})/, usd: true, thousands: false },
    { re: /(\d{3,6}) ?(?:dolares|usd)/, usd: true, thousands: false },
  ];
  for (const p of patterns) {
    const m = t.match(p.re);
    if (!m) continue;
    let value = Number(m[1]);
    if (p.thousands) value *= 1000;
    if (p.usd) value *= USD_TO_PEN;
    if (value >= 300 && value <= 500000) return Math.round(value);
  }
  return undefined;
}

export function extractTimeline(text: string): Timeline | undefined {
  const t = normalizeText(text);
  if (hasAny(t, ["urgente", "urge", "lo antes posible", "cuanto antes", "esta semana", "ya mismo", "para ayer", "inmediato"])) return "urgente";
  if (hasAny(t, ["este mes", "en 2 semanas", "en dos semanas", "en 15 dias", "fin de mes", "proxima semana"])) return "este_mes";
  if (hasAny(t, ["1 a 3 meses", "proximo mes", "en un mes", "en 2 meses", "en dos meses", "en 3 meses", "en tres meses", "el otro mes"])) return "1_3_meses";
  if (hasAny(t, ["averiguando", "solo cotizando", "solo consultando", "sin apuro", "no tengo apuro", "mas adelante", "el proximo ano", "explorando"])) return "explorando";
  return undefined;
}

export function extractName(text: string): string | undefined {
  const m = text.match(/(?:[Mm]e llamo|[Mm]i nombre es|[Ss]oy)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?)/);
  if (!m) return undefined;
  const banned = ["El", "La", "Un", "Una", "Dueño", "Dueña", "Gerente", "De", "Ingeniero", "Ingeniera", "Administrador", "Administradora", "Encargado", "Encargada"];
  return banned.includes(m[1].split(" ")[0]) ? undefined : m[1];
}

export function extractCompany(text: string): string | undefined {
  const m = text.match(/(?:mi empresa(?: se llama| es)?|la empresa|trabajo en|de la empresa)\s+([A-ZÁÉÍÓÚÑ0-9][\wÁÉÍÓÚÑáéíóúñ&.\- ]{1,40}?)(?=[,.;!?]|$|\s(?:y|que|para|con)\s)/);
  return m ? m[1].trim() : undefined;
}

const BUSINESS_TYPES: readonly [string, string[]][] = [
  ["Restaurante", ["restaurante", "cevicheria", "polleria", "cafeteria", "pizzeria", "chifa"]],
  ["Clínica o salud", ["clinica", "consultorio", "dental", "odontolog", "laboratorio", "veterinaria", "farmacia", "botica"]],
  ["Educación", ["colegio", "academia", "instituto", "universidad", "escuela", "nido"]],
  ["Comercio", ["tienda", "bodega", "minimarket", "ferreteria", "boutique", "distribuidora", "importadora", "mayorista"]],
  ["Inmobiliaria o construcción", ["inmobiliaria", "constructora", "departamentos", "lotes", "condominio"]],
  ["Turismo", ["hotel", "hostal", "agencia de viajes", "turismo", "tours"]],
  ["Transporte y logística", ["transporte", "logistica", "courier", "delivery", "flota", "almacen"]],
  ["Servicios profesionales", ["estudio contable", "contador", "abogado", "estudio juridico", "consultora", "notaria"]],
  ["Industria", ["fabrica", "planta", "produccion", "manufactura", "taller", "molino"]],
  ["Automotriz", ["taller mecanico", "autos", "repuestos", "concesionario", "tuning"]],
  ["Eventos", ["eventos", "graduacion", "promocion", "fotografia", "catering"]],
];

export function extractBusinessType(text: string): string | undefined {
  const t = normalizeText(text);
  for (const [label, words] of BUSINESS_TYPES) {
    if (words.some((w) => t.includes(w))) return label;
  }
  return undefined;
}

export function detectService(text: string): ServiceId | undefined {
  const t = normalizeText(text);
  let best: { id: ServiceId; hits: number } | undefined;
  for (const s of ARM_SERVICES) {
    const hits = s.keywords.filter((k) => hasAny(t, [k])).length;
    if (hits > 0 && (!best || hits > best.hits)) best = { id: s.id, hits };
  }
  return best?.id;
}

const OBJECTIONS: readonly [Objection, string[]][] = [
  ["precio", ["caro", "muy costoso", "muy alto", "no tengo tanto", "presupuesto bajo", "mas barato", "descuento", "no me alcanza", "economico"]],
  ["plazo", ["demora", "mucho tiempo", "muy lento", "tardan"]],
  ["confianza", ["estafa", "confiar", "confianza", "seguro que", "garantia", "me dejen a medias", "referencias"]],
  ["alternativa", ["wordpress", "wix", "shopify", "plantilla", "freelancer", "otra agencia", "sobrino", "lo hago yo"]],
  ["mensualidad", ["mensualidad", "pago mensual", "cobran mensual", "suscripcion", "mantenimiento mensual"]],
];

export function detectObjections(text: string): Objection[] {
  const t = normalizeText(text);
  return OBJECTIONS.filter(([, words]) => words.some((w) => t.includes(w))).map(([id]) => id);
}

export interface Intents {
  wantsMeeting: boolean;
  wantsHuman: boolean;
  asksPrice: boolean;
  asksProcess: boolean;
  isGreeting: boolean;
}

export function detectIntents(text: string): Intents {
  const t = normalizeText(text);
  return {
    // Frases y no palabras sueltas: "sistema de citas" o "bot de WhatsApp" son pedidos de servicio, no de reunión.
    wantsMeeting: hasAny(t, ["agendar", "agendemos", "reunion", "reunirnos", "una llamada", "videollamada", "google meet", "meet", "una demo", "zoom", "conversar con ustedes"]),
    wantsHuman: hasAny(t, ["humano", "asesor", "hablar con", "magno", "manuel", "llamenme", "llamame", "escribanme", "contactenme", "su whatsapp", "su numero", "una persona", "un vendedor"]),
    asksPrice: hasAny(t, ["precio", "precios", "costo", "cuesta", "cuanto", "presupuesto", "tarifa", "cotizacion", "cotizar", "inversion"]),
    asksProcess: hasAny(t, ["plazo", "tiempo", "demoran", "garantia", "como trabajan", "metodologia", "proceso", "pagos", "forma de pago"]),
    isGreeting: /^(hola|buenas|buenos dias|buenas tardes|buenas noches|hey|que tal)\b/.test(t) && t.length < 30,
  };
}
