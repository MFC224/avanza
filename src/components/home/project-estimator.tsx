"use client";

import React, { useState } from "react";
import {
  ESTIMATOR_SERVICES,
  ESTIMATOR_URGENCIAS,
  ESTIMATOR_ESCALAS,
  buildWhatsAppProposalUrl,
} from "@/lib/estimator-logic";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type ServiceKey = "web" | "crm" | "ai";
const SERVICE_KEYS: ServiceKey[] = ["web", "crm", "ai"];

/**
 * Simulador sin recuadros (PLAN_DISENO_UNICO.md 4): las opciones son texto;
 * la elegida se marca con color pleno y subrayado.
 */
export function ProjectEstimator() {
  const [servicioKey, setServicioKey] = useState<ServiceKey>("web");
  const [urgenciaIndex, setUrgenciaIndex] = useState(0);
  const [escalaIndex, setEscalaIndex] = useState(0);

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
      id="simulador"
      data-tone="ink"
      aria-labelledby="simulador-titulo"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-[120px] lg:py-[200px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <h2 id="simulador-titulo" className="type-section max-w-3xl">
          Arma tu proyecto
        </h2>
        <p className="type-body text-[var(--muted-on-ink)] mt-6 max-w-[56ch]">
          Elige tres cosas y envíanos el resumen por WhatsApp. Te respondemos con una propuesta.
        </p>

        <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          <div className="lg:col-span-7 flex flex-col gap-14">
            <ChoiceGroup
              legend="Qué necesitas"
              options={SERVICE_KEYS.map((k) => ({ label: ESTIMATOR_SERVICES[k].name }))}
              selected={SERVICE_KEYS.indexOf(servicioKey)}
              onSelect={(i) => setServicioKey(SERVICE_KEYS[i])}
            />
            <ChoiceGroup
              legend="Para cuándo"
              options={ESTIMATOR_URGENCIAS.map((u) => ({ label: u.label, hint: u.desc }))}
              selected={urgenciaIndex}
              onSelect={setUrgenciaIndex}
            />
            <ChoiceGroup
              legend="Tamaño de tu empresa"
              options={ESTIMATOR_ESCALAS.map((e) => ({ label: e.label, hint: e.desc }))}
              selected={escalaIndex}
              onSelect={setEscalaIndex}
            />
          </div>

          <div className="lg:col-span-5" aria-live="polite">
            <p className="type-small text-[var(--muted-on-ink)]">Tu resumen</p>
            <p className="type-card mt-4">{currentServicio.name}</p>
            <p className="type-body text-[var(--muted-on-ink)] mt-2">
              {currentUrgencia.desc}, para {currentEscala.label.toLowerCase()}.
            </p>
            <p className="type-body text-[var(--muted-on-ink)] mt-6 max-w-[44ch]">
              {currentServicio.deliverable}
            </p>

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
              className="type-button mt-10 inline-flex items-center justify-center px-8 py-4 bg-[var(--paper)] text-[var(--ink)] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
            >
              Enviar por WhatsApp
            </a>
            <p className="type-small text-[var(--muted-on-ink)] mt-4">
              Sin compromiso. Te responde una persona del equipo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ChoiceGroupProps {
  legend: string;
  options: { label: string; hint?: string }[];
  selected: number;
  onSelect: (index: number) => void;
}

function ChoiceGroup({ legend, options, selected, onSelect }: ChoiceGroupProps) {
  return (
    <fieldset>
      <legend className="type-small text-[var(--muted-on-ink)]">{legend}</legend>
      <div className="mt-5 flex flex-col gap-4" role="radiogroup" aria-label={legend}>
        {options.map((option, index) => {
          const isSelected = index === selected;
          return (
            <button
              key={option.label}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(index)}
              className={cn(
                "group text-left cursor-pointer select-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]",
                isSelected ? "text-[var(--paper)]" : "text-[var(--muted-on-ink)] hover:text-[var(--paper)]"
              )}
            >
              <span
                className={cn(
                  "type-card underline-offset-[8px] decoration-1",
                  isSelected ? "underline" : "no-underline"
                )}
              >
                {option.label}
              </span>
              {option.hint && (
                <span className="type-small ml-3 text-[var(--muted-on-ink)]">{option.hint}</span>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
