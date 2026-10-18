"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeInView } from "@/components/ui/fade-in-view";
import { submitContactForm } from "./actions";
import {
  Phone,
  MessageCircle,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Laptop,
  Layers,
  Bot,
  Smartphone,
  ArrowRight,
  Send,
  Zap
} from "lucide-react";

export default function ContactoPage() {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [servicio, setServicio] = useState("Página Web de Alto Impacto");
  const [mensaje, setMensaje] = useState("");

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const services = [
    { id: "Página Web de Alto Impacto", label: "Página Web", icon: Laptop },
    { id: "Sistema Web / CRM a Medida", label: "Sistema / CRM", icon: Layers },
    { id: "Automatización con Inteligencia Artificial", label: "Automatización IA", icon: Bot },
    { id: "Aplicación Móvil iOS & Android", label: "App Móvil", icon: Smartphone },
  ];

  const faqs = [
    {
      q: "¿Cuánto tiempo toma desarrollar una solución?",
      a: "Gracias a nuestro stack tecnológico acelerado con IA, una página web o MVP de sistema está listo en 7 a 14 días. Sistemas empresariales complejos se entregan en Sprints semanales continuos.",
    },
    {
      q: "¿Cómo funciona el esquema de pagos?",
      a: "Manejamos esquemas transparentes vinculados a entregas tangibles: un adelanto inicial para arrancar la arquitectura y desembolsos contra entrega y validación de cada Sprint.",
    },
    {
      q: "¿El código fuente y la base de datos me pertenecen?",
      a: "Absolutamente sí. El 100% de la propiedad intelectual, repositorios de código y acceso a la base de datos Supabase te pertenecen desde el primer día.",
    },
    {
      q: "¿Ofrecen soporte y mantenimiento post-lanzamiento?",
      a: "Sí, todos nuestros desarrollos incluyen garantía técnica, monitoreo en la nube y planes de mantenimiento evolutivo para añadir nuevas funciones con el tiempo.",
    },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("contacto", contacto);
    formData.append("servicio", servicio);
    if (mensaje) formData.append("mensaje", mensaje);

    const res = await submitContactForm(formData);

    if (res.success) {
      setStatus("success");
      setNombre("");
      setContacto("");
      setMensaje("");
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#6366f1", "#06b6d4", "#818cf8", "#10b981", "#ffffff"],
      });
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
    <div className="min-h-screen relative overflow-hidden bg-slate-950 py-16 md:py-24">
      {/* Background Cybernetic Grid */}
      <BackgroundGrid />

      {/* Ambient Glow Orbs */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Direct Value & Contacts (5 Cols) */}
          <FadeInView className="lg:col-span-5 flex flex-col justify-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6 w-fit">
              <Zap className="w-3.5 h-3.5" /> Respuesta en &lt; 15 Minutos
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
              Cotiza tu software <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
                fácil y al instante
              </span>
            </h1>

            <p className="text-base text-slate-300 mb-8 leading-relaxed">
              Sin trámites largos ni formularios complicados. Déjanos tus datos mínimos y uno de nuestros directores te responderá de inmediato.
            </p>

            {/* Direct Channel Cards */}
            <div className="space-y-3.5 mb-8">
              <a
                href="https://wa.me/51942498841?text=Hola%20Magno,%20quisiera%20conversar%20sobre%20un%20proyecto%20para%20mi%20empresa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                        WhatsApp Directo
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono font-semibold">
                        Activo
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">+51 942 498 841 · Magno Alomia</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href="tel:921195037"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      Llamada Inmediata
                    </span>
                    <p className="text-xs text-slate-400">921 195 037 · Manuel Callañaupa</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantía de confidencialidad comercial y NDA disponible.</span>
            </div>
          </FadeInView>

          {/* Right Column: Ultra Simple & Easy Form (7 Cols) */}
          <FadeInView delay={0.15} className="lg:col-span-7">
            <SpotlightCard className="p-6 sm:p-8 lg:p-10 border-slate-800 bg-slate-900/90 shadow-2xl rounded-3xl">
              
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  Cuéntanos tu proyecto
                </h2>
                <p className="text-slate-400 text-sm">
                  Completa estos 2 campos rápidos y te contactamos hoy mismo.
                </p>
              </div>

              {/* Success Alert */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>¡Recibido con éxito! Magno o Manuel te responderán en breve.</span>
                </div>
              )}

              {/* Error Alert */}
              {status === "error" && (
                <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300 font-medium text-sm">
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
                  <Label className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-2.5 block">
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
                              ? "bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                              : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-indigo-400" : "text-slate-500"}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Full Name Input */}
                <div className="space-y-1.5">
                  <Label htmlFor="nombre" className="text-slate-300 text-xs font-bold uppercase tracking-wider">
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
                    className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 h-12 rounded-xl text-sm sm:text-base focus:border-indigo-500"
                  />
                </div>

                {/* 3. WhatsApp or Email in a single friendly input */}
                <div className="space-y-1.5">
                  <Label htmlFor="contacto" className="text-slate-300 text-xs font-bold uppercase tracking-wider">
                    3. Tu WhatsApp o Correo Electrónico *
                  </Label>
                  <Input
                    id="contacto"
                    name="contacto"
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                    placeholder="Ej. +51 987 654 321 o carlos@empresa.com"
                    required
                    autoComplete="tel email"
                    className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 h-12 rounded-xl text-sm sm:text-base focus:border-indigo-500"
                  />
                </div>

                {/* Optional Message Field */}
                <div className="space-y-1.5">
                  <Label htmlFor="mensaje" className="text-slate-400 text-xs font-medium flex items-center justify-between">
                    <span>Detalles adicionales (opcional)</span>
                    <span className="text-[10px] text-slate-500">¿Alguna idea o plazo especial?</span>
                  </Label>
                  <Input
                    id="mensaje"
                    name="mensaje"
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Ej. Requiero que esté listo en 10 días..."
                    className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500 h-11 rounded-xl text-sm focus:border-indigo-500"
                  />
                </div>

                {/* Primary Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white h-13 text-base rounded-xl font-bold shadow-[0_0_25px_rgba(79,70,229,0.45)] hover:shadow-[0_0_35px_rgba(79,70,229,0.65)] transition-all cursor-pointer flex items-center justify-center gap-2"
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
                    className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Preguntas Frecuentes
            </h2>
            <p className="text-slate-400 text-sm">
              Respuestas directas antes de iniciar tu proyecto con AVANZA.
            </p>
          </div>

          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between text-slate-200 hover:text-white font-semibold transition-colors"
                  >
                    <span className="text-base">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-400 transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-4">
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
