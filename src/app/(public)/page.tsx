import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { CinematicWarp } from "@/components/ui/cinematic-warp";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { HeroMotion } from "@/components/home/hero-motion";
import { CinematicReel } from "@/components/home/cinematic-reel";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { FadeInView } from "@/components/ui/fade-in-view";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ComparisonMatrix } from "@/components/home/comparison-matrix";
import { ProjectEstimator } from "@/components/home/project-estimator";
import { ArrowRight, Bot, Cpu, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";

export default function Home() {
  const techStack = [
    { name: "Next.js 16 (App Router)" },
    { name: "React 19" },
    { name: "Supabase SSR" },
    { name: "PostgreSQL 3NF" },
    { name: "Tailwind CSS v4" },
    { name: "TypeScript" },
    { name: "OpenAI / LLMs" },
    { name: "Python Pipelines" },
    { name: "Docker Containers" },
    { name: "Cloud Architecture" },
    { name: "Lenis Smooth Scroll" },
    { name: "Row Level Security (RLS)" },
  ];

  const solutions = [
    {
      title: "Página Web de Alto Impacto",
      description: "Diseño premium enfocado en conversión, ultra veloz, SEO optimizado y con animaciones que transmiten autoridad inmediata.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      tag: "Presencia & Ventas"
    },
    {
      title: "Sistema Web / CRM Interno",
      description: "Digitaliza y automatiza la operación de tu negocio con paneles de control a medida, bases de datos PostgreSQL y gestión de roles.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      tag: "Operación & Gestión"
    },
    {
      title: "Sistemas & Soluciones con IA",
      description: "Integramos agentes de inteligencia artificial, pipelines de automatización y arquitecturas a medida para multiplicar la productividad.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      tag: "Innovación & Escala"
    }
  ];

  return (
    <div className="relative flex flex-col items-center overflow-hidden bg-white text-slate-900">
      {/* Dynamic Cybernetic Grid Background */}
      <BackgroundGrid />

      {/* 120 FPS High-Refresh Ambient Mesh Warp */}
      <CinematicWarp />

      {/* Animated Hero Section with Camera Dolly */}
      <HeroMotion />

      {/* Infinite Tech Marquee */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 border-y border-slate-200/60 bg-white/50 backdrop-blur-md relative z-10">
        <div className="text-center mb-4 text-[11px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
          Tecnologías y Frameworks de Élite
        </div>
        <InfiniteMarquee items={techStack} speed={30} />
      </div>

      {/* Solutions Section with Architectural Editorial Cards */}
      <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-36 relative z-10">
        <FadeInView className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 text-[11px] font-mono uppercase tracking-[0.18em] font-semibold mb-6">
            Capacidades de Ingeniería
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-[-0.035em]">
            Diseñadas para dominar tu industria
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
            Sin plantillas prefabricadas ni atajos. Construimos cada solución desde cero con ingeniería de precisión, arquitectura modular y rendimiento extremo.
          </p>
        </FadeInView>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((item, idx) => (
            <FadeInView key={idx} delay={idx * 0.15}>
              <div className="group flex flex-col h-full rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all duration-300 overflow-hidden shadow-2xs hover:shadow-xl">
                <div className="h-64 relative overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={450}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 text-slate-900 text-[11px] font-mono uppercase tracking-wider font-semibold shadow-2xs">
                    {item.tag}
                  </span>
                </div>
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-slate-950 text-2xl font-bold mb-3 tracking-tight group-hover:text-[#021761] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/contacto"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#021761] hover:text-blue-700 transition-colors group/link"
                    >
                      <span>Solicitar Cotización</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* Bento Grid: Por qué AVANZA */}
      <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-36 relative z-10 border-t border-slate-200/70">
        <FadeInView className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 text-[11px] font-mono uppercase tracking-[0.18em] font-semibold mb-6">
            Ventaja Tecnológica
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-[-0.035em]">
            Ingeniería que se nota en cada detalle
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
            Aplicamos las mejores prácticas globales del ecosistema de software moderno para garantizar velocidad, seguridad y escalabilidad real.
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <BentoGrid>
            <BentoGridItem
              className="md:col-span-2"
              title="Inteligencia Artificial Integrada"
              description="No nos limitamos a crear interfaces bonitas. Integramos modelos de lenguaje, asistentes automatizados y flujos con agentes autónomos para optimizar la toma de decisiones y atención al cliente."
              icon={<Bot className="w-7 h-7 text-[#021761]" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6.5rem] rounded-xl bg-slate-950 text-slate-100 p-5 flex items-center justify-between border border-slate-800">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300">AI Agent Orchestrator · RAG Pipelines · Real-time Inference</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 border border-slate-700 px-2 py-0.5 rounded">p99 &lt; 28ms</span>
                </div>
              }
            />

            <BentoGridItem
              title="Desarrollo Ágil SCRUM"
              description="Entregas funcionales cada 7 a 14 días. Puedes probar el sistema en producción semana a semana."
              icon={<Workflow className="w-7 h-7 text-[#021761]" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6.5rem] rounded-xl bg-slate-50 border border-slate-200/80 p-5 flex items-center justify-between">
                  <span className="text-slate-900 font-mono text-xs font-bold">Ciclos Ágiles · 7-14 Días</span>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Demo Semanal</span>
                </div>
              }
            />

            <BentoGridItem
              title="Arquitectura Cloud & Supabase"
              description="Bases de datos PostgreSQL normalizadas hasta 3NF con Row Level Security (RLS) y tiempos de respuesta ultra veloces."
              icon={<Cpu className="w-7 h-7 text-[#021761]" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6.5rem] rounded-xl bg-slate-50 border border-slate-200/80 p-5 flex items-center justify-between">
                  <span className="text-slate-900 font-mono text-xs font-bold">PostgreSQL 3NF · Edge Compute</span>
                  <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">RLS Activado</span>
                </div>
              }
            />

            <BentoGridItem
              className="md:col-span-2"
              title="Seguridad y Control de Calidad Riguroso"
              description="Pruebas de calidad unitarias y de integración antes de cada despliegue. Protegemos tu activo más valioso con arquitectura defensiva de nivel bancario."
              icon={<ShieldCheck className="w-7 h-7 text-[#021761]" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6.5rem] rounded-xl bg-slate-950 text-slate-100 p-5 flex items-center justify-between border border-slate-800">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-slate-300">Zero-Trust Auth · OWASP Guardrails · Full Encryption at Rest</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 border border-emerald-900/60 bg-emerald-950/40 px-2.5 py-0.5 rounded">100% PASS</span>
                </div>
              }
            />
          </BentoGrid>
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

      {/* Architectural Climax CTA Section */}
      <section className="w-full bg-slate-950 text-white border-t border-slate-900 py-28 md:py-36 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[160px] rounded-full pointer-events-none" />
        <FadeInView className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-slate-300 text-[11px] font-mono uppercase tracking-[0.2em] font-medium mb-8">
            Inicia Tu Transformación
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-[-0.035em] leading-[1.02]">
            Construyamos el software que tu empresa merece.
          </h2>
          <p className="text-lg md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed font-normal">
            Hablemos de tus requerimientos y metas de negocio. Te entregamos un plan técnico arquitectónico y presupuesto cerrado sin costo inicial.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contacto">
              <Button size="lg" className="bg-white hover:bg-slate-100 text-slate-950 h-16 px-12 text-base shadow-lg transition-all rounded-full font-bold cursor-pointer">
                Agendar Asesoría Técnica
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/servicios">
              <Button variant="outline" size="lg" className="border-white/20 bg-transparent hover:bg-white/10 text-white h-16 px-10 text-base rounded-full font-semibold cursor-pointer">
                Explorar Todos los Servicios
              </Button>
            </Link>
          </div>
        </FadeInView>
      </section>
    </div>
  );
}
