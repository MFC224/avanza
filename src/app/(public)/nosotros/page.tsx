import type { Metadata } from "next";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import { Reveal } from "@/components/site/reveal";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "AVANZA Software Studio: quiénes somos, cómo pensamos y cómo contactar directamente a sus fundadores, Manuel Callañaupa y Magno Alomía.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title: "Nosotros | AVANZA Software Studio",
    description: "Los fundadores de AVANZA y la forma en que trabajamos.",
  },
};

const VALUES = [
  {
    title: "Ves el avance siempre",
    description: "Cada una o dos semanas te mostramos algo que funciona y que puedes usar. Nada de esperar meses.",
  },
  {
    title: "Hablas con quien lo construye",
    description: "Sin intermediarios. Tu proyecto lo llevan los mismos fundadores de principio a fin.",
  },
  {
    title: "Lo hacemos para que dure",
    description: "Software ordenado, probado y documentado, para que tu sistema crezca contigo sin volver a empezar.",
  },
];

const FOUNDERS = [
  {
    name: "Manuel Callañaupa",
    role: "Cofundador, diseño y desarrollo",
    bio: "Diseña y construye los sitios y sistemas de AVANZA, y se encarga de que funcionen rápido y de forma segura.",
    phone: "+51 921 195 037",
    email: "manuel@avanzape.com",
  },
  {
    name: "Magno Alomía",
    role: "Cofundador, proyectos y clientes",
    bio: "Acompaña a cada cliente desde la primera conversación: entiende el negocio, ordena el alcance y cuida los plazos.",
    phone: "+51 942 498 841",
    email: "magno@avanzape.com",
  },
];

export default function NosotrosPage() {
  return (
    <div className="flex flex-col">
      <Section tone="paper" className="pt-[96px] lg:pt-[140px]">
        <SectionHeading
          as="h1"
          title="Nosotros"
          description="AVANZA es un estudio de software peruano. Hacemos páginas web, sistemas a medida y automatizaciones con inteligencia artificial para que las empresas trabajen con menos esfuerzo y vendan más."
        />

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-12">
          {VALUES.map((value, index) => (
            <li key={value.title}>
              <Reveal staggerIndex={index}>
                <h2 className="type-card">{value.title}</h2>
                <p className="type-body text-[var(--muted-on-paper)] mt-3">{value.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="ink">
        <h2 className="type-section max-w-3xl">Los fundadores</h2>
        <ul className="mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {FOUNDERS.map((founder, index) => (
            <li key={founder.name}>
              <Reveal staggerIndex={index}>
              <h3 className="type-card">{founder.name}</h3>
              <p className="type-small text-[var(--muted-on-ink)] mt-1">{founder.role}</p>
              <p className="type-body text-[var(--muted-on-ink)] mt-5 max-w-[46ch]">{founder.bio}</p>
              <p className="type-small mt-6 flex flex-col gap-2">
                <a
                  href={`https://wa.me/${founder.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)]"
                >
                  WhatsApp {founder.phone}
                </a>
                <a
                  href={`mailto:${founder.email}`}
                  className="w-fit underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)]"
                >
                  {founder.email}
                </a>
              </p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="paper">
        <div className="max-w-3xl">
          <h2 className="type-section">Conversemos sobre tu proyecto</h2>
          <p className="type-body text-[var(--muted-on-paper)] mt-6 max-w-[52ch]">
            Escríbenos y te responde uno de los fundadores. En menos de 24 horas tendrás una propuesta.
          </p>
          <div className="mt-12">
            <SiteButton href="/contacto" variant="primary" tone="paper">
              Cotizar proyecto
            </SiteButton>
          </div>
        </div>
      </Section>
    </div>
  );
}
