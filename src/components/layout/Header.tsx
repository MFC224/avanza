import { LogOut, Search } from "lucide-react";
import { signOut } from "@/app/(dashboard)/session-actions";

/** Barra superior del CRM: búsqueda de leads y cierre de sesión reales. */
export function Header({ email }: { email: string }) {
  return (
    <header className="h-16 flex items-center justify-between gap-4 px-4 sm:px-6 bg-zinc-950 border-b border-zinc-800">
      <form action="/leads" method="get" role="search" className="relative w-full max-w-md">
        <label htmlFor="crm-search" className="sr-only">Buscar leads</label>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" aria-hidden="true" />
        <input
          id="crm-search"
          name="q"
          type="search"
          placeholder="Buscar por nombre, empresa, teléfono…"
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
      </form>
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:block text-xs text-zinc-400 max-w-[200px] truncate" title={email}>{email}</span>
        <form action={signOut}>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white cursor-pointer"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </form>
      </div>
    </header>
  );
}
