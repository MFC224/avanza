"use client";

import React, { useState } from "react";
import {
  ESTIMATOR_SERVICES,
  ESTIMATOR_URGENCIAS,
  ESTIMATOR_ESCALAS,
  buildWhatsAppProposalUrl,
} from "@/lib/estimator-logic";
import { cn } from "@/lib/utils";
import { ArrowRight, MessageCircle } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function ProjectEstimator() {
  const [servicioKey, setServicioKey] = useState<"web" | "crm" | "ai" | "app">("web");
  const [urgenciaIndex, setUrgenciaIndex] = useState(0);
  const [escalaIndex, setEscalaIndex] = useState(0);

  const servicesList = [
    ESTIMATOR_SERVICES.web,
    ESTIMATOR_SERVICES.crm,
    ESTIMATOR_SERVICES.ai,
    ESTIMATOR_SERVICES.app,
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
    <section
      data-tone="ink"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-24 lg:py-36 border-t border-[var(--line-on-ink)] overflow-hidden"
      aria-label="Simulador y estimador de proyecto"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        {/* Section Heading */}
        <div className="mb-14 lg:mb-20">
          <span className="text-small text-[var(--muted-on-ink)] block mb-3 font-normal">
            Simulador de Proyecto
          </span>
          <h2 className="text-section font-normal text-[var(--paper)] tracking-tight max-w-3xl">
            Calcula tu solución y tiempo estimado de salida a producción
          </h2>
          <p className="text-body text-[var(--muted-on-ink)] mt-4 max-w-[60ch] font-normal">
            Selecciona los parámetros de tu requerimiento para proyectar tiempos de desarrollo y arquitectura recomendada.
          </p>
        </div>

        {/* 2-Column Grid: Controls & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Controls Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Solution */}
            <div>
              <span className="text-small text-[var(--muted-on-ink)] block mb-4 font-normal">
                1. Tipo de Solución
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {servicesList.map((s) => {
                  const isSelected = s.id === servicioKey;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setServicioKey(s.id as "web" | "crm" | "ai" | "app")}
                      className={cn(
                        "p-4 rounded-none border text-left transition-colors duration-200 cursor-pointer select-none",
                        isSelected
                          ? "bg-white text-black border-white"
                          : "bg-transparent text-[var(--muted-on-ink)] border-[var(--line-on-ink)] hover:text-white hover:border-neutral-500"
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-card font-normal">
                          {s.name}
                        </span>
                        <span className={cn(
                          "text-small text-xs uppercase",
                          isSelected ? "text-neutral-600" : "text-[var(--muted-on-ink)]"
                        )}>
                          {s.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Urgency */}
            <div>
              <span className="text-small text-[var(--muted-on-ink)] block mb-4 font-normal">
                2. Plazo de Entrega Objetivo
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ESTIMATOR_URGENCIAS.map((u, idx) => {
                  const isSelected = idx === urgenciaIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setUrgenciaIndex(idx)}
                      className={cn(
                        "p-4 rounded-none border text-left transition-colors duration-200 cursor-pointer select-none",
                        isSelected
                          ? "bg-white text-black border-white"
                          : "bg-transparent text-[var(--muted-on-ink)] border-[var(--line-on-ink)] hover:text-white hover:border-neutral-500"
                      )}
                    >
                      <span className="text-card font-normal block mb-1">
                        {u.label}
                      </span>
                      <span className={cn(
                        "text-small block",
                        isSelected ? "text-neutral-600" : "text-[var(--muted-on-ink)]"
                      )}>
                        {u.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Scale */}
            <div>
              <span className="text-small text-[var(--muted-on-ink)] block mb-4 font-normal">
                3. Tamaño de tu Empresa o Proyecto
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ESTIMATOR_ESCALAS.map((e, idx) => {
                  const isSelected = idx === escalaIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEscalaIndex(idx)}
                      className={cn(
                        "p-4 rounded-none border text-left transition-colors duration-200 cursor-pointer select-none",
                        isSelected
                          ? "bg-white text-black border-white"
                          : "bg-transparent text-[var(--muted-on-ink)] border-[var(--line-on-ink)] hover:text-white hover:border-neutral-500"
                      )}
                    >
                      <span className="text-card font-normal block mb-1">
                        {e.label}
                      </span>
                      <span className={cn(
                        "text-small block text-xs",
                        isSelected ? "text-neutral-600" : "text-[var(--muted-on-ink)]"
                      )}>
                        {e.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results Column (5 Cols) - Clean, direct, non-floating */}
          <div className="lg:col-span-5 border border-[var(--line-on-ink)] p-8 lg:p-10 rounded-none bg-neutral-950">
            <span className="text-small text-[var(--muted-on-ink)] block mb-6 font-normal">
              Proyección de Ingeniería
            </span>

            <div className="space-y-6 pb-8 border-b border-[var(--line-on-ink)]">
              <div>
                <span className="text-small text-[var(--muted-on-ink)] block mb-1">
                  Tiempo de Entrega
                </span>
                <span className="text-card font-normal text-[var(--paper)]">
                  {currentServicio.baseDays} ({currentUrgencia.label})
                </span>
              </div>

              <div>
                <span className="text-small text-[var(--muted-on-ink)] block mb-1">
                  Impacto Proyectado
                </span>
                <span className="text-card font-normal text-[var(--paper)]">
                  {currentServicio.roi}
                </span>
              </div>

              <div>
                <span className="text-small text-[var(--muted-on-ink)] block mb-1">
                  Entregables & Arquitectura
                </span>
                <p className="text-body text-[var(--muted-on-ink)] font-normal text-sm leading-relaxed">
                  {currentServicio.deliverable}
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-8 space-y-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent("submit_estimator", {
                    service: currentServicio.name,
                    urgency: currentUrgencia.label,
                    scale: currentEscala.label,
                  })
                }
                className="text-button w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-none font-medium transition-colors duration-200 select-none inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Estimación a WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="text-center text-small text-[var(--muted-on-ink)] text-xs font-normal">
                Respuesta directa en menos de 5 minutos. Sin compromiso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
