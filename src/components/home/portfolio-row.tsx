"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// Reemplazo de academic-lessons (Scott Smith Tutoring) por proyectos reales según ENCARGO_IMAGENES.md
// Aprobado el 10/11/2026: 6 proyectos reales desarrollados por AVANZA Software Studio.

interface PortfolioItem {
  id: string;
  name: string;
  rubro: string;
  image?: string;
  alt: string;
  url?: string;
  isTypographic?: boolean;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "aol-domo",
    name: "AOL-DOMO",
    rubro: "Sitio corporativo · Holding empresarial",
    image: "/images/portfolio-aol-domo.webp",
    alt: "Captura de la portada de AOL-DOMO, Sitio corporativo · Holding empresarial",
    url: "https://www.aol-domo.com/",
  },
  {
    id: "molinos-cusco",
    name: "Molinos Cusco",
    rubro: "Plataforma B2B · Industria alimentaria",
    image: "/images/portfolio-molinos-cusco.webp",
    alt: "Captura de la portada de Molinos Cusco, Plataforma B2B · Industria alimentaria",
    url: "https://molinos-cusco-cusipata.vercel.app/",
  },
  {
    id: "qorikancha-expeditions",
    name: "Qorikancha Expeditions",
    rubro: "Sitio web · Turismo de lujo",
    image: "/images/portfolio-qorikancha.webp",
    alt: "Captura de la portada de Qorikancha Expeditions, Sitio web · Turismo de lujo",
    url: "https://qorikancha-cusco-luxury-tourism.vercel.app/",
  },
  {
    id: "sv-tuning",
    name: "SV Tuning & Performance",
    rubro: "Sitio web · Taller automotriz",
    image: "/images/portfolio-sv-tuning.webp",
    alt: "Captura de la portada de SV Tuning & Performance, Sitio web · Taller automotriz",
    url: "https://sv-tuning-performance.vercel.app/",
  },
  {
    id: "import-lr",
    name: "Import L&R",
    rubro: "Sistema POS e inventario",
    alt: "Captura de la portada de Import L&R, Sistema POS e inventario",
    isTypographic: true,
  },
  {
    id: "graduation-control",
    name: "Control de ceremonias",
    rubro: "Sistema de invitados y acceso",
    image: "/images/portfolio-graduation-control.webp",
    alt: "Captura de la portada de Control de ceremonias, Sistema de invitados y acceso",
  },
];

export function PortfolioRow() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -440 : 440;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <section
      data-tone="ink"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-20 lg:py-28 overflow-hidden select-none"
      aria-label="Portafolio de proyectos"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 mb-8 lg:mb-12 flex items-end justify-between">
        <div>
          <span className="text-small text-[var(--muted-on-ink)] block mb-2 font-normal">
            Portafolio Seleccionado
          </span>
          <h2 className="text-section font-normal text-[var(--paper)] tracking-tight">
            Sistemas y plataformas en producción
          </h2>
        </div>

        {/* Discreet Controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Desplazar portafolio a la izquierda"
            className="w-10 h-10 border border-[var(--line-on-ink)] flex items-center justify-center text-[var(--paper)] hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Desplazar portafolio a la derecha"
            className="w-10 h-10 border border-[var(--line-on-ink)] flex items-center justify-center text-[var(--paper)] hover:bg-white/10 transition-colors duration-200 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track with Inertial Scrolling and Keyboard Support */}
      <div
        ref={scrollRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory px-5 lg:px-12 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {PORTFOLIO_ITEMS.map((item) => {
          const cardContent = (
            <>
              {/* Card Container 16:10 with 12px border radius */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-[#0a0a0a] border border-[var(--line-on-ink)]">
                {item.isTypographic || !item.image ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0a]">
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted-on-ink)] mb-3 font-mono">
                      Sistema Interno
                    </span>
                    <p className="text-xl font-medium text-[var(--paper)] tracking-tight">
                      {item.name}
                    </p>
                    <p className="text-xs text-[var(--muted-on-ink)] mt-2 max-w-[28ch]">
                      {item.rubro}
                    </p>
                    <span className="inline-block mt-4 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                      En producción
                    </span>
                  </div>
                ) : (
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 28vw"
                    quality={85}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                )}
              </div>

              {/* Caption Under the Card */}
              <div className="mt-4">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-card font-normal text-[var(--paper)] tracking-tight">
                    {item.name}
                  </h3>
                  {item.url && (
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--muted-on-ink)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <p className="text-small text-[var(--muted-on-ink)] font-normal mt-1">
                  {item.rubro}
                </p>
              </div>
            </>
          );

          return (
            <article
              key={item.id}
              className="snap-start shrink-0 w-[78vw] sm:w-[50vw] md:w-[38vw] lg:w-[calc((100%-48px)/3.5)] flex flex-col group cursor-pointer"
            >
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  aria-label={`Ver sitio web de ${item.name} (se abre en una pestaña nueva)`}
                >
                  {cardContent}
                </a>
              ) : (
                <div className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
                  {cardContent}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
