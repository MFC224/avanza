import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { projectsFor } from "@/lib/projects";

/**
 * Sistemas que construimos (pedido del dueño, 2026-11-19): los sistemas no
 * van en el carrusel, pero se ofrecen aquí con lo que resuelven.
 */
const SYSTEM_DETAILS: Record<string, string[]> = {
  "import-lr": ["Caja con acceso por PIN", "Inventario y ventas al día", "Permisos de administrador y cajero"],
  "graduation-control": ["Registro de invitados por egresado", "Control de acceso en la puerta", "Seguimiento en tiempo real"],
};

export function SystemsOffer() {
  const systems = projectsFor("systems");

  return (
    <section
      id="sistemas"
      data-tone="paper"
      aria-labelledby="sistemas-titulo"
      className="w-full bg-[var(--paper)] text-[var(--ink)] py-[120px] lg:py-[180px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-14">
        <Reveal className="lg:col-span-5">
          <h2 id="sistemas-titulo" className="type-section">
            Sistemas que construimos
          </h2>
          <p className="type-body text-[var(--muted-on-paper)] mt-6 max-w-[44ch]">
            Además de páginas web, hacemos programas internos para vender, cobrar y controlar. Estos ya están funcionando.
          </p>
          <Link
            href="/contacto"
            className="type-button mt-10 inline-flex items-center justify-center px-8 py-4 bg-[var(--brand)] text-[var(--on-brand)] hover:opacity-90 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
          >
            Cotizar un sistema
          </Link>
        </Reveal>

        <ul className="lg:col-span-7 flex flex-col gap-14">
          {systems.map((system, index) => (
            <li key={system.id}>
              <Reveal staggerIndex={index}>
                <h3 className="type-card">{system.name}</h3>
                <p className="type-body text-[var(--muted-on-paper)] mt-3 max-w-[52ch]">{system.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
                  {(SYSTEM_DETAILS[system.id] ?? []).map((detail) => (
                    <li key={detail} className="type-small text-[var(--ink)]">
                      {detail}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
