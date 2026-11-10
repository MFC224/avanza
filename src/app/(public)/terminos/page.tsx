import type { Metadata } from "next";
import Link from "next/link";
import { Scale, CheckCircle2, ShieldCheck, ArrowLeft, Code2, Award } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { FadeInView } from "@/components/ui/fade-in-view";
import { LuxuryMeshGradient } from "@/components/ui/luxury-mesh-gradient";

export const metadata: Metadata = {
  title: "Términos de Servicio y Contratación",
  description:
    "Términos de Servicio, cesión de propiedad intelectual (100% IP para el cliente), garantía técnica y acuerdos NDA de AVANZA.",
  alternates: {
    canonical: "/terminos",
  },
};

export default function TerminosPage() {
  return (
    <div className="w-full min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative">
      <LuxuryMeshGradient />
      <FadeInView>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Volver al inicio</span>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Scale className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
            Contratación Ágil & Propiedad 100% del Cliente
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Términos de Servicio y Estándares de Entrega
        </h1>
        <p className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed">
          Nuestra filosofía de ingeniería elimina la burocracia de las agencias tradicionales. Estos términos definen con total transparencia los compromisos, garantías y la cesión absoluta de la propiedad intelectual a tu favor.
        </p>
      </FadeInView>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 md:p-12 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm md:text-base">
        {/* IP Clause Highlight */}
        <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200/90">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">
                Garantía de Cero Bloqueo (Zero Vendor Lock-In)
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                El cliente es el propietario absoluto del 100% del código fuente, repositorios de Git, bases de datos PostgreSQL, documentación técnica y activos digitales generados una vez liquidado el sprint correspondiente.
              </p>
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-blue-600" />
            1. Alcance de los Servicios
          </h2>
          <p>
            <strong>{SITE_CONFIG.name}</strong> provee servicios profesionales especializados de ingeniería de software bajo metodología ágil SCRUM:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1.5 text-slate-600">
            <li><strong>Páginas Web y Aplicaciones de Alto Rendimiento:</strong> Arquitectura moderna basada en Next.js 16, React 19 y Tailwind CSS.</li>
            <li><strong>Sistemas Web & CRM a Medida:</strong> Bases de datos relacionales seguras con Supabase PostgreSQL y autenticación segura SSR.</li>
            <li><strong>Automatización con Agentes de IA:</strong> Modelos LLM, canalizaciones RAG e integraciones bidireccionales con WhatsApp y ERPs.</li>
            <li><strong>Aplicaciones Móviles:</strong> Soluciones multiplataforma para iOS y Android con Flutter o React Native.</li>
          </ul>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            2. Ciclos de Entrega y Metodología (Sprints de 7 a 14 Días)
          </h2>
          <p>
            El trabajo se estructura en sprints iterativos de 7 a 14 días calendario. Al cierre de cada semana, el cliente recibe acceso a un entorno de despliegue en vivo (Staging / Preview) para validar los módulos funcionales construidos.
          </p>
          <p className="mt-2">
            Las aprobaciones parciales permiten refinar requerimientos de manera continua sin sobrecostos imprevistos ni meses de espera a ciegas.
          </p>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            3. Confidencialidad y Acuerdo NDA
          </h2>
          <p>
            Toda la información operativa, lógica de negocio, datos de usuarios y estrategias comerciales provistas por el cliente tienen carácter estrictamente confidencial.
          </p>
          <p className="mt-2">
            A solicitud del cliente, formalizamos un Acuerdo de Confidencialidad y No Divulgación (Non-Disclosure Agreement - NDA) con validez jurídica antes del inicio del relevamiento técnico.
          </p>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            4. Garantía Técnica Post-Lanzamiento (30 Días)
          </h2>
          <p>
            Todos los entregables cuentan con una <strong>Garantía Técnica de 30 días calendario</strong> posterior a la puesta en producción. Durante este período, cualquier anomalía, bug o regresión atribuible al código entregado será subsanada sin costo adicional alguno.
          </p>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            5. Ley Aplicable y Jurisdicción
          </h2>
          <p className="text-slate-600">
            Los presentes términos se rigen e interpretan bajo las leyes de la <strong>República del Perú</strong>. Ante cualquier discrepancia técnica o comercial, las partes procurarán resolverla de mutuo acuerdo y, en su defecto, se someterán a la jurisdicción de los jueces y tribunales del Distrito Judicial de Lima.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {SITE_CONFIG.legalName} · Lima, Perú</p>
      </div>
    </div>
  );
}
