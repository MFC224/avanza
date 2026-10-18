import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundGrid } from "@/components/ui/background-grid";
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
      color: "from-indigo-500 to-indigo-400",
      bgBadge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
    },
    {
      num: "02",
      title: "El 'Sprint' (Desarrollo Acelerado)",
      subtitle: "Iteraciones cortas y código limpio",
      description: "¿Qué es un Sprint? Es un ciclo de trabajo de 1 a 2 semanas donde nuestro equipo programa una pieza clave de tu sistema con herramientas de IA de vanguardia. Cero esperas de meses, resultados tangibles cada semana.",
      icon: Zap,
      color: "from-blue-500 to-blue-400",
      bgBadge: "bg-blue-500/10 text-blue-400 border-blue-500/20"
    },
    {
      num: "03",
      title: "Pruebas y Revisión (QA)",
      subtitle: "Software real que puedes tocar y probar",
      description: "No te damos presentaciones en diapositivas vacías; te entregamos enlaces funcionales en servidores de prueba para que los navegues. Nos reunimos, evalúas cada detalle y recibimos tus comentarios con total transparencia.",
      icon: CheckCircle,
      color: "from-cyan-500 to-cyan-400",
      bgBadge: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
    },
    {
      num: "04",
      title: "Evolución Continua",
      subtitle: "Cierre de ciclo y retroalimentación",
      description: "Con tu retroalimentación, afinamos los requerimientos y pasamos al siguiente sprint. Tu plataforma crece de manera modular, sin código muerto y adaptándose exactamente a las exigencias del mercado.",
      icon: InfinityIcon,
      color: "from-emerald-500 to-emerald-400",
      bgBadge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
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
    <div className="flex flex-col min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Cybernetic Grid */}
      <BackgroundGrid />

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 flex flex-col items-center text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Badge className="mb-6 bg-indigo-500/10 border-indigo-500/20 text-indigo-300 py-1.5 px-4 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400 inline" />
            Tú estás al mando
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Velocidad, Transparencia e <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
              Inteligencia Artificial
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Nuestra Metodología Ágil (SCRUM) rompe los vicios del desarrollo tradicional. Construimos tu software iteración por iteración con resultados tangibles semanales.
          </p>
        </div>
      </section>

      {/* Cyclical Process Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Animated looping cycle icon in the background */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-0">
          <RefreshCw className="w-80 h-80 text-indigo-500/5 animate-[spin_25s_linear_infinite]" />
        </div>

        <FadeInView className="grid md:grid-cols-2 gap-8 relative z-10">
          {steps.map((step, index) => (
            <SpotlightCard key={index} className="p-8 border-slate-800 bg-slate-900/80 group hover:-translate-y-1.5 transition-transform duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${step.bgBadge} group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-7 h-7" />
                </div>
                <span className="font-mono text-4xl font-black text-slate-800 group-hover:text-indigo-500/30 transition-colors">
                  {step.num}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                {step.title}
              </h3>
              <p className="text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4">
                {step.subtitle}
              </p>
              <p className="text-base text-slate-300 leading-relaxed">
                {step.description}
              </p>
            </SpotlightCard>
          ))}
        </FadeInView>
      </section>

      {/* Comparison: Tradicional vs AVANZA */}
      <section className="w-full max-w-6xl mx-auto px-4 py-24 relative z-10 border-t border-slate-800/80">
        <FadeInView className="text-center mb-16">
          <Badge className="mb-4 bg-slate-900 border-slate-700 text-slate-300 text-xs">Comparativa Transparente</Badge>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Desarrollo Tradicional vs. AVANZA SCRUM
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Por qué trabajar con iteraciones ágiles e Inteligencia Artificial te ahorra miles de dólares y meses de incertidumbre.
          </p>
        </FadeInView>

        <FadeInView delay={0.2} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-3 p-5 font-bold border-b border-slate-800 bg-slate-950/80 text-sm">
            <div className="text-slate-400">Factor de Evaluación</div>
            <div className="text-red-400 hidden md:block">Agencias Tradicionales</div>
            <div className="text-emerald-400 hidden md:block">Metodología AVANZA (IA + SCRUM)</div>
          </div>
          {comparisons.map((row, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 p-5 border-b border-slate-800/60 gap-3 md:gap-4 text-sm items-center hover:bg-slate-900/40 transition-colors">
              <div className="font-semibold text-white">{row.criteria}</div>
              <div className="flex items-start gap-2 text-slate-400">
                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{row.traditional}</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-300 font-medium">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{row.avanza}</span>
              </div>
            </div>
          ))}
        </FadeInView>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-slate-900/80 border-t border-slate-800 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
        <FadeInView className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            ¿Listo para iniciar tu transformación digital?
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Aplica esta metodología en tu próximo proyecto y recibe una versión funcional cada semana.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white h-16 px-12 text-lg shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_45px_rgba(79,70,229,0.7)] transition-all rounded-full font-bold">
              Cotizar Proyecto Ahora
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </FadeInView>
      </section>
    </div>
  );
}
