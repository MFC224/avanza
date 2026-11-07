"use client";

import { Check, X, Award } from "lucide-react";
import { FadeInView } from "@/components/ui/fade-in-view";

export function ComparisonMatrix() {
  const criteria = [
    {
      feature: "Velocidad de Entrega (Time-to-Market)",
      avanza: "7 a 14 días (Sprints ágiles con módulos funcionales semanales)",
      traditional: "3 a 6 meses de retrasos, reuniones y burocracia",
      freelancer: "Incierto; pausas frecuentes por sobrecarga de proyectos",
      highlight: true,
    },
    {
      feature: "Arquitectura & Ecosistema de Código",
      avanza: "Next.js 16, React 19, Supabase RLS, TypeScript estricto (100% Type-Safe)",
      traditional: "Plantillas genéricas de WordPress o código espagueti desactualizado",
      freelancer: "Librerías inconsistentes sin estándares ni tipado estricto",
    },
    {
      feature: "Inteligencia Artificial Integrada",
      avanza: "Agentes autónomos, pipelines LLM y automatización de procesos a medida",
      traditional: "Nula; se limitan a webs estáticas sin procesamiento inteligente",
      freelancer: "Solo integración básica de prompts genéricos de terceros",
      highlight: true,
    },
    {
      feature: "Seguridad, RLS & OWASP Top 10",
      avanza: "Row Level Security (RLS) PostgreSQL, Zero-Trust, CSP y auditoría continua",
      traditional: "Plugins vulnerables propensos a inyecciones SQL y ataques XSS",
      freelancer: "Claves de API expuestas en frontend y sin políticas de aislamiento",
    },
    {
      feature: "Demos Semanales & Transparencia",
      avanza: "Acceso semanal a despliegues en vivo probando el sistema real",
      traditional: "Presentaciones estáticas en PDF y mockups durante meses",
      freelancer: "Semanas sin reportes claros o riesgo de abandono (ghosting)",
    },
    {
      feature: "Comunicación & Respaldo",
      avanza: "Línea directa por WhatsApp con los fundadores y arquitectos técnicos",
      traditional: "Intermediarios, ejecutivos de ventas y sistemas lentos de tickets",
      freelancer: "Sin respaldo de una estructura de ingeniería ni soporte continuo",
      highlight: true,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-28 md:py-36 relative z-10 border-t border-slate-200/70">
      <FadeInView className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-700 text-[11px] font-mono uppercase tracking-[0.18em] font-semibold mb-6">
          <Award className="w-3.5 h-3.5 text-[#021761]" /> El Estándar de la Industria
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-950 mb-6 tracking-[-0.035em]">
          Por qué las empresas eligen AVANZA
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed">
          Compara nuestro modelo de ingeniería de software de alta velocidad frente a los métodos convencionales.
        </p>
      </FadeInView>

      <FadeInView delay={0.2}>
        <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-lg">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th className="py-6 px-6 text-xs font-mono uppercase tracking-wider text-slate-500 w-1/4">
                  Criterio Técnico
                </th>
                <th className="py-6 px-6 text-sm font-bold text-white bg-[#021761] border-x border-[#021761] w-5/12">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-base font-black tracking-wide text-white">AVANZA</span>
                    <span className="text-[10px] bg-white/15 text-white px-2 py-0.5 rounded-full font-mono uppercase font-semibold">
                      Software Studio
                    </span>
                  </div>
                </th>
                <th className="py-6 px-6 text-xs font-mono uppercase tracking-wider text-slate-500 w-1/4">
                  Agencias Tradicionales
                </th>
                <th className="py-6 px-6 text-xs font-mono uppercase tracking-wider text-slate-500 w-1/6">
                  Freelancers
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {criteria.map((item, idx) => (
                <tr
                  key={idx}
                  className={`hover:bg-slate-50/80 transition-colors ${
                    item.highlight ? "bg-slate-50/40" : ""
                  }`}
                >
                  <td className="py-5 px-6 font-semibold text-slate-900">
                    {item.feature}
                  </td>

                  {/* AVANZA Column (Hero) */}
                  <td className="py-5 px-6 bg-blue-50/30 border-x border-slate-200/60 text-slate-900 font-medium">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm leading-relaxed font-semibold text-slate-950">{item.avanza}</span>
                    </div>
                  </td>

                  {/* Traditional Agencies */}
                  <td className="py-5 px-6 text-slate-500">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded-full bg-slate-100 text-slate-400 mt-0.5 shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm leading-relaxed">{item.traditional}</span>
                    </div>
                  </td>

                  {/* Freelancers */}
                  <td className="py-5 px-6 text-slate-500">
                    <div className="flex items-start gap-2.5">
                      <div className="p-1 rounded-full bg-slate-100 text-slate-400 mt-0.5 shrink-0">
                        <X className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm leading-relaxed">{item.freelancer}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeInView>
    </section>
  );
}
