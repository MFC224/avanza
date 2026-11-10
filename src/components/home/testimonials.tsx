import React from "react";
import { Reveal } from "@/components/site/reveal";

interface TestimonialItem {
  quote: string;
  role: string;
  industry: string;
  companySize: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Estábamos atascados con una agencia tradicional que nos pedía 4 meses. AVANZA entendió el negocio desde el primer día y en el Sprint 1 ya teníamos la plataforma transaccional operando.",
    role: "CEO y cofundador",
    industry: "Fintech",
    companySize: "Startup",
  },
  {
    quote:
      "Llevábamos la gestión en 6 archivos de Excel con constantes desajustes de stock. El sistema web a medida que nos desarrollaron automatizó los despachos y eliminó los errores humanos por completo.",
    role: "Gerente de operaciones",
    industry: "Logística",
    companySize: "Empresa mediana",
  },
  {
    quote:
      "El bot con Inteligencia Artificial contesta a nuestros clientes en segundos a cualquier hora y agenda las visitas automáticamente. Triplicamos la tasa de cierre sin contratar más personal.",
    role: "Director de marketing",
    industry: "Inmobiliaria",
    companySize: "Empresa mediana",
  },
];

export function TestimonialsSection() {
  return (
    <section
      data-tone="paper"
      className="w-full bg-[var(--paper)] text-[var(--ink)] py-24 lg:py-36 border-t border-[var(--line-on-paper)] overflow-hidden"
      aria-label="Testimonios y casos de éxito"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        {/* Header */}
        <Reveal className="mb-14 lg:mb-20">
          <span className="text-small text-[var(--muted-on-paper)] block mb-3 font-normal">
            Testimonios
          </span>
          <h2 className="text-section font-normal text-[var(--ink)] tracking-tight max-w-3xl">
            La confianza de quienes ya escalaron su operación con nosotros
          </h2>
        </Reveal>

        {/* Three Columns on White */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {TESTIMONIALS.map((item, idx) => (
            <Reveal
              key={idx}
              staggerIndex={idx}
              className="flex flex-col justify-between"
            >
              <div>
                <p className="text-card font-normal text-[var(--ink)] leading-[1.35] mb-6">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div>
                <div className="w-12 h-px bg-[var(--line-on-paper)] mb-4" />
                <p className="text-small text-[var(--muted-on-paper)] font-normal">
                  {item.role} · {item.industry} ({item.companySize})
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-small text-[var(--muted-on-paper)] font-normal">
            Nombres reservados por estricto acuerdo de confidencialidad.
          </p>
        </div>
      </div>
    </section>
  );
}
