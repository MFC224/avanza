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
import { CheckCircle2 } from "lucide-react";

const SERVICES = [
  { id: "Página web", label: "Página web" },
  { id: "Sistema a medida", label: "Sistema a medida" },
  { id: "Automatización con IA", label: "Automatización con IA" },
  { id: "Aún no lo sé", label: "Aún no lo sé" },
];

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [servicio, setServicio] = useState("Página web");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [pais, setPais] = useState("PE");
  const [consentGiven, setConsentGiven] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<CountryInfo | null>(null);

  useEffect(() => {
    const detected = detectUserCountry();
    const timer = setTimeout(() => {
      setDetectedCountry(detected);
      setPais(detected.code);
    }, 0);
    return () => clearTimeout(timer);
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
    const honey = e.currentTarget.elements.namedItem("_honey") as HTMLInputElement | null;
    const formData = new FormData();
    // El campo trampa antes no se enviaba, así que el filtro antispam nunca actuaba.
    formData.append("_honey", honey?.value ?? "");
    formData.append("consentimiento", "si");
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
      <Section tone="paper" className="pt-[96px] lg:pt-[140px]">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 flex flex-col">
            <Reveal>
              <SectionHeading
                as="h1"
                title="Cotiza tu proyecto"
                description="Déjanos tus datos y te responde uno de los fundadores. En menos de 24 horas te enviamos alcance, plazo y precio."
              />
              <ContactoDirectChannels />
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div>
                <h2 className="type-card text-[var(--ink)] mb-10">
                  Cuéntanos tu proyecto
                </h2>

                {status === "success" && (
                  <div role="status" className="mb-8 type-body text-[var(--ink)] flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>¡Solicitud recibida! Magno o Manuel te responderán en breve.</span>
                  </div>
                )}

                {status === "error" && (
                  <div role="alert" className="mb-8 type-body text-red-800">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="_honey">No llenar este campo</label>
                    <input
                      id="_honey"
                      type="text"
                      name="_honey"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <p id="servicio-label" className="type-small text-[var(--muted-on-paper)] block mb-4">
                      Qué necesitas
                    </p>
                    <div className="flex flex-wrap gap-x-8 gap-y-3" role="radiogroup" aria-labelledby="servicio-label">
                      {SERVICES.map((item) => {
                        const isSelected = servicio === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => setServicio(item.id)}
                            className={`type-body text-left transition-colors cursor-pointer underline-offset-[8px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)] ${
                              isSelected
                                ? "text-[var(--ink)] underline"
                                : "text-[var(--muted-on-paper)] hover:text-[var(--ink)]"
                            }`}
                          >
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="nombre" className="type-small text-[var(--muted-on-paper)] block mb-1.5 font-normal">
                      Tu nombre o empresa
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej. María Quispe o Comercial Andina SAC"
                      required
                      autoComplete="name"
                      className="w-full h-12 px-0 border-0 border-b border-[var(--muted-on-paper)] bg-transparent text-[var(--ink)] type-body focus:outline-none focus:border-[var(--ink)] focus-visible:border-b-2"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="pais" className="type-small text-[var(--muted-on-paper)] font-normal">
                        País
                      </label>
                      {detectedCountry && (
                        <span className="type-small text-[var(--muted-on-paper)] font-normal">
                          {detectedCountry.flag} {detectedCountry.name}
                        </span>
                      )}
                    </div>
                    <select
                      id="pais"
                      name="pais"
                      value={pais}
                      onChange={(e) => setPais(e.target.value)}
                      className="w-full h-12 px-0 border-0 border-b border-[var(--muted-on-paper)] bg-transparent text-[var(--ink)] type-body focus:outline-none focus:border-[var(--ink)] focus-visible:border-b-2 cursor-pointer"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name} ({c.dialCode})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contacto" className="type-small text-[var(--muted-on-paper)] block mb-1.5 font-normal">
                      WhatsApp o correo
                    </label>
                    <input
                      id="contacto"
                      name="contacto"
                      value={contacto}
                      onChange={(e) => setContacto(e.target.value)}
                      placeholder="Ej. +51 987 654 321 o maria@empresa.com"
                      required
                      autoComplete="tel email"
                      className="w-full h-12 px-0 border-0 border-b border-[var(--muted-on-paper)] bg-transparent text-[var(--ink)] type-body focus:outline-none focus:border-[var(--ink)] focus-visible:border-b-2"
                    />
                  </div>

                  <div>
                    <label htmlFor="mensaje" className="type-small text-[var(--muted-on-paper)] block mb-1.5 font-normal">
                      Cuéntanos qué necesitas (opcional)
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={3}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      placeholder="Qué quieres lograr, para cuándo, qué tienes hoy…"
                      className="w-full py-3 px-0 border-0 border-b border-[var(--muted-on-paper)] bg-transparent text-[var(--ink)] type-body focus:outline-none focus:border-[var(--ink)] resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded-none text-[var(--ink)] focus:ring-0 border-[var(--line-on-paper)] cursor-pointer"
                      required
                    />
                    <label htmlFor="consent" className="type-small text-[var(--muted-on-paper)] leading-relaxed cursor-pointer select-none font-normal">
                      He leído y acepto la{" "}
                      <Link href="/privacidad" target="_blank" className="text-[var(--ink)] underline hover:text-[var(--ink)]">
                        Política de Privacidad
                      </Link>{" "}
                      y autorizo el tratamiento de mis datos personales para fines de cotización conforme a la <strong>Ley N° 29733</strong> de la República del Perú.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-[var(--brand)] hover:opacity-90 text-[var(--on-brand)] type-button transition-colors cursor-pointer inline-flex items-center justify-center select-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
                  >
                    {loading ? "Enviando…" : "Enviar solicitud"}
                  </button>

                  <p className="type-small text-[var(--muted-on-paper)]">
                    ¿Prefieres escribir directo?{" "}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--ink)] underline underline-offset-[6px]"
                    >
                      Escríbenos por WhatsApp
                    </a>
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Preguntas frecuentes (tinta) */}
      <Section tone="ink">
        <Reveal>
          <SectionHeading
            tone="ink"
            title="Preguntas frecuentes"
          />
        </Reveal>

        <ContactoFaq />
      </Section>
    </div>
  );
}
