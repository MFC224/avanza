import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { FadeInView } from "@/components/ui/fade-in-view";
import { ArrowRight, CheckCircle2, Clock, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Servicios de Software e Inteligencia Artificial | AVANZA",
  description: "Desarrollo de páginas web de alto impacto, sistemas web, CRM, automatización con IA, apps móviles y arquitectura cloud con entrega en 7 a 14 días.",
  openGraph: {
    title: "Servicios de Software e IA | AVANZA",
    description: "Catálogo completo de soluciones tecnológicas con ingeniería ágil y arquitectura escalable.",
  },
};

export default function ServiciosPage() {
  const servicios = [
    {
      title: "Página Web de Alto Impacto",
      subtitle: "Presencia digital que convierte visitantes en clientes.",
      description: "Diseño premium a medida, ultra veloz, optimizado para posicionamiento en Google (SEO) y con arquitectura mobile-first impecable.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      stack: ["Next.js 16", "React", "Tailwind CSS", "SEO Pro", "Analytics"],
      delivery: "7 a 12 días",
      features: [
        "Diseño 100% responsivo para móviles y escritorios",
        "Puntuación 95+ en Google PageSpeed Insights",
        "Formularios de captación conectados a tu correo",
        "Dominio, hosting de alta velocidad y certificado SSL"
      ]
    },
    {
      title: "Sistemas Web & CRM a Medida",
      subtitle: "Plataformas de administración para automatizar tu operativa.",
      description: "Desarrollamos el centro de comando de tu empresa: paneles administrativos, gestión de clientes, control de inventario y roles de usuario.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      stack: ["Supabase", "PostgreSQL", "Next.js SSR", "TypeScript", "Tailwind"],
      delivery: "14 a 21 días",
      features: [
        "Base de datos relacional normalizada y blindada con RLS",
        "Autenticación segura (Admin, Operador, Cliente)",
        "Tablas dinámicas con filtros, reportes y exportación",
        "Gestión de estados y flujos comerciales en tiempo real"
      ]
    },
    {
      title: "Aplicaciones Móviles (iOS & Android)",
      subtitle: "Lleva tu negocio directo al bolsillo de tus clientes.",
      description: "Aplicaciones nativas y multiplataforma fluidas, intuitivas y conectadas a tu base de datos en la nube con notificaciones push.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      stack: ["React Native", "Flutter", "iOS / Android", "Push Notifications"],
      delivery: "Por Sprints SCRUM",
      features: [
        "Publicación directa en App Store y Google Play Store",
        "Sincronización en tiempo real y soporte offline",
        "Geolocalización, cámara y autenticación biométrica",
        "Mismo diseño y rendimiento en cualquier dispositivo"
      ]
    },
    {
      title: "Sistemas Complejos & Arquitectura Cloud",
      subtitle: "Software empresarial adaptado exactamente a tus reglas de negocio.",
      description: "Para empresas con flujos sofisticados que requieren microservicios, APIs de terceros, procesamiento masivo o infraestructura cloud dedicada.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      stack: ["Docker", "APIs REST / GraphQL", "AWS / GCP", "Node.js", "Redis"],
      delivery: "Por Sprints SCRUM",
      features: [
        "Arquitectura modular desacoplada y escalable",
        "Integración con pasarelas de pago y ERPs",
        "Pruebas automatizadas de calidad (E2E y Unitarias)",
        "Monitoreo 24/7 y respaldos automáticos en la nube"
      ]
    },
    {
      title: "Automatización & Agentes de IA",
      subtitle: "Inteligencia Artificial aplicada para reducir costos y tiempos.",
      description: "Integramos modelos de lenguaje (LLMs), agentes autónomos y flujos automáticos para atención al cliente, extracción de datos y análisis predictivo.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      stack: ["OpenAI / Gemini", "Python", "LangChain", "Vector DBs", "Webhooks"],
      delivery: "7 a 15 días",
      features: [
        "Chatbots inteligentes entrenados con la data de tu empresa",
        "Automatización de tareas repetitivas y soporte 24/7",
        "Procesamiento inteligente de documentos y cotizaciones",
        "Conexión directa con WhatsApp Business y tu CRM"
      ]
    },
    {
      title: "Modernización de Sistemas & Migración",
      subtitle: "Reemplaza hojas de Excel caóticas por software profesional.",
      description: "Migramos tus datos y procesos manuales a la nube sin perder un solo registro, eliminando errores humanos y duplicidad de trabajo.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      stack: ["ETL Pipelines", "PostgreSQL", "Cloud Backup", "Seguridad 3NF"],
      delivery: "10 a 20 días",
      features: [
        "Limpieza y migración segura de datos heredados",
        "Interfaces modernas fáciles de usar para todo tu personal",
        "Control de accesos y auditoría de cambios por usuario",
        "Capacitación del equipo y soporte continuo"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background Grid */}
      <BackgroundGrid />

      <div className="container mx-auto px-4 py-20 md:py-28 flex-1 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Catálogo Completo de Ingeniería
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">Servicios</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Soluciones de software de grado industrial construidas para acelerar la productividad, optimizar costos y escalar la facturación de tu negocio.
          </p>
        </div>
        
        {/* Grid de 6 Servicios con SpotlightCards */}
        <FadeInView className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {servicios.map((servicio, index) => (
            <SpotlightCard key={index} className="p-0 flex flex-col justify-between group overflow-hidden border-slate-800 bg-slate-900/80 hover:-translate-y-2 transition-transform duration-300">
              <div>
                {/* Header Image */}
                <div className="relative overflow-hidden h-52 border-b border-slate-800">
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={servicio.image} 
                    alt={servicio.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-indigo-300 text-xs font-mono font-medium flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {servicio.delivery}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">
                    {servicio.title}
                  </h3>
                  <p className="text-indigo-400 text-xs font-medium mb-3">
                    {servicio.subtitle}
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-5">
                    {servicio.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-5 pt-4 border-t border-slate-800/80">
                    {servicio.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                    {servicio.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-950 text-slate-300 border border-slate-800 hover:border-indigo-500/40 text-[10px] font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 bg-transparent">
                <Link href="/contacto" className="w-full block">
                  <Button className="w-full h-11 bg-slate-950 border border-slate-700 text-slate-200 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 transition-all font-semibold rounded-xl flex items-center justify-center gap-2 group/btn text-sm">
                    <span>Cotizar este Servicio</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </FadeInView>

        {/* Technical Guarantee Strip */}
        <FadeInView delay={0.2} className="max-w-5xl mx-auto mt-24 p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md grid sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-base">Entrega por Sprints</div>
              <div className="text-slate-400 text-xs">Sin esperas de meses, avances semanales</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-base">Código Propio & Limpio</div>
              <div className="text-slate-400 text-xs">Propiedad intelectual 100% tuya</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-base">Garantía de QA</div>
              <div className="text-slate-400 text-xs">Pruebas rigurosas previas al despliegue</div>
            </div>
          </div>
        </FadeInView>

      </div>

      {/* Call to Action CTA */}
      <section className="w-full bg-slate-900/80 border-t border-slate-800 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />
        <FadeInView className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            ¿No estás seguro de qué arquitectura elegir?
          </h2>
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Agenda una consultoría técnica gratuita con nuestros ingenieros. Evaluamos tus procesos y te proponemos la mejor solución sin compromisos.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white h-16 px-12 text-lg shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_45px_rgba(79,70,229,0.7)] transition-all rounded-full font-bold">
              Agendar Consultoría Gratuita
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </FadeInView>
      </section>
    </div>
  );
}
