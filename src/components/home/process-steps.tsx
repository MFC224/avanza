import { Reveal } from "@/components/site/reveal";
import { PROCESS_STEPS } from "@/lib/projects";

/**
 * Cómo trabajamos (PLAN_DISENO_UNICO.md 4.2). La numeración se usa porque
 * es una secuencia real. Reemplaza la franja de cifras, los pilares y la
 * tabla comparativa.
 */
export function ProcessSteps() {
  return (
    <section
      data-tone="paper"
      aria-labelledby="proceso-titulo"
      className="w-full bg-[var(--paper)] text-[var(--ink)] pb-[120px] lg:pb-[200px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <Reveal>
          <h2 id="proceso-titulo" className="type-section max-w-3xl">
            Cómo trabajamos
          </h2>
        </Reveal>

        <ol className="mt-16 lg:mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-14">
          {PROCESS_STEPS.map((step, index) => (
            <li key={step.title}>
              <span className="type-section text-[var(--muted-on-paper)] tabular-nums" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="type-card mt-4">{step.title}</h3>
              <p className="type-body text-[var(--muted-on-paper)] mt-3">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
