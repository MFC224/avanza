"use client";

import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FadeInView } from "@/components/ui/fade-in-view";
import { Star, CheckCircle2 } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Carlos Mendoza",
      role: "CEO & Co-fundador",
      company: "Kallpa Pay (Fintech)",
      project: "MVP SaaS & Pasarela",
      metric: "Lanzamiento en 11 días",
      quote: "Estábamos atascados con una agencia tradicional que nos pedía 4 meses. AVANZA entendió el negocio desde el primer día y en el Sprint 1 ya teníamos la plataforma transaccional operando en Supabase.",
    },
    {
      name: "Valeria Ríos",
      role: "Gerente de Operaciones",
      company: "TransLogix Perú (Logística)",
      project: "Sistema Web & Inventario",
      metric: "Ahorro de 4 hrs/día",
      quote: "Llevábamos la gestión en 6 archivos de Excel con constantes desajustes de stock. El sistema web a medida que nos desarrollaron automatizó los despachos y eliminó los errores humanos por completo.",
    },
    {
      name: "Diego Salcedo",
      role: "Director de Marketing",
      company: "Innova Propiedades (Inmobiliaria)",
      project: "Agente IA en WhatsApp & CRM",
      metric: "x3 en Leads Calificados",
      quote: "El bot con Inteligencia Artificial contesta a nuestros clientes en segundos a cualquier hora y agenda las visitas automáticamente. Triplicamos la tasa de cierre sin contratar más personal.",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-20 md:py-28 relative z-10 border-t border-slate-800/60">
      <FadeInView className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
          <CheckCircle2 className="w-3.5 h-3.5" /> Casos de Éxito & Resultados
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
          La confianza de quienes ya escalaron con nosotros
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          No prometemos código, entregamos rentabilidad, velocidad y tranquilidad operativa.
        </p>
      </FadeInView>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <FadeInView key={idx} delay={idx * 0.15}>
            <SpotlightCard className="p-8 border-slate-800 bg-slate-900/80 flex flex-col justify-between h-full group hover:-translate-y-2 transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-semibold">
                    {rev.metric}
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm shrink-0">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{rev.name}</h4>
                  <p className="text-slate-400 text-xs">{rev.role} · <span className="text-indigo-400 font-medium">{rev.company}</span></p>
                </div>
              </div>
            </SpotlightCard>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
