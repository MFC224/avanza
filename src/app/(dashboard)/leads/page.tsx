import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";

export default async function LeadsPage() {
  const supabase = await createClient();
  
  // Realiza un JOIN entre leads y companies usando la sintaxis de Supabase
  const { data: leads, error } = await supabase
    .from("leads")
    .select(`
      id,
      contact_name,
      contact_email,
      interest_level,
      funnel_status,
      created_at,
      companies (
        id,
        name
      )
    `)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Users className="w-8 h-8 text-blue-500" />
          Prospectos (Leads)
        </h1>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Nombre Contacto</TableHead>
              <TableHead className="text-zinc-400 font-medium">Empresa</TableHead>
              <TableHead className="text-zinc-400 font-medium">Email</TableHead>
              <TableHead className="text-zinc-400 font-medium">Nivel de Interés</TableHead>
              <TableHead className="text-zinc-400 font-medium">Estado Embudo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-red-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span>Error al cargar prospectos.</span>
                    <span className="text-sm text-zinc-500">{error.message}</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!error && (!leads || leads.length === 0) ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                  No hay prospectos registrados aún.
                </TableCell>
              </TableRow>
            ) : (
              leads?.map((lead) => (
                <TableRow key={lead.id} className="border-zinc-800 hover:bg-zinc-900/80 transition-colors">
                  <TableCell className="font-medium text-zinc-200">{lead.contact_name}</TableCell>
                  <TableCell className="text-zinc-300">{lead.companies?.[0]?.name || "Sin Empresa"}</TableCell>
                  <TableCell className="text-zinc-400">{lead.contact_email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                      lead.interest_level === 'Alto' || lead.interest_level === 'Urgente' 
                        ? 'bg-red-500/10 text-red-400 ring-red-500/20' 
                        : lead.interest_level === 'Medio'
                        ? 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/20'
                        : 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'
                    }`}>
                      {lead.interest_level || "Desconocido"}
                    </span>
                  </TableCell>
                  <TableCell>
                     <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                      {lead.funnel_status}
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
