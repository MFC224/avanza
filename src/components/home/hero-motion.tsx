import React from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroMotion() {
  return (
    <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--ink)] text-[var(--paper)] px-5 lg:px-12">
      {/* Background Hero Picture with Next.js Optimization */}
      <div className="absolute inset-0 w-full h-full -z-0">
        {/* Desktop Image */}
        <div className="hidden sm:block absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-studio-desk-night.webp"
            alt="Mesa de estudio de noche con portátil abierto e iluminación cálida"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>
        {/* Mobile Image (9:16 vertical composition) */}
        <div className="sm:hidden absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-studio-desk-night-mobile.webp"
            alt="Mesa de estudio de noche con portátil abierto e iluminación cálida"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>
        {/* Layer: 45% black overlay for certified >= 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>

      {/* Hero Content (SSR Native - 100% visible without JavaScript) */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center text-center pt-24 pb-16">
        <h1 className="text-display font-light text-[var(--paper)] max-w-4xl tracking-tight leading-[1.05]">
          Software a medida <br className="hidden sm:inline" />
          que hace crecer tu empresa
        </h1>

        <p className="text-body text-[#d1d5db] max-w-[60ch] mt-6 mb-10 font-normal">
          Desarrollamos plataformas web de alta conversión y sistemas con IA para empresas líderes.
        </p>

        <div>
          <Link
            href="/contacto"
            className="text-button inline-flex items-center justify-center px-8 py-4 bg-[var(--paper)] text-[var(--ink)] hover:bg-neutral-200 rounded-none font-medium transition-colors duration-200 select-none shadow-xs"
          >
            Cotizar proyecto
          </Link>
        </div>
      </div>
    </section>
  );
}
