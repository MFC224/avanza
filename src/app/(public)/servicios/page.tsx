import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { SiteButton } from "@/components/site/site-button";
import { Clock, Zap, Layers, ShieldCheck, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios de Software e Inteligencia Artificial | AVANZA",
  description:
    "Desarrollo de páginas web de alto impacto, sistemas web, CRM, automatización con IA, apps móviles y arquitectura cloud con entrega en 7 a 14 días.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: "Servicios de Software e IA | AVANZA",
    description:
      "Catálogo completo de soluciones tecnológicas con ingeniería ágil y arquitectura escalable.",
  },
};

const SERVICIOS = [
  {
    title: "Páginas Web de Alto Impacto",
    subtitle: "Presencia digital que transmite autoridad y multiplica conversiones.",
    description:
      "Desarrollamos sitios web modernos, ultrarrápidos y con diseño editorial sereno que cautivan a tus clientes potenciales desde el primer segundo. Optimizadas al 100% para SEO y pantallas móviles.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    stack: ["Next.js 16", "Tailwind CSS", "Motion", "SEO Avanzado"],
    delivery: "7 a 12 días",
    features: [
      "Velocidad de carga instantánea (< 1 segundo)",
      "Animaciones fluidas y diseño editorial a medida",
      "Formularios de contacto directos a WhatsApp y base de datos",
      "Indexación inmediata en Google con arquitectura SSR",
    ],
  },
  {
    title: "Sistemas Web & CRM a Medida",
    subtitle: "Automatiza la operación y gestión interna de tu empresa.",
    description:
      "Centraliza tus ventas, clientes, inventarios y finanzas en una plataforma web segura y accesible desde cualquier dispositivo, con aislamiento estricto de privacidad.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stack: ["React 19", "Supabase", "PostgreSQL Enterprise", "Aislamiento de Datos"],
    delivery: "12 a 20 días",
    features: [
      "Paneles administrativos con métricas en tiempo real",
      "Control granular de permisos y roles por usuario",
      "Historial inmutable de cambios y auditoría de datos",
      "Exportación de reportes a PDF y Excel con un clic",
    ],
  },
  {
    title: "Aplicaciones Móviles (iOS & Android)",
    subtitle: "Tu negocio en el bolsillo de miles de clientes.",
    description:
      "Diseñamos y programamos aplicaciones móviles nativas y multiplataforma con interfaces intuitivas y tiempos de respuesta instantáneos. Conexión directa con tu backend.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    stack: ["React Native", "Flutter", "Push Notifications", "Cloud Auth"],
    delivery: "15 a 30 días",
    features: [
      "Despliegue directo en App Store y Google Play Store",
      "Notificaciones push segmentadas para fidelización",
      "Soporte para modo offline y sincronización en segundo plano",
      "Pasarelas de pago integradas y seguras",
    ],
  },
  {
    title: "Soluciones de Inteligencia Artificial",
    subtitle: "Automatiza tareas repetitivas y multiplica la productividad.",
    description:
      "Integramos modelos de lenguaje de última generación (LLMs), agentes autónomos y análisis predictivo en tus procesos comerciales y operativos diarios.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stack: ["OpenAI / LLMs", "Python Pipelines", "LangChain", "Vector DBs"],
    delivery: "10 a 18 días",
    features: [
      "Asistentes virtuales 24/7 con atención personalizada",
      "Extracción automática de datos desde facturas y documentos",
      "Predicción de demanda y análisis de comportamiento de compra",
      "Integración nativa vía API con tu software existente",
    ],
  },
  {
    title: "Automatización de Procesos (RPA & APIs)",
    subtitle: "Conecta tus herramientas y ahorra cientos de horas de trabajo.",
    description:
      "Creamos tuberías de datos que comunican tu web, pasarelas de pago, correo electrónico, WhatsApp y software contable sin intervención manual.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    stack: ["Edge Functions", "Webhooks", "REST APIs", "Event Queue"],
    delivery: "5 a 10 días",
    features: [
      "Sincronización bidireccional en tiempo real",
      "Alertas instantáneas a Telegram / WhatsApp ante ventas o eventos",
      "Cero tareas manuales repetitivas en tu equipo operativo",
      "Registros de auditoría con reintentos automáticos ante caídas",
    ],
  },
  {
    title: "Modernización de Sistemas & Migración",
    subtitle: "Reemplaza hojas de cálculo caóticas por software profesional.",
    description:
      "Migramos tus datos y procesos manuales a la nube sin perder un solo registro, eliminando errores humanos y duplicidad de trabajo con total soberanía tecnológica.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
    stack: ["ETL Pipelines", "PostgreSQL", "Cloud Backup", "Estructura Segura"],
    delivery: "10 a 20 días",
    features: [
      "Limpieza y migración segura de datos heredados",
      "Interfaces modernas fáciles de usar para todo tu personal",
      "Control de accesos y auditoría de cambios por usuario",
      "Capacitación del equipo y soporte continuo",
    ],
  },
];

export default function ServiciosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Header & Catalog Grid (Paper) */}
      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Catálogo de Ingeniería"
            title="Servicios de desarrollo de software e Inteligencia Artificial"
            description="Soluciones de software de grado industrial construidas para acelerar la productividad, optimizar costos y escalar la facturación de tu negocio."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {SERVICIOS.map((servicio, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="flex flex-col justify-between h-full border border-[var(--line-on-paper)] bg-white p-0 overflow-hidden">
                <div>
                  <div className="relative aspect-[16/9] w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src={servicio.image}
                      alt={servicio.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 px-2.5 py-1 text-small text-[var(--ink)] flex items-center gap-1.5 border border-neutral-200">
                      <Clock className="w-3 h-3 text-[var(--ink)]" />
                      <span>{servicio.delivery}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-card font-normal text-[var(--ink)] mb-1">
                      {servicio.title}
                    </h3>
                    <p className="text-small text-[var(--brand)] mb-3 font-normal">
                      {servicio.subtitle}
                    </p>
                    <p className="text-body text-[var(--muted-on-paper)] mb-5 font-normal leading-relaxed">
                      {servicio.description}
                    </p>

                    <ul className="space-y-2 mb-5 pt-4 border-t border-[var(--line-on-paper)]">
                      {servicio.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-small text-[var(--ink)]">
                          <Check className="w-3.5 h-3.5 text-[var(--ink)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--line-on-paper)]">
                      {servicio.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-small text-[var(--muted-on-paper)] border border-[var(--line-on-paper)] px-2 py-0.5 font-normal"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <SiteButton
                    href="/contacto"
                    variant="ghost"
                    tone="paper"
                    className="w-full"
                  >
                    Cotizar este servicio
                  </SiteButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 2. Technical Guarantees (Ink) */}
      <Section tone="ink">
        <Reveal>
          <div className="grid sm:grid-cols-3 gap-8 py-4">
            <div className="flex flex-col gap-3">
              <Zap className="w-5 h-5 text-[var(--paper)]" />
              <h3 className="text-card font-normal text-[var(--paper)]">
                Entrega por Sprints
              </h3>
              <p className="text-body text-[var(--muted-on-ink)] font-normal">
                Ciclos de 7 a 14 días. Sin meses de espera; avances funcionales en producción cada semana.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Layers className="w-5 h-5 text-[var(--paper)]" />
              <h3 className="text-card font-normal text-[var(--paper)]">
                Código Propio & Soberanía
              </h3>
              <p className="text-body text-[var(--muted-on-ink)] font-normal">
                Propiedad intelectual 100% tuya. Sin suscripciones cautivas ni ataduras a plataformas propietarias.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <ShieldCheck className="w-5 h-5 text-[var(--paper)]" />
              <h3 className="text-card font-normal text-[var(--paper)]">
                Garantía de Ingeniería & QA
              </h3>
              <p className="text-body text-[var(--muted-on-ink)] font-normal">
                Pruebas unitarias y de aceptación rigurosas antes de cada pase a producción.
              </p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* 3. Call to Action (Paper) */}
      <Section tone="paper">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <SectionHeading
              align="center"
              eyebrow="Consultoría de Arquitectura"
              title="¿No estás seguro de qué arquitectura elegir?"
              description="Agenda una sesión técnica con nuestros ingenieros. Evaluamos tus procesos actuales y te entregamos una propuesta clara en menos de 24 horas."
            />
            <div className="mt-8">
              <SiteButton href="/contacto" variant="primary" tone="paper">
                Agendar consultoría técnica
              </SiteButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
