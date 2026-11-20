/**
 * Proyectos reales de AVANZA (PLAN_DISENO_UNICO.md, sección 4).
 * Única fuente de datos para la portada y /servicios.
 * No añadir cifras de resultados que el cliente no haya confirmado.
 */

export type ServiceId = "web" | "systems" | "ai";

export interface Project {
  id: string;
  name: string;
  /** Ciudad del cliente. Vacío hasta que el dueño la confirme. */
  city?: string;
  /** Qué construimos, en una frase y sin jerga. */
  summary: string;
  service: ServiceId;
  image: string;
  imageAlt: string;
  /** Solo los sitios públicos llevan enlace; los sistemas internos no. */
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "molinos-cusco",
    name: "Molinos Cusco",
    city: "Cusipata, Cusco",
    summary: "Plataforma para distribuidores mayoristas de fideos Cusipata, con catálogo y cotizador de pedidos.",
    service: "web",
    image: "/images/portfolio-molinos-cusco.webp",
    imageAlt: "Portada del sitio de Molinos Cusco con el título El silencio del origen andino",
    url: "https://molinos-cusco-cusipata.vercel.app/",
  },
  {
    id: "qorikancha",
    name: "Qorikancha Expeditions",
    city: "Cusco",
    summary: "Sitio de expediciones privadas por Cusco y el Valle Sagrado, con planificador de viaje.",
    service: "web",
    image: "/images/portfolio-qorikancha.webp",
    imageAlt: "Portada del sitio de Qorikancha Expeditions sobre la fachada de una iglesia de Cusco",
    url: "https://qorikancha-cusco-luxury-tourism.vercel.app/",
  },
  {
    id: "import-lr",
    name: "Import L&R",
    summary: "Sistema de punto de venta e inventario, con acceso por PIN para cajeros y administradores.",
    service: "systems",
    image: "/images/portfolio-import-lr-pos.webp",
    imageAlt: "Pantalla de ingreso por PIN del sistema de caja de Import L&R",
  },
  {
    id: "sv-tuning",
    name: "SV Tuning & Performance",
    city: "Arequipa",
    summary: "Sitio para un taller de protección de pintura y tuning, con configurador 3D y dos sedes.",
    service: "web",
    image: "/images/portfolio-sv-tuning.webp",
    imageAlt: "Portada del sitio de SV Tuning & Performance con fondo oscuro y titular en mayúsculas",
    url: "https://sv-tuning-performance.vercel.app/",
  },
  {
    id: "aol-domo",
    name: "AOL-DOMO",
    summary: "Sitio corporativo de un holding que reúne bioconstrucción, arte textil e ingeniería.",
    service: "web",
    image: "/images/portfolio-aol-domo.webp",
    imageAlt: "Portada del sitio corporativo de AOL-DOMO con la marca Atakau sobre fondo amarillo",
    url: "https://www.aol-domo.com/",
  },
  {
    id: "graduation-control",
    name: "Control de ceremonias",
    summary: "Sistema de invitados y control de acceso para ceremonias de graduación universitaria.",
    service: "systems",
    image: "/images/portfolio-graduation-control.webp",
    imageAlt: "Pantalla de inicio del sistema de control de ceremonias con accesos para egresados y personal",
  },
];

export interface Service {
  id: ServiceId;
  name: string;
  sentence: string;
  includes: string[];
  typicalTime: string;
  /** Texto de la prueba cuando no es un proyecto del portafolio. */
  proofNote?: string;
}

export const SERVICES: Service[] = [
  {
    id: "web",
    name: "Páginas web",
    sentence: "Sitios rápidos que explican lo que vendes y llevan al cliente a escribirte.",
    includes: [
      "Diseño propio, sin plantillas",
      "Textos e imágenes preparados para buscadores",
      "Botón directo a WhatsApp y formularios",
      "Se ve bien en celular, tableta y computadora",
    ],
    typicalTime: "1 a 2 semanas",
  },
  {
    id: "systems",
    name: "Sistemas a medida",
    sentence: "Programas para vender, cobrar y controlar tu inventario, hechos para cómo trabaja tu negocio.",
    includes: [
      "Caja, ventas e inventario",
      "Usuarios con distintos permisos",
      "Reportes que entiendes de un vistazo",
      "Acceso desde cualquier dispositivo",
    ],
    typicalTime: "2 a 4 semanas, según el alcance",
  },
  {
    id: "ai",
    name: "Automatización con IA",
    sentence: "Asistentes que responden, cotizan y agendan por ti, conectados a tus datos.",
    includes: [
      "Respuestas automáticas a preguntas frecuentes",
      "Cotizaciones y citas sin intervención manual",
      "Conexión con WhatsApp y tus sistemas",
      "Siempre puedes revisar lo que respondió",
    ],
    typicalTime: "Unas 2 semanas",
    proofNote: "El asistente de cotización de esta misma web.",
  },
];

export const PROCESS_STEPS = [
  {
    title: "Conversamos",
    text: "Una llamada para entender tu negocio, qué te quita tiempo y qué quieres lograr.",
  },
  {
    title: "Propuesta en 24 horas",
    text: "Alcance, plazo y precio por escrito. Sin letra pequeña.",
  },
  {
    title: "Entregas cada una o dos semanas",
    text: "Ves y usas el avance desde la primera entrega, y lo ajustamos contigo.",
  },
  {
    title: "El código es tuyo",
    text: "Sin licencias mensuales ni dependencia de nosotros para seguir creciendo.",
  },
];

export function projectsFor(service: ServiceId): Project[] {
  return PROJECTS.filter((p) => p.service === service);
}
