"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowcaseProject {
  id: string;
  name: string;
  tagline: string;
  category: string;
  metric: string;
  metricLabel: string;
  url: string;
  image: string;
}

const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "aol-domo",
    name: "AOL-DOMO",
    tagline: "Plataforma digital corporativa para holding empresarial de alcance regional.",
    category: "Holding Empresarial",
    metric: "Alta Gama",
    metricLabel: "Posicionamiento corporativo",
    url: "https://www.aol-domo.com/",
    image: "/images/portfolio-aol-domo.webp",
  },
  {
    id: "molinos-cusco",
    name: "Molinos Cusco",
    tagline: "Plataforma digital B2B y catálogo para pedidos en la industria alimentaria.",
    category: "Plataforma B2B & Distribución",
    metric: "+280%",
    metricLabel: "Eficiencia en pedidos mayoristas",
    url: "https://molinos-cusco-cusipata.vercel.app/",
    image: "/images/portfolio-molinos-cusco.webp",
  },
  {
    id: "qorikancha",
    name: "Qorikancha Expeditions",
    tagline: "Sitio web de reservas y experiencias exclusivas para viajeros internacionales.",
    category: "Turismo de Lujo",
    metric: "0.4s",
    metricLabel: "Velocidad de carga inmediata",
    url: "https://qorikancha-cusco-luxury-tourism.vercel.app/",
    image: "/images/portfolio-qorikancha.webp",
  },
  {
    id: "sv-tuning",
    name: "SV Tuning & Performance",
    tagline: "Catálogo digital y reservas comerciales para taller de alto rendimiento.",
    category: "Servicios Automotrices",
    metric: "+320%",
    metricLabel: "Incremento en prospectos cualificados",
    url: "https://sv-tuning-performance.vercel.app/",
    image: "/images/portfolio-sv-tuning.webp",
  },
];

export function HeroMotion() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const currentProject = SHOWCASE_PROJECTS[activeTab];

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col items-center justify-start overflow-hidden bg-[var(--ink)] text-[var(--paper)] px-4 sm:px-6 lg:px-12 pt-28 pb-20">
      {/* Background Editorial Studio Picture */}
      <div className="absolute inset-0 w-full h-full -z-0">
        <div className="hidden sm:block absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-studio-desk-night.webp"
            alt="Mesa de estudio de noche con iluminación cálida"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>
        <div className="sm:hidden absolute inset-0 w-full h-full">
          <Image
            src="/images/hero-studio-desk-night-mobile.webp"
            alt="Mesa de estudio de noche con iluminación cálida"
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-center"
          />
        </div>
        {/* Gradients for high contrast and seamless blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-[var(--ink)] pointer-events-none" />
      </div>

      {/* Main Marketing Header */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center mt-4 mb-12 sm:mb-16">
        {/* Marketing Badge with official WebP logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-8 select-none">
          <Image
            src="/images/logo-avanza-white.webp"
            alt="AVANZA"
            width={22}
            height={14}
            className="object-contain"
          />
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.2em] uppercase text-slate-300 font-medium">
            Software Studio · Plataformas Digitales & IA
          </span>
        </div>

        {/* High-Converting Marketing Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-[var(--paper)] max-w-4xl tracking-tight leading-[1.08] mb-6">
          Sistemas web y software a medida <br className="hidden sm:inline" />
          <span className="font-serif italic font-normal text-blue-300">
            diseñados para hacer crecer tu empresa.
          </span>
        </h1>

        {/* Marketing Subtitle without technical jargon */}
        <p className="text-base sm:text-xl text-slate-300 max-w-[62ch] mb-10 leading-relaxed font-normal">
          Creamos plataformas web de alta conversión y automatización inteligente para empresas líderes.
          Tecnología intuitiva, entregas ágiles cada 7 a 14 días y código 100% tuyo.
        </p>

        {/* Commercial CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/contacto"
            className="w-full sm:w-auto text-button inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-slate-950 hover:bg-slate-100 rounded-none font-semibold transition-all duration-200 select-none shadow-lg hover:shadow-xl cursor-pointer group"
          >
            <span>Cotizar mi proyecto</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href="#portafolio"
            className="w-full sm:w-auto text-button inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-none font-medium transition-colors duration-200 select-none cursor-pointer"
          >
            Ver proyectos en producción
          </a>
        </div>
      </div>

      {/* EL SUPER BANNER — Showcase Interactivo en Vivo */}
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        <div className="w-full rounded-2xl border border-white/15 bg-neutral-950/85 backdrop-blur-xl shadow-2xl overflow-hidden text-left">
          {/* Super Banner Top Bar */}
          <div className="bg-neutral-900/90 border-b border-white/10 px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-neutral-700" />
              <span className="w-3 h-3 rounded-full bg-neutral-700" />
              <span className="w-3 h-3 rounded-full bg-neutral-700" />
              <span className="hidden sm:inline-block text-xs font-mono text-slate-400 ml-2">
                avanzape.com · Casos de Éxito
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sistemas en Producción Activa</span>
            </div>
          </div>

          {/* Super Banner Tabs Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-b border-white/10 bg-neutral-900/50">
            {SHOWCASE_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "px-4 py-3 text-left transition-colors duration-200 cursor-pointer border-r last:border-r-0 border-white/10",
                  activeTab === idx
                    ? "bg-white/10 text-white border-b-2 border-b-blue-400"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
              >
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  0{idx + 1}
                </div>
                <div className="text-sm font-medium tracking-tight truncate">
                  {proj.name}
                </div>
              </button>
            ))}
          </div>

          {/* Super Banner Content Area */}
          <div className="p-6 sm:p-10 grid md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-neutral-950/90 to-neutral-900/80">
            {/* Left Column: Project Details & Business Metrics */}
            <div className="md:col-span-6 space-y-5">
              <div className="inline-block text-xs font-mono uppercase tracking-[0.2em] text-blue-400">
                {currentProject.category}
              </div>

              <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight">
                {currentProject.name}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentProject.tagline}
              </p>

              {/* Highlight Metric Card */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Resultado Clave
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    {currentProject.metricLabel}
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono">
                  {currentProject.metric}
                </div>
              </div>

              {/* Direct Link to Verified Live Site */}
              <div className="pt-2">
                <a
                  href={currentProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white hover:text-blue-300 transition-colors"
                >
                  <span>Explorar plataforma en vivo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Project Preview with Zero Ghosting */}
            <div className="md:col-span-6">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/15 bg-neutral-900 shadow-xl group">
                <Image
                  key={currentProject.id}
                  src={currentProject.image}
                  alt={`Captura del proyecto ${currentProject.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                  <span className="font-mono text-[11px] bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded">
                    {currentProject.name} · Producción
                  </span>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    En línea
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
