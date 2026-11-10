import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { CinematicWarp } from "@/components/ui/cinematic-warp";
import { HeroMotion } from "@/components/home/hero-motion";
import { SquarespaceShowcaseCarousel } from "@/components/home/squarespace-showcase-carousel";
import { ScrollytellingShowcase } from "@/components/home/scrollytelling-showcase";
import { TemplateCarousel } from "@/components/home/template-carousel";
import { CinematicReel } from "@/components/home/cinematic-reel";
import { FadeInView } from "@/components/ui/fade-in-view";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ComparisonMatrix } from "@/components/home/comparison-matrix";
import { ProjectEstimator } from "@/components/home/project-estimator";
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const pillars = [
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
      subtitle: "Next.js 16 & Bases de Datos Seguras",
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

  return (
    <div className="relative flex flex-col items-center overflow-hidden bg-white text-slate-900 selection:bg-blue-500/20 font-sans antialiased">
      {/* Dynamic Cybernetic Grid Background */}
      <BackgroundGrid />

      {/* 120 FPS High-Refresh Ambient Mesh Warp */}
      <CinematicWarp />

      {/* Squarespace Hero Section with Monumental Typography & 3D Tilt Device Stage */}
      <HeroMotion />

      {/* =========================================================================
          SQUARESPACE SIGNATURE 3D COVER-FLOW CAROUSEL (BENCHMARK EXACTO)
          Agregado en lugar de la barra simple: Muestra las oportunidades de
          páginas web, sistemas operativos a medida y agentes de IA.
          ========================================================================= */}
      <SquarespaceShowcaseCarousel />

      {/* =========================================================================
          SQUARESPACE SIGNATURE PINNED SCROLLYTELLING SHOWCASE (AWWWARDS STANDARD)
          Pinned multi-viewport stage with live interactive interfaces and scrub animation
          ========================================================================= */}
      <ScrollytellingShowcase />

      {/* =========================================================================
          SQUARESPACE SIGNATURE HORIZONTAL TEMPLATE & SYSTEMS CATALOG
          Interactive categorized catalog of high-end architectures
          ========================================================================= */}
      <TemplateCarousel />

      {/* =========================================================================
          SQUARESPACE SIGNATURE 4-PILLAR ARCHITECTURAL GRID
          ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-40 relative z-10">
        <FadeInView className="text-center mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <span>ESTÁNDAR DE INGENIERÍA</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-[-0.035em] leading-[0.98] mb-6">
            Los 4 pilares de{" "}
            <span className="font-serif italic font-normal text-[#021761]">
              nuestro software.
            </span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
            Eliminamos la improvisación con una disciplina de ingeniería rigurosa, transparente y orientada a resultados medibles.
          </p>
        </FadeInView>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-slate-200">
          {pillars.map((pillar, idx) => (
            <FadeInView
              key={idx}
              delay={idx * 0.1}
              className="border-r border-b border-slate-200 p-8 sm:p-10 flex flex-col justify-between group hover:bg-slate-50/70 transition-colors"
            >
              <div>
                <span className="text-6xl font-light font-serif text-slate-300 group-hover:text-[#021761] transition-colors block mb-8">
                  {pillar.index}
                </span>
                <h3 className="text-xl font-black text-slate-950 mb-2 tracking-tight">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-4 font-semibold">
                  {pillar.subtitle}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                  Estándar Élite
                </span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-slate-900 transition-all" />
              </div>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* =========================================================================
          FULL-BLEED SQUARESPACE MANIFESTO SECTION
          ========================================================================= */}
      <section className="w-full bg-slate-950 text-white py-32 md:py-44 px-6 relative overflow-hidden text-center border-y border-slate-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-blue-900/15 blur-[180px] rounded-full pointer-events-none" />

        <FadeInView className="max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 font-medium mb-10">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>MANIFIESTO DE INGENIERÍA · AVANZA SOFTWARE STUDIO</span>
          </div>

          <blockquote className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] leading-[1.1] mb-12">
            &ldquo;El software bien construido no es un adorno visual;{" "}
            <span className="font-serif italic font-normal text-slate-300">
              es el activo operativo más rentable que una empresa puede poseer.
            </span>
            &rdquo;
          </blockquote>

          <div className="flex flex-col items-center gap-2">
            <div className="text-sm font-bold tracking-widest uppercase text-white">
              Manuel Callañaupa & Magno Alomia
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Co-Fundadores · AVANZA Software Studio
            </div>
          </div>
        </FadeInView>
      </section>

      {/* Cinematic Architecture & Live Execution Reel */}
      <CinematicReel />

      {/* Comparison Matrix: The AVANZA Standard vs Traditional Agencies */}
      <ComparisonMatrix />

      {/* Interactive Project & ROI Estimator */}
      <ProjectEstimator />

      {/* Social Proof & Quantifiable Case Studies */}
      <TestimonialsSection />

      {/* =========================================================================
          ARCHITECTURAL CLIMAX CTA SECTION (Squarespace Style)
          ========================================================================= */}
      <section className="w-full bg-white text-slate-900 border-t border-slate-200 py-28 md:py-40 relative overflow-hidden">
        <FadeInView className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
            <span>INICIA TU TRANSFORMACIÓN TECNOLÓGICA</span>
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-950 mb-8 tracking-[-0.035em] leading-[0.98]">
            Construyamos el software{" "}
            <span className="font-serif italic font-normal text-[#021761]">
              que tu empresa merece.
            </span>
          </h2>
          <p className="text-lg md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
            Hablemos hoy mismo de tus requerimientos técnicos. Te entregamos un plan arquitectónico y presupuesto transparente en menos de 24 horas.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-slate-950 hover:bg-[#021761] text-white h-16 px-12 text-[12px] uppercase font-bold tracking-[0.16em] transition-all rounded-none md:rounded-xs shadow-lg hover:shadow-xl cursor-pointer group"
              >
                Comenzar Proyecto Ahora
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/servicios">
              <Button
                variant="outline"
                size="lg"
                className="border-slate-300 bg-white hover:bg-slate-50 text-slate-900 h-16 px-10 text-[12px] uppercase font-bold tracking-[0.16em] transition-all rounded-none md:rounded-xs shadow-2xs hover:border-slate-900 cursor-pointer"
              >
                Explorar Todos los Servicios
              </Button>
            </Link>
          </div>
        </FadeInView>
      </section>
    </div>
  );
}
