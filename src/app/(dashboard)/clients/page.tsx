import Link from "next/link";
import { listClients } from "@/lib/crm/queries";
import { formatPEN } from "@/lib/crm/stages";
import { formatPhone, whatsappLink } from "@/lib/crm/whatsapp";
import { EmptyState } from "@/components/crm/badges";
import { CreateClientModal } from "./create-client-modal";

export const metadata = { title: "Clientes" };

export default async function ClientsPage() {
  const { clients, error } = await listClients();
  const total = clients.reduce((s, c) => s + Number(c.lifetime_value ?? 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Clientes</h1>
          <p className="text-sm text-zinc-400">
            {clients.length} clientes · {formatPEN(total)} vendidos. Un lead marcado como ganado aparece aquí solo.
          </p>
        </div>
        <CreateClientModal />
      </div>

      {error && <p role="alert" className="text-sm text-red-300">No se pudieron cargar los clientes: {error}</p>}

      {clients.length === 0 ? (
        <EmptyState>Aún no hay clientes. Marca un lead como “Ganado” en el embudo y aparecerá aquí.</EmptyState>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-zinc-800">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 text-left text-xs text-zinc-400">
              <tr>
                <th className="px-3 py-2.5 font-medium">Nombre</th>
                <th className="px-3 py-2.5 font-medium">Empresa</th>
                <th className="px-3 py-2.5 font-medium">Contacto</th>
                <th className="px-3 py-2.5 font-medium">Valor</th>
                <th className="px-3 py-2.5 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {clients.map((c) => {
                const wa = whatsappLink(c.phone, `Hola ${c.name.split(" ")[0]}, `);
                return (
                  <tr key={c.id} className="hover:bg-zinc-900/60">
                    <td className="px-3 py-2.5 text-white">
                      {c.lead_id ? <Link href={`/leads/${c.lead_id}`} className="hover:underline">{c.name}</Link> : c.name}
                      {c.notes && <span className="block text-xs text-zinc-500">{c.notes}</span>}
                    </td>
                    <td className="px-3 py-2.5 text-zinc-300">{c.company || "—"}</td>
                    <td className="px-3 py-2.5 text-zinc-400 whitespace-nowrap">
                      {wa ? <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:underline">{formatPhone(c.phone)}</a> : c.email ?? "—"}
                    </td>
                    <td className="px-3 py-2.5 tabular-nums text-zinc-300">{formatPEN(Number(c.lifetime_value ?? 0))}</td>
                    <td className="px-3 py-2.5">
                      <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300 ring-1 ring-inset ring-emerald-500/30">{c.status}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
