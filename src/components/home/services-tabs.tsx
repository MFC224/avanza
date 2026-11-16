"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ServiceTab {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  benefits: string[];
}

const TABS: ServiceTab[] = [
  {
    id: "web",
    label: "Páginas Web",
    title: "Páginas web de alto impacto y estándar editorial",
    subtitle: "Presencia digital que transmite autoridad instantánea y convierte visitas en clientes cualificados.",
    image: "/images/services-web.webp",
    alt: "Persona sosteniendo un teléfono móvil con una plataforma web abierta sobre una mesa clara",
    benefits: [
      "Carga instantánea en menos de 1 segundo optimizada para posicionamiento en Google.",
      "Diseño editorial a medida sin plantillas genéricas ni código innecesario.",
      "Formularios de contacto directos a WhatsApp y base de datos con protección anti-spam.",
    ],
  },
  {
    id: "crm",
    label: "Sistemas y CRM",
    title: "Sistemas web internos y CRM a medida",
    subtitle: "Centraliza tus ventas, inventarios, clientes y operaciones en una sola plataforma segura.",
    image: "/images/services-crm.webp",
    alt: "Monitor de oficina mostrando panel de control administrativo y tablas de gestión interna",
    benefits: [
      "Eliminación total del desorden en hojas de cálculo y pérdida de información.",
      "Control granular de roles y permisos con historial de auditoría inmutable.",
      "Exportación de reportes financieros y operativos a Excel y PDF con un solo clic.",
    ],
  },
  {
    id: "ai",
    label: "Agentes de IA",
    title: "Agentes autónomos de IA y automatización",
    subtitle: "Asistentes inteligentes conectados a tus bases de datos que atienden y cotizan 24/7.",
    image: "/images/services-ai.webp",
    alt: "Teléfono con conversación de mensajería empresarial abierto sobre mostrador de atención",
    benefits: [
      "Atención inmediata al segundo vía WhatsApp sin dejar clientes potenciales esperando.",
      "Calificación automática de prospectos y derivación directa a tu equipo comercial.",
      "Cero costo por turnos nocturnos con respuestas estrictas basadas en tus manuales.",
    ],
  },
  {
    id: "fintech",
    label: "Fintech y ERP",
    title: "Plataformas fintech y ERP de alta integridad",
    subtitle: "Arquitecturas financieras seguras con estándares bancarios y conciliación en tiempo real.",
    image: "/images/services-fintech.webp",
    alt: "Terminal de cobro y portátil sobre mostrador de mármol con luz matutina de ventana",
    benefits: [
      "Seguridad perimetral y cifrado de transacciones con estándares bancarios internacionales.",
      "Integración fluida con pasarelas de pago, facturación electrónica y conciliación diaria.",
      "Bases de datos relacionales en la nube con aislamiento estricto y copias de seguridad.",
    ],
  },
];

export function ServicesTabs() {
  const [activeTab, setActiveTab] = useState<string>("web");
  const currentService = TABS.find((t) => t.id === activeTab) || TABS[0];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % TABS.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = TABS.length - 1;
    } else {
      return;
    }
    e.preventDefault();
    setActiveTab(TABS[nextIndex].id);
    const targetButton = document.getElementById(`tab-${TABS[nextIndex].id}`);
    targetButton?.focus();
  };

  return (
    <section
      data-tone="paper"
      className="w-full bg-[var(--paper)] text-[var(--ink)] py-24 lg:py-36 overflow-hidden"
      aria-label="Soluciones y servicios principales"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <span className="text-small text-[var(--muted-on-paper)] block mb-3 font-normal">
            Qué Hacemos
          </span>
          <h2 className="text-section font-normal text-[var(--ink)] tracking-tight max-w-3xl">
            Soluciones de software diseñadas para el crecimiento de tu empresa
          </h2>
        </div>

        {/* Tab List */}
        <div
          role="tablist"
          aria-label="Categorías de soluciones"
          className="flex flex-wrap gap-2 sm:gap-4 border-b border-[var(--line-on-paper)] pb-4 mb-10"
        >
          {TABS.map((tab, idx) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={cn(
                  "text-button px-5 py-2.5 rounded-none transition-colors duration-200 cursor-pointer select-none",
                  isActive
                    ? "bg-[var(--brand)] text-[var(--paper)]"
                    : "bg-transparent text-[var(--muted-on-paper)] hover:text-[var(--ink)] hover:bg-neutral-100"
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panel with 0.4s crossfade */}
        <div
          role="tabpanel"
          id={`panel-${currentService.id}`}
          aria-labelledby={`tab-${currentService.id}`}
          className="relative min-h-[460px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Left Column: Image in 4:5 ratio */}
              <div className="lg:col-span-5 w-full">
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none overflow-hidden rounded-[12px] bg-neutral-900 border border-[var(--line-on-paper)]">
                  <Image
                    src={currentService.image}
                    alt={currentService.alt}
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    quality={85}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Title, Subtitle, Benefits & CTA */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <h3 className="text-section font-normal text-[var(--ink)] tracking-tight">
                  {currentService.title}
                </h3>

                <p className="text-body text-[var(--muted-on-paper)] mt-4 mb-8 max-w-[60ch]">
                  {currentService.subtitle}
                </p>

                <div className="space-y-4 mb-10">
                  {currentService.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-none flex items-center justify-center shrink-0 mt-0.5 text-[var(--brand)]">
                        <Check className="w-4 h-4" />
                      </div>
                      <p className="text-body text-[var(--ink)] leading-snug">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <Link
                    href="/contacto"
                    className="text-button inline-flex items-center justify-center px-8 py-3.5 bg-[var(--brand)] text-[var(--paper)] hover:bg-[#032085] rounded-none font-medium transition-colors duration-200 select-none shadow-xs"
                  >
                    Cotizar este servicio
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
