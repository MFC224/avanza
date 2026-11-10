"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  Layers,
  Cpu,
  BarChart2,
  ShieldCheck,
  Check,
  Code2,
  Database,
  ArrowUpRight,
} from "lucide-react";

interface TemplateProject {
  id: string;
  category: "editorial" | "crm" | "ai" | "fintech";
  categoryLabel: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  metrics: { label: string; value: string };
  gradient: string;
  previewUrl: string;
}

const TEMPLATES: TemplateProject[] = [
  {
    id: "aethelgard-private-banking",
    category: "fintech",
    categoryLabel: "FINTECH & WEALTH MANAGEMENT",
    title: "Aethelgard Wealth Terminal",
    tagline: "Plataforma de banca privada & gestión de activos",
    description:
      "Plataforma institucional con arquitectura de microservicios, analítica de portafolios en milisegundos y bóveda de autenticación biométrica.",
    techStack: ["Next.js 16", "PostgreSQL 3NF", "Supabase SSR", "Tailwind v4"],
    metrics: { label: "Latencia de Carga", value: "0.58s LCP" },
    gradient: "from-slate-900 via-[#0a1538] to-slate-900",
    previewUrl: "/servicios",
  },
  {
    id: "lumina-luxury-editorial",
    category: "editorial",
    categoryLabel: "WEB EDITORIAL & COMMERCE",
    title: "Lumina Haute Horlogerie",
    tagline: "E-commerce de estándar editorial suizo para artículos de lujo",
    description:
      "Experiencia visual cinematográfica con renderizado de texturas WebGL, tipografía dorada y checkout integrado a pasarelas internacionales.",
    techStack: ["Next.js 16", "Tailwind CSS", "Motion / Lenis", "Stripe Edge"],
    metrics: { label: "Conversión de Venta", value: "+312%" },
    gradient: "from-[#0f172a] via-[#1e1b4b] to-[#020617]",
    previewUrl: "/servicios",
  },
  {
    id: "kallpa-logistics-engine",
    category: "crm",
    categoryLabel: "SISTEMAS & CRM LOGÍSTICO",
    title: "Kallpa Fleet Orchestrator",
    tagline: "ERP de despacho de flotas & trazabilidad en tiempo real",
    description:
      "Control de rutas mediante telemetría IoT satelital, sincronización de guías de remisión electrónicas y portal de clientes automatizado.",
    techStack: ["Next.js 16", "WebSockets", "Supabase RLS", "PostgreSQL"],
    metrics: { label: "Ahorro de Combustible", value: "24.6%" },
    gradient: "from-[#022c22] via-[#064e3b] to-[#021761]",
    previewUrl: "/servicios",
  },
  {
    id: "cortex-enterprise-agent",
    category: "ai",
    categoryLabel: "AGENTES DE INTELIGENCIA ARTIFICIAL",
    title: "Cortex Neural Concierge",
    tagline: "Agente autónomo multicanal conectado a WhatsApp & CRM",
    description:
      "Calificación automática de prospectos B2B, generación de propuestas presupuestarias en PDF y agendamiento sin intervención humana.",
    techStack: ["OpenAI LLM", "pgvector RAG", "Next.js Route Handlers", "WhatsApp API"],
    metrics: { label: "Tiempo de Respuesta", value: "0.4s Inferencia" },
    gradient: "from-[#3b0764] via-[#1e1b4b] to-[#0f172a]",
    previewUrl: "/servicios",
  },
  {
    id: "novahealth-clinical-crm",
    category: "crm",
    categoryLabel: "SALUD & GESTIÓN CLÍNICA",
    title: "NovaHealth Clinical OS",
    tagline: "Sistema médico integral con historia clínica electrónica",
    description:
      "Cumplimiento estricto de protección de datos de salud, gestión de recetas digitales y portal para médicos y pacientes con notificaciones.",
    techStack: ["Next.js 16", "HIPAA/Ley 29733", "PostgreSQL", "Supabase Auth"],
    metrics: { label: "Eficiencia de Citas", value: "+45% Capacidad" },
    gradient: "from-[#082f49] via-[#0c4a6e] to-[#021761]",
    previewUrl: "/servicios",
  },
  {
    id: "apex-industrial-erp",
    category: "fintech",
    categoryLabel: "MANUFACTURA & OPERACIONES",
    title: "Apex Manufacturing ERP",
    tagline: "Control de inventario multi-almacén y órdenes de compra",
    description:
      "Trazabilidad completa de materias primas, costos unitarios en tiempo real y facturación electrónica automatizada ante entidades tributarias.",
    techStack: ["Next.js 16", "Supabase", "SQL Server / Postgres", "REST API"],
    metrics: { label: "Precisión de Stock", value: "99.9%" },
    gradient: "from-[#1c1917] via-[#292524] to-[#021761]",
    previewUrl: "/servicios",
  },
];

const CATEGORIES = [
  { id: "all", label: "TODAS LAS ARQUITECTURAS" },
  { id: "editorial", label: "WEB EDITORIAL" },
  { id: "crm", label: "SISTEMAS & CRM" },
  { id: "ai", label: "AGENTES DE IA" },
  { id: "fintech", label: "FINTECH & ERP" },
] as const;

export function TemplateCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTemplates =
    selectedCategory === "all"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <section className="w-full py-28 md:py-36 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Squarespace Standard) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <span>CATÁLOGO DE ARQUITECTURAS DE ÉLITE</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-950 tracking-[-0.04em] leading-[0.98]">
              Un estándar visual superior para{" "}
              <span className="font-serif italic font-normal text-[#021761]">
                cada modelo de negocio.
              </span>
            </h2>
          </div>

          <p className="text-slate-600 text-base md:text-lg max-w-md leading-relaxed font-normal">
            No adaptamos plantillas prehechas de WordPress. Cada arquitectura es programada desde cero con código limpio, modular y 100% de tu propiedad.
          </p>
        </div>

        {/* Filter Pills (Squarespace Minimalist Category Navigation) */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-slate-200">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-[0.14em] transition-all rounded-full cursor-pointer ${
                  isActive
                    ? "bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Templates Grid / Horizontal Card Ribbon */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group flex flex-col rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Visual Mockup Header with Gradient & UI Simulation */}
                <div
                  className={`h-64 sm:h-72 w-full bg-gradient-to-br ${template.gradient} p-6 flex flex-col justify-between text-white relative overflow-hidden group-hover:scale-[1.01] transition-transform duration-500`}
                >
                  {/* Subtle Grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />

                  {/* Top Bar inside card preview */}
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {template.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/30">
                      {template.metrics.value}
                    </span>
                  </div>

                  {/* Simulated Inner Interface Preview */}
                  <div className="relative z-10 bg-slate-950/80 backdrop-blur-xl rounded-xl p-4 border border-white/10 shadow-lg group-hover:translate-y-[-4px] transition-transform duration-300">
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-2 h-2 rounded-full bg-red-400/80" />
                      <span className="w-2 h-2 rounded-full bg-amber-400/80" />
                      <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                      <span className="text-[9px] font-mono text-slate-400 ml-2">avanzape.com/system</span>
                    </div>
                    <div className="h-2 w-3/4 bg-white/20 rounded mb-1.5" />
                    <div className="h-2 w-1/2 bg-white/10 rounded" />
                  </div>

                  {/* Bottom Metric Label */}
                  <div className="relative z-10 text-[10px] font-mono text-slate-300">
                    {template.metrics.label}
                  </div>
                </div>

                {/* Card Information Body */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors mb-1">
                      {template.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mb-3">
                      {template.tagline}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed mb-6">
                      {template.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-200">
                      {template.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <Link href="/contacto" className="w-full block">
                      <Button
                        variant="outline"
                        className="w-full border-slate-300 bg-white hover:bg-slate-950 hover:text-white text-slate-900 text-xs font-bold uppercase tracking-[0.14em] transition-all rounded-none md:rounded-xs group/btn cursor-pointer justify-between"
                      >
                        <span>Cotizar Arquitectura Similar</span>
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Banner (Squarespace Style: "Diseño galardonado") */}
        <div className="mt-16 p-8 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>ESTÁNDAR EDITORIAL CERTIFICADO</span>
            </div>
            <h4 className="text-2xl font-black tracking-tight">
              ¿Requieres una arquitectura a medida para tu empresa?
            </h4>
            <p className="text-sm text-slate-400 mt-1">
              Diseñamos sistemas y plataformas web exclusivas según tus requerimientos operativos.
            </p>
          </div>

          <Link href="/contacto" className="shrink-0">
            <Button className="bg-white hover:bg-slate-200 text-slate-950 font-bold uppercase tracking-[0.16em] text-xs px-8 py-3 rounded-none md:rounded-xs cursor-pointer shadow-lg">
              Agendar Sesión Técnica
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
