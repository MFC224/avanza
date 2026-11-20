import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { SERVICES, projectsFor } from "@/lib/projects";

/**
 * Qué hacemos (PLAN_DISENO_UNICO.md 4.1): tres servicios en frases simples,
 * cada uno con el proyecto real que lo demuestra. Sin tarjetas ni iconos.
 */
export function ServicesList() {
  return (
    <section
      id="servicios"
      data-tone="paper"
      aria-labelledby="servicios-titulo"
      className="w-full bg-[var(--paper)] text-[var(--ink)] py-[120px] lg:py-[200px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <Reveal>
          <h2 id="servicios-titulo" className="type-section max-w-3xl">
            Qué hacemos
          </h2>
        </Reveal>

        <dl className="mt-16 lg:mt-24 flex flex-col gap-16 lg:gap-20">
          {SERVICES.map((service) => {
            const examples = projectsFor(service.id).map((p) => p.name);
            const proof = examples.length > 0 ? examples.join(", ") : service.proofNote;
            return (
              <div
                key={service.id}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-16 gap-y-4"
              >
                <dt className="type-section text-[var(--ink)]">{service.name}</dt>
                <dd>
                  <p className="type-body text-[var(--ink)] max-w-[52ch]">{service.sentence}</p>
                  {proof && (
                    <p className="type-small text-[var(--muted-on-paper)] mt-3">
                      Por ejemplo: {proof}
                    </p>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>

        <p className="type-body mt-20 lg:mt-24">
          <Link
            href="/servicios"
            className="underline underline-offset-[6px] decoration-[var(--muted-on-paper)] hover:decoration-[var(--ink)] transition-colors"
          >
            Qué incluye cada servicio y cuánto demora
          </Link>
        </p>
      </div>
    </section>
  );
}
