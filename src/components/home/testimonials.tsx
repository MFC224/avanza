import React from "react";
import { Reveal } from "@/components/site/reveal";

/**
 * Testimonios reales sin permiso para publicar nombres (decisión del dueño, T1.3).
 * Sin estrellas, sin recuadros: la cita es el contenido.
 */
interface TestimonialItem {
  quote: string;
  attribution: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Estábamos atascados con una agencia tradicional que nos pedía 4 meses. AVANZA entendió el negocio desde el primer día y en el Sprint 1 ya teníamos la plataforma transaccional operando.",
    attribution: "Cofundador de una startup financiera",
  },
  {
    quote:
      "Llevábamos la gestión en 6 archivos de Excel con constantes desajustes de stock. El sistema web a medida que nos desarrollaron automatizó los despachos y eliminó los errores humanos por completo.",
    attribution: "Gerente de operaciones de una empresa de logística",
  },
  {
    quote:
      "El bot con Inteligencia Artificial contesta a nuestros clientes en segundos a cualquier hora y agenda las visitas automáticamente. Triplicamos la tasa de cierre sin contratar más personal.",
    attribution: "Director de marketing de una inmobiliaria",
  },
];

export function TestimonialsSection() {
  return (
    <section
      data-tone="paper"
      aria-labelledby="testimonios-titulo"
      className="w-full bg-[var(--paper)] text-[var(--ink)] py-[120px] lg:py-[200px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <Reveal>
          <h2 id="testimonios-titulo" className="type-section text-[var(--ink)] max-w-3xl">
            Lo que dicen nuestros clientes
          </h2>
        </Reveal>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-20">
          {TESTIMONIALS.map((item, index) => (
            <Reveal key={item.attribution} staggerIndex={index}>
            <figure className="flex flex-col">
              <blockquote className="type-body lg:text-xl lg:leading-[1.55] text-[var(--ink)]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="type-small text-[var(--muted-on-paper)] mt-8">
                {item.attribution}
              </figcaption>
            </figure>
            </Reveal>
          ))}
        </div>

        <p className="type-small text-[var(--muted-on-paper)] mt-16">
          Publicamos las citas sin nombres por acuerdo de confidencialidad con cada cliente.
        </p>
      </div>
    </section>
  );
}
