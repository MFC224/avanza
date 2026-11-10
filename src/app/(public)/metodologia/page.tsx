import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { LuxuryMeshGradient } from "@/components/ui/luxury-mesh-gradient";
import { FadeInView } from "@/components/ui/fade-in-view";
import {
  ArrowRight,
  Target,
  Zap,
  CheckCircle,
  Infinity as InfinityIcon,
  RefreshCw,
  Sparkles,
  XCircle,
  Check
} from "lucide-react";

export const metadata: Metadata = {
  title: "Metodología Ágil SCRUM | AVANZA",
  description: "Desarrollo de software transparente y acelerado por Sprints semanales. El cliente mantiene el control total de cada entrega tangible.",
  openGraph: {
    title: "Metodología Ágil SCRUM | AVANZA",
    description: "Ciclo iterativo continuo de 4 fases para entregar software funcional cada 7 a 14 días.",
  },
};

export default function MetodologiaPage() {
  const steps = [
    {
      num: "01",
      title: "Tu Visión, Tus Reglas (Planificación)",
      subtitle: "Priorización ágil centrada en tu negocio",
      description: "Tú tienes el control absoluto. Nos cuentas qué necesita tu negocio, priorizamos las funciones con mayor impacto comercial y diseñamos la arquitectura técnica. Tú lo pides, nosotros lo estructuramos.",
      icon: Target,
      color: "from-blue-600 to-indigo-600",
      bgBadge: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      num: "02",
      title: "El 'Sprint' (Desarrollo Acelerado)",
      subtitle: "Iteraciones cortas y código limpio",
      description: "¿Qué es un Sprint? Es un ciclo de trabajo de 1 a 2 semanas donde nuestro equipo programa una pieza clave de tu sistema con herramientas de IA de vanguardia. Cero esperas de meses, resultados tangibles cada semana.",
      icon: Zap,
      color: "from-sky-600 to-blue-600",
      bgBadge: "bg-sky-50 text-sky-700 border-sky-200"
    },
    {
      num: "03",
      title: "Pruebas y Revisión (QA)",
      subtitle: "Software real que puedes tocar y probar",
      description: "No te damos presentaciones en diapositivas vacías; te entregamos enlaces funcionales en servidores de prueba para que los navegues. Nos reunimos, evalúas cada detalle y recibimos tus comentarios con total transparencia.",
      icon: CheckCircle,
      color: "from-cyan-600 to-sky-600",
      bgBadge: "bg-cyan-50 text-cyan-700 border-cyan-200"
    },
    {
      num: "04",
      title: "Evolución Continua",
      subtitle: "Cierre de ciclo y retroalimentación",
      description: "Con tu retroalimentación, afinamos los requerimientos y pasamos al siguiente sprint. Tu plataforma crece de manera modular, sin código muerto y adaptándose exactamente a las exigencias del mercado.",
      icon: InfinityIcon,
      color: "from-emerald-600 to-teal-600",
      bgBadge: "bg-emerald-50 text-emerald-700 border-emerald-200"
    }
  ];

  const comparisons = [
    {
      criteria: "Tiempo para ver avances reales",
      traditional: "3 a 6 meses para un prototipo básico",
      avanza: "Primer prototipo funcional en 7 días"
    },
    {
      criteria: "Control del cliente en el proceso",
      traditional: "Mínimo; solo te contactan al final",
      avanza: "100% al mando; apruebas cada Sprint"
    },
    {
      criteria: "Tecnología y automatización",
      traditional: "Plantillas lentas (WordPress, PHP viejo)",
      avanza: "Next.js 16, Supabase, IA y TypeScript"
    },
    {
      criteria: "Flexibilidad a cambios",
      traditional: "Cobros extras por cualquier ajuste",
      avanza: "Iterativo; se adapta al feedback de cada ciclo"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 relative overflow-hidden">
      {/* Background Cybernetic Grid */}
      <BackgroundGrid />
      <LuxuryMeshGradient />

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 flex flex-col items-center text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/50 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Badge className="mb-6 bg-blue-50 border-blue-200 text-blue-700 py-1.5 px-4 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-600 inline" />
            Tú estás al mando
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
            Velocidad, Transparencia e <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#021761] via-blue-600 to-indigo-600">
              Inteligencia Artificial
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
            Nuestra Metodología Ágil (SCRUM) rompe los vicios del desarrollo tradicional. Construimos tu software iteración por iteración con resultados tangibles semanales.
          </p>
        </div>
      </section>

      {/* Cyclical Process Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Animated looping cycle icon in the background */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-0">
          <RefreshCw className="w-80 h-80 text-blue-500/5 animate-[spin_25s_linear_infinite]" />
        </div>

        <FadeInView className="grid md:grid-cols-2 gap-8 relative z-10">
          {steps.map((step, index) => (
            <SpotlightCard key={index} className="p-8 border-slate-200/90 bg-white group hover:-translate-y-1.5 transition-transform duration-300 shadow-xs hover:shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${step.bgBadge} group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <span className="font-mono text-4xl font-black text-slate-200 group-hover:text-blue-200 transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>
              <p className="text-blue-600 text-xs font-mono uppercase tracking-wider mb-4 font-semibold">
                {step.subtitle}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </SpotlightCard>
          ))}
        </FadeInView>
      </section>

      {/* Comparison: Tradicional vs AVANZA */}
      <section className="w-full max-w-6xl mx-auto px-4 py-24 relative z-10 border-t border-slate-200/80">
        <FadeInView className="text-center mb-16">
          <Badge className="mb-4 bg-blue-50 border-blue-200 text-blue-700 text-xs">Comparativa Transparente</Badge>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
            Desarrollo Tradicional vs. AVANZA SCRUM
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Por qué trabajar con iteraciones ágiles e Inteligencia Artificial te ahorra miles de dólares y meses de incertidumbre.
          </p>
        </FadeInView>

        <FadeInView delay={0.2} className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 p-5 font-bold border-b border-slate-200 bg-slate-50/90 text-sm">
            <div className="text-slate-700">Factor de Evaluación</div>
            <div className="text-rose-600 hidden md:block">Agencias Tradicionales</div>
            <div className="text-emerald-700 hidden md:block font-extrabold">Metodología AVANZA (IA + SCRUM)</div>
          </div>
          {comparisons.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-5 border-b border-slate-100 gap-3 md:gap-4 text-sm items-center hover:bg-slate-50/60 transition-colors">
              <div className="font-semibold text-slate-900">{row.criteria}</div>
              <div className="flex items-start gap-2 text-slate-500">
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{row.traditional}</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-700 font-semibold">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{row.avanza}</span>
              </div>
            </div>
          ))}
        </FadeInView>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-blue-50/40 border-t border-slate-200/80 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-100/60 blur-[150px] rounded-full pointer-events-none" />
        <FadeInView className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            ¿Listo para iniciar tu transformación digital?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Aplica esta metodología en tu próximo proyecto y recibe una versión funcional cada semana.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-[#021761] hover:bg-blue-700 text-white h-16 px-12 text-lg shadow-md shadow-blue-900/15 hover:shadow-lg transition-all rounded-full font-bold">
              Cotizar Proyecto Ahora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </FadeInView>
      </section>
    </div>
  );
}
