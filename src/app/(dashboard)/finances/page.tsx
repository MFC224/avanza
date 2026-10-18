import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function FinancesPage() {
  const supabase = await createClient();

  const { data: milestones, error } = await supabase
    .from("financial_milestones")
    .select(`
      id,
      milestone_name,
      amount,
      status,
      due_date,
      paid_date,
      created_at,
      projects (
        id,
        name,
        currency
      )
    `)
    .order("created_at", { ascending: false });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pagado":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Procesando":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "Vencido":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <DollarSign className="w-8 h-8 text-blue-500" />
          Finanzas (Hitos de Pago)
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Registrar Pago
        </Button>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Hito / Concepto</TableHead>
              <TableHead className="text-zinc-400 font-medium">Proyecto</TableHead>
              <TableHead className="text-zinc-400 font-medium">Monto</TableHead>
              <TableHead className="text-zinc-400 font-medium">Fecha Vencimiento</TableHead>
              <TableHead className="text-zinc-400 font-medium">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-red-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span>Error al cargar finanzas.</span>
                    <span className="text-sm text-zinc-500">{error.message}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!error && (!milestones || milestones.length === 0) ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                  No hay hitos de pago registrados aún.
                </TableCell>
              </TableRow>
            ) : (
              milestones?.map((m) => (
                <TableRow key={m.id} className="border-zinc-800 hover:bg-zinc-900/80 transition-colors">
                  <TableCell className="font-semibold text-white">
                    {m.milestone_name}
                  </TableCell>
                  <TableCell className="text-zinc-300">
                    {m.projects?.[0]?.name || "Sin Proyecto"}
                  </TableCell>
                  <TableCell className="text-zinc-200 font-mono font-medium">
                    {m.projects?.[0]?.currency || "USD"} ${Number(m.amount || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-zinc-400 text-sm">
                    {m.due_date ? new Date(m.due_date).toLocaleDateString() : "Inmediato"}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(m.status)}`}>
                      {m.status}
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
