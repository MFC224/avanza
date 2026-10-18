import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { FadeInView } from "@/components/ui/fade-in-view";
import {
  Target,
  Globe,
  Code2,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  HeartHandshake
} from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre Nosotros y Equipo Fundador | AVANZA",
  description: "Conoce a Manuel Callañaupa y Magno Alomia, fundadores de AVANZA. Nuestra misión es democratizar la tecnología de élite y la Inteligencia Artificial.",
  openGraph: {
    title: "Sobre Nosotros | AVANZA",
    description: "Liderazgo en ingeniería de software y visión comercial para empresas de alto crecimiento.",
  },
};

export default function NosotrosPage() {
  const values = [
    {
      title: "Transparencia Radical",
      description: "Sin letras pequeñas ni tecnicismos oscuros. Sabes exactamente qué construimos, cuánto cuesta y cuándo se entrega.",
      icon: ShieldCheck,
      color: "text-indigo-400"
    },
    {
      title: "Obsesión por el Cliente",
      description: "No creamos software para satisfacer egos de programadores, creamos herramientas que generen retorno financiero real para tu empresa.",
      icon: HeartHandshake,
      color: "text-cyan-400"
    },
    {
      title: "Calidad Técnica de Élite",
      description: "Código limpio, tipado estricto en TypeScript, bases de datos 3NF y arquitecturas seguras para que tu plataforma nunca colapse.",
      icon: Zap,
      color: "text-emerald-400"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Grid */}
      <BackgroundGrid />

      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 flex flex-col items-center text-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Badge className="mb-6 bg-indigo-500/10 border-indigo-500/20 text-indigo-300 py-1.5 px-4 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-400 inline" />
            Nuestra Historia & Propósito
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Transformando la visión de los <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
              empresarios peruanos
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed">
            Somos <strong className="text-indigo-400 font-bold">AVANZA</strong>, una agencia de tecnología e Inteligencia Artificial fundada para democratizar el acceso a software de grado industrial y acelerar el crecimiento empresarial en la región.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="w-full max-w-7xl mx-auto px-4 py-12 relative z-10">
        <FadeInView className="grid md:grid-cols-2 gap-8">
          <SpotlightCard className="p-8 border-slate-800 bg-slate-900/80 group hover:-translate-y-1.5 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 mb-6">
              <Target className="w-7 h-7 text-indigo-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">Nuestra Misión</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Proveer soluciones tecnológicas integrales para potenciar la competitividad de los emprendimientos y empresas consolidadas, facilitando su transformación digital, optimización de costos y crecimiento comercial acelerado.
            </p>
          </SpotlightCard>

          <SpotlightCard className="p-8 border-slate-800 bg-slate-900/80 group hover:-translate-y-1.5 transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 mb-6">
              <Globe className="w-7 h-7 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-4">Nuestra Visión</h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              Ser el referente tecnológico de mayor prestigio en el desarrollo de plataformas inteligentes en Perú y Latinoamérica, reconocidos por la velocidad de nuestras entregas, la transparencia de nuestros procesos y el impacto tangible de nuestros desarrollos.
            </p>
          </SpotlightCard>
        </FadeInView>
      </section>

      {/* Equipo Fundador */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20 relative z-10 border-t border-slate-800/80">
        <FadeInView className="text-center mb-16">
          <Badge className="mb-4 bg-slate-900 border-slate-700 text-slate-300 text-xs">Pilares Estratégicos</Badge>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Liderazgo Tecnológico y Comercial
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            La combinación exacta entre arquitectura de ingeniería avanzada y visión comercial estratégica.
          </p>
        </FadeInView>

        <FadeInView delay={0.2} className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Perfil Manuel */}
          <SpotlightCard className="p-8 border-slate-800 bg-slate-900/90 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <Avatar className="w-28 h-28 mb-6 border-4 border-slate-950 shadow-2xl bg-slate-800">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-indigo-700 text-white text-3xl font-black">
                MC
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <h3 className="text-2xl font-bold text-white">Manuel Callañaupa</h3>
            </div>
            <p className="text-indigo-400 font-mono text-xs uppercase tracking-widest mb-4">
              Ingeniero de Sistemas · Arquitecto de Software
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Lidera la ingeniería, modelado de bases de datos, seguridad de APIs y la integración de arquitecturas cloud. Obsesionado con el código limpio, rendimiento extremo y cero deuda técnica.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t border-slate-800 w-full">
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">Next.js 16</Badge>
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">Supabase</Badge>
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">PostgreSQL 3NF</Badge>
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">TypeScript</Badge>
            </div>
          </SpotlightCard>

          {/* Perfil Magno */}
          <SpotlightCard className="p-8 border-slate-800 bg-slate-900/90 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <Avatar className="w-28 h-28 mb-6 border-4 border-slate-950 shadow-2xl bg-slate-800">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white text-3xl font-black">
                MA
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
              <h3 className="text-2xl font-bold text-white">Magno Alomia</h3>
            </div>
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
              Director Comercial · Estrategia de Negocio
            </p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Especialista en captación de clientes, negociación y posicionamiento de marca. Asegura que cada desarrollo tecnológico esté alineado con el modelo de negocio y rentabilidad de tu empresa.
            </p>
            <div className="flex flex-wrap justify-center gap-1.5 pt-4 border-t border-slate-800 w-full">
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">Estrategia B2B</Badge>
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">Growth Marketing</Badge>
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">Relación Comercial</Badge>
              <Badge variant="outline" className="text-[11px] font-mono border-slate-700 text-slate-300">SCRUM Management</Badge>
            </div>
          </SpotlightCard>
        </FadeInView>
      </section>

      {/* Valores de AVANZA */}
      <section className="w-full max-w-7xl mx-auto px-4 py-20 relative z-10 border-t border-slate-800/80">
        <FadeInView className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Nuestros Principios No Negociables
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Las reglas internas que gobiernan cada decisión y línea de código en AVANZA.
          </p>
        </FadeInView>

        <FadeInView delay={0.2} className="grid md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <SpotlightCard key={idx} className="p-8 border-slate-800 bg-slate-900/70 hover:-translate-y-1.5 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-6">
                <val.icon className={`w-6 h-6 ${val.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{val.description}</p>
            </SpotlightCard>
          ))}
        </FadeInView>
      </section>

      {/* CTA Final */}
      <section className="w-full bg-slate-900/80 border-t border-slate-800 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
        <FadeInView className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Construyamos juntos el futuro de tu empresa
          </h2>
          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Conversa directamente con Manuel y Magno para evaluar cómo la tecnología de AVANZA puede revolucionar tu negocio.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white h-16 px-12 text-lg shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_45px_rgba(79,70,229,0.7)] transition-all rounded-full font-bold">
              Agendar Reunión Estratégica
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </FadeInView>
      </section>
    </div>
  );
}
