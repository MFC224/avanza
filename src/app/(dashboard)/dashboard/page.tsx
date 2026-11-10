import {
  LayoutDashboard,
  Calendar,
  Video,
  Clock,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { getAppointmentsList, getDropoffAnalytics } from "@/lib/arm-scheduling";

export default function DashboardPage() {
  const appointments = getAppointmentsList();
  const dropoffs = getDropoffAnalytics();

  return (
    <div className="space-y-8 p-1 sm:p-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
            <LayoutDashboard className="w-7 h-7 text-blue-500" />
            <span>Tablero Central · Operaciones & ARM v2</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Sincronización en vivo · Zona Horaria: America/Lima (UTC-5)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3.5 py-1.5 rounded-full w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ARM v2 Activo · Agendamiento Google Meet</span>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Citas Agendadas",
            value: appointments.length.toString(),
            detail: "Confirmadas en Google Calendar",
            icon: Calendar,
            color: "text-blue-400",
          },
          {
            title: "Tasa de Cierre",
            value: "78.4%",
            detail: "Prospectos calificados por ARM",
            icon: TrendingUp,
            color: "text-emerald-400",
          },
          {
            title: "Duración de Cita",
            value: "25 min",
            detail: "Colchón de 15m entre slots",
            icon: Clock,
            color: "text-cyan-400",
          },
          {
            title: "Fugas Detectadas",
            value: dropoffs.length.toString(),
            detail: "En proceso de rescate comercial",
            icon: AlertTriangle,
            color: "text-amber-400",
          },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between text-zinc-400">
                <span className="text-xs font-medium font-mono uppercase tracking-wider">
                  {metric.title}
                </span>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-white">{metric.value}</p>
              <p className="text-[11px] text-zinc-500 font-mono">{metric.detail}</p>
            </div>
          );
        })}
      </div>

      {/* SECTION 1: Citas Técnicas Agendadas (Appointments) */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-lg">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Sesiones de Ingeniería Agendadas</h2>
              <p className="text-xs text-zinc-400 font-mono">
                Tabla `appointments` · Anfitriones oficiales: Manuel & Magno · Doble reserva prevenida
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
            {appointments.length} Citas Programadas
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/40 text-zinc-400 font-mono uppercase text-[10px]">
                <th className="py-3.5 px-6">Cliente / Empresa</th>
                <th className="py-3.5 px-6">Fecha & Hora (Lima)</th>
                <th className="py-3.5 px-6">Duración</th>
                <th className="py-3.5 px-6">Anfitriones</th>
                <th className="py-3.5 px-6">Sala Google Meet</th>
                <th className="py-3.5 px-6 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-6 font-medium text-white">
                    <div>{apt.client_name}</div>
                    <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{apt.client_contact}</div>
                  </td>
                  <td className="py-4 px-6 font-mono text-zinc-300">
                    {apt.display_scheduled_at}
                  </td>
                  <td className="py-4 px-6 font-mono">
                    <span className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 text-[11px]">
                      {apt.duration_minutes} min
                    </span>
                  </td>
                  <td className="py-4 px-6 text-zinc-400 font-medium">
                    {apt.host_name}
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={apt.meet_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:text-white hover:bg-blue-600 transition-all font-mono text-[11px]"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Ingresar a Meet</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                    </a>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: Tablero de Fuga de Ventas (sales_dropoff_analytics) */}
      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/50 overflow-hidden shadow-lg">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Métricas de Fuga & Objeciones de Venta</h2>
              <p className="text-xs text-zinc-400 font-mono">
                Tabla `sales_dropoff_analytics` · Análisis forense para optimización comercial
              </p>
            </div>
          </div>
          <span className="text-xs font-mono bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
            {dropoffs.length} Casos Registrados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950/40 text-zinc-400 font-mono uppercase text-[10px]">
                <th className="py-3.5 px-6">ID Sesión</th>
                <th className="py-3.5 px-6">Servicio Consultado</th>
                <th className="py-3.5 px-6">Razón de Abandono</th>
                <th className="py-3.5 px-6">Objeción del Cliente</th>
                <th className="py-3.5 px-6 text-right">Acción de Rescate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {dropoffs.map((d) => (
                <tr key={d.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-4 px-6 font-mono text-zinc-400">
                    {d.session_id}
                  </td>
                  <td className="py-4 px-6 font-semibold text-white">
                    {d.inquired_service}
                  </td>
                  <td className="py-4 px-6 font-mono text-amber-400">
                    {d.dropoff_reason}
                  </td>
                  <td className="py-4 px-6 text-zinc-300 max-w-xs">
                    {d.client_objection}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <a
                      href="https://wa.me/51942498841?text=Hola%20Magno,%20estoy%20revisando%20el%20tablero%20de%20fuga%20de%20clientes%20de%20AVANZA."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-all font-mono text-[11px]"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Contactar por WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
