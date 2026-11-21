/**
 * Catálogo oficial del asistente ARM (fuente: AVANZA_KNOWLEDGE_BASE_ARM.md).
 * Lenguaje de negocio, sin jerga técnica: es lo que lee el cliente.
 */

export type ServiceId = "web" | "crm" | "ai" | "mobile" | "migration";

export interface ArmService {
  id: ServiceId;
  name: string;
  shortName: string;
  priceRange: string;
  minPricePEN: number;
  maxPricePEN: number;
  deliveryDays: string;
  pitch: string;
  keywords: string[];
}

export const ARM_SERVICES: readonly ArmService[] = [
  {
    id: "web",
    name: "Página web de alto impacto",
    shortName: "Página web",
    priceRange: "S/ 1,200 a S/ 2,400",
    minPricePEN: 1200,
    maxPricePEN: 2400,
    deliveryDays: "7 a 12 días",
    pitch:
      "una web rápida, que se ve bien en celular, aparece en Google y lleva cada visita a tu WhatsApp o a un formulario",
    keywords: ["web", "pagina", "landing", "sitio", "tienda virtual", "tienda online", "catalogo", "ecommerce", "portafolio", "dominio"],
  },
  {
    id: "crm",
    name: "Sistema web o CRM a medida",
    shortName: "Sistema / CRM",
    priceRange: "S/ 2,800 a S/ 5,500",
    minPricePEN: 2800,
    maxPricePEN: 5500,
    deliveryDays: "12 a 20 días",
    pitch:
      "reemplaza tus hojas de Excel: clientes, cotizaciones, inventario o cobranzas en un solo lugar, con usuarios por rol y reportes",
    keywords: ["crm", "sistema", "erp", "inventario", "ventas", "excel", "gestion", "factura", "cobranza", "usuarios", "almacen", "stock", "cotizacion", "planilla", "control de clientes"],
  },
  {
    id: "ai",
    name: "Automatización con inteligencia artificial",
    shortName: "Automatización con IA",
    priceRange: "S/ 3,500 a S/ 7,000",
    minPricePEN: 3500,
    maxPricePEN: 7000,
    deliveryDays: "10 a 25 días",
    pitch:
      "un asistente que atiende a tus clientes por WhatsApp o en tu web las 24 horas, responde con tu información y registra cada pedido",
    keywords: ["ia", "inteligencia artificial", "agente", "chatbot", "bot", "automatizar", "automatizacion", "asistente virtual", "gpt", "gemini", "responder mensajes"],
  },
  {
    id: "mobile",
    name: "Aplicación móvil (iOS y Android)",
    shortName: "App móvil",
    priceRange: "S/ 4,500 a S/ 8,500",
    minPricePEN: 4500,
    maxPricePEN: 8500,
    deliveryDays: "15 a 30 días",
    pitch:
      "una app publicada en App Store y Google Play, con panel web para administrarla, notificaciones y pagos",
    keywords: ["app", "aplicacion", "movil", "celular", "ios", "android", "play store", "app store", "delivery app"],
  },
  {
    id: "migration",
    name: "Modernización de sistemas",
    shortName: "Modernización",
    priceRange: "S/ 2,500 a S/ 6,000",
    minPricePEN: 2500,
    maxPricePEN: 6000,
    deliveryDays: "10 a 20 días",
    pitch:
      "pasamos tu sistema antiguo o tus datos a una plataforma en la nube segura, con copias de respaldo y acceso desde cualquier lugar",
    keywords: ["migracion", "migrar", "nube", "cloud", "modernizar", "sistema antiguo", "base de datos", "respaldo", "servidor"],
  },
];

export function getService(id: string | null | undefined): ArmService | undefined {
  return ARM_SERVICES.find((s) => s.id === id);
}

export function serviceMidpoint(service: ArmService): number {
  return Math.round((service.minPricePEN + service.maxPricePEN) / 2);
}

export const ARM_CONTACT = {
  commercialName: "Magno Alomía",
  technicalName: "Manuel Callañaupa",
  whatsappRaw: "51942498841",
  whatsappDisplay: "+51 942 498 841",
  technicalPhoneDisplay: "+51 921 195 037",
} as const;

export const ARM_GUARANTEES = [
  "Avances que puedes probar cada semana, en un enlace en vivo.",
  "El código y los datos son tuyos al 100%, sin mensualidades obligatorias.",
  "30 días de garantía después de la entrega para corregir cualquier falla.",
  "Pagas 50% al empezar y 50% cuando apruebas el resultado.",
] as const;
