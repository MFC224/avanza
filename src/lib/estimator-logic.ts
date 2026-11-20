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
    name: "Página web",
    badge: "Ventas & Conversión",
    baseDays: "7 a 10 días",
    roi: "Más consultas de clientes desde tu web",
    deliverable: "Diseño propio, preparado para buscadores y con botón a WhatsApp.",
    estimatedDaysRange: [7, 10],
  },
  crm: {
    id: "crm",
    name: "Sistema a medida",
    badge: "Operación & Gestión",
    baseDays: "12 a 14 días",
    roi: "Menos trabajo manual y menos errores",
    deliverable: "Usuarios con permisos, reportes claros y acceso desde cualquier dispositivo.",
    estimatedDaysRange: [12, 14],
  },
  ai: {
    id: "ai",
    name: "Automatización con IA",
    badge: "Productividad x10",
    baseDays: "10 a 14 días",
    roi: "Atención a cualquier hora sin sumar personal",
    deliverable: "Asistente conectado a WhatsApp y a tus datos, con revisión humana.",
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
  { label: "Lo antes posible", desc: "Entrega en 1 a 2 semanas", speedBonus: "Prioridad Máxima" },
  { label: "Sin apuro", desc: "Entrega en 3 a 4 semanas", speedBonus: "Fases Graduales" },
];

export const ESTIMATOR_ESCALAS = [
  { label: "Negocio pequeño", desc: "1 a 10 personas" },
  { label: "Empresa en crecimiento", desc: "10 a 50 personas" },
  { label: "Empresa grande", desc: "Más de 50 personas o varias sedes" },
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
