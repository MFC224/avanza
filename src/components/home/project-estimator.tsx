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
import {
  ESTIMATOR_SERVICES,
  ESTIMATOR_URGENCIAS,
  ESTIMATOR_ESCALAS,
  buildWhatsAppProposalUrl,
} from "@/lib/estimator-logic";

export function ProjectEstimator() {
  const [servicioKey, setServicioKey] = useState<"web" | "crm" | "ai" | "app">("web");
  const [urgenciaIndex, setUrgenciaIndex] = useState(0);
  const [escalaIndex, setEscalaIndex] = useState(0);

  const servicesList = [
    { ...ESTIMATOR_SERVICES.web, icon: Laptop },
    { ...ESTIMATOR_SERVICES.crm, icon: Layers },
    { ...ESTIMATOR_SERVICES.ai, icon: Bot },
    { ...ESTIMATOR_SERVICES.app, icon: Smartphone },
  ];

  const currentServicio = ESTIMATOR_SERVICES[servicioKey];
  const currentUrgencia = ESTIMATOR_URGENCIAS[urgenciaIndex];
  const currentEscala = ESTIMATOR_ESCALAS[escalaIndex];

  const whatsappUrl = buildWhatsAppProposalUrl(
    currentServicio.name,
    currentUrgencia.label,
    currentUrgencia.desc,
    currentEscala.label
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-36 relative z-10 border-t border-slate-200/70">
      <FadeInView className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 text-[11px] font-mono uppercase tracking-[0.18em] font-semibold mb-6">
          <Calculator className="w-3.5 h-3.5 text-[#021761]" /> Simulador de Proyecto
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-[-0.035em]">
          Calcula tu solución y tiempo de salida
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
          Selecciona tus requerimientos para obtener una proyección instantánea de tiempos, arquitectura y retorno estimado.
        </p>
      </FadeInView>

      <FadeInView delay={0.2}>
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xs">
            {/* Step 1: Solution */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
                1. Selecciona el Tipo de Solución
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((s) => {
                  const Icon = s.icon;
                  const isSelected = s.id === servicioKey;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setServicioKey(s.id as "web" | "crm" | "ai" | "app")}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-[#021761] border-[#021761] text-white shadow-sm"
                          : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-xl ${isSelected ? "bg-white/20 text-white" : "bg-white border border-slate-200 text-slate-600"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white font-medium" : "bg-slate-200/80 text-slate-600"}`}>
                          {s.badge}
                        </span>
                      </div>
                      <span className={`font-bold text-sm ${isSelected ? "text-white" : "text-slate-900"}`}>
                        {s.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Urgency */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
                2. Plazo de Entrega Objetivo
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_URGENCIAS.map((u, idx) => {
                  const isSelected = idx === urgenciaIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setUrgenciaIndex(idx)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#021761] border-[#021761] text-white shadow-sm"
                          : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold text-sm ${isSelected ? "text-white" : "text-slate-900"}`}>
                          {u.label}
                        </span>
                        <Zap className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-slate-400"}`} />
                      </div>
                      <span className={`text-xs block ${isSelected ? "text-slate-200" : "text-slate-500"}`}>{u.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Scale */}
            <div>
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-3">
                3. Tamaño de tu Empresa o Proyecto
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {ESTIMATOR_ESCALAS.map((e, idx) => {
                  const isSelected = idx === escalaIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setEscalaIndex(idx)}
                      className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-[#021761] border-[#021761] text-white shadow-2xs"
                          : "bg-slate-50/70 border-slate-200/80 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <span className={`font-semibold text-xs block mb-0.5 ${isSelected ? "text-white" : "text-slate-900"}`}>{e.label}</span>
                      <span className={`text-[10px] block ${isSelected ? "text-slate-200" : "text-slate-500"}`}>{e.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Real-time Results Card (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-slate-100/60 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-600 font-bold">
                PROYECCIÓN TÉCNICA
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Disponible</span>
              </span>
            </div>

            <div className="space-y-4 mb-8">
              {/* Delivery Time */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[#021761]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Tiempo de Entrega</span>
                    <span className="text-base font-black text-slate-950">{currentServicio.baseDays}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono uppercase bg-slate-200/80 text-slate-800 px-2.5 py-1 rounded-full font-bold">
                  {currentUrgencia.label}
                </span>
              </div>

              {/* Estimated Impact / ROI */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 block font-medium">Impacto Proyectado</span>
                  <span className="text-sm font-bold text-emerald-700">{currentServicio.roi}</span>
                </div>
              </div>

              {/* Architecture Included */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#021761]" />
                  <span className="font-semibold text-slate-800">Stack & Entregables de Élite:</span>
                </div>
                <p className="text-xs text-slate-800 font-mono mt-1 font-medium">
                  {currentServicio.deliverable}
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <Button
                size="lg"
                className="w-full bg-[#021761] hover:bg-[#082282] text-white font-bold py-6 rounded-full shadow-md transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enviar Estimación a WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>

            <p className="text-center text-[11px] text-slate-500 mt-4 font-mono">
              Respuesta directa de Magno Alomía en &lt; 5 minutos. Sin compromiso.
            </p>
          </div>
        </div>
      </FadeInView>
    </section>
  );
}
