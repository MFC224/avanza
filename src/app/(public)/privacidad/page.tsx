import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, FileText, ArrowLeft, Mail, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";
import { FadeInView } from "@/components/ui/fade-in-view";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description:
    "Política de Privacidad y Tratamiento de Datos Personales de AVANZA en estricto cumplimiento de la Ley N° 29733 de la República del Perú.",
};

export default function PrivacidadPage() {
  return (
    <div className="w-full min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
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
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
            Marco Legal · Ley N° 29733 (Perú)
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Política de Privacidad y Protección de Datos
        </h1>
        <p className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed">
          En <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.legalName}), la privacidad, integridad y protección de la información corporativa y personal de nuestros clientes es un principio fundamental de ingeniería.
        </p>
      </FadeInView>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 md:p-12 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm md:text-base">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            1. Marco Normativo y Titular del Tratamiento
          </h2>
          <p>
            El presente documento regula el tratamiento de datos personales recopilados a través de nuestro sitio web y plataformas operativas, de conformidad con la <strong>Ley N° 29733</strong> (Ley de Protección de Datos Personales del Perú) y su Reglamento aprobado por <strong>Decreto Supremo N° 003-2013-JUS</strong>.
          </p>
          <p className="mt-2">
            El responsable del banco de datos es <strong>{SITE_CONFIG.legalName}</strong>, con domicilio legal y operativo en Lima, Perú, representado por sus fundadores técnicos Manuel Callañaupa y Magno Alomia.
          </p>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-600" />
            2. Datos Personales que Recopilamos
          </h2>
          <p>
            Recopilamos únicamente los datos necesarios para brindar servicios profesionales de arquitectura de software, estimación técnica y soporte comercial:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1.5 text-slate-600">
            <li><strong>Datos de contacto comercial:</strong> Nombre, apellidos, teléfono corporativo / WhatsApp y correo electrónico.</li>
            <li><strong>Datos del requerimiento:</strong> Tipo de software solicitado (Página Web, CRM, Agente IA, App Móvil), tamaño de empresa y urgencia de entrega.</li>
            <li><strong>Datos técnicos de navegación:</strong> Métricas anónimas de rendimiento (LCP, FID/INP) para garantizar 90Hz–120Hz de fluidez visual sin cookies invasivas de terceros.</li>
          </ul>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            3. Finalidad del Tratamiento
          </h2>
          <p>
            Los datos proporcionados son tratados exclusivamente para:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1.5 text-slate-600">
            <li>Elaborar y remitir propuestas técnicas, presupuestos y cronogramas de sprints de software.</li>
            <li>Coordinar reuniones de alineamiento arquitectónico y demos de producto en vivo.</li>
            <li>Gestionar la relación contractual, emisión de comprobantes de pago y entrega de código fuente bajo estándares de confidencialidad (NDA).</li>
          </ul>
          <p className="mt-3 font-medium text-slate-800">
            AVANZA no comercializa, no alquila y no comparte sus datos personales con terceros para fines publicitarios.
          </p>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            4. Seguridad y Medidas de Protección Técnica
          </h2>
          <p>
            Implementamos protocolos de seguridad Zero-Trust de grado corporativo:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1.5 text-slate-600">
            <li>Cifrado en tránsito mediante protocolos TLS 1.3 / SSL de 256 bits.</li>
            <li>Aislamiento de base de datos relacional con <strong>Row-Level Security (RLS)</strong> en Supabase PostgreSQL.</li>
            <li>Protección contra bots y spam mediante mecanismos de honeypot y sanitización estricta de esquemas Zod en Node.js 24.</li>
          </ul>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            5. Ejercicio de Derechos ARCO
          </h2>
          <p>
            Como titular de los datos personales, usted tiene derecho a ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong> reconocidos por la Ley N° 29733.
          </p>
          <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">Canal oficial de Atención ARCO</p>
              <p className="text-xs text-slate-500">Respuesta formal en un plazo máximo de 5 días hábiles.</p>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.contact.email}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:text-blue-600 hover:border-blue-300 transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4 text-blue-600" />
              <span>{SITE_CONFIG.contact.email}</span>
            </a>
          </div>
        </section>

        <section className="border-t border-slate-100 pt-8">
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            6. Modificaciones y Vigencia
          </h2>
          <p className="text-slate-600">
            Esta política entra en vigencia a partir del 1 de Noviembre de 2026 y podrá ser actualizada periódicamente para reflejar mejoras técnicas o cambios normativos. Cualquier modificación sustancial será notificada a través de esta misma URL.
          </p>
        </section>
      </div>

      <div className="mt-12 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} {SITE_CONFIG.legalName} · Lima, Perú</p>
      </div>
    </div>
  );
}
