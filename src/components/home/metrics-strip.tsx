import React from "react";
import { Reveal } from "@/components/site/reveal";

interface MetricItem {
  value: string;
  description: string;
}

const METRICS: MetricItem[] = [
  {
    value: "7 a 14 Días",
    description: "Sprints de ingeniería con despliegue ágil y continuo en producción.",
  },
  {
    value: "100%",
    description: "Propiedad total del código fuente y bases de datos sin licencias cautivas.",
  },
  {
    value: "24 h",
    description: "Propuesta arquitectónica y presupuesto claro en menos de 24 horas.",
  },
];

export function MetricsStrip() {
  return (
    <section
      data-tone="ink"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-24 lg:py-36 border-t border-[var(--line-on-ink)] overflow-hidden"
      aria-label="Cifras clave de rendimiento y garantía"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {METRICS.map((metric, idx) => (
            <Reveal key={metric.value} staggerIndex={idx} className="flex flex-col">
              <div className="text-display font-light text-[var(--paper)] tracking-tight leading-[1.05] mb-4">
                {metric.value}
              </div>
              <div className="w-12 h-px bg-[var(--line-on-ink)] mb-4" />
              <p className="text-body text-[var(--muted-on-ink)] font-normal max-w-[34ch]">
                {metric.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
