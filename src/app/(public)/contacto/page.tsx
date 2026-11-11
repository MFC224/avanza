"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { submitContactForm } from "./actions";
import { ContactoFaq } from "./contacto-faq";
import { ContactoDirectChannels } from "./contacto-direct-channels";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/site/reveal";
import { detectUserCountry, COUNTRIES, CountryInfo } from "@/lib/country-detector";
import {
  MessageCircle,
  Send,
  CheckCircle2,
} from "lucide-react";

const SERVICES = [
  { id: "Página Web de Alto Impacto", label: "Página Web" },
  { id: "Sistema Web / CRM Interno", label: "Sistema Web & CRM" },
  { id: "Solución de Inteligencia Artificial", label: "Agentes con IA" },
  { id: "Aplicación Móvil iOS / Android", label: "App Móvil" },
];

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [servicio, setServicio] = useState("Página Web de Alto Impacto");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [pais, setPais] = useState("PE");
  const [consentGiven, setConsentGiven] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<CountryInfo | null>(null);

  useEffect(() => {
    const detected = detectUserCountry();
    setDetectedCountry(detected);
    setPais(detected.code);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    if (!consentGiven) {
      setStatus("error");
      setErrorMessage(
        "Debes aceptar la Política de Privacidad conforme a la Ley N° 29733 para enviar tus datos."
      );
      setLoading(false);
      return;
    }

    const selectedCountryObj = COUNTRIES.find((c) => c.code === pais) || COUNTRIES[0];
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("contacto", contacto);
    formData.append("servicio", servicio);
    formData.append("pais", `${selectedCountryObj.name} (${selectedCountryObj.dialCode})`);
    formData.append("mensaje", mensaje);

    const res = await submitContactForm(formData);
    if (res.success) {
      setStatus("success");
      setNombre("");
      setContacto("");
      setMensaje("");
    } else {
      setStatus("error");
      setErrorMessage(res.error || "Hubo un error al enviar tus datos.");
    }
    setLoading(false);
  }

  const waUrl = `https://wa.me/51942498841?text=${encodeURIComponent(
    `Hola AVANZA, soy ${nombre || "un cliente interesado"} y quisiera cotizar: ${servicio}.`
  )}`;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Contact Form & Direct Channels (Paper) */}
      <Section tone="paper">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <SectionHeading
                eyebrow="Contacto Directo"
                title="Hablemos de tus requerimientos de software"
                description="Sin intermediarios ni demoras burocráticas. Déjanos tus datos mínimos y uno de nuestros directores te responderá hoy mismo."
              />
              <ContactoDirectChannels />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="border border-[var(--line-on-paper)] p-8 lg:p-10 bg-white">
                <h3 className="text-section font-normal text-[var(--ink)] mb-2">
                  Cuéntanos tu proyecto
                </h3>
                <p className="text-small text-[var(--muted-on-paper)] mb-8 font-normal">
                  Completa los datos y te enviamos un cronograma y presupuesto en menos de 24 horas.
                </p>

                {status === "success" && (
                  <div className="mb-6 p-4 border border-emerald-300 bg-emerald-50 text-emerald-900 text-small flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>¡Solicitud recibida! Magno o Manuel te responderán en breve.</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-900 text-small">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="_honey"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden opacity-0 absolute -z-10 pointer-events-none"
                    aria-hidden="true"
                  />

                  <div>
                    <label className="text-small text-[var(--muted-on-paper)] block mb-2 font-normal">
                      1. Tipo de solución requerida
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SERVICES.map((item) => {
                        const isSelected = servicio === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setServicio(item.id)}
                            className={`p-3 text-small text-left border transition-colors cursor-pointer ${
                              isSelected
                                ? "border-black bg-black text-white font-medium"
                                : "border-[var(--line-on-paper)] bg-white text-[var(--ink)] hover:border-black"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nombre" className="text-small text-[var(--muted-on-paper)] block mb-1.5 font-normal">
                      2. Nombre o Empresa *
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. Carlos Mendoza o Kallpa SAC"
                      required
                      autoComplete="name"
                      className="w-full h-12 px-4 border border-[var(--line-on-paper)] text-[var(--ink)] text-body focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="pais" className="text-small text-[var(--muted-on-paper)] font-normal">
                        3. País de contacto *
                      </label>
                      {detectedCountry && (
                        <span className="text-small text-[var(--muted-on-paper)] font-normal">
                          {detectedCountry.flag} {detectedCountry.name}
                        </span>
                      )}
                    </div>
                    <select
                      id="pais"
                      name="pais"
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                      className="w-full h-12 px-4 border border-[var(--line-on-paper)] bg-white text-[var(--ink)] text-body focus:outline-none focus:border-black cursor-pointer"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name} ({c.dialCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contacto" className="text-small text-[var(--muted-on-paper)] block mb-1.5 font-normal">
                      4. WhatsApp o Correo Electrónico *
                    </label>
                    <input
                      id="contacto"
                      name="contacto"
                      value={contacto}
                      onChange={(e) => setContacto(e.target.value)}
                      placeholder="Ej. +51 987 654 321 o carlos@empresa.com"
                      required
                      autoComplete="tel email"
                      className="w-full h-12 px-4 border border-[var(--line-on-paper)] text-[var(--ink)] text-body focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="text-small text-[var(--muted-on-paper)] block mb-1.5 font-normal">
                      5. Alcance o notas adicionales (opcional)
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={3}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      placeholder="Describe requerimientos específicos o fechas objetivo..."
                      className="w-full p-4 border border-[var(--line-on-paper)] text-[var(--ink)] text-body focus:outline-none focus:border-black resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 border border-[var(--line-on-paper)] bg-neutral-50">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded-none text-black focus:ring-0 border-neutral-400 cursor-pointer"
                      required
                    />
                    <label htmlFor="consent" className="text-small text-[var(--muted-on-paper)] leading-relaxed cursor-pointer select-none font-normal">
                      He leído y acepto la{" "}
                      <Link href="/privacidad" target="_blank" className="text-[var(--ink)] underline hover:text-black">
                        Política de Privacidad
                      </Link>{" "}
                      y autorizo el tratamiento de mis datos personales para fines de cotización conforme a la <strong>Ley N° 29733</strong> de la República del Perú.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-13 px-8 bg-[var(--brand)] hover:bg-[#032085] text-white text-button transition-colors cursor-pointer flex items-center justify-center gap-2 select-none"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? "Enviando Solicitud..." : "Solicitar cotización técnica"}</span>
                  </button>

                  <div className="pt-2 text-center">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-small text-[var(--brand)] hover:underline inline-flex items-center gap-2 font-normal"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Escribir directamente por WhatsApp con un clic</span>
                    </a>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* 2. FAQ Accordion (Ink) */}
      <Section tone="ink">
        <Reveal>
          <SectionHeading
            tone="ink"
            eyebrow="Resolución de Dudas"
            title="Preguntas frecuentes antes de iniciar"
            description="Respuestas directas sobre nuestros estándares de desarrollo, contratos y entregas."
          />
        </Reveal>

        <ContactoFaq />
      </Section>
    </div>
  );
}
