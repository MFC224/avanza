/**
 * Lógica de Estimación de Proyectos, ROI y Generación de Mensajes de Cotización: AVANZA
 */

export interface EstimatorOptions {
  servicioId: "web" | "crm" | "ai" | "app";
  urgenciaIndex: number;
  escalaIndex: number;
}

export interface ServiceEstimate {
  id: string;
  name: string;
  badge: string;
  baseDays: string;
  roi: string;
  deliverable: string;
  estimatedDaysRange: [number, number];
}

export const ESTIMATOR_SERVICES: Record<string, ServiceEstimate> = {
  web: {
    id: "web",
    name: "Página Web de Alto Impacto",
    badge: "Ventas & Conversión",
    baseDays: "7 a 10 días",
    roi: "+180% en leads calificados",
    deliverable: "Next.js 16 + SEO + Animaciones Awwwards",
    estimatedDaysRange: [7, 10],
  },
  crm: {
    id: "crm",
    name: "Sistema Web / CRM Interno",
    badge: "Operación & Gestión",
    baseDays: "12 a 14 días",
    roi: "Ahorro de ~45 hrs manuales / mes",
    deliverable: "PostgreSQL 3NF + Roles + Dashboard",
    estimatedDaysRange: [12, 14],
  },
  ai: {
    id: "ai",
    name: "Automatización con Agentes IA",
    badge: "Productividad x10",
    baseDays: "10 a 14 días",
    roi: "Atención 24/7 sin personal extra",
    deliverable: "Pipelines LLM + RAG + WhatsApp Bot",
    estimatedDaysRange: [10, 14],
  },
  app: {
    id: "app",
    name: "Aplicación Móvil iOS & Android",
    badge: "Retención Móvil",
    baseDays: "14 a 21 días",
    roi: "Fidelización continua de clientes",
    deliverable: "Flutter / React Native + Notificaciones",
    estimatedDaysRange: [14, 21],
  },
};

export const ESTIMATOR_URGENCIAS = [
  { label: "Sprint Express", desc: "Entrega en 7 - 14 días", speedBonus: "Prioridad Máxima" },
  { label: "Sprint Estándar", desc: "Entrega en 3 - 4 semanas", speedBonus: "Fases Graduales" },
];

export const ESTIMATOR_ESCALAS = [
  { label: "Pyme / Negocio Local", desc: "1 a 10 colaboradores" },
  { label: "Empresa en Crecimiento", desc: "10 a 50 colaboradores" },
  { label: "Corporativo", desc: "+50 colaboradores o multi-sucursal" },
];

/**
 * Calcula la estimación técnica detallada
 */
export function calculateEstimate(options: EstimatorOptions) {
  const service = ESTIMATOR_SERVICES[options.servicioId] || ESTIMATOR_SERVICES.web;
  const urgencia = ESTIMATOR_URGENCIAS[options.urgenciaIndex] || ESTIMATOR_URGENCIAS[0];
  const escala = ESTIMATOR_ESCALAS[options.escalaIndex] || ESTIMATOR_ESCALAS[0];

  const daysMultiplier = options.urgenciaIndex === 1 ? 2 : 1;
  const calculatedDays = `${service.estimatedDaysRange[0] * daysMultiplier} a ${
    service.estimatedDaysRange[1] * daysMultiplier
  } días`;

  return {
    service,
    urgencia,
    escala,
    calculatedDays,
  };
}

/**
 * Construye el enlace de WhatsApp codificado con formato formal
 */
export function buildWhatsAppProposalUrl(
  serviceName: string,
  urgenciaLabel: string,
  urgenciaDesc: string,
  escalaLabel: string,
  phoneNumber = "51942498841"
): string {
  const message =
    `Hola Magno! Usé el Simulador de Proyectos de AVANZA:\n\n` +
    `• Solución: ${serviceName}\n` +
    `• Modalidad: ${urgenciaLabel} (${urgenciaDesc})\n` +
    `• Tamaño: ${escalaLabel}\n\n` +
    `Me gustaría coordinar una cotización formal y los siguientes pasos.`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
