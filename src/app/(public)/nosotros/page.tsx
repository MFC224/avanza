import type { Metadata } from "next";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { SiteButton } from "@/components/site/site-button";
import { ShieldCheck, Clock, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Nosotros | AVANZA AI & Software Studio",
  description:
    "Conoce a los fundadores y la visión de AVANZA. Liderazgo técnico por Manuel Callañaupa y estrategia comercial por Magno Alomía.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title: "Nosotros | AVANZA AI & Software Studio",
    description:
      "Equipo fundador, misión y valores de ingeniería de AVANZA en Perú.",
  },
};

const VALUES = [
  {
    title: "Transparencia Absoluta",
    description:
      "Cero promesas falsas. Acceso semanal a repositorios y servidores de prueba para que audites el avance en tiempo real.",
    icon: ShieldCheck,
  },
  {
    title: "Obsesión por la Velocidad",
    description:
      "Desarrollamos en sprints de 7 a 14 días. Si una solución no genera tracción rápida, no sirve para el mercado actual.",
    icon: Clock,
  },
  {
    title: "Calidad Técnica Rigurosa",
    description:
      "Código limpio, tipado estricto en TypeScript, bases de datos relacionales seguras y arquitecturas cloud para que tu plataforma nunca colapse.",
    icon: Zap,
  },
];

const FOUNDERS = [
  {
    name: "Manuel Callañaupa",
    role: "Co-Fundador & Director de Tecnología",
    bio: "Arquitecto de software full-stack especializado en Next.js, bases de datos PostgreSQL de alto rendimiento, sistemas de seguridad RLS e integración de pipelines de IA generativa.",
    phone: "+51 921 195 037",
    email: "manuel@avanzape.com",
    initials: "MC",
  },
  {
    name: "Magno Alomía",
    role: "Co-Fundador & Director Comercial",
    bio: "Estratega comercial con amplia trayectoria en transformación digital empresarial, optimización de embudos de ventas, procesos B2B y gestión ágil de proyectos.",
    phone: "+51 942 498 841",
    email: "magno@avanzape.com",
    initials: "MA",
  },
];

export default function NosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Purpose, Mission & Vision (Paper) */}
      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Nuestra Historia & Propósito"
            title="Transformando la visión de los empresarios peruanos"
            description="Somos AVANZA, una agencia de tecnología e Inteligencia Artificial fundada para democratizar el acceso a software de grado industrial y acelerar el crecimiento empresarial en la región."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Reveal delay={0.05}>
            <div className="border border-[var(--line-on-paper)] p-8 lg:p-10 bg-white h-full">
              <span className="text-small text-[var(--muted-on-paper)] font-normal block mb-3">
                01 · Propósito
              </span>
              <h3 className="text-card font-normal text-[var(--ink)] mb-4">
                Nuestra Misión
              </h3>
              <p className="text-body text-[var(--muted-on-paper)] font-normal leading-relaxed">
                Proveer soluciones tecnológicas integrales para potenciar la competitividad de los emprendimientos y empresas consolidadas, facilitando su transformación digital, optimización de costos y crecimiento comercial acelerado.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-[var(--line-on-paper)] p-8 lg:p-10 bg-white h-full">
              <span className="text-small text-[var(--muted-on-paper)] font-normal block mb-3">
                02 · Futuro
              </span>
              <h3 className="text-card font-normal text-[var(--ink)] mb-4">
                Nuestra Visión
              </h3>
              <p className="text-body text-[var(--muted-on-paper)] font-normal leading-relaxed">
                Ser el referente tecnológico de mayor prestigio en el desarrollo de plataformas inteligentes en Perú y Latinoamérica, reconocidos por la velocidad de nuestras entregas, la transparencia de nuestros procesos y el impacto tangible de nuestros desarrollos.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 2. Co-Founders & Core Values (Ink) */}
      <Section tone="ink">
        <Reveal>
          <SectionHeading
            tone="ink"
            eyebrow="Pilares Estratégicos"
            title="Liderazgo tecnológico y comercial"
            description="La combinación exacta entre arquitectura de ingeniería avanzada y visión comercial estratégica."
          />
        </Reveal>

        {/* Co-Founders Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-12 mb-20">
          {FOUNDERS.map((founder, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="border border-[var(--line-on-ink)] p-8 lg:p-10 bg-black h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-neutral-900 border border-[var(--line-on-ink)] flex items-center justify-center text-small text-[var(--paper)] font-mono mb-6">
                    {founder.initials}
                  </div>
                  <h3 className="text-card font-normal text-[var(--paper)] mb-1">
                    {founder.name}
                  </h3>
                  <p className="text-small text-[var(--muted-on-ink)] mb-4 font-normal">
                    {founder.role}
                  </p>
                  <p className="text-body text-[var(--muted-on-ink)] font-normal leading-relaxed mb-6">
                    {founder.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--line-on-ink)] text-small text-[var(--muted-on-ink)] flex flex-col gap-1 font-normal">
                  <span>{founder.phone}</span>
                  <span>{founder.email}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 3 Core Engineering Values */}
        <div className="border-t border-[var(--line-on-ink)] pt-16">
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="flex flex-col gap-3">
                    <Icon className="w-5 h-5 text-[var(--paper)]" />
                    <h4 className="text-card font-normal text-[var(--paper)]">
                      {val.title}
                    </h4>
                    <p className="text-body text-[var(--muted-on-ink)] font-normal leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 3. Final CTA (Paper) */}
      <Section tone="paper">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <SectionHeading
              align="center"
              eyebrow="Contacto Directo"
              title="¿Listo para acelerar tu empresa con tecnología?"
              description="Conversa directamente con los fundadores para evaluar la viabilidad técnica y comercial de tu proyecto sin intermediarios."
            />
            <div className="mt-8">
              <SiteButton href="/contacto" variant="primary" tone="paper">
                Contactar al equipo fundador
              </SiteButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
