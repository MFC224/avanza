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
      <div className="w-full max-w-7xl mx-auto px-4 py-8 border-y border-slate-200/80 bg-slate-50/60 backdrop-blur-sm relative z-10">
        <div className="text-center mb-3 text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
          Tecnologías y Frameworks de Élite
        </div>
        <InfiniteMarquee items={techStack} speed={30} />
      </div>

      {/* Solutions Section with Spotlight Cards & Scroll Reveal */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10">
        <FadeInView className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Nuestras Soluciones
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Diseñadas para dominar tu industria
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            No usamos plantillas prefabricadas. Construimos cada solución desde cero con ingeniería de precisión y arquitectura escalable.
          </p>
        </FadeInView>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((item, idx) => (
            <FadeInView key={idx} delay={idx * 0.15}>
              <SpotlightCard className="p-0 flex flex-col group h-full hover:-translate-y-2 transition-transform duration-300 border-slate-200/90 bg-white shadow-xs hover:shadow-xl">
                <div className="h-56 relative overflow-hidden border-b border-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={450}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <span className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-blue-800 text-xs font-semibold shadow-xs">
                    {item.tag}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-slate-900 text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-blue-700 font-bold">
                      Cotización Personalizada
                    </span>
                    <Link href="/contacto">
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-blue-700 hover:bg-blue-50 p-2 h-auto rounded-lg">
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </FadeInView>
          ))}
        </div>
      </section>

      {/* Bento Grid: Por qué AVANZA */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10 border-t border-slate-200/80">
        <FadeInView className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" /> Ventaja Tecnológica
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Ingeniería que se nota en cada detalle
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Aplicamos las mejores prácticas globales del ecosistema de software moderno.
          </p>
        </FadeInView>

        <FadeInView delay={0.2}>
          <BentoGrid>
            <BentoGridItem
              className="md:col-span-2"
              title="Inteligencia Artificial Integrada"
              description="No nos limitamos a crear interfaces bonitas. Integramos modelos de lenguaje, asistentes automatizados y flujos con agentes autónomos para optimizar la toma de decisiones y atención al cliente."
              icon={<Bot className="w-8 h-8" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 via-indigo-50/50 to-white border border-blue-100 p-4 flex items-center justify-center">
                  <div className="flex items-center gap-3 text-blue-900 font-mono text-xs font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>AI Agent Ready · LLM Pipelines · Real-time Inference</span>
                  </div>
                </div>
              }
            />

            <BentoGridItem
              title="Desarrollo Ágil SCRUM"
              description="Entregas funcionales cada 7 a 14 días. Puedes probar el sistema en producción semana a semana."
              icon={<Workflow className="w-8 h-8" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-50 to-white border border-cyan-200 p-4 flex items-center justify-center">
                  <span className="text-cyan-800 font-mono text-xs font-bold">100% Transparencia en Sprints</span>
                </div>
              }
            />

            <BentoGridItem
              title="Arquitectura Cloud & Supabase"
              description="Bases de datos PostgreSQL normalizadas hasta 3NF con Row Level Security (RLS) y tiempos de respuesta ultra veloces."
              icon={<Cpu className="w-8 h-8" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 p-4 flex items-center justify-center">
                  <span className="text-blue-800 font-mono text-xs font-bold">PostgreSQL 3NF · Edge Functions</span>
                </div>
              }
            />

            <BentoGridItem
              className="md:col-span-2"
              title="Seguridad y Control de Calidad Riguroso"
              description="Pruebas de calidad unitarias y de integración antes de cada despliegue. Protegemos tu activo más valioso con arquitectura defensiva de nivel bancario."
              icon={<ShieldCheck className="w-8 h-8" />}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white border border-emerald-200 p-4 flex items-center justify-center">
                  <div className="flex items-center gap-3 text-emerald-800 font-mono text-xs font-semibold">
                    <span>Zero-Trust Auth · OWASP Guardrails · Full Data Encryption</span>
                  </div>
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

      {/* High-Impact CTA Banner */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-blue-50/40 border-t border-slate-200/80 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-100/60 blur-[130px] rounded-full pointer-events-none" />
        <FadeInView className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            ¿Listo para construir el software que tu empresa merece?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Hablemos de tus ideas, requerimientos y metas de negocio. Te entregamos un plan técnico claro y sin costo inicial.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-[#021761] hover:bg-blue-700 text-white h-16 px-12 text-lg shadow-md shadow-blue-900/15 hover:shadow-lg transition-all rounded-full font-bold">
              Agendar Asesoría Técnica
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </FadeInView>
      </section>
    </div>
  );
}
