"use client";

import { useState } from "react";
import { FadeInView } from "@/components/ui/fade-in-view";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  Laptop,
  Layers,
  Bot,
  Smartphone,
  Zap,
  Clock,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  MessageCircle
} from "lucide-react";

export function ProjectEstimator() {
  const [servicioIndex, setServicioIndex] = useState(0);
  const [urgenciaIndex, setUrgenciaIndex] = useState(0);
  const [escalaIndex, setEscalaIndex] = useState(0);

  const servicios = [
    {
      id: "web",
      name: "Página Web de Alto Impacto",
      icon: Laptop,
      badge: "Ventas & Conversión",
      baseDays: "7 a 10 días",
      roi: "+180% en leads calificados",
      deliverable: "Next.js 16 + SEO + Animaciones Awwwards",
    },
    {
      id: "crm",
      name: "Sistema Web / CRM Interno",
      icon: Layers,
      badge: "Operación & Gestión",
      baseDays: "12 a 14 días",
      roi: "Ahorro de ~45 hrs manuales / mes",
      deliverable: "PostgreSQL 3NF + Roles + Dashboard",
    },
    {
      id: "ai",
      name: "Automatización con Agentes IA",
      icon: Bot,
      badge: "Productividad x10",
      baseDays: "10 a 14 días",
      roi: "Atención 24/7 sin personal extra",
      deliverable: "Pipelines LLM + RAG + WhatsApp Bot",
    },
    {
      id: "app",
      name: "Aplicación Móvil iOS & Android",
      icon: Smartphone,
      badge: "Retención Móvil",
      baseDays: "14 a 21 días",
      roi: "Fidelización continua de clientes",
      deliverable: "Flutter / React Native + Notificaciones",
    },
  ];

  const urgencias = [
    { label: "Sprint Express", desc: "Entrega en 7 - 14 días", speedBonus: "Prioridad Máxima" },
    { label: "Sprint Estándar", desc: "Entrega en 3 - 4 semanas", speedBonus: "Fases Graduales" },
  ];

  const escalas = [
    { label: "Pyme / Negocio Local", desc: "1 a 10 colaboradores" },
    { label: "Empresa en Crecimiento", desc: "10 a 50 colaboradores" },
    { label: "Corporativo", desc: "+50 colaboradores o multi-sucursal" },
  ];

  const currentServicio = servicios[servicioIndex];
  const currentUrgencia = urgencias[urgenciaIndex];
  const currentEscala = escalas[escalaIndex];

  // Dynamic WhatsApp message URL generator
  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hola Magno! Usé el Simulador de Proyectos de AVANZA:\n\n` +
      `• Solución: ${currentServicio.name}\n` +
      `• Modalidad: ${currentUrgencia.label} (${currentUrgencia.desc})\n` +
      `• Tamaño: ${currentEscala.label}\n\n` +
      `Me gustaría coordinar una cotización formal y los siguientes pasos.`
    );
    return `https://wa.me/51942498841?text=${text}`;
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10 border-t border-slate-800/60">
      <FadeInView className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <Calculator className="w-3.5 h-3.5" /> Simulador de Proyecto
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Calcula tu solución y tiempo de salida
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
          Selecciona tus requerimientos para obtener una proyección instantánea de tiempos, arquitectura y retorno estimado.
        </p>
      </FadeInView>

      <FadeInView delay={0.2}>
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl">
            {/* Step 1: Solution */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                1. Selecciona el Tipo de Solución
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicios.map((s, idx) => {
                  const Icon = s.icon;
                  const isSelected = idx === servicioIndex;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setServicioIndex(idx)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-indigo-600/15 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-400"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                          {s.badge}
                        </span>
                      </div>
                      <span className={`font-bold text-sm ${isSelected ? "text-white" : "text-slate-300"}`}>
                        {s.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Urgency */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                2. Plazo de Entrega Objetivo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {urgencias.map((u, idx) => {
                  const isSelected = idx === urgenciaIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setUrgenciaIndex(idx)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-cyan-500/15 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold text-sm ${isSelected ? "text-white" : "text-slate-300"}`}>
                          {u.label}
                        </span>
                        <Zap className={`w-3.5 h-3.5 ${isSelected ? "text-cyan-400" : "text-slate-600"}`} />
                      </div>
                      <span className="text-xs text-slate-400 block">{u.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Scale */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block mb-3">
                3. Tamaño de tu Empresa o Proyecto
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {escalas.map((e, idx) => {
                  const isSelected = idx === escalaIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setEscalaIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-purple-500/15 border-purple-500 text-white"
                          : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <span className="font-semibold text-xs block mb-0.5">{e.label}</span>
                      <span className="text-[10px] text-slate-500 block">{e.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Results Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950/40 via-slate-900/60 to-slate-950 border border-indigo-500/30 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                PROYECCIÓN TÉCNICA
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Disponible</span>
              </span>
            </div>

            <div className="space-y-5 mb-8">
              {/* Delivery Time */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Tiempo de Entrega</span>
                    <span className="text-base font-black text-white">{currentServicio.baseDays}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-indigo-950 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">
                  {currentUrgencia.label}
                </span>
              </div>

              {/* Estimated Impact / ROI */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Impacto Proyectado</span>
                  <span className="text-sm font-bold text-emerald-300">{currentServicio.roi}</span>
                </div>
              </div>

              {/* Architecture Included */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-slate-300">Stack & Entregables de Élite:</span>
                </div>
                <p className="text-xs text-indigo-200 font-mono mt-1">
                  {currentServicio.deliverable}
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-6 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Estimación a WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            <p className="text-center text-[11px] text-slate-500 mt-3 font-mono">
              Respuesta directa de Magno Alomía en &lt; 5 minutos. Sin compromiso.
            </p>
          </div>
        </div>
      </FadeInView>
    </section>
  );
}
