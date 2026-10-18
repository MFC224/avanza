import { Bell, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-zinc-950 border-b border-zinc-800 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md hidden sm:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-full rounded-full border border-zinc-800 py-1.5 pl-10 pr-3 bg-zinc-900/50 text-zinc-300 placeholder:text-zinc-500 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:bg-zinc-900 focus:outline-none sm:text-sm transition-all"
            placeholder="Buscar proyectos, clientes..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button type="button" className="text-zinc-400 hover:text-zinc-100 transition-colors relative">
          <span className="sr-only">Ver notificaciones</span>
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-zinc-950" />
        </button>

        <div className="h-6 w-px bg-zinc-800 mx-1" aria-hidden="true" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none rounded-full ring-offset-zinc-950 focus:ring-2 focus:ring-blue-500 transition-all">
            <Avatar className="h-9 w-9 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <AvatarImage src="https://github.com/shadcn.png" alt="@usuario" />
              <AvatarFallback className="bg-zinc-800 text-zinc-300">AD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-zinc-800 text-zinc-300">
            <DropdownMenuLabel className="font-normal py-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">Administrador</p>
                <p className="text-xs leading-none text-zinc-500">admin@avanza.dev</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2">
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer py-2">
              Configuración
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-red-400 text-red-400 cursor-pointer py-2">
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
