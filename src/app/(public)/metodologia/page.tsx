import type { Metadata } from "next";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import { PROCESS_STEPS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Cómo trabajamos",
  description:
    "Cómo trabaja AVANZA: una conversación, una propuesta en 24 horas, entregas cada una o dos semanas y el código es tuyo.",
  alternates: {
    canonical: "/metodologia",
  },
  openGraph: {
    title: "Cómo trabajamos | AVANZA Software Studio",
    description: "Cuatro pasos claros, avances que puedes usar cada una o dos semanas.",
  },
};

/** Detalle de cada paso (los títulos vienen de PROCESS_STEPS en src/lib/projects.ts). */
const DETAILS = [
  "Nos cuentas cómo funciona tu negocio y qué quieres mejorar. Si ya tienes algo hecho, lo revisamos. Al final de la llamada sabes si podemos ayudarte.",
  "Te enviamos por escrito qué vamos a construir, en qué orden, cuánto demora cada parte y cuánto cuesta. Lo ajustamos contigo antes de empezar.",
  "Trabajamos en ciclos cortos. Al terminar cada uno te damos un enlace para que pruebes lo nuevo, y con tus comentarios decidimos lo siguiente.",
  "Al cerrar el proyecto te entregamos el código, los accesos y la documentación. No pagas licencias mensuales y puedes seguir con nosotros o con quien elijas.",
];

export default function MetodologiaPage() {
  return (
    <div className="flex flex-col">
      <Section tone="paper" className="pt-[96px] lg:pt-[140px]">
        <SectionHeading
          as="h1"
          title="Cómo trabajamos"
          description="Cuatro pasos, sin sorpresas. Ves y usas tu proyecto desde la primera entrega."
        />

        <ol className="flex flex-col gap-16 lg:gap-20">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-4"
            >
              <div className="lg:col-span-5 flex items-baseline gap-6">
                <span className="type-section text-[var(--muted-on-paper)] tabular-nums" aria-hidden="true">
                  {index + 1}
                </span>
                <h2 className="type-section">{step.title}</h2>
              </div>
              <p className="lg:col-span-7 type-body text-[var(--muted-on-paper)] max-w-[56ch] lg:pt-3">
                {DETAILS[index]}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="ink">
        <div className="max-w-3xl">
          <h2 className="type-section">Empecemos por la conversación</h2>
          <p className="type-body text-[var(--muted-on-ink)] mt-6 max-w-[52ch]">
            Cuéntanos qué necesitas. Te respondemos con una propuesta en menos de 24 horas.
          </p>
          <div className="mt-12">
            <SiteButton href="/contacto" variant="primary" tone="ink">
              Cotizar proyecto
            </SiteButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
