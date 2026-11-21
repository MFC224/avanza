import { ARM_SERVICES } from "./catalog";

/**
 * Protecciones alrededor de la IA (funciones puras, probadas en scripts/tests).
 */

/**
 * Ley N° 29733: a Google no se le envían datos que identifiquen a la persona.
 * Correos, teléfonos, documentos y nombres ("me llamo …") se reemplazan antes de enviar.
 */
export function redactPersonalData(text: string): string {
  return text
    .replace(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, "[correo]")
    .replace(/\b(dni|ruc|ce|pasaporte)\s*:?\s*\d{6,12}\b/gi, "$1 [número]")
    // Solo secuencias con 8 o más dígitos: así un rango como "3500 - 5000" no se toma por teléfono.
    .replace(/\+?\d[\d\s().-]{6,}\d/g, (m) => (m.replace(/\D/g, "").length >= 8 && !/\d{3,6}\s?-\s?\d{3,6}$/.test(m.trim()) ? "[teléfono]" : m))
    .replace(/([Mm]e llamo|[Mm]i nombre es|[Ss]oy)\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?/g, "$1 [nombre]");
}

/** Montos en soles y porcentajes de un texto: "S/ 2,800" → "2800", "50 %" → "50%". */
function figures(text: string): string[] {
  const amounts = (text.match(/S\/\s?\d[\d.,]*/g) ?? []).map((a) => a.replace(/\D/g, ""));
  const percents = (text.match(/\d+\s?%/g) ?? []).map((p) => p.replace(/\s/g, ""));
  return [...amounts, ...percents];
}

const ALLOWED_FIGURES = new Set(figures(`${ARM_SERVICES.map((s) => s.priceRange).join(" ")} 50%`));
const OFFER_WORDS = /descuento|promoci[oó]n|oferta especial|precio especial|\bgratis\b|gratuit[oa]/i;

/**
 * La IA no puede agregar precios, porcentajes ni ofertas que no estén en el borrador
 * o en el catálogo. Si lo hace, se descarta su texto y se usa el borrador.
 */
export function isFaithful(output: string, draft: string): boolean {
  const allowed = new Set([...ALLOWED_FIGURES, ...figures(draft)]);
  if (figures(output).some((f) => !allowed.has(f))) return false;
  // "Gratis" solo vale si el borrador ya ofrecía algo sin costo (la videollamada).
  if (OFFER_WORDS.test(output) && !OFFER_WORDS.test(draft) && !/sin costo/i.test(draft)) return false;
  if (/descuento|promoci[oó]n|oferta especial|precio especial/i.test(output) && !/descuento|promoci[oó]n|oferta especial|precio especial/i.test(draft)) {
    return false;
  }
  return true;
}
