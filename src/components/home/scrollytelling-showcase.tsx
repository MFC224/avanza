"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Layers,
  Cpu,
  Database,
  Globe,
  CheckCircle2,
  Lock,
  Activity,
  Server,
  Terminal,
  TrendingUp,
  BarChart3,
  Bot,
  ExternalLink,
} from "lucide-react";

interface StageData {
  id: string;
  tabLabel: string;
  tag: string;
  title: string;
  italicTitle: string;
  description: string;
  badge: string;
  metrics: { label: string; value: string; detail: string }[];
  bulletPoints: string[];
  ctaText: string;
  ctaHref: string;
}

const STAGES: StageData[] = [
  {
    id: "editorial",
    tabLabel: "01 WEB EDITORIAL",
    tag: "01 · ALTA CONVERSIÓN & ESTÁNDAR AWWWARDS",
    title: "Plataformas web que transforman visitas en",
    italicTitle: "clientes leales y facturación directa.",
    description:
      "Diseño editorial suizo con rendimiento extremo. Optimizadas para velocidad de carga sub-segundo, jerarquía visual de lujo y flujos de conversión calibrados para multiplicar tus ventas.",
    badge: "Core Web Vitals 99/100 · 0.6s LCP",
    metrics: [
      { label: "Tiempo de Carga (LCP)", value: "0.6s", detail: "Edge Vercel Global" },
      { label: "Tasa de Conversión", value: "+284%", detail: "Optimizado en checkout" },
      { label: "Puntaje Lighthouse", value: "99/100", detail: "SEO + Accesibilidad" },
    ],
    bulletPoints: [
      "Arquitectura Next.js 16 con Server Components y Streaming SSR",
      "Tipografía editorial curada con espaciado matemático áureo",
      "Microinteracciones a 120 FPS aceleradas por hardware GPU",
      "Totalmente responsive con adaptación dinámica por dispositivo",
    ],
    ctaText: "Cotizar Plataforma Web",
    ctaHref: "/contacto",
  },
  {
    id: "crm-systems",
    tabLabel: "02 CRM & SISTEMAS CLOUD",
    tag: "02 · ARQUITECTURA EMPRESARIAL 3NF",
    title: "Sistemas operativos y CRM a medida para",
    italicTitle: "controlar cada sol, lead y operación interna.",
    description:
      "Elimina las hojas de cálculo dispersas y el software rígido. Construimos tu propia plataforma de gestión con flujos personalizados, roles jerárquicos y analítica en tiempo real.",
    badge: "PostgreSQL 3NF · 12ms Latency RLS",
    metrics: [
      { label: "Latencia de Consulta", value: "12ms", detail: "Supabase Postgres 3NF" },
      { label: "Tiempo Operativo Ahorrado", value: "65%", detail: "Procesos automatizados" },
      { label: "Disponibilidad SLA", value: "99.98%", detail: "Respaldo continuo 24/7" },
    ],
    bulletPoints: [
      "Bases de datos relacionales normalizadas en 3FN con Row Level Security",
      "Pipelines de ventas estilo Kanban interactivo con WebSockets en vivo",
      "Módulos financieros con emisión de comprobantes y conciliación",
      "Control granular de permisos por roles, sedes y departamentos",
    ],
    ctaText: "Diseñar Sistema a Medida",
    ctaHref: "/contacto",
  },
  {
    id: "ai-agents",
    tabLabel: "03 AGENTES IA AUTÓNOMOS",
    tag: "03 · AUTOMATIZACIÓN NEURAL 24/7",
    title: "Agentes inteligentes que responden consultas,",
    italicTitle: "califican leads y ejecutan tareas sin descanso.",
    description:
      "Modelos de lenguaje avanzados conectados a la base de conocimiento de tu empresa. Atienden prospectos por WhatsApp y web en segundos, generando cotizaciones formales al instante.",
    badge: "Inferencia LLM 0.4s · RAG Vectorial",
    metrics: [
      { label: "Tiempo de Respuesta", value: "0.4s", detail: "Streaming de tokens" },
      { label: "Disponibilidad de Atención", value: "24/7", detail: "Multicanal WhatsApp" },
      { label: "Resolución Autónoma", value: "88%", detail: "Consultas sin intervención" },
    ],
    bulletPoints: [
      "Embeddings vectoriales sobre catálogos, políticas y bases de datos",
      "Integración nativa con WhatsApp Business API, CRM y correo corporativo",
      "Generación automática de presupuestos formales y agendas en Google Calendar",
      "Auditoría continua de conversaciones y trazabilidad de decisiones",
    ],
    ctaText: "Implementar Agente con IA",
    ctaHref: "/contacto",
  },
  {
    id: "cloud-sovereignty",
    tabLabel: "04 CLOUD & SOBERANÍA TOTAL",
    tag: "04 · PROPIEDAD TOTAL & CERO LOCK-IN",
    title: "Arquitectura escalable en el Edge con",
    italicTitle: "código 100% tuyo sin licencias mensuales cautivas.",
    description:
      "A diferencia de las plataformas cautivas que te cobran suscripciones interminables, en AVANZA todo el código fuente, la propiedad intelectual y las credenciales te pertenecen desde el día uno.",
    badge: "100% Soberanía Tecnológica · Cero Lock-In",
    metrics: [
      { label: "Propiedad de Código", value: "100%", detail: "Cesión legal total" },
      { label: "Costo por Licencia", value: "$0/mes", detail: "Sin comisiones cautivas" },
      { label: "Nodos Globales Edge", value: "300+", detail: "Vercel / Cloudflare" },
    ],
    bulletPoints: [
      "Contrato legal con cesión absoluta de derechos de autor y patentes",
      "Infraestructura Cloud desplegada en tus propias cuentas corporativas",
      "Documentación técnica de arquitectura para que cualquier equipo continúe",
      "Auditorías de seguridad y encriptación de grado bancario TLS 1.3",
    ],
    ctaText: "Hablar con Arquitecto Lead",
    ctaHref: "/contacto",
  },
];

export function ScrollytellingShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  // Track vertical scroll progress across the multi-viewport container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate the current active stage based on scroll percentage (4 stages: [0-0.25], [0.25-0.5], [0.5-0.75], [0.75-1.0])
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      let stage = 0;
      if (latest < 0.28) stage = 0;
      else if (latest < 0.54) stage = 1;
      else if (latest < 0.8) stage = 2;
      else stage = 3;

      setActiveStageIndex(stage);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const currentStage = STAGES[activeStageIndex];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360vh] bg-slate-950 text-white selection:bg-blue-500/30"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Ambient Radial Gradient Spotlights */}
      <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[450px] bg-emerald-500/10 blur-[180px] rounded-full" />
      </div>

      {/* Pinned Stage Container (Awwwards / Squarespace Standard) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-12 z-10 max-w-7xl mx-auto">
        {/* Header / Tab Navigation (Clickable + Synchronized with Scroll) */}
        <div className="w-full flex flex-col items-center gap-4 pt-2">
          {/* Section Master Label */}
          <div className="flex items-center gap-2.5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.28em] text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>SISTEMAS & ARQUITECTURAS EN ACCIÓN · AVANZA ENGINE</span>
          </div>

          {/* Segmented Interactive Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-2xl">
            {STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.16em] transition-all rounded-full cursor-pointer ${
                    isActive
                      ? "text-slate-950 bg-white shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {stage.tabLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Central Stage: High-Fidelity Simulated Browser Window & Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto w-full">
          {/* Left Column: Dynamic Narrative & Metrics */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-widest mb-4">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentStage.tag}</span>
                </div>

                {/* Monumental Editorial Heading */}
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-[-0.03em] text-white leading-[1.08] mb-4">
                  {currentStage.title}{" "}
                  <span className="font-serif italic font-normal text-blue-400">
                    {currentStage.italicTitle}
                  </span>
                </h3>

                {/* Descriptive Body */}
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {currentStage.description}
                </p>

                {/* Key Architectural Bullet Points */}
                <ul className="space-y-2.5 mb-8 w-full border-t border-white/10 pt-5">
                  {currentStage.bulletPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA Button */}
                <div className="flex items-center gap-4">
                  <Link href={currentStage.ctaHref}>
                    <Button className="bg-white hover:bg-slate-200 text-slate-950 font-bold uppercase tracking-[0.16em] text-[11px] px-6 py-2.5 rounded-none md:rounded-xs shadow-md transition-all cursor-pointer group">
                      <span>{currentStage.ctaText}</span>
                      <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <div className="text-[11px] font-mono text-slate-400">
                    Sprint 1 en 7 a 14 días
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: The Simulated Browser Window / Live Interactive Stage */}
          <div className="lg:col-span-7 w-full">
            <div className="relative rounded-2xl bg-slate-900/90 border border-white/15 p-1 shadow-2xl backdrop-blur-2xl overflow-hidden ring-1 ring-white/10">
              {/* Window Chrome / Title Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-white/10 rounded-t-xl">
                {/* Traffic Light Window Controls */}
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>

                {/* Simulated URL bar */}
                <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400 max-w-xs sm:max-w-md w-full justify-center">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span className="truncate">https://avanzape.com/engine/{currentStage.id}</span>
                </div>

                {/* Active Latency Badge */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>120 FPS</span>
                </div>
              </div>

              {/* Viewport Content Area: Dynamic Live Mockups per Stage */}
              <div className="p-4 sm:p-6 bg-slate-950 min-h-[380px] sm:min-h-[440px] flex flex-col justify-between relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {/* STAGE 01: Web Editorial */}
                  {activeStageIndex === 0 && (
                    <motion.div
                      key="stage-0"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col justify-between h-full space-y-6"
                    >
                      {/* Top Banner */}
                      <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-400 font-bold">
                            LUXURY COMMERCE · LIVE PREVIEW
                          </span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                            99/100 SPEED
                          </span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
                          Maison Chronométrie Suisse
                        </h4>
                        <p className="text-xs text-slate-400 max-w-md">
                          Plataforma editorial con renderizado en milisegundos, catálogo interactivo en WebGL y pasarela de pago instantánea.
                        </p>
                      </div>

                      {/* Live Metric Cards Grid */}
                      <div className="grid grid-cols-3 gap-3">
                        {currentStage.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col"
                          >
                            <span className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                              {m.label}
                            </span>
                            <span className="text-xl sm:text-2xl font-black text-white">
                              {m.value}
                            </span>
                            <span className="text-[9px] font-mono text-emerald-400 mt-1">
                              {m.detail}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Simulated Product / Storefront Showcase */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              Colección Calibre Royal 2026
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              Checkout con Apple Pay / Tarjetas / Yape
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-emerald-400 block">
                            S/ 14,850.00
                          </span>
                          <span className="text-[9px] text-slate-500 font-mono">
                            Stock Verificado
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 02: CRM & Sistemas Cloud */}
                  {activeStageIndex === 1 && (
                    <motion.div
                      key="stage-1"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col justify-between h-full space-y-6"
                    >
                      {/* Dashboard Header Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div>
                          <span className="text-xs font-mono font-bold text-white block">
                            PANEL DE CONTROL CORPORATIVO · OPERACIONES
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Supabase Enterprise · Multi-Tenant RLS
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[10px] font-mono text-emerald-400">Sincronizado</span>
                        </div>
                      </div>

                      {/* 3NF Pipeline Analytics */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Facturación Mensual</span>
                          <span className="text-xl sm:text-2xl font-black text-white">S/ 482,900</span>
                          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3" /> +28.4% vs mes previo
                          </span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Deals en Pipeline</span>
                          <span className="text-xl sm:text-2xl font-black text-white">142</span>
                          <span className="text-[10px] font-mono text-blue-400 mt-1 block">94.2% Tasa de Cierre</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] font-mono text-slate-400 uppercase block">Latencia Postgres</span>
                          <span className="text-xl sm:text-2xl font-black text-white">12ms</span>
                          <span className="text-[10px] font-mono text-emerald-400 mt-1 block">3NF Optimizado</span>
                        </div>
                      </div>

                      {/* Live Transaction / Deal Feed */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                          ÚLTIMOS MOVIMIENTOS EN VIVO (WEBSOCKETS)
                        </span>
                        <div className="space-y-1.5">
                          {[
                            { client: "Grupo Minero del Sur", action: "Contrato firmado & O.C. generada", amount: "S/ 120,000", time: "Hace 2m" },
                            { client: "Inversiones Retail SAC", action: "Comprobante emitido automáticamente", amount: "S/ 45,500", time: "Hace 14m" },
                            { client: "Consorcio Logístico Andino", action: "Pipeline movido a: En Producción", amount: "S/ 88,000", time: "Hace 32m" },
                          ].map((deal, i) => (
                            <div
                              key={i}
                              className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between text-xs"
                            >
                              <div>
                                <span className="font-bold text-white block">{deal.client}</span>
                                <span className="text-[10px] text-slate-400">{deal.action}</span>
                              </div>
                              <div className="text-right">
                                <span className="font-mono font-bold text-emerald-400 block">{deal.amount}</span>
                                <span className="text-[9px] text-slate-500 font-mono">{deal.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 03: Agentes IA Autónomos */}
                  {activeStageIndex === 2 && (
                    <motion.div
                      key="stage-2"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col justify-between h-full space-y-4"
                    >
                      {/* Terminal Header */}
                      <div className="p-3 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-mono font-bold text-white">
                            AVANZA NEURAL AGENT · REASONING LOOP v4
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          0.4s Inferencia
                        </span>
                      </div>

                      {/* Simulated Interactive Chat Stream */}
                      <div className="space-y-3 font-mono text-xs">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                          <span className="text-blue-400 font-bold block mb-1">
                            [Prospecto vía WhatsApp +51 920 441 XXX]:
                          </span>
                          "Buenas tardes, somos una constructora y requerimos un portal de compras con aprobación de órdenes y facturación electrónica. ¿Tienen disponibilidad y cotización estimada?"
                        </div>

                        <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/30 text-purple-200">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                            <span className="text-purple-400 font-bold">
                              [Agente Autónomo AVANZA · RAG Vectorial]:
                            </span>
                          </div>
                          "¡Hola! Sí, contamos con arquitecturas validadas en Next.js y PostgreSQL para portales de compras con flujos de aprobación multinivel. Con metodología SCRUM entregamos el Sprint 1 funcional en 10 días hábiles. He preparado un desglose preliminar y enlace a reunión con nuestro Lead Architect..."
                        </div>
                      </div>

                      {/* Tool Calling Simulation */}
                      <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Tool Executed: `crm.createLead()` &amp; `pdf.generateProposal()`</span>
                        </div>
                        <span className="text-[9px] text-slate-400">Retorno: 200 OK</span>
                      </div>
                    </motion.div>
                  )}

                  {/* STAGE 04: Cloud & Soberanía Total */}
                  {activeStageIndex === 3 && (
                    <motion.div
                      key="stage-3"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col justify-between h-full space-y-6"
                    >
                      {/* Top Security Banner */}
                      <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/50 to-slate-900 border border-blue-500/30">
                        <div className="flex items-center gap-2 mb-2 text-blue-400 text-xs font-mono font-bold">
                          <Shield className="w-4 h-4" />
                          <span>GARANTÍA DE SOBERANÍA Y PROPIEDAD INTELECTUAL</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-black text-white mb-1">
                          Código Fuente 100% de Tu Propiedad
                        </h4>
                        <p className="text-xs text-slate-400">
                          Al finalizar cada Sprint, los repositorios GitHub, bases de datos Supabase y credenciales Cloud son transferidos formalmente a tu empresa.
                        </p>
                      </div>

                      {/* Global Edge Node Ping Map */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {[
                          { region: "Lima (LIM)", ping: "14ms", status: "Óptimo" },
                          { region: "Virginia (IAD)", ping: "22ms", status: "Edge Core" },
                          { region: "Frankfurt (FRA)", ping: "78ms", status: "Activo" },
                          { region: "Singapur (SIN)", ping: "140ms", status: "Global CDN" },
                        ].map((node, i) => (
                          <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/10 text-center">
                            <span className="text-[10px] font-mono text-slate-400 block">{node.region}</span>
                            <span className="text-base font-mono font-bold text-emerald-400 block my-0.5">{node.ping}</span>
                            <span className="text-[9px] text-slate-500 font-mono">{node.status}</span>
                          </div>
                        ))}
                      </div>

                      {/* Legal Warranty Box */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Lock className="w-5 h-5 text-emerald-400" />
                          <div>
                            <span className="text-xs font-bold text-white block">
                              Contrato con Cláusula de Cesión Patrimonial
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              Amparado bajo el Decreto Legislativo N° 822 (Derechos de Autor)
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded font-bold">
                          Certificado
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Footer of the Pinned Section: Interactive Scroll Scrub Indicator */}
        <div className="w-full flex items-center justify-between border-t border-white/10 pt-4 text-[11px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold">0{activeStageIndex + 1}</span>
            <span>/</span>
            <span>04</span>
            <span className="hidden sm:inline text-slate-500">· Desliza para explorar cada fase</span>
          </div>

          <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
            />
          </div>

          <div className="text-right text-[10px] text-slate-500">
            AVANZA SOFTWARE STUDIO © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
