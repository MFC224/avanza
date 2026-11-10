import { z } from "zod";

/**
 * AVANZA ARM Engine v1 (Automated Relationship & Qualification Manager)
 * Core business knowledge, schema validation, rate limiting and AI inference with fallback.
 */

export interface ArmServiceItem {
  id: string;
  name: string;
  priceRange: string;
  minPricePEN: number;
  maxPricePEN: number;
  deliveryDays: string;
  summary: string;
  keywords: string[];
}

export const ARM_SERVICES_CATALOG: ArmServiceItem[] = [
  {
    id: "web",
    name: "Página Web de Alto Impacto / Landing Editorial",
    priceRange: "S/ 1,200 a S/ 2,400",
    minPricePEN: 1200,
    maxPricePEN: 2400,
    deliveryDays: "7 a 12 días",
    summary: "Arquitectura Next.js 16 White Luxury, carga sub-segundo, 100% responsive, SEO técnico y enlace directo a WhatsApp.",
    keywords: ["web", "pagina", "landing", "sitio", "tienda", "catalogo", "ecommerce", "portafolio"],
  },
  {
    id: "crm",
    name: "Sistemas Web & CRM a Medida",
    priceRange: "S/ 2,800 a S/ 5,500",
    minPricePEN: 2800,
    maxPricePEN: 5500,
    deliveryDays: "12 a 20 días (2 Sprints)",
    summary: "Reemplazo de Excel, gestión de clientes, inventarios, cobranzas, roles jerárquicos y exportación a reportes.",
    keywords: ["crm", "sistema", "erp", "inventario", "ventas", "excel", "gestion", "facturas", "cobranzas", "usuarios"],
  },
  {
    id: "ai",
    name: "Automatización con Inteligencia Artificial & Agentes",
    priceRange: "S/ 3,500 a S/ 7,000+",
    minPricePEN: 3500,
    maxPricePEN: 7000,
    deliveryDays: "10 a 25 días",
    summary: "Agentes autónomos 24/7 para WhatsApp y Web, lectura de comprobantes/facturas y conexión con tus bases de datos.",
    keywords: ["ia", "ai", "inteligencia artificial", "agente", "chatbot", "bot", "automatizar", "rag", "gemini", "gpt"],
  },
  {
    id: "mobile",
    name: "Aplicaciones Móviles (iOS & Android)",
    priceRange: "S/ 4,500 a S/ 8,500+",
    minPricePEN: 4500,
    maxPricePEN: 8500,
    deliveryDays: "15 a 30 días",
    summary: "Apps nativas o híbridas en React Native / Flutter, panel web, notificaciones push y pasarelas de pago.",
    keywords: ["app", "movil", "mobile", "ios", "android", "play store", "app store", "flutter", "react native"],
  },
  {
    id: "migration",
    name: "Modernización de Sistemas & Migración Cloud",
    priceRange: "S/ 2,500 a S/ 6,000",
    minPricePEN: 2500,
    maxPricePEN: 6000,
    deliveryDays: "10 a 20 días",
    summary: "Migración de datos antiguos, bases de datos relacionales seguras en Supabase PostgreSQL y modernización cloud.",
    keywords: ["migracion", "nube", "cloud", "modernizar", "base de datos", "sql", "postgresql", "seguridad"],
  },
];

// In-Memory Rate Limiting Cache (Session: max 10 msgs, IP: max 5 req/min)
const sessionMessageCounts = new Map<string, number>();
const ipRequestHistory = new Map<string, number[]>();

export const ARM_LIMITS = {
  MAX_MESSAGES_PER_SESSION: 10,
  MAX_REQUESTS_PER_MINUTE_PER_IP: 5,
};

export function checkArmRateLimit(sessionId: string, ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const oneMinuteAgo = now - 60_000;

  // 1. IP Window check
  const ipHits = (ipRequestHistory.get(ip) || []).filter((time) => time > oneMinuteAgo);
  if (ipHits.length >= ARM_LIMITS.MAX_REQUESTS_PER_MINUTE_PER_IP) {
    return {
      allowed: false,
      reason: "Has superado el límite de 5 consultas por minuto. Por favor espera unos instantes.",
    };
  }
  ipHits.push(now);
  ipRequestHistory.set(ip, ipHits);

  // 2. Session Message Count check
  const count = sessionMessageCounts.get(sessionId) || 0;
  if (count >= ARM_LIMITS.MAX_MESSAGES_PER_SESSION) {
    return {
      allowed: false,
      reason: "Has alcanzado el límite de 10 mensajes por sesión. Para continuar, te invitamos a coordinar directamente con Manuel y Magno vía WhatsApp al +51 942 498 841.",
    };
  }
  sessionMessageCounts.set(sessionId, count + 1);

  return { allowed: true };
}

// Reset rate limits (Useful for automated testing)
export function resetArmRateLimitsForTesting() {
  sessionMessageCounts.clear();
  ipRequestHistory.clear();
}

// Zod Schema for Incoming ARM Messages
export const armChatSchema = z.object({
  sessionId: z.string().trim().min(5).max(64),
  message: z.string().trim().min(1, "El mensaje no puede estar vacío.").max(500, "Mensaje demasiado extenso (máx. 500 caracteres)."),
  consentGiven: z.boolean().optional().default(false),
  clientName: z.string().trim().max(60).optional(),
  contactInfo: z.string().trim().max(100).optional(),
});

export type ArmChatInput = z.infer<typeof armChatSchema>;

/**
 * Intelligent Grounded Response Generator
 * Resolves questions based on the official AVANZA_KNOWLEDGE_BASE_ARM.md
 */
export function resolveGroundedArmResponse(userMessage: string, consentGiven = false): {
  reply: string;
  detectedService?: ArmServiceItem;
  suggestedAction?: "consent_required" | "whatsapp_redirect" | "continue";
} {
  const lower = userMessage.toLowerCase();

  // 1. Detección de contacto o solicitud directa de hablar con un humano
  if (
    lower.includes("magno") ||
    lower.includes("manuel") ||
    lower.includes("humano") ||
    lower.includes("asesor") ||
    lower.includes("llamar") ||
    lower.includes("telefono") ||
    lower.includes("whatsapp")
  ) {
    return {
      reply: "Con gusto te comunico directamente con los fundadores de AVANZA. Puedes escribirle a Magno Alomía (Comercial) al +51 942 498 841 o a Manuel Callañaupa (Arquitectura de Software) al +51 921 195 037. ¿Deseas que te derivemos ahora por WhatsApp?",
      suggestedAction: "whatsapp_redirect",
    };
  }

  // 2. Preguntas sobre Precios y Costos
  if (lower.includes("precio") || lower.includes("costo") || lower.includes("cuanto cuesta") || lower.includes("presupuesto") || lower.includes("tarifa")) {
    return {
      reply: "En AVANZA trabajamos con transparencia total. Nuestros proyectos se estructuran en Sprints ágiles de 7 a 14 días con los siguientes rangos base de inversión:\n\n• Páginas Web de Alto Impacto: S/ 1,200 a S/ 2,400 (7-12 días)\n• Sistemas Web & CRM a Medida: S/ 2,800 a S/ 5,500 (12-20 días)\n• Soluciones de IA & Agentes: S/ 3,500 a S/ 7,000+ (10-25 días)\n• Apps Móviles (iOS/Android): S/ 4,500 a S/ 8,500+\n\n¿Qué tipo de solución requiere tu negocio?",
      suggestedAction: "continue",
    };
  }

  // 3. Objeción: ¿Por qué no WordPress o Wix?
  if (lower.includes("wordpress") || lower.includes("wix") || lower.includes("shopify")) {
    return {
      reply: "Buena pregunta. WordPress y Wix utilizan plantillas infladas con plugins de terceros que vuelven la web lenta (>3 segundos de carga) y vulnerable a hackeos, además de cobrarte mensualidades cautivas. En AVANZA programamos software 100% a medida con Next.js y React, logrando velocidades instantáneas (<1 segundo), diseño de élite y entregándote el 100% del código fuente en propiedad absoluta (cero vendor lock-in).",
      suggestedAction: "continue",
    };
  }

  // 4. Preguntas sobre Garantía, Metodología o Tiempo
  if (lower.includes("garantia") || lower.includes("tiempo") || lower.includes("plazo") || lower.includes("scrum") || lower.includes("sprint")) {
    return {
      reply: "Trabajamos bajo metodología ágil SCRUM en sprints de 7 a 14 días. Cada semana tienes un enlace en vivo para probar el avance real de tu software. Además, todos nuestros proyectos incluyen 30 días de Garantía Técnica integral post-lanzamiento para corrección de cualquier incidencia sin costo adicional.",
      suggestedAction: "continue",
    };
  }

  // 5. Búsqueda por Servicios del Catálogo
  for (const s of ARM_SERVICES_CATALOG) {
    if (s.keywords.some((k) => lower.includes(k))) {
      const consentMsg = consentGiven
        ? "Ya contamos con tu autorización de privacidad. ¿Cuál es tu nombre o número de WhatsApp para que Manuel o Magno te preparen una propuesta técnica personalizada?"
        : "Para preparar una estimación formal con los fundadores, ¿nos autorizas a solicitar tus datos de contacto conforme a la Ley N° 29733 de Protección de Datos Personales en Perú?";

      return {
        reply: `Para ${s.name}, nuestro rango de inversión es de ${s.priceRange} con un plazo de entrega de ${s.deliveryDays}. Incluye: ${s.summary}.\n\n${consentMsg}`,
        detectedService: s,
        suggestedAction: consentGiven ? "continue" : "consent_required",
      };
    }
  }

  // 6. Respuesta general de bienvenida / exploración
  return {
    reply: "¡Hola! Soy el asistente ARM de AVANZA Software Studio. Diseñamos páginas web de alta conversión (desde S/ 1,200 en 7 días), sistemas web/CRM a medida (desde S/ 2,800) y automatizaciones con Inteligencia Artificial. Cuéntame, ¿cuál es el giro de tu empresa o qué proceso deseas sistematizar?",
    suggestedAction: "continue",
  };
}
