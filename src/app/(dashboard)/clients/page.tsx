import { createClient } from "@/utils/supabase/server";
import { CreateClientModal } from "./create-client-modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";

export default async function ClientsPage() {
  const supabase = await createClient();
  const { data: clients, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Users className="w-8 h-8 text-blue-500" />
          Clientes
        </h1>
        <CreateClientModal />
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium">Nombre</TableHead>
              <TableHead className="text-zinc-400 font-medium">Empresa</TableHead>
              <TableHead className="text-zinc-400 font-medium">Correo Electrónico</TableHead>
              <TableHead className="text-zinc-400 font-medium">Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-red-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span>Error al cargar clientes.</span>
                    <span className="text-sm text-zinc-500">Asegúrate de configurar las variables de entorno de Supabase y crear la tabla &apos;clients&apos;.</span>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!error && (!clients || clients.length === 0) ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-zinc-500">
                  No hay clientes registrados aún.
                </TableCell>
              </TableRow>
            ) : (
              clients?.map((client) => (
                <TableRow key={client.id} className="border-zinc-800 hover:bg-zinc-900/80 transition-colors">
                  <TableCell className="font-medium text-zinc-200">{client.name}</TableCell>
                  <TableCell className="text-zinc-300">{client.company}</TableCell>
                  <TableCell className="text-zinc-400">{client.email}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                      {client.status}
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
