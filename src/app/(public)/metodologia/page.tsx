import type { Metadata } from "next";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { SiteButton } from "@/components/site/site-button";

export const metadata: Metadata = {
  title: "Metodología Ágil y Entregas Continuas | AVANZA",
  description:
    "Desarrollo de software transparente y acelerado por Sprints semanales. El cliente mantiene el control total de cada entrega tangible.",
  alternates: {
    canonical: "/metodologia",
  },
  openGraph: {
    title: "Metodología Ágil y Entregas Continuas | AVANZA",
    description:
      "Ciclo iterativo continuo de 4 fases para entregar software funcional cada 7 a 14 días.",
  },
};

const STEPS = [
  {
    num: "01",
    title: "Tu Visión, Tus Reglas (Planificación)",
    subtitle: "Priorización ágil centrada en tu negocio",
    description:
      "Tú tienes el control absoluto. Nos cuentas qué necesita tu negocio, priorizamos las funciones con mayor impacto comercial y diseñamos la arquitectura técnica. Tú lo pides, nosotros lo estructuramos.",
  },
  {
    num: "02",
    title: "El Sprint (Desarrollo Acelerado)",
    subtitle: "Iteraciones cortas y código limpio",
    description:
      "Un ciclo de trabajo de 1 a 2 semanas donde nuestro equipo programa una pieza clave de tu sistema con herramientas de IA de vanguardia. Cero esperas de meses, resultados tangibles cada semana.",
  },
  {
    num: "03",
    title: "Pruebas y Revisión (QA)",
    subtitle: "Software real que puedes tocar y probar",
    description:
      "No te damos presentaciones en diapositivas vacías; te entregamos enlaces funcionales en servidores de prueba para que los navegues. Evaluamos cada detalle con total transparencia.",
  },
  {
    num: "04",
    title: "Evolución Continua",
    subtitle: "Cierre de ciclo y retroalimentación",
    description:
      "Con tu retroalimentación, afinamos los requerimientos y pasamos al siguiente sprint. Tu plataforma crece de manera modular, sin código muerto y adaptándose exactamente a las exigencias del mercado.",
  },
];

const COMPARISONS = [
  {
    criteria: "Tiempo para ver avances reales",
    traditional: "3 a 6 meses para un prototipo básico",
    avanza: "Primer prototipo funcional en 7 días",
  },
  {
    criteria: "Control del cliente en el proceso",
    traditional: "Mínimo; solo te contactan al final",
    avanza: "100% al mando; apruebas cada Sprint",
  },
  {
    criteria: "Tecnología y automatización",
    traditional: "Plantillas lentas (WordPress, código espagueti)",
    avanza: "Next.js 16, Supabase, IA y TypeScript estricto",
  },
  {
    criteria: "Flexibilidad ante cambios",
    traditional: "Cobros extras por cualquier ajuste",
    avanza: "Iterativo; se adapta al feedback de cada ciclo",
  },
];

export default function MetodologiaPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero & 4-Step Cycle (Paper) */}
      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Metodología de Trabajo"
            title="Velocidad, transparencia e Inteligencia Artificial"
            description="Nuestra metodología ágil de entregas continuas rompe los vicios del desarrollo tradicional. Construimos tu software iteración por iteración con resultados tangibles semanales."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {STEPS.map((step, idx) => (
            <Reveal key={idx} delay={idx * 0.08}>
              <div className="border border-[var(--line-on-paper)] p-8 bg-white h-full flex flex-col justify-between">
                <div>
                  <span className="text-small text-[var(--muted-on-paper)] font-normal block mb-4">
                    {step.num}
                  </span>
                  <h3 className="text-card font-normal text-[var(--ink)] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-small text-[var(--brand)] mb-4 font-normal">
                    {step.subtitle}
                  </p>
                  <p className="text-body text-[var(--muted-on-paper)] font-normal leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 2. Comparison Table (Ink) */}
      <Section tone="ink">
        <Reveal>
          <SectionHeading
            tone="ink"
            eyebrow="Comparativa"
            title="Diferencias clave en la ejecución del proyecto"
            description="Por qué nuestro modelo por sprints elimina el riesgo de desarrollo frente a la agencia tradicional."
          />
        </Reveal>

        <div className="divide-y divide-[var(--line-on-ink)] border-y border-[var(--line-on-ink)] mt-12">
          {COMPARISONS.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <div className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                <div className="md:col-span-4">
                  <span className="text-card font-normal text-[var(--paper)]">
                    {item.criteria}
                  </span>
                </div>

                <div className="md:col-span-4">
                  <span className="text-small text-[var(--muted-on-ink)] block md:hidden mb-1 font-normal">
                    AVANZA Software Studio
                  </span>
                  <p className="text-body text-[var(--paper)] font-normal leading-relaxed">
                    {item.avanza}
                  </p>
                </div>

                <div className="md:col-span-4">
                  <span className="text-small text-[var(--muted-on-ink)] block md:hidden mb-1 font-normal">
                    Agencias tradicionales
                  </span>
                  <p className="text-body text-[var(--muted-on-ink)] font-normal leading-relaxed">
                    {item.traditional}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3. Final CTA (Paper) */}
      <Section tone="paper">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <SectionHeading
              align="center"
              eyebrow="Planificación Ágil"
              title="¿Tienes un requerimiento técnico prioritario?"
              description="Diseñamos el plan de sprints y la arquitectura de tu solución en menos de 24 horas. Comienza a interactuar con tu software desde la primera semana."
            />
            <div className="mt-8">
              <SiteButton href="/contacto" variant="primary" tone="paper">
                Comenzar primer sprint
              </SiteButton>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  );
}
