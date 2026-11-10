import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { BackgroundGrid } from "@/components/ui/background-grid";
import { LuxuryMeshGradient } from "@/components/ui/luxury-mesh-gradient";
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
      title: "Páginas Web de Alto Impacto",
      subtitle: "Presencia digital que transmite autoridad y multiplica tus conversiones.",
      description: "Desarrollamos sitios web modernos, ultrarrápidos y con diseño cinematográfico que cautivan a tus clientes potenciales desde el primer segundo. Optimizadas al 100% para SEO y pantallas móviles.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      stack: ["Next.js 16", "Tailwind CSS", "Motion", "SEO Avanzado"],
      delivery: "7 a 12 días",
      features: [
        "Velocidad de carga instantánea (< 1 segundo)",
        "Animaciones fluidas y diseño de lujo a medida",
        "Formularios de contacto directos a WhatsApp y Base de Datos",
        "Indexación inmediata en Google con arquitectura SSR"
      ]
    },
    {
      title: "Sistemas Web & CRM a Medida",
      subtitle: "Automatiza la operación y gestión interna de tu empresa.",
      description: "Deja atrás las hojas de cálculo confusas y el descontrol. Centraliza tus ventas, clientes, inventarios y finanzas en una plataforma web segura y accesible desde cualquier dispositivo.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      stack: ["React 19", "Supabase", "PostgreSQL Enterprise", "Aislamiento de Datos"],
      delivery: "12 a 20 días",
      features: [
        "Paneles administrativos con métricas en tiempo real",
        "Control granular de permisos y roles para tu equipo",
        "Historial inmutable de cambios y auditoría de datos",
        "Exportación de reportes a PDF y Excel con un clic"
      ]
    },
    {
      title: "Aplicaciones Móviles (iOS & Android)",
      subtitle: "Tu negocio en el bolsillo de miles de clientes.",
      description: "Diseñamos y programamos aplicaciones móviles nativas y multiplataforma con interfaces intuitivas y tiempos de respuesta instantáneos. Conexión perfecta con tu infraestructura actual.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
      stack: ["React Native", "Flutter", "Push Notifications", "Cloud Auth"],
      delivery: "15 a 30 días",
      features: [
        "Despliegue directo en App Store y Google Play Store",
        "Notificaciones push segmentadas para fidelización",
        "Soporte para modo offline y sincronización en segundo plano",
        "Pasarelas de pago integradas y seguras"
      ]
    },
    {
      title: "Soluciones de Inteligencia Artificial",
      subtitle: "Automatiza tareas repetitivas y multiplica la productividad.",
      description: "Integramos modelos de lenguaje de última generación (LLMs), agentes autónomos y análisis predictivo en tus procesos comerciales y operativos diarios.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      stack: ["OpenAI / LLMs", "Python Pipelines", "LangChain", "Vector DBs"],
      delivery: "10 a 18 días",
      features: [
        "Asistentes virtuales 24/7 con atención personalizada",
        "Extracción automática de datos desde facturas y documentos",
        "Predicción de demanda y análisis de comportamiento de compra",
        "Integración nativa vía API con tu software existente"
      ]
    },
    {
      title: "Automatización de Procesos (RPA & APIs)",
      subtitle: "Conecta tus herramientas y ahorra cientos de horas hombre.",
      description: "Creamos tuberías de datos que comunican tu web, pasarelas de pago, correo electrónico, WhatsApp y software contable sin intervención manual.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
      stack: ["Edge Functions", "Webhooks", "REST APIs", "Event Queue"],
      delivery: "5 a 10 días",
      features: [
        "Sincronización bidireccional en tiempo real",
        "Alertas instantáneas a Telegram / WhatsApp ante ventas o anomalías",
        "Cero tareas manuales repetitivas en tu equipo operativo",
        "Registros de auditoría con reintentos automáticos ante caídas"
      ]
    },
    {
      title: "Modernización de Sistemas & Migración",
      subtitle: "Reemplaza hojas de Excel caóticas por software profesional.",
      description: "Migramos tus datos y procesos manuales a la nube sin perder un solo registro, eliminando errores humanos y duplicidad de trabajo.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80",
      stack: ["ETL Pipelines", "PostgreSQL", "Cloud Backup", "Estructura Segura"],
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
    <div className="flex flex-col min-h-screen bg-white text-slate-900 relative overflow-hidden">
      {/* Background Grid */}
      <BackgroundGrid />
      
      {/* Luxury Mesh Gradient */}
      <LuxuryMeshGradient />

      <div className="container mx-auto px-4 py-20 md:py-28 flex-1 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Catálogo Completo de Ingeniería
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#021761] via-blue-600 to-indigo-600">Servicios</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Soluciones de software de grado industrial construidas para acelerar la productividad, optimizar costos y escalar la facturación de tu negocio.
          </p>
        </div>
        
        {/* Grid de 6 Servicios con SpotlightCards */}
        <FadeInView className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {servicios.map((servicio, index) => (
            <SpotlightCard key={index} className="p-0 flex flex-col justify-between group overflow-hidden border-slate-200/90 bg-white hover:-translate-y-2 transition-transform duration-300 shadow-xs hover:shadow-xl">
              <div>
                {/* Header Image */}
                <div className="relative overflow-hidden h-52 border-b border-slate-100">
                  <Image 
                    src={servicio.image} 
                    alt={servicio.title} 
                    width={800}
                    height={450}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={80}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                  />
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-blue-800 text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs">
                      <Clock className="w-3 h-3 text-blue-600" />
                      {servicio.delivery}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors">
                    {servicio.title}
                  </h3>
                  <p className="text-blue-600 text-xs font-semibold mb-3">
                    {servicio.subtitle}
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed mb-5">
                    {servicio.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-2 mb-5 pt-4 border-t border-slate-100">
                    {servicio.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                    {servicio.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-100 text-slate-700 border border-slate-200 hover:border-blue-400 text-[10px] font-mono">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0 bg-transparent">
                <Link href="/contacto" className="w-full block">
                  <Button className="w-full h-11 bg-[#021761] hover:bg-blue-700 text-white transition-all font-semibold rounded-xl flex items-center justify-center gap-2 group/btn text-sm shadow-xs">
                    <span>Cotizar este Servicio</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </SpotlightCard>
          ))}
        </FadeInView>

        {/* Technical Guarantee Strip */}
        <FadeInView delay={0.2} className="max-w-5xl mx-auto mt-24 p-8 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm grid sm:grid-cols-3 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-base">Entrega por Sprints</div>
              <div className="text-slate-500 text-xs">Sin esperas de meses, avances semanales</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-base">Código Propio & Limpio</div>
              <div className="text-slate-500 text-xs">Propiedad intelectual 100% tuya</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-slate-900 font-bold text-base">Garantía de QA</div>
              <div className="text-slate-500 text-xs">Pruebas rigurosas previas al despliegue</div>
            </div>
          </div>
        </FadeInView>

      </div>

      {/* Call to Action CTA */}
      <section className="w-full bg-gradient-to-b from-slate-50 to-blue-50/40 border-t border-slate-200/80 py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-100/60 blur-[150px] rounded-full pointer-events-none" />
        <FadeInView className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            ¿No estás seguro de qué arquitectura elegir?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Agenda una consultoría técnica gratuita con nuestros ingenieros. Evaluamos tus procesos y te proponemos la mejor solución sin compromisos.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="bg-[#021761] hover:bg-blue-700 text-white h-16 px-12 text-lg shadow-md shadow-blue-900/15 hover:shadow-lg transition-all rounded-full font-bold">
              Agendar Consultoría Gratuita
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </FadeInView>
      </section>
    </div>
  );
}
