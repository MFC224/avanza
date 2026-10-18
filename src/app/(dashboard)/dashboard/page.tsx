import { LayoutDashboard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8 text-blue-500" />
          Resumen
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Placeholder cards for dashboard metrics */}
        {[
          { title: "Proyectos Activos", value: "12" },
          { title: "Clientes", value: "48" },
          { title: "Horas Registradas", value: "1,204" },
          { title: "Ingresos Estimados", value: "$45,231" },
        ].map((metric) => (
          <div key={metric.title} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-sm">
            <h3 className="text-sm font-medium text-zinc-400">{metric.title}</h3>
            <p className="mt-2 text-3xl font-bold text-white">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
