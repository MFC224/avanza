import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/site/reveal";

export function FinalCta() {
  return (
    <section
      data-tone="ink"
      className="relative w-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--ink)] text-[var(--paper)] px-5 lg:px-12 py-24"
      aria-label="Llamada a la acción final"
    >
      {/* Background Image (21:9 ratio) with 45% dark overlay */}
      <div className="absolute inset-0 w-full h-full -z-0">
        <Image
          src="/images/cta-empty-studio-dawn.webp"
          alt="Espacio de estudio arquitectónico al amanecer con amplio espacio negativo"
          fill
          sizes="100vw"
          quality={85}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
      </div>

      {/* Content: Single Title + Single CTA Button */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center">
        <Reveal>
          <h2 className="text-display font-light text-[var(--paper)] tracking-tight leading-[1.05] mb-6">
            Construyamos el software que tu empresa merece
          </h2>

          <p className="text-body text-[#d1d5db] font-normal max-w-[50ch] mx-auto mb-10">
            Hablemos hoy de tus requerimientos técnicos. Te entregamos una propuesta arquitectónica y cronograma claro en menos de 24 horas.
          </p>

          <div>
            <Link
              href="/contacto"
              className="text-button inline-flex items-center justify-center px-10 py-4 bg-[var(--paper)] text-[var(--ink)] hover:bg-neutral-200 rounded-none font-medium transition-colors duration-200 select-none shadow-xs"
            >
              Cotizar proyecto
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
