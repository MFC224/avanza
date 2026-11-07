"use client";

import { useState, useEffect } from "react";
import { submitContactForm } from "./actions";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeInView } from "@/components/ui/fade-in-view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { detectUserCountry, COUNTRIES, CountryInfo } from "@/lib/country-detector";
import {
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  ShieldCheck,
  Zap,
  Laptop,
  Layers,
  Bot,
  Smartphone,
  CheckCircle2,
  ChevronDown,
  ArrowRight
} from "lucide-react";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Controlled fields
  const [servicio, setServicio] = useState("Página Web de Alto Impacto");
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [pais, setPais] = useState("PE");
  const [detectedCountry, setDetectedCountry] = useState<CountryInfo | null>(null);

  // Auto-detect visitor country based on locale/timezone
  useEffect(() => {
    const detected = detectUserCountry();
    setDetectedCountry(detected);
    setPais(detected.code);
  }, []);

  // Interactive FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    { id: "Página Web de Alto Impacto", label: "Página Web", icon: Laptop },
    { id: "Sistema Web / CRM Interno", label: "Sistema Web / CRM", icon: Layers },
    { id: "Solución de Inteligencia Artificial", label: "Solución con IA", icon: Bot },
    { id: "Aplicación Móvil iOS / Android", label: "App Móvil", icon: Smartphone },
  ];

  const faqs = [
    {
      q: "¿Cuánto tiempo toma tener mi software en producción?",
      a: "Operamos bajo metodología ágil SCRUM. Los proyectos web y landing pages se completan en 7 a 10 días; sistemas web, CRM o integraciones con IA demoran de 12 a 20 días con entregas semanales funcionales."
    },
    {
      q: "¿Cómo son los pagos y qué garantías tengo?",
      a: "Trabajamos con hitos por Sprint (usualmente 50% inicial y 50% contra entrega probada y aprobada). Cada semana tienes un despliegue en vivo en un entorno de pruebas para verificar los avances con tus propios ojos."
    },
    {
      q: "¿El código y la base de datos me pertenecen al 100%?",
      a: "Sí, absolutamente. Todo el código fuente en GitHub, las cuentas de Supabase, APIs y la infraestructura quedan a nombre de tu empresa sin cobros ocultos de licenciamiento mensual por nuestra parte."
    },
    {
      q: "¿Qué pasa si requiero soporte o cambios en el futuro?",
      a: "Ofrecemos planes de soporte mensual o bolsas de horas por sprint para agregar nuevas funciones, actualizaciones de seguridad y optimizaciones conforme tu negocio crezca."
    }
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

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

  // Pre-filled WhatsApp link based on selected service
  const waUrl = `https://wa.me/51942498841?text=${encodeURIComponent(
    `Hola AVANZA, soy ${nombre || "un cliente interesado"} y quisiera cotizar: ${servicio}.`
  )}`;

  return (
    <div className="min-h-screen relative overflow-hidden bg-white text-slate-900 py-16 md:py-24">
      {/* Background Cybernetic Grid */}
      <BackgroundGrid />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-blue-100/40 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-sky-100/40 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Direct Value & Contacts (5 Cols) */}
          <FadeInView className="lg:col-span-5 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
              <Zap className="w-3.5 h-3.5" /> Respuesta en &lt; 15 Minutos
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
              Cotiza tu software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#021761] via-blue-600 to-indigo-600">
                fácil y al instante
              </span>
            </h1>

            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              Sin trámites largos ni formularios complicados. Déjanos tus datos mínimos y uno de nuestros directores te responderá de inmediato.
            </p>

            {/* Direct Channel Cards */}
            <div className="space-y-3.5 mb-8">
              <a
                href="https://wa.me/51942498841?text=Hola%20Magno,%20quisiera%20conversar%20sobre%20un%20proyecto%20para%20mi%20empresa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-emerald-500/60 hover:bg-emerald-50/30 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        WhatsApp Directo
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-semibold">
                        Activo
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">+51 942 498 841 · Magno Alomia</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="tel:+51921195037"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-blue-500/60 hover:bg-blue-50/30 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      Llamada Inmediata
                    </span>
                    <p className="text-xs text-slate-500">+51 921 195 037 · Manuel Callañaupa</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Garantía de confidencialidad comercial y NDA disponible.</span>
            </div>
          </FadeInView>

          {/* Right Column: Ultra Simple & Easy Form (7 Cols) */}
          <FadeInView delay={0.15} className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-8 lg:p-10 border-slate-200/90 bg-white shadow-xl rounded-3xl">
              
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                  Cuéntanos tu proyecto
                </h2>
                <p className="text-slate-500 text-sm">
                  Completa estos 2 campos rápidos y te contactamos hoy mismo.
                </p>
              </div>

              {/* Success Alert */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>¡Recibido con éxito! Magno o Manuel te responderán en breve.</span>
                </div>
              )}

              {/* Error Alert */}
              {status === "error" && (
                <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 font-medium text-sm">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Anti-spam honeypot */}
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden opacity-0 absolute -z-10 pointer-events-none"
                  aria-hidden="true"
                />

                {/* 1. Quick Selectable Service Chips (1 Tap) */}
                <div>
                  <Label className="text-slate-700 text-xs font-bold uppercase tracking-wider mb-2.5 block">
                    1. ¿Qué tipo de software necesitas?
                  </Label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {services.map((item) => {
                      const Icon = item.icon;
                      const isSelected = servicio === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setServicio(item.id)}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer text-left ${
                            isSelected
                              ? "bg-blue-50 border-blue-500 text-blue-900 ring-1 ring-blue-500 shadow-xs"
                              : "bg-slate-50/70 border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900"
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Full Name Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="nombre" className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                    2. Tu Nombre o Empresa *
                  </Label>
                  <Input
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej. Carlos Mendoza o Kallpa SAC"
                    required
                    autoComplete="name"
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-xl text-sm sm:text-base focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                {/* 3. Country of Contact with Automatic Detection */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pais" className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                      3. País de Contacto *
                    </Label>
                    {detectedCountry && (
                      <span className="text-[11px] font-medium text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span>Detectado:</span>
                        <span>{detectedCountry.flag}</span>
                        <span>{detectedCountry.name}</span>
                      </span>
                    )}
                  </div>
                  <select
                    id="pais"
                    name="pais"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                    className="w-full h-12 px-3.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 shadow-2xs font-medium cursor-pointer"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name} ({c.dialCode})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. WhatsApp or Email in a single friendly input */}
                <div className="space-y-1.5">
                  <Label htmlFor="contacto" className="text-slate-700 text-xs font-bold uppercase tracking-wider">
                    4. Tu WhatsApp o Correo Electrónico *
                  </Label>
                  <Input
                    id="contacto"
                    name="contacto"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="Ej. +51 987 654 321 o carlos@empresa.com"
                    required
                    autoComplete="tel email"
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-12 rounded-xl text-sm sm:text-base focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                {/* Optional Message Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="mensaje" className="text-slate-600 text-xs font-medium flex items-center justify-between">
                    <span>Detalles adicionales (opcional)</span>
                    <span className="text-[10px] text-slate-400">¿Alguna idea o plazo especial?</span>
                  </Label>
                  <Input
                    id="mensaje"
                    name="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Ej. Requiero que esté listo en 10 días..."
                    className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 h-11 rounded-xl text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                {/* Primary Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#021761] hover:bg-blue-700 text-white h-13 text-base rounded-xl font-bold shadow-md shadow-blue-900/15 hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Enviando Solicitud..." : "Solicitar Cotización Rápida"}</span>
                </Button>

                {/* Instant 1-Click WhatsApp Alternative */}
                <div className="pt-2 text-center">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>¿Prefieres hablar al instante? Escríbenos por WhatsApp con 1 clic</span>
                  </a>
                </div>
              </form>
            </SpotlightCard>
          </FadeInView>
        </div>

        {/* Dynamic FAQ Accordion Section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-500 text-sm">
              Respuestas directas antes de iniciar tu proyecto con AVANZA.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-colors shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between text-slate-800 hover:text-blue-700 font-semibold transition-colors cursor-pointer"
                  >
                    <span className="text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-600 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
