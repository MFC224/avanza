/**
 * Configuración Centralizada de Sitio, Marca, Dominio y Contacto: AVANZA
 * Preparado para dominio canónico comercial .com y cumplimiento normativo en Perú.
 */

export const SITE_CONFIG = {
  name: "AVANZA",
  legalName: "AVANZA Software & AI Studio",
  shortName: "AVANZA",
  tagline: "AI & Software Studio de Alto Rendimiento",
  description:
    "Desarrollo de software ágil, plataformas web de alta conversión y automatización con agentes de Inteligencia Artificial para empresas en Perú y Latinoamérica.",
  domain: "avanzastudio.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://avanzastudio.com",
  ogImage: "https://avanzastudio.com/opengraph-image",
  themeColor: "#ffffff",
  locale: "es_PE",

  founders: {
    manuel: {
      name: "Manuel Callañaupa",
      role: "Co-Fundador & Lead Software Architect",
      phone: "+51921195037",
      displayPhone: "+51 921 195 037",
      email: "manuel@avanzastudio.com",
    },
    magno: {
      name: "Magno Alomia",
      role: "Co-Fundador & Business Growth Director",
      phone: "+51942498841",
      displayPhone: "+51 942 498 841",
      email: "magno@avanzastudio.com",
    },
  },

  contact: {
    commercialPhone: "+51 942 498 841",
    commercialPhoneRaw: "+51942498841",
    technicalPhone: "+51 921 195 037",
    technicalPhoneRaw: "+51921195037",
    email: "contacto@avanzastudio.com",
    city: "Lima, Perú",
    schedule: "Lunes a Sábado: 8:00 AM - 8:00 PM (GMT-5)",
    whatsappBaseUrl: "https://wa.me/51942498841",
  },

  social: {
    github: "https://github.com/avanzastudio",
    linkedin: "https://linkedin.com/company/avanzastudio",
  },

  legal: {
    privacyLaw: "Ley N° 29733 (Ley de Protección de Datos Personales del Perú)",
    consumerCode: "Ley N° 29571 (Código de Protección y Defensa del Consumidor - Indecopi)",
    ipPolicy: "Cesión total (100%) de Derechos Patrimoniales y Código Fuente al Cliente tras entrega de Sprint.",
    ndaPolicy: "Acuerdo de Confidencialidad y No Divulgación (NDA) firmado previo al inicio de arquitectura.",
    complaintsBookName: "Libro de Reclamaciones Virtual conforme a las disposiciones de INDECOPI.",
  },

  mainNav: [
    { title: "Inicio", href: "/" },
    { title: "Servicios", href: "/servicios" },
    { title: "Metodología", href: "/metodologia" },
    { title: "Nosotros", href: "/nosotros" },
    { title: "Contacto", href: "/contacto" },
  ],

  legalNav: [
    { title: "Privacidad", href: "/privacidad" },
    { title: "Términos de Servicio", href: "/terminos" },
    { title: "Libro de Reclamaciones", href: "/reclamaciones" },
  ],
} as const;

export type SiteConfig = typeof SITE_CONFIG;
