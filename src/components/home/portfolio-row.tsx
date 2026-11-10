"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PortfolioItem {
  id: string;
  name: string;
  rubro: string;
  image: string;
  alt: string;
}

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "academic-lessons",
    name: "Scott Smith Tutoring",
    rubro: "Educación & Plataformas de Aprendizaje",
    image: "/images/portfolio-academic-lessons.webp",
    alt: "Captura de la plataforma educativa Scott Smith Tutoring",
  },
  {
    id: "lio-agency",
    name: "LIO Agency",
    rubro: "E-Commerce de Lujo & Catálogo Digital",
    image: "/images/portfolio-lio-agency.webp",
    alt: "Captura de la tienda de comercio electrónico LIO Agency",
  },
  {
    id: "mindful-spaces",
    name: "Essence Wellness",
    rubro: "Portal de Reservas & Agendamiento Online",
    image: "/images/portfolio-mindful-spaces.webp",
    alt: "Captura del portal de reservas Essence Wellness",
  },
  {
    id: "kallpa-fleet",
    name: "Kallpa Logistics OS",
    rubro: "Sistemas Web & Telemetría de Flotas",
    image: "/images/portfolio-kallpa-fleet.webp",
    alt: "Captura del sistema de telemetría de flotas Kallpa Logistics OS",
  },
  {
    id: "cortex-agent",
    name: "Cortex Neural Concierge",
    rubro: "Agentes Autónomos con IA & CRM Operativo",
    image: "/images/portfolio-cortex-agent.webp",
    alt: "Captura del agente de atención al cliente Cortex Neural Concierge",
  },
  {
    id: "aethelgard-wealth",
    name: "Aethelgard Private Banking",
    rubro: "Fintech & Gestión Patrimonial",
    image: "/images/portfolio-aethelgard-wealth.webp",
    alt: "Captura de la terminal financiera Aethelgard Private Banking",
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
        {PORTFOLIO_ITEMS.map((item) => (
          <article
            key={item.id}
            className="snap-start shrink-0 w-[78vw] sm:w-[50vw] md:w-[38vw] lg:w-[calc((100%-48px)/3.5)] flex flex-col group cursor-pointer"
          >
            <Link href="/contacto" className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
              {/* Card Container 16:10 with 12px border radius */}
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[12px] bg-neutral-900 border border-[var(--line-on-ink)]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 38vw, 28vw"
                  quality={85}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Caption Under the Card */}
              <div className="mt-4">
                <h3 className="text-card font-normal text-[var(--paper)] tracking-tight">
                  {item.name}
                </h3>
                <p className="text-small text-[var(--muted-on-ink)] font-normal mt-1">
                  {item.rubro}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
