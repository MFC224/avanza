import React from "react";
import type { Metadata } from "next";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { SiteButton } from "@/components/site/site-button";

export const metadata: Metadata = {
  title: "Laboratorio de Estilos | AVANZA",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevEstilosPage() {
  return (
    <main className="w-full">
      {/* Sección en tono Paper (Blanco) */}
      <Section tone="paper">
        <Reveal>
          <SectionHeading
            eyebrow="Cimientos de Diseño"
            title="Arquitectura visual con respiro editorial y rigor tipográfico"
            description="Esta sección demuestra el tono Paper con tipografía Geist, espaciados generosos y botones de acción principal en tono brand marino."
            tone="paper"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-4">
            <SiteButton variant="primary" tone="paper" href="/contacto">
              Cotizar Proyecto
            </SiteButton>
            <SiteButton variant="ghost" tone="paper" href="/servicios">
              Ver Servicios
            </SiteButton>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, idx) => (
            <Reveal key={item} staggerIndex={idx}>
              <div className="p-8 rounded-[12px] bg-neutral-100/70">
                <span className="text-small text-[var(--muted-on-paper)]">0{item}</span>
                <h3 className="text-card font-normal text-[var(--ink)] mt-2">
                  Módulo de Ingeniería {item}
                </h3>
                <p className="text-body text-[var(--muted-on-paper)] mt-3">
                  Tarjeta limpia con bordes sutiles de 12px y sin sombras saturadas.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Sección en tono Ink (Negro) */}
      <Section tone="ink">
        <Reveal>
          <SectionHeading
            eyebrow="Inmersión Nocturna"
            title="Contraste absoluto en negro profundo con legibilidad certificada"
            description="Esta sección demuestra el tono Ink (#000000) con texto de alto contraste, línea divisoria técnica y botones con acento en papel."
            tone="ink"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center gap-4">
            <SiteButton variant="primary" tone="ink" href="/contacto">
              Iniciar Proyecto
            </SiteButton>
            <SiteButton variant="ghost" tone="ink" href="/metodologia">
              Conoce el Método
            </SiteButton>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, idx) => (
            <Reveal key={item} staggerIndex={idx}>
              <div className="p-8 rounded-[12px] bg-neutral-900 border border-[var(--line-on-ink)]">
                <span className="text-small text-[var(--muted-on-ink)]">0{item}</span>
                <h3 className="text-card font-normal text-[var(--paper)] mt-2">
                  Bloque de Alto Rendimiento {item}
                </h3>
                <p className="text-body text-[var(--muted-on-ink)] mt-3">
                  Superficie oscura optimizada para lectura nocturna sin fatiga ocular.
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </main>
  );
}
