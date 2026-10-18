import { Settings, Shield, Database, UserCheck } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Settings className="w-8 h-8 text-blue-500" />
          Configuración del Sistema
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Ajustes generales, seguridad de API y estado de los servicios de AVANZA.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Card 1: Perfil y Seguridad */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <Shield className="w-6 h-6 text-indigo-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Seguridad & Autenticación</h2>
              <p className="text-xs text-zinc-400">Políticas de acceso para el equipo administrativo.</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between py-2 border-b border-zinc-900">
              <span className="text-zinc-400">Nivel de Encriptación</span>
              <span className="font-mono text-emerald-400">AES-256 / SSL TLS 1.3</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-900">
              <span className="text-zinc-400">Protección de Rutas</span>
              <span className="font-mono text-emerald-400">Supabase SSR Middleware</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-400">Row Level Security (RLS)</span>
              <span className="font-mono text-emerald-400">Activado (Estricto)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Estado de Base de Datos */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <Database className="w-6 h-6 text-cyan-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Infraestructura de Datos</h2>
              <p className="text-xs text-zinc-400">Conexión activa con el motor PostgreSQL de Supabase.</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between py-2 border-b border-zinc-900">
              <span className="text-zinc-400">Motor de Base de Datos</span>
              <span className="font-mono text-zinc-200">PostgreSQL (Supabase Cloud)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-900">
              <span className="text-zinc-400">Esquema Actual</span>
              <span className="font-mono text-indigo-400">schema_avanza_v2 (Normalizado 3NF)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-400">Tablas Principales</span>
              <span className="font-mono text-zinc-300">companies, leads, projects, sprints, qa_tests, financial_milestones</span>
            </div>
          </div>
        </div>

        {/* Card 3: Datos de la Empresa */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
            <UserCheck className="w-6 h-6 text-emerald-400" />
            <div>
              <h2 className="text-lg font-bold text-white">Identidad Corporativa</h2>
              <p className="text-xs text-zinc-400">Datos públicos para cotizaciones y contratos.</p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-zinc-300">
            <div className="flex justify-between py-2 border-b border-zinc-900">
              <span className="text-zinc-400">Empresa</span>
              <span className="font-semibold text-white">AVANZA Technology Studio</span>
            </div>
            <div className="flex justify-between py-2 border-b border-zinc-900">
              <span className="text-zinc-400">Correo Comercial</span>
              <span className="text-zinc-300">avanza.mmoficial@gmail.com</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-400">Directores</span>
              <span className="text-zinc-300">Manuel Callañaupa (Tech) · Magno Alomia (Commercial)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
