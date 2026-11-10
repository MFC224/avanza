"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Layers,
  Database,
  Cpu,
  ArrowUpRight,
  Clock,
  Zap,
} from "lucide-react";

interface ShowcaseSlide {
  id: string;
  category: "web" | "system" | "ai" | "fintech";
  categoryBadge: string;
  tagline: string;
  brandName: string;
  navItems: string[];
  ctaButtonText: string;
  headline: string;
  subheadline: string;
  themeStyle: "cream-editorial" | "dark-agency" | "navy-system" | "obsidian-wellness" | "fintech-platinum" | "ai-terminal";
  metrics: { label: string; value: string };
  highlights: string[];
  imageSrc: string;
  secondaryImageSrc?: string;
  details: string;
}

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: "academic-lessons",
    category: "web",
    categoryBadge: "PÁGINAS WEB EDITORIALES & CONVERSIÓN",
    tagline: "Presencia web de estándar editorial para profesionales y academias",
    brandName: "SCOTT SMITH TUTORING",
    navItems: ["Lessons", "Testimonials", "Rates"],
    ctaButtonText: "Schedule a Lesson",
    headline: "ACADEMIC LESSONS",
    subheadline: "BY SCOTT SMITH · Personalized academic tutoring to build confidence, strengthen skills, and support success.",
    themeStyle: "cream-editorial",
    metrics: { label: "Conversión de Alumnos", value: "+340%" },
    highlights: ["Tipografía editorial suiza", "Reserva de citas integrada", "Velocidad LCP 0.6s"],
    imageSrc: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1000&q=80",
    details: "Ideal para firmas de consultoría, despachos legales, academias y marcas que requieren una imagen de prestigio indiscutible.",
  },
  {
    id: "lio-agency",
    category: "web",
    categoryBadge: "E-COMMERCE DE LUJO & ESTUDIO DE MARCA",
    tagline: "Plataforma de alta gama con catálogo y pasarela de pago",
    brandName: "LIO AGENCY",
    navItems: ["Selected Work", "Editorial", "Archive"],
    ctaButtonText: "View Collection",
    headline: "LIO AGENCY",
    subheadline: "NEW YORK / LONDON · A creative agency creating iconic identities, luxury digital commerce, and cultural relevance.",
    themeStyle: "dark-agency",
    metrics: { label: "Ticket Promedio", value: "+280%" },
    highlights: ["Renderizado WebGL de texturas", "Checkout instantáneo en 1-clic", "Microinteracciones 120 FPS"],
    imageSrc: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
    secondaryImageSrc: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    details: "Perfecto para marcas premium de moda, perfumería, inmobiliarias de lujo y estudios de arquitectura que compiten internacionalmente.",
  },
  {
    id: "essence-wellness",
    category: "web",
    categoryBadge: "PORTAL DE SERVICIOS & RESERVAS ONLINE",
    tagline: "Agendamiento automatizado conectado directamente a WhatsApp",
    brandName: "ESSENCE (WELLNESS CENTER)",
    navItems: ["Services", "Facilities", "Membership"],
    ctaButtonText: "Bookings",
    headline: "MINDFUL SPACES & CLINICAL RETREAT",
    subheadline: "SAN ISIDRO · Tratamientos estéticos avanzados y terapias regenerativas con reserva online en tiempo real.",
    themeStyle: "obsidian-wellness",
    metrics: { label: "Citas Confirmadas", value: "98.4%" },
    highlights: ["Sincronización con Google Calendar", "Recordatorios por WhatsApp", "Pasarela Yape / Tarjetas"],
    imageSrc: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
    details: "Diseñado para clínicas, centros de estética, spas y servicios donde el agendamiento sin fricciones determina las ventas.",
  },
  {
    id: "kallpa-fleet",
    category: "system",
    categoryBadge: "SISTEMAS WEB & CRM OPERATIVO",
    tagline: "Control de flotas, logística e inventario en tiempo real",
    brandName: "KALLPA LOGISTICS OS",
    navItems: ["Monitoreo GPS", "Guías Electrónicas", "Conductores"],
    ctaButtonText: "Despachar Carga",
    headline: "ORQUESTADOR DE FLOTA & RUTA",
    subheadline: "LIMA - CALLAO · Telemetría satelital en vivo, control de combustible y facturación electrónica automatizada.",
    themeStyle: "navy-system",
    metrics: { label: "Latencia Postgres", value: "12ms RLS" },
    highlights: ["WebSockets en tiempo real", "Base de datos 3NF Supabase", "Facturación Sunat automática"],
    imageSrc: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80",
    details: "Reemplaza el desorden de hojas de cálculo por un sistema centralizado donde cada área opera con datos verídicos.",
  },
  {
    id: "cortex-agent",
    category: "ai",
    categoryBadge: "AGENTES DE IA & AUTOMATIZACIÓN",
    tagline: "Atención comercial y calificación de prospectos 24/7",
    brandName: "CORTEX NEURAL CONCIERGE",
    navItems: ["WhatsApp API", "Vector RAG", "CRM Sync"],
    ctaButtonText: "Live Agent Active",
    headline: "AGENTE DE ATENCIÓN AUTÓNOMO",
    subheadline: "CONEXIÓN A BASES INTERNAS · Responde dudas técnicas, cotiza requerimientos y cierra llamadas comerciales sin intervención humana.",
    themeStyle: "ai-terminal",
    metrics: { label: "Tiempo Inferencia", value: "0.4s LLM" },
    highlights: ["RAG con catálogo de la empresa", "WhatsApp Business integrado", "Generación de PDF formal"],
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    details: "Elimina la pérdida de clientes por demora en responder. Tu empresa atiende cotizaciones al segundo, incluso de madrugada.",
  },
  {
    id: "aethelgard-wealth",
    category: "fintech",
    categoryBadge: "FINTECH & GESTIÓN PATRIMONIAL",
    tagline: "Plataformas financieras seguras con estándares bancarios",
    brandName: "AETHELGARD PRIVATE BANKING",
    navItems: ["Portafolios", "Custodia", "Rendimiento"],
    ctaButtonText: "Terminal Seguro",
    headline: "WEALTH MANAGEMENT OS",
    subheadline: "SUIZA / PERÚ · Analítica de activos multimoneda, conciliación bancaria y bóveda criptográfica de transacciones.",
    themeStyle: "fintech-platinum",
    metrics: { label: "Disponibilidad SLA", value: "99.99%" },
    highlights: ["Seguridad TLS 1.3 bancaria", "Auditoría de transacciones", "Roles y permisos granulares"],
    imageSrc: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1000&q=80",
    details: "Para fondos de inversión, cooperativas, fintechs y empresas que gestionan altos volúmenes de transacciones financieras.",
  },
];

const CATEGORIES = [
  { id: "all", label: "TODAS LAS SOLUCIONES" },
  { id: "web", label: "PÁGINAS WEB EDITORIALES" },
  { id: "system", label: "SISTEMAS & CRM" },
  { id: "ai", label: "AGENTES DE IA" },
  { id: "fintech", label: "FINTECH & ERP" },
] as const;

// Transition variants for smooth right-to-left / left-to-right 3D sliding animation (0.85s silk-smooth)
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "46%" : "-46%",
    scale: 0.86,
    opacity: 0.25,
    rotateY: direction > 0 ? -14 : 14,
    zIndex: 10,
  }),
  center: {
    x: "0%",
    scale: 1,
    opacity: 1,
    rotateY: 0,
    zIndex: 30,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-46%" : "46%",
    scale: 0.86,
    opacity: 0.2,
    rotateY: direction > 0 ? 14 : -14,
    zIndex: 10,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function SquarespaceShowcaseCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [progress, setProgress] = useState<number>(0);

  const AUTOPLAY_SECONDS = 10; // 10-second automatic rotation

  // Filter slides based on category
  const filteredSlides =
    selectedCategory === "all"
      ? SHOWCASE_SLIDES
      : SHOWCASE_SLIDES.filter((s) => s.category === selectedCategory);

  // Derive current index from infinite page count
  const currentIndex = ((page % filteredSlides.length) + filteredSlides.length) % filteredSlides.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setProgress(0); // Reset the 10-second timer when manually paginated
  };

  // Exact 10-Second Continuous Autoplay Progress
  useEffect(() => {
    const startTime = Date.now();
    const totalMs = AUTOPLAY_SECONDS * 1000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentPct = Math.min((elapsed / totalMs) * 100, 100);
      setProgress(currentPct);

      if (elapsed >= totalMs) {
        setPage(([prevPage]) => [prevPage + 1, 1]); // Auto-advance rightwards
      }
    }, 50);

    return () => clearInterval(interval);
  }, [page, selectedCategory]);

  const activeSlide = filteredSlides[currentIndex] || filteredSlides[0];

  // Side peeking cards (recuadros anterior y posterior)
  const prevIndex = (currentIndex - 1 + filteredSlides.length) % filteredSlides.length;
  const nextIndex = (currentIndex + 1) % filteredSlides.length;
  const prevSlide = filteredSlides[prevIndex];
  const nextSlide = filteredSlides[nextIndex];

  return (
    <section className="relative w-full bg-slate-950 text-white py-20 sm:py-28 md:py-32 overflow-hidden border-y border-slate-900 selection:bg-blue-500/30">
      {/* Ambient Radial Spotlight Behind Center Stage */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[650px] bg-gradient-to-tr from-blue-950/25 via-slate-900/25 to-emerald-950/15 blur-[200px] pointer-events-none rounded-full" />

      {/* Container: Balanced width allowing the side cards to extend gracefully */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        {/* Top Eyebrow */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono uppercase tracking-[0.22em] mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Comienza tu proyecto con AVANZA · Sin licencias cautivas</span>
        </div>

        {/* Master Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white text-center tracking-[-0.035em] max-w-4xl mb-5 leading-[1.04]">
          Oportunidades de diseño y sistemas que{" "}
          <span className="font-serif italic font-normal text-blue-400">
            transforman tu negocio.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-slate-400 text-sm sm:text-base md:text-lg text-center max-w-2xl mb-10 leading-relaxed font-normal">
          Cada arquitectura es programada a medida para tu empresa. Explora nuestras soluciones para páginas web de alta conversión, sistemas de gestión interna y agentes con IA.
        </p>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setPage([0, 0]);
                  setProgress(0);
                }}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all rounded-full cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-950 shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            SQUARESPACE 3D COVER-FLOW CAROUSEL (AMBAS TARJETAS LATERALES VISIBLES)
            El recuadro de la izquierda (anterior) y el de la derecha (siguiente)
            se posicionan simétricamente con desplazamiento exacto en el eje X
            ========================================================================= */}
        <div
          className="relative w-full min-h-[500px] sm:min-h-[560px] md:min-h-[620px] lg:min-h-[640px] flex items-center justify-center my-2"
          style={{ perspective: 1200 }}
        >
          {/* RECUADRO DE ATRÁS (IZQUIERDA / ANTERIOR) - Simétrico, visible y clicable */}
          {prevSlide && (
            <motion.div
              onClick={() => paginate(-1)}
              style={{
                left: "50%",
                top: "50%",
                transform: "translateX(calc(-50% - min(40vw, 440px))) translateY(-50%) scale(0.85) rotateY(14deg)",
              }}
              className="absolute w-[94vw] sm:w-[90vw] md:w-[86vw] lg:w-[940px] xl:w-[980px] aspect-[16/11] sm:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/15 hidden sm:block opacity-45 hover:opacity-75 transition-all duration-300 z-10 bg-slate-900 group"
            >
              <div
                className={`w-full h-full relative p-6 sm:p-10 flex flex-col justify-between ${
                  prevSlide.themeStyle === "cream-editorial"
                    ? "bg-[#f6f2ec] text-slate-900"
                    : prevSlide.themeStyle === "obsidian-wellness"
                    ? "bg-[#181514] text-[#ede6df]"
                    : "bg-[#0d0d0f] text-white"
                }`}
              >
                {/* Header preview */}
                <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 text-[10px] sm:text-xs">
                  <span className="font-mono font-bold tracking-widest uppercase">
                    {prevSlide.brandName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border border-current text-[9px] font-mono uppercase">
                    Anterior ‹
                  </span>
                </div>

                {/* Content preview */}
                <div className="grid grid-cols-12 gap-4 items-center my-auto">
                  <div className="col-span-7 space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 block">
                      {prevSlide.categoryBadge}
                    </span>
                    <h4 className="text-xl sm:text-3xl font-black tracking-tight line-clamp-2">
                      {prevSlide.headline}
                    </h4>
                    <p className="text-xs opacity-70 line-clamp-2">{prevSlide.tagline}</p>
                  </div>
                  <div className="col-span-5 relative h-28 sm:h-40 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm">
                    <Image
                      src={prevSlide.imageSrc}
                      alt={prevSlide.brandName}
                      fill
                      sizes="300px"
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Footer preview */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono opacity-80">
                  <span>{prevSlide.metrics.label}</span>
                  <span className="font-bold">{prevSlide.metrics.value}</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TARJETA CENTRAL ACTIVA (Con animación física suave de 0.85s y diseño editorial de lujo) */}
          <div className="relative z-30 w-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-[94vw] sm:w-[90vw] md:w-[86vw] lg:w-[940px] xl:w-[980px] aspect-[16/11] sm:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.9)] ring-1 ring-white/15 bg-slate-900 flex flex-col"
              >
                {/* SLIDE THEME VARIANT 1: Cream Editorial (Scott Smith Tutoring / Academic Lessons) */}
                {activeSlide.themeStyle === "cream-editorial" && (
                  <div className="w-full h-full bg-[#f6f2ec] text-slate-900 flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] bg-[size:1rem_1rem] pointer-events-none" />

                    {/* Header Bar */}
                    <div className="relative z-10 flex items-center justify-between pb-4 border-b border-stone-300/80 text-[10px] sm:text-xs">
                      <span className="font-bold tracking-widest uppercase font-mono text-stone-900">
                        {activeSlide.brandName}
                      </span>
                      <div className="hidden sm:flex items-center gap-6 font-serif italic text-stone-600">
                        {activeSlide.navItems.map((item, i) => (
                          <span key={i} className="hover:text-stone-950 transition-colors cursor-pointer">{item}</span>
                        ))}
                      </div>
                      <span className="px-3.5 py-1 rounded-full border border-stone-800 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-stone-900 hover:bg-stone-900 hover:text-white transition-all cursor-pointer">
                        {activeSlide.ctaButtonText}
                      </span>
                    </div>

                    {/* Center Content */}
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
                      <div className="sm:col-span-7 space-y-3 sm:space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-stone-500 font-bold block">
                          ESTÁNDAR EDITORIAL 2026
                        </span>
                        <h3 className="text-3xl sm:text-5xl md:text-6xl font-serif tracking-tight text-stone-950 leading-[0.96]">
                          ACADEMIC <br />
                          <span className="italic font-normal">LESSONS</span>
                        </h3>
                        <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-sm">
                          {activeSlide.subheadline}
                        </p>
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono bg-stone-200/80 px-2.5 py-1 rounded text-stone-800 font-semibold">
                            Next.js 16 Edge
                          </span>
                          <span className="text-[10px] font-mono bg-stone-200/80 px-2.5 py-1 rounded text-stone-800 font-semibold">
                            0.6s LCP Global
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-5 relative h-40 sm:h-60 md:h-68 rounded-2xl overflow-hidden border border-stone-300 shadow-md">
                        <Image
                          src={activeSlide.imageSrc}
                          alt="Academic Lessons"
                          fill
                          sizes="400px"
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>

                    {/* Bottom Strip */}
                    <div className="relative z-10 pt-4 border-t border-stone-300/80 flex items-center justify-between text-[10px] sm:text-xs font-mono text-stone-600">
                      <span>ARQUITECTURA WEB DE ALTA CONVERSIÓN</span>
                      <span className="font-bold text-stone-950">{activeSlide.metrics.value} en resultados</span>
                    </div>
                  </div>
                )}

                {/* SLIDE THEME VARIANT 2: Dark Luxury Agency (Lio Agency) */}
                {activeSlide.themeStyle === "dark-agency" && (
                  <div className="w-full h-full bg-[#0d0d0f] text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 text-[10px] sm:text-xs">
                      <span className="font-black tracking-widest uppercase font-mono text-white">
                        {activeSlide.brandName}
                      </span>
                      <div className="hidden sm:flex items-center gap-6 font-mono text-slate-400">
                        {activeSlide.navItems.map((item, i) => (
                          <span key={i} className="hover:text-white transition-colors cursor-pointer">{item}</span>
                        ))}
                      </div>
                      <span className="px-3 py-1 rounded bg-white text-slate-950 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer">
                        {activeSlide.ctaButtonText}
                      </span>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
                      <div className="sm:col-span-7 space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-slate-400 block font-bold">
                          NEW YORK / LONDON / LIMA
                        </span>
                        <h3 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] text-white leading-[0.94]">
                          LIO AGENCY
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                          {activeSlide.subheadline}
                        </p>
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                            Catálogo 3D WebGL
                          </span>
                          <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-slate-300">
                            Checkout Stripe / Apple Pay
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-5 grid grid-cols-2 gap-2 h-40 sm:h-60 md:h-68">
                        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-md">
                          <Image src={activeSlide.imageSrc} alt="Product 1" fill sizes="250px" className="object-cover" />
                        </div>
                        <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-md">
                          <Image src={activeSlide.secondaryImageSrc || activeSlide.imageSrc} alt="Product 2" fill sizes="250px" className="object-cover" />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400">
                      <span>E-COMMERCE &amp; MARCAS DE LUJO</span>
                      <span className="font-bold text-emerald-400">{activeSlide.metrics.value} Ticket Promedio</span>
                    </div>
                  </div>
                )}

                {/* SLIDE THEME VARIANT 3: Obsidian Wellness (Essence) */}
                {activeSlide.themeStyle === "obsidian-wellness" && (
                  <div className="w-full h-full bg-[#181514] text-[#ede6df] flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between pb-4 border-b border-stone-800 text-[10px] sm:text-xs">
                      <span className="font-bold tracking-widest uppercase font-mono text-[#f3ede8]">
                        {activeSlide.brandName}
                      </span>
                      <div className="hidden sm:flex items-center gap-6 font-serif italic text-stone-400">
                        {activeSlide.navItems.map((item, i) => (
                          <span key={i} className="hover:text-white transition-colors cursor-pointer">{item}</span>
                        ))}
                      </div>
                      <span className="px-3.5 py-1 rounded-full border border-stone-600 text-[10px] font-mono uppercase tracking-wider text-stone-300 hover:border-white transition-all cursor-pointer">
                        {activeSlide.ctaButtonText}
                      </span>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
                      <div className="sm:col-span-7 space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-500/90 font-bold block">
                          MEDICINA ESTÉTICA &amp; RETREAT
                        </span>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif italic tracking-tight text-white leading-[1.05]">
                          Mindful Spaces &amp; Clinical Retreat
                        </h3>
                        <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                          {activeSlide.subheadline}
                        </p>
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                            Reserva en 2 Pasos
                          </span>
                          <span className="text-[10px] font-mono bg-stone-800 px-2 py-0.5 rounded text-stone-300">
                            Confirmación WhatsApp
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-5 relative h-40 sm:h-60 md:h-68 rounded-2xl overflow-hidden border border-stone-800 shadow-lg">
                        <Image src={activeSlide.imageSrc} alt="Wellness" fill sizes="400px" className="object-cover" />
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-stone-800 flex items-center justify-between text-[10px] sm:text-xs font-mono text-stone-400">
                      <span>AGENDAMIENTO WEB DIRECTO</span>
                      <span className="font-bold text-emerald-400">{activeSlide.metrics.value} Citas Cumplidas</span>
                    </div>
                  </div>
                )}

                {/* SLIDE THEME VARIANT 4: Navy Industrial System (Kallpa Logistics OS) */}
                {activeSlide.themeStyle === "navy-system" && (
                  <div className="w-full h-full bg-[#080e1a] text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 text-[10px] sm:text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono font-bold tracking-wider text-white">
                          {activeSlide.brandName}
                        </span>
                      </div>
                      <div className="hidden sm:flex items-center gap-5 font-mono text-slate-400 text-[11px]">
                        {activeSlide.navItems.map((item, i) => (
                          <span key={i} className="hover:text-white transition-colors cursor-pointer">{item}</span>
                        ))}
                      </div>
                      <span className="px-3 py-1 rounded bg-blue-600 text-white font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer">
                        {activeSlide.ctaButtonText}
                      </span>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
                      <div className="sm:col-span-7 space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-blue-400 font-bold block">
                          CONTROL CENTRAL EN VIVO // POSTGRESQL 3NF
                        </span>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.02]">
                          Orquestador de Flota &amp; Ruta
                        </h3>
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                          {activeSlide.subheadline}
                        </p>
                        <div className="grid grid-cols-2 gap-2 pt-2 max-w-xs">
                          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-[9px] font-mono text-slate-400 block">DESPACHOS HOY</span>
                            <span className="text-base font-bold text-white font-mono">148 Activos</span>
                          </div>
                          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                            <span className="text-[9px] font-mono text-slate-400 block">LATENCIA EDGE</span>
                            <span className="text-base font-bold text-emerald-400 font-mono">12ms RLS</span>
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-5 relative h-40 sm:h-60 md:h-68 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                        <Image src={activeSlide.imageSrc} alt="Logistics ERP" fill sizes="400px" className="object-cover opacity-85" />
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400">
                      <span>SISTEMAS EMPRESARIALES DE GESTIÓN</span>
                      <span className="font-bold text-blue-400">100% Cero Hojas Sueltas</span>
                    </div>
                  </div>
                )}

                {/* SLIDE THEME VARIANT 5: AI Terminal (Cortex) */}
                {activeSlide.themeStyle === "ai-terminal" && (
                  <div className="w-full h-full bg-[#0a0714] text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between pb-4 border-b border-purple-900/40 text-[10px] sm:text-xs">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-purple-400" />
                        <span className="font-mono font-bold tracking-wider text-white">
                          {activeSlide.brandName}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded bg-purple-600/30 border border-purple-500/50 text-purple-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                        {activeSlide.ctaButtonText}
                      </span>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
                      <div className="sm:col-span-7 space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-purple-400 font-bold block">
                          RAZONAMIENTO NEURAL // 24/7 WHATSAPP
                        </span>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.02]">
                          Agente Autónomo de Ventas
                        </h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                          {activeSlide.subheadline}
                        </p>
                        <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-mono text-purple-200">
                          <span className="text-emerald-400 font-bold block mb-1">
                            WhatsApp [Cliente Minero]: &ldquo;Necesitamos cotización formal para 5 almacenes...&rdquo;
                          </span>
                          <span className="text-slate-300 text-[11px] block">
                            Agente: &ldquo;Propuesta generada en PDF y enviada en 1.2 segundos con disponibilidad...&rdquo;
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-5 relative h-40 sm:h-60 md:h-68 rounded-2xl overflow-hidden border border-purple-500/30 shadow-lg">
                        <Image src={activeSlide.imageSrc} alt="AI Concierge" fill sizes="400px" className="object-cover opacity-85" />
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-purple-900/40 flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400">
                      <span>INFERENCIA LLM EN TIEMPO REAL</span>
                      <span className="font-bold text-purple-400">{activeSlide.metrics.value}</span>
                    </div>
                  </div>
                )}

                {/* SLIDE THEME VARIANT 6: Fintech Platinum (Aethelgard) */}
                {activeSlide.themeStyle === "fintech-platinum" && (
                  <div className="w-full h-full bg-[#07101e] text-white flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden">
                    <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10 text-[10px] sm:text-xs">
                      <span className="font-bold tracking-widest uppercase font-mono text-white">
                        {activeSlide.brandName}
                      </span>
                      <span className="px-3 py-1 rounded bg-white text-slate-950 font-mono text-[10px] uppercase font-bold tracking-wider cursor-pointer">
                        {activeSlide.ctaButtonText}
                      </span>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center my-auto">
                      <div className="sm:col-span-7 space-y-3">
                        <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400 font-bold block">
                          ESTÁNDAR BANCARIO TLS 1.3
                        </span>
                        <h3 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.02]">
                          Wealth Management OS
                        </h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-sm">
                          {activeSlide.subheadline}
                        </p>
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded text-cyan-300">
                            Bóveda Criptográfica
                          </span>
                          <span className="text-[10px] font-mono bg-white/10 px-2.5 py-1 rounded text-cyan-300">
                            SLA 99.99% Cloud
                          </span>
                        </div>
                      </div>

                      <div className="sm:col-span-5 relative h-40 sm:h-60 md:h-68 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                        <Image src={activeSlide.imageSrc} alt="Fintech OS" fill sizes="400px" className="object-cover opacity-90" />
                      </div>
                    </div>

                    <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-[10px] sm:text-xs font-mono text-slate-400">
                      <span>FINTECH &amp; PLATAFORMAS DE ALTO VALOR</span>
                      <span className="font-bold text-emerald-400">Cero Vulnerabilidades</span>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RECUADRO DE ATRÁS (DERECHA / SIGUIENTE) - Simétrico, visible y clicable */}
          {nextSlide && (
            <motion.div
              onClick={() => paginate(1)}
              style={{
                left: "50%",
                top: "50%",
                transform: "translateX(calc(-50% + min(40vw, 440px))) translateY(-50%) scale(0.85) rotateY(-14deg)",
              }}
              className="absolute w-[94vw] sm:w-[90vw] md:w-[86vw] lg:w-[940px] xl:w-[980px] aspect-[16/11] sm:aspect-[16/10] rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-white/15 hidden sm:block opacity-45 hover:opacity-75 transition-all duration-300 z-10 bg-slate-900 group"
            >
              <div
                className={`w-full h-full relative p-6 sm:p-10 flex flex-col justify-between ${
                  nextSlide.themeStyle === "cream-editorial"
                    ? "bg-[#f6f2ec] text-slate-900"
                    : nextSlide.themeStyle === "obsidian-wellness"
                    ? "bg-[#181514] text-[#ede6df]"
                    : "bg-[#0d0d0f] text-white"
                }`}
              >
                {/* Header preview */}
                <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10 text-[10px] sm:text-xs">
                  <span className="font-mono font-bold tracking-widest uppercase">
                    {nextSlide.brandName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full border border-current text-[9px] font-mono uppercase">
                    Siguiente ›
                  </span>
                </div>

                {/* Content preview */}
                <div className="grid grid-cols-12 gap-4 items-center my-auto">
                  <div className="col-span-7 space-y-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 block">
                      {nextSlide.categoryBadge}
                    </span>
                    <h4 className="text-xl sm:text-3xl font-black tracking-tight line-clamp-2">
                      {nextSlide.headline}
                    </h4>
                    <p className="text-xs opacity-70 line-clamp-2">{nextSlide.tagline}</p>
                  </div>
                  <div className="col-span-5 relative h-28 sm:h-40 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 shadow-sm">
                    <Image
                      src={nextSlide.imageSrc}
                      alt={nextSlide.brandName}
                      fill
                      sizes="300px"
                      className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Footer preview */}
                <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[10px] font-mono opacity-80">
                  <span>{nextSlide.metrics.label}</span>
                  <span className="font-bold">{nextSlide.metrics.value}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Carousel Bottom Controls: Arrows + 10-Second Progress Bar + CTA */}
        <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between mt-6 pt-5 border-t border-white/10 gap-5">
          {/* Left Arrow Controls & Counter */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              aria-label="Diseño anterior"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Siguiente diseño"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-950 border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-slate-400 ml-2">
              0{currentIndex + 1} / 0{filteredSlides.length} · {activeSlide.categoryBadge}
            </span>
          </div>

          {/* Center: 10-Second Continuous Autoplay Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>Rotación automática en 10s</span>
              </div>
              <div className="w-32 sm:w-44 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-300 transition-all duration-75"
                />
              </div>
            </div>
          </div>

          {/* Right Action CTA Button */}
          <Link href="/contacto">
            <Button className="bg-white hover:bg-slate-200 text-slate-950 font-bold uppercase tracking-[0.16em] text-xs px-7 py-2.5 rounded-none md:rounded-xs cursor-pointer shadow-xl group">
              <span>Cotizar Esta Solución</span>
              <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Bottom Social Proof */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-slate-400">
            Únete a las empresas que gestionan y escalan sus negocios con AVANZA Software Studio
          </p>
        </div>
      </div>
    </section>
  );
}
