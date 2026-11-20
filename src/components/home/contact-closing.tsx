import Link from "next/link";
import { Reveal } from "@/components/site/reveal";
import { SITE_CONFIG } from "@/lib/site-config";

/**
 * Cierre (PLAN_DISENO_UNICO.md 4): personas con nombre y un teléfono,
 * en lugar de un eslogan sobre una foto. Reemplaza FoundersBlock y FinalCta.
 */
const PEOPLE = [
  {
    name: SITE_CONFIG.founders.magno.name,
    role: "Proyectos y atención a clientes",
    phone: SITE_CONFIG.founders.magno.displayPhone,
    raw: SITE_CONFIG.founders.magno.phone.replace("+", ""),
  },
  {
    name: SITE_CONFIG.founders.manuel.name,
    role: "Diseño y desarrollo",
    phone: SITE_CONFIG.founders.manuel.displayPhone,
    raw: SITE_CONFIG.founders.manuel.phone.replace("+", ""),
  },
];

export function ContactClosing() {
  return (
    <section
      id="contacto"
      data-tone="ink"
      aria-labelledby="cierre-titulo"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-[120px] lg:py-[200px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16">
        <Reveal className="lg:col-span-7">
          <h2 id="cierre-titulo" className="type-display max-w-[14ch]">
            Cuéntanos qué necesitas
          </h2>
          <p className="type-body text-[var(--muted-on-ink)] mt-8 max-w-[48ch]">
            En menos de 24 horas te enviamos una propuesta clara de alcance, plazo y precio.
          </p>
          <Link
            href="/contacto"
            className="type-button mt-12 inline-flex items-center justify-center px-8 py-4 bg-[var(--paper)] text-[var(--ink)] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
          >
            Cotizar proyecto
          </Link>
        </Reveal>

        <ul className="lg:col-span-5 flex flex-col gap-12 lg:pt-4">
          {PEOPLE.map((person, index) => (
            <li key={person.name}>
              <Reveal staggerIndex={index + 1}>
              <p className="type-card">{person.name}</p>
              <p className="type-small text-[var(--muted-on-ink)] mt-1">{person.role}</p>
              <a
                href={`https://wa.me/${person.raw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="type-body inline-block mt-3 underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)] transition-colors"
              >
                WhatsApp {person.phone}
              </a>
              </Reveal>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="type-body underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)] transition-colors"
            >
              {SITE_CONFIG.contact.email}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
