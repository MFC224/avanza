import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Timer, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SprintsPage() {
  const supabase = await createClient();

  const { data: sprints, error } = await supabase
    .from("sprints")
    .select(`
      id,
      version_name,
      start_date,
      end_date,
      status,
      created_at,
      projects (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "Completado":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
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
          <Timer className="w-8 h-8 text-blue-500" />
          Sprints (Metodología Ágil)
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Sprint
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Versión / Entrega</TableHead>
              <TableHead className="text-zinc-400 font-medium">Proyecto Vinculado</TableHead>
              <TableHead className="text-zinc-400 font-medium">Fecha Inicio</TableHead>
              <TableHead className="text-zinc-400 font-medium">Fecha Fin Estimada</TableHead>
              <TableHead className="text-zinc-400 font-medium">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-red-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span>Error al cargar sprints.</span>
                    <span className="text-sm text-zinc-500">{error.message}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!error && (!sprints || sprints.length === 0) ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                  No hay sprints activos o registrados en este momento.
                </TableCell>
              </TableRow>
            ) : (
              sprints?.map((sprint) => (
                <TableRow key={sprint.id} className="border-zinc-800 hover:bg-zinc-900/80 transition-colors">
                  <TableCell className="font-semibold text-white">
                    {sprint.version_name}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {sprint.projects?.[0]?.name || "Sin Proyecto"}
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm">
                    {sprint.start_date ? new Date(sprint.start_date).toLocaleDateString() : "Sin fecha"}
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm">
                    {sprint.end_date ? new Date(sprint.end_date).toLocaleDateString() : "Sin fecha"}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(sprint.status)}`}>
                      {sprint.status}
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
