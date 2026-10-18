"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Building2, FolderKanban, Timer, DollarSign, Settings } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/dashboard", icon: LayoutDashboard },
  { name: "Prospectos", href: "/leads", icon: Users },
  { name: "Clientes", href: "/clients", icon: Building2 },
  { name: "Proyectos", href: "/projects", icon: FolderKanban },
  { name: "Sprints", href: "/sprints", icon: Timer },
  { name: "Finanzas", href: "/finances", icon: DollarSign },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 bg-zinc-950 border-r border-zinc-800 text-zinc-300 shadow-xl z-20 h-full">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-zinc-800/50">
        <Link href="/dashboard" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-violet-600 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.3)]">
            <span className="text-white font-bold text-lg leading-none">A</span>
          </div>
          <span className="text-xl font-bold text-white tracking-tight">AVANZA</span>
        </Link>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto px-3 py-6">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">
          Navegación
        </div>
        <nav className="flex-1 space-y-1.5">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-blue-600/15 text-blue-400 shadow-sm"
                    : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 shrink-0 ${
                    isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-zinc-800/50">
        <Link
          href="/settings"
          className="group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100 transition-all"
        >
          <Settings className="h-5 w-5 shrink-0 text-zinc-500 group-hover:text-zinc-300" />
          Configuración
        </Link>
      </div>
    </div>
  );
}
