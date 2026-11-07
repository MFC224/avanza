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
    <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-36 relative z-10 border-t border-slate-200/70">
      <FadeInView className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 text-[11px] font-mono uppercase tracking-[0.18em] font-semibold mb-6">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#021761]" /> Casos de Éxito & Resultados
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-[-0.035em]">
          La confianza de quienes ya escalaron con nosotros
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
          No prometemos código, entregamos rentabilidad, velocidad y tranquilidad operativa.
        </p>
      </FadeInView>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((rev, idx) => (
          <FadeInView key={idx} delay={idx * 0.15}>
            <SpotlightCard className="p-8 border-slate-200/80 bg-white flex flex-col justify-between h-full group hover:-translate-y-2 transition-transform duration-300 shadow-2xs hover:shadow-xl rounded-2xl">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-slate-800 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full font-bold">
                    {rev.metric}
                  </span>
                </div>

                <p className="text-slate-700 text-base leading-relaxed mb-8 font-normal">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-[#021761] flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-xs">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-slate-950 font-bold text-base">{rev.name}</h4>
                  <p className="text-slate-500 text-xs">{rev.role} · <span className="text-slate-700 font-semibold">{rev.company}</span></p>
                </div>
              </div>
            </SpotlightCard>
          </FadeInView>
        ))}
      </div>
    </section>
  );
}
