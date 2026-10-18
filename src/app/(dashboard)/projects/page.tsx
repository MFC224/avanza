import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderKanban, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select(`
      id,
      name,
      description,
      tech_stack,
      total_budget,
      currency,
      status,
      created_at,
      companies (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "En Desarrollo":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "Completado":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "En Pausa":
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      case "Cancelado":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-zinc-800 text-zinc-300 border border-zinc-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <FolderKanban className="w-8 h-8 text-blue-500" />
          Proyectos
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Nombre del Proyecto</TableHead>
              <TableHead className="text-zinc-400 font-medium">Empresa / Cliente</TableHead>
              <TableHead className="text-zinc-400 font-medium">Presupuesto</TableHead>
              <TableHead className="text-zinc-400 font-medium">Stack Tecnológico</TableHead>
              <TableHead className="text-zinc-400 font-medium">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-red-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span>Error al cargar proyectos.</span>
                    <span className="text-sm text-zinc-500">{error.message}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!error && (!projects || projects.length === 0) ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                  No hay proyectos registrados aún en la base de datos.
                </TableCell>
              </TableRow>
            ) : (
              projects?.map((project) => (
                <TableRow key={project.id} className="border-zinc-800 hover:bg-zinc-900/80 transition-colors">
                  <TableCell className="font-medium text-zinc-200">
                    <div>
                      <div className="font-semibold text-white">{project.name}</div>
                      {project.description && (
                        <div className="text-xs text-zinc-400 truncate max-w-xs">{project.description}</div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {project.companies?.[0]?.name || "Sin Empresa Asignada"}
                  </TableCell>
                  <TableCell className="text-zinc-300 font-mono">
                    {project.currency} {Number(project.total_budget || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-zinc-400 text-xs font-mono">
                    {project.tech_stack || "No especificado"}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(project.status)}`}>
                      {project.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
