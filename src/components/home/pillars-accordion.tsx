"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface Pillar {
  index: string;
  title: string;
  subtitle: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    index: "01",
    title: "Velocidad SCRUM",
    subtitle: "Sprints de 7 a 14 días",
    description:
      "Entregas funcionales semanales en producción. Puedes interactuar con tu software desde el primer ciclo, sin esperar meses en la incertidumbre.",
  },
  {
    index: "02",
    title: "Arquitectura Cloud",
    subtitle: "Bases de datos de alto rendimiento",
    description:
      "Bases de datos de alta integridad con aislamiento estricto de privacidad y renderizado en el Edge para respuestas en milisegundos.",
  },
  {
    index: "03",
    title: "Agentes con IA",
    subtitle: "Automatización Autónoma",
    description:
      "Modelos de lenguaje conectados a tus bases de datos internas. Asistentes que gestionan consultas, clasifican leads y aceleran procesos 24/7.",
  },
  {
    index: "04",
    title: "Propiedad Total",
    subtitle: "Cero Vendor Lock-In",
    description:
      "Código fuente 100% de tu propiedad. Sin licencias mensuales cautivas, sin ataduras a plataformas propietarias y con total soberanía tecnológica.",
  },
];

export function PillarsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      data-tone="paper"
      className="w-full bg-[var(--paper)] text-[var(--ink)] py-24 lg:py-36 border-t border-[var(--line-on-paper)] overflow-hidden"
      aria-label="Cómo trabajamos y pilares de ingeniería"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20">
          <span className="text-small text-[var(--muted-on-paper)] block mb-3 font-normal">
            Cómo Trabajamos
          </span>
          <h2 className="text-section font-normal text-[var(--ink)] tracking-tight max-w-3xl">
            Los 4 pilares de nuestro estándar de ingeniería
          </h2>
        </div>

        {/* 4-Row Accordion */}
        <div className="divide-y divide-[var(--line-on-paper)] border-y border-[var(--line-on-paper)]">
          {PILLARS.map((p, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={p.index} className="py-6 lg:py-8">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`pillar-content-${idx}`}
                  id={`pillar-btn-${idx}`}
                  className="w-full flex items-center justify-between text-left cursor-pointer group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
                >
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="text-small text-[var(--muted-on-paper)] font-normal">
                      {p.index}
                    </span>
                    <h3 className="text-card font-normal text-[var(--ink)] tracking-tight group-hover:opacity-75 transition-opacity">
                      {p.title} <span className="hidden sm:inline text-small text-[var(--muted-on-paper)] font-normal ml-3">· {p.subtitle}</span>
                    </h3>
                  </div>

                  <div className="w-8 h-8 flex items-center justify-center text-[var(--ink)] shrink-0 ml-4">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`pillar-content-${idx}`}
                    role="region"
                    aria-labelledby={`pillar-btn-${idx}`}
                    className="pt-4 pb-2 pl-12 sm:pl-16 pr-4 max-w-[60ch]"
                  >
                    <p className="text-body text-[var(--muted-on-paper)] font-normal leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
