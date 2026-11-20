import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import { Reveal } from "@/components/site/reveal";
import { SERVICES, projectsFor } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Páginas web, sistemas a medida y automatización con inteligencia artificial para empresas del Perú. Qué incluye cada servicio y cuánto demora.",
  alternates: {
    canonical: "/servicios",
  },
  openGraph: {
    title: "Servicios | AVANZA Software Studio",
    description:
      "Páginas web, sistemas a medida y automatización con IA, explicados con proyectos reales.",
  },
};

/**
 * /servicios (PLAN_DISENO_UNICO.md, sección 5): los tres servicios en detalle,
 * cada uno con lo que incluye, el plazo típico y el proyecto que lo demuestra.
 * Sin tarjetas, sin fotos de banco de imágenes.
 */
export default function ServiciosPage() {
  return (
    <div className="flex flex-col">
      <Section tone="paper" className="pt-[96px] lg:pt-[140px] pb-0 lg:pb-0">
        <SectionHeading
          as="h1"
          title="Servicios"
          description="Hacemos tres cosas, y las hacemos a medida para cada negocio. Aquí está lo que incluye cada una y cuánto suele demorar."
        />
      </Section>

      {SERVICES.map((service) => {
        const examples = projectsFor(service.id);
        return (
          <Section key={service.id} tone="paper" id={service.id} className="py-[80px] lg:py-[120px]">
            <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-10">
              <div className="lg:col-span-5">
                <h2 className="type-section">{service.name}</h2>
                <p className="type-body text-[var(--muted-on-paper)] mt-5 max-w-[44ch]">
                  {service.sentence}
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <h3 className="type-small text-[var(--muted-on-paper)]">Qué incluye</h3>
                  <ul className="mt-4 flex flex-col gap-3">
                    {service.includes.map((item) => (
                      <li key={item} className="type-body">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col gap-10">
                  <div>
                    <h3 className="type-small text-[var(--muted-on-paper)]">Plazo típico</h3>
                    <p className="type-body mt-4">{service.typicalTime}</p>
                  </div>
                  <div>
                    <h3 className="type-small text-[var(--muted-on-paper)]">Proyectos</h3>
                    {examples.length > 0 ? (
                      <ul className="mt-4 flex flex-col gap-3">
                        {examples.map((project) => (
                          <li key={project.id} className="type-body">
                            {project.url ? (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline underline-offset-[6px] decoration-[var(--muted-on-paper)] hover:decoration-[var(--ink)] transition-colors"
                              >
                                {project.name}
                              </a>
                            ) : (
                              project.name
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="type-body mt-4">{service.proofNote}</p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          </Section>
        );
      })}

      <Section tone="ink">
        <div className="max-w-3xl">
          <h2 className="type-section">¿No sabes cuál necesitas?</h2>
          <p className="type-body text-[var(--muted-on-ink)] mt-6 max-w-[52ch]">
            Cuéntanos qué te quita tiempo en tu negocio. En menos de 24 horas te decimos qué conviene hacer, cuánto cuesta y cuánto demora.
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
            <SiteButton href="/contacto" variant="primary" tone="ink">
              Cotizar proyecto
            </SiteButton>
            <Link
              href="/#simulador"
              className="type-button text-[var(--paper)] underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)]"
            >
              Usar el simulador
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
