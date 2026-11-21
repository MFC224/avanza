/**
 * Teléfonos y mensajes de WhatsApp listos para enviar con un clic.
 * Las plantillas están pensadas para cada etapa del embudo: responder rápido
 * y con contexto es lo que más ventas cierra.
 */

/** Deja solo dígitos con código de país. Celular peruano de 9 dígitos → 51XXXXXXXXX. */
export function normalizePhone(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 9 && digits.startsWith("9")) return `51${digits}`;
  if (digits.length >= 8 && digits.length <= 15) return digits;
  return null;
}

export function formatPhone(raw: string | null | undefined): string {
  const p = normalizePhone(raw);
  if (!p) return raw ?? "—";
  if (p.startsWith("51") && p.length === 11) return `+51 ${p.slice(2, 5)} ${p.slice(5, 8)} ${p.slice(8)}`;
  return `+${p}`;
}

export function whatsappLink(phone: string | null | undefined, text: string): string | null {
  const p = normalizePhone(phone);
  if (!p) return null;
  return `https://wa.me/${p}?text=${encodeURIComponent(text)}`;
}

export interface TemplateContext {
  name: string;
  service?: string | null;
  date?: string | null;
  meetUrl?: string | null;
  sender?: string;
}

export interface WhatsappTemplate {
  id: string;
  label: string;
  stages: readonly string[];
  build: (c: TemplateContext) => string;
}

const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
// "Sistema / CRM" → "sistema / CRM": solo la primera letra, para no bajar siglas.
const serviceText = (s?: string | null) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : "tu proyecto");

export const WHATSAPP_TEMPLATES: readonly WhatsappTemplate[] = [
  {
    id: "primer_contacto",
    label: "Primer contacto",
    stages: ["nuevo"],
    build: (c) =>
      `Hola ${firstName(c.name)}, soy ${c.sender ?? "Magno"} de AVANZA. Vi tu consulta sobre ${serviceText(c.service)}. ¿Te parece si conversamos 15 minutos hoy o mañana para entender bien lo que necesitas?`,
  },
  {
    id: "proponer_reunion",
    label: "Proponer reunión",
    stages: ["nuevo", "contactado"],
    build: (c) =>
      `Hola ${firstName(c.name)}, para prepararte una propuesta a medida te propongo una videollamada de 25 minutos. ¿Te queda mejor mañana a las 11:00 a. m. o a las 4:00 p. m.?`,
  },
  {
    id: "confirmar_reunion",
    label: "Confirmar reunión",
    stages: ["reunion"],
    build: (c) =>
      `Hola ${firstName(c.name)}, te confirmo nuestra videollamada${c.date ? ` del ${c.date}` : ""}.${c.meetUrl ? ` Este es el enlace: ${c.meetUrl}` : " En un momento te envío el enlace."} ¡Nos vemos!`,
  },
  {
    id: "enviar_propuesta",
    label: "Enviar propuesta",
    stages: ["reunion", "propuesta"],
    build: (c) =>
      `Hola ${firstName(c.name)}, gracias por tu tiempo. Te comparto la propuesta para ${serviceText(c.service)}. Si te parece bien, podemos empezar esta misma semana con el 50% de anticipo.`,
  },
  {
    id: "seguimiento_propuesta",
    label: "Seguimiento de propuesta",
    stages: ["propuesta", "negociacion"],
    build: (c) =>
      `Hola ${firstName(c.name)}, ¿pudiste revisar la propuesta de ${serviceText(c.service)}? Si quieres, la vemos juntos en una llamada corta y ajustamos lo que haga falta.`,
  },
  {
    id: "cierre",
    label: "Cerrar acuerdo",
    stages: ["negociacion"],
    build: (c) =>
      `Hola ${firstName(c.name)}, para reservar tu fecha de inicio solo necesitamos el 50% de anticipo. Te envío los datos de pago y el acuerdo de confidencialidad para firmar. ¿Te parece?`,
  },
  {
    id: "reactivar",
    label: "Reactivar",
    stages: ["perdido", "contactado"],
    build: (c) =>
      `Hola ${firstName(c.name)}, ¿cómo va ${serviceText(c.service)}? Este mes tenemos espacio para un nuevo proyecto y podemos empezar con una primera etapa más pequeña. ¿Lo conversamos?`,
  },
  {
    id: "bienvenida_cliente",
    label: "Bienvenida de cliente",
    stages: ["ganado"],
    build: (c) =>
      `¡Bienvenido a AVANZA, ${firstName(c.name)}! Esta semana te enviamos el plan de trabajo y el enlace donde verás los avances en vivo. Cualquier duda, escríbenos por aquí.`,
  },
];

export function templatesForStage(stage: string): WhatsappTemplate[] {
  const matching = WHATSAPP_TEMPLATES.filter((t) => t.stages.includes(stage));
  const rest = WHATSAPP_TEMPLATES.filter((t) => !t.stages.includes(stage));
  return [...matching, ...rest];
}
