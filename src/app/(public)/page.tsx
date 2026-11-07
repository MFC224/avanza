import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { CinematicWarp } from "@/components/ui/cinematic-warp";
import { HeroMotion } from "@/components/home/hero-motion";
import { CinematicReel } from "@/components/home/cinematic-reel";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";
import { FadeInView } from "@/components/ui/fade-in-view";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ComparisonMatrix } from "@/components/home/comparison-matrix";
import { ProjectEstimator } from "@/components/home/project-estimator";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Layers,
  Lock,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

export default function Home() {
  const techStack = [
    { name: "Next.js 16 (App Router)" },
    { name: "React 19" },
    { name: "Supabase SSR" },
    { name: "PostgreSQL 3NF" },
    { name: "Tailwind CSS v4" },
    { name: "TypeScript Estricto" },
    { name: "OpenAI / LLMs" },
    { name: "Python Pipelines" },
    { name: "Docker Containers" },
    { name: "Cloud Architecture" },
    { name: "Lenis Smooth Scroll" },
    { name: "Row Level Security (RLS)" },
  ];

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
      subtitle: "Next.js 16 & PostgreSQL 3NF",
      description:
        "Bases de datos relacionales normalizadas con Row Level Security (RLS) y renderizado en el Edge para latencias inferiores a 20 milisegundos.",
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

      {/* Squarespace Hero Section with Monumental Typography & Device Stage */}
      <HeroMotion />

      {/* Infinite Tech & Frameworks Marquee */}
      <div className="w-full max-w-7xl mx-auto px-4 py-8 border-y border-slate-200/80 bg-white/70 backdrop-blur-md relative z-10">
        <div className="text-center mb-4 text-[11px] font-mono uppercase tracking-[0.22em] text-slate-400 font-semibold">
          Stack Tecnológico de Nivel Mundial
        </div>
        <InfiniteMarquee items={techStack} speed={30} />
      </div>

      {/* =========================================================================
          SQUARESPACE EDITORIAL SHOWCASE 1: Páginas Web de Alto Impacto
          ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-40 relative z-10 border-b border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Story Narrative */}
          <FadeInView className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <span>01 · PRESENCIA & CONVERSIÓN</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-[-0.035em] leading-[0.98] mb-6">
              Páginas web que convierten visitas{" "}
              <span className="font-serif italic font-normal text-[#021761]">
                en clientes fieles.
              </span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed mb-8">
              Creamos experiencias digitales de estándar editorial, ultra veloces y optimizadas para venta directa. Cero plantillas genéricas. Cero lentitud.
            </p>

            <ul className="space-y-4 mb-10 w-full">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">Velocidad Extrema (p99 &lt; 0.8s)</span>
                  <span className="text-xs text-slate-500 leading-normal">Optimización Core Web Vitals 99/100 alojado en Vercel Edge Network.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">SEO Semántico & Schema.org</span>
                  <span className="text-xs text-slate-500 leading-normal">Indexación garantizada con metadatos dinámicos y OpenGraph optimizado.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">Animaciones Fluidas a 120 FPS</span>
                  <span className="text-xs text-slate-500 leading-normal">Microinteracciones cinematográficas aceleradas por GPU sin caídas de frame.</span>
                </div>
              </li>
            </ul>

            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-slate-950 hover:bg-[#021761] text-white h-14 px-8 text-[12px] uppercase font-bold tracking-[0.16em] transition-all rounded-none md:rounded-xs shadow-md hover:shadow-xl cursor-pointer group"
              >
                Solicitar Diseño Web
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeInView>

          {/* Interactive Mockup Visual */}
          <FadeInView delay={0.2} className="lg:col-span-7">
            <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-3 sm:p-4 overflow-hidden group">
              {/* Browser Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <div className="px-4 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-[11px] font-mono text-slate-500">
                  https://cliente-premium.com
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>100% SEO</span>
                </div>
              </div>

              {/* Showcase Content Canvas */}
              <div className="relative rounded-xl overflow-hidden bg-slate-950 aspect-[16/10] flex flex-col justify-between p-6 sm:p-10 text-white">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                  alt="Diseño Web Editorial de Alto Rendimiento"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover opacity-35 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-widest text-slate-200 font-semibold">
                    ESTÉTICA EDITORIAL
                  </span>
                  <span className="text-xs font-mono text-slate-300">Next.js 16 + React 19</span>
                </div>

                <div className="relative z-10 max-w-lg">
                  <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                    Arquitectura visual con autoridad inmediata.
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    La primera impresión decide el 94% de la confianza en una empresa. Diseñamos para que tu marca se posicione como el referente incuestionable del mercado.
                  </p>
                </div>

                {/* Floating Metric Card */}
                <div className="relative z-10 flex items-center justify-between p-3.5 rounded-xl bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 shadow-xl max-w-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">Conversión Web</div>
                      <div className="text-base font-black text-slate-950">+284% Clientes Potenciales</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* =========================================================================
          SQUARESPACE EDITORIAL SHOWCASE 2: Sistemas Web & CRM a Medida (Inverted)
          ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-40 relative z-10 border-b border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Interactive Mockup Visual (Left on desktop) */}
          <FadeInView delay={0.2} className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative rounded-2xl border border-slate-200/90 bg-white shadow-2xl p-3 sm:p-4 overflow-hidden group">
              {/* Browser Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-300" />
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                  <span className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <div className="px-4 py-1 rounded-md bg-slate-50 border border-slate-200/60 text-[11px] font-mono text-slate-500">
                  app.avanza.dev/crm-interno
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-blue-700 font-semibold">
                  <Database className="w-3.5 h-3.5" />
                  <span>PostgreSQL 3NF</span>
                </div>
              </div>

              {/* Dashboard Canvas */}
              <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-5 sm:p-7 flex flex-col gap-5">
                {/* Metric Summary Header */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Volumen Transaccional</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-950">$184,290</span>
                    <span className="text-[10px] font-mono text-emerald-600 block mt-1">+34.2% vs mes anterior</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Pedidos Procesados</span>
                    <span className="text-xl sm:text-2xl font-black text-slate-950">1,420</span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-1">0 discrepancias</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">Latencia DB</span>
                    <span className="text-xl sm:text-2xl font-black text-emerald-600">12ms</span>
                    <span className="text-[10px] font-mono text-slate-500 block mt-1">RLS Verificado</span>
                  </div>
                </div>

                {/* Operations Data Table Preview */}
                <div className="rounded-xl bg-white border border-slate-200/80 p-4 shadow-2xs overflow-hidden">
                  <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-900">
                    <span>Flujo de Operaciones en Tiempo Real</span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                      Sincronizado vía WebSockets
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-semibold text-slate-900">Despacho Logístico #4829</span>
                      </div>
                      <span className="font-mono text-slate-500">Completado · $3,450</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-semibold text-slate-900">Facturación Automática #104</span>
                      </div>
                      <span className="font-mono text-slate-500">Emitido · $1,200</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>

          {/* Story Narrative */}
          <FadeInView className="lg:col-span-5 flex flex-col items-start order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <span>02 · GESTIÓN & ESCALA</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-[-0.035em] leading-[0.98] mb-6">
              Digitaliza tu operación y{" "}
              <span className="font-serif italic font-normal text-[#021761]">
                elimina el caos de Excel.
              </span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed mb-8">
              Centralizamos tu facturación, inventario, clientes y operaciones en una plataforma web hecha a medida para tu empresa. Seguridad de nivel bancario y sincronización en tiempo real.
            </p>

            <ul className="space-y-4 mb-10 w-full">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">PostgreSQL 3NF & Row Level Security</span>
                  <span className="text-xs text-slate-500 leading-normal">Bases de datos normalizadas con aislamiento estricto de información por rol y usuario.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">Control de Accesos & Trazabilidad</span>
                  <span className="text-xs text-slate-500 leading-normal">Auditoría completa de cada cambio, registro y acción efectuada en el sistema.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">Exportación con 1 Clic</span>
                  <span className="text-xs text-slate-500 leading-normal">Descarga instantánea de informes gerenciales a Excel o PDF en segundos.</span>
                </div>
              </li>
            </ul>

            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-slate-950 hover:bg-[#021761] text-white h-14 px-8 text-[12px] uppercase font-bold tracking-[0.16em] transition-all rounded-none md:rounded-xs shadow-md hover:shadow-xl cursor-pointer group"
              >
                Cotizar Sistema Web
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeInView>
        </div>
      </section>

      {/* =========================================================================
          SQUARESPACE EDITORIAL SHOWCASE 3: Agentes de Inteligencia Artificial & Automatización
          ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-40 relative z-10 border-b border-slate-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Story Narrative */}
          <FadeInView className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <span>03 · INTELIGENCIA & AUTOMATIZACIÓN</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-[-0.035em] leading-[0.98] mb-6">
              Automatiza tareas complejas con{" "}
              <span className="font-serif italic font-normal text-[#021761]">
                agentes de IA autónomos.
              </span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-normal leading-relaxed mb-8">
              Integramos modelos de lenguaje directamente en el corazón de tu negocio. Asistentes en WhatsApp que atienden clientes 24/7, clasifican leads y ejecutan tareas sin intervención humana.
            </p>

            <ul className="space-y-4 mb-10 w-full">
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">RAG Indexado con tu Catálogo & Políticas</span>
                  <span className="text-xs text-slate-500 leading-normal">El modelo responde con precisión absoluta basándose únicamente en los datos de tu empresa.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">Integración Oficial con WhatsApp Business</span>
                  <span className="text-xs text-slate-500 leading-normal">Respuestas automáticas, agendamiento de citas y captación de clientes las 24 horas del día.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-950 block">80% Ahorro de Tiempo Operativo</span>
                  <span className="text-xs text-slate-500 leading-normal">Libera a tu equipo de tareas mecánicas repetitivas para que se enfoquen en cerrar ventas.</span>
                </div>
              </li>
            </ul>

            <Link href="/contacto">
              <Button
                size="lg"
                className="bg-slate-950 hover:bg-[#021761] text-white h-14 px-8 text-[12px] uppercase font-bold tracking-[0.16em] transition-all rounded-none md:rounded-xs shadow-md hover:shadow-xl cursor-pointer group"
              >
                Implementar IA en tu Negocio
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </FadeInView>

          {/* Interactive Agent Terminal Visual */}
          <FadeInView delay={0.2} className="lg:col-span-7">
            <div className="relative rounded-2xl border border-slate-900 bg-slate-950 shadow-2xl p-4 sm:p-6 overflow-hidden text-slate-200 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-bold text-white tracking-wider">AI AGENT ENGINE // AVANZA</span>
                </div>
                <span className="text-[11px] text-slate-400 border border-slate-800 px-2.5 py-0.5 rounded">
                  Modelo: OpenAI GPT-4o + Vector Store
                </span>
              </div>

              {/* Streaming Execution Steps */}
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <span className="text-slate-500 block mb-1">01 // INCOMING WHATSAPP MESSAGE</span>
                  <p className="text-slate-200">
                    &ldquo;Hola, necesito cotizar un sistema de inventario para 3 almacenes en Lima.&rdquo;
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
                  <span className="text-cyan-400 block mb-1">02 // AGENT TOOL EXECUTION: queryProductCatalog()</span>
                  <p className="text-slate-400 text-[11px]">
                    &rarr; Vector query: &lsquo;inventario multi-sucursal postgresql&rsquo; · Top 3 similitudes recuperadas (score: 0.94)
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-900/90 border border-emerald-900/60 bg-emerald-950/20">
                  <span className="text-emerald-400 block mb-1">03 // AUTONOMOUS RESOLUTION DISPATCHED</span>
                  <p className="text-emerald-200">
                    &ldquo;¡Hola! Claro que sí. En AVANZA contamos con arquitecturas PostgreSQL preparadas para sincronización multi-almacén en tiempo real. He registrado tu requerimiento y te he agendado una llamada con nuestro arquitecto técnico para hoy a las 4:00 PM.&rdquo;
                  </p>
                  <div className="mt-2 pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[10px] text-emerald-400">
                    <span>Estado: Lead Calificado en CRM</span>
                    <span>Tiempo de respuesta: 1.2 segundos</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

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
            <span>MANIFIESTO DE INGENIERÍA · AVANZA STUDIO</span>
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
              Manuel Callañaupa & Magno Callañaupa
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Co-Fundadores · AVANZA AI & Software Studio
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
