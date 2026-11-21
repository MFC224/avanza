"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, DollarSign, FolderKanban, LayoutDashboard, Settings, Timer, SquareKanban, Building2 } from "lucide-react";

export const CRM_NAVIGATION = [
  { name: "Hoy", href: "/dashboard", icon: LayoutDashboard },
  { name: "Embudo", href: "/leads", icon: SquareKanban },
  { name: "Agenda", href: "/agenda", icon: CalendarDays },
  { name: "Clientes", href: "/clients", icon: Building2 },
  { name: "Proyectos", href: "/projects", icon: FolderKanban },
  { name: "Sprints", href: "/sprints", icon: Timer },
  { name: "Finanzas", href: "/finances", icon: DollarSign },
  { name: "Configuración", href: "/settings", icon: Settings },
] as const;

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="flex flex-col w-60 bg-zinc-950 border-r border-zinc-800 text-zinc-300 h-full">
      <div className="flex h-16 shrink-0 items-center px-5 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-white tracking-tight">AVANZA</span>
          <span className="text-xs text-zinc-500">CRM</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1" aria-label="Secciones del CRM">
        {CRM_NAVIGATION.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
              }`}
            >
              <item.icon className={`h-4 w-4 shrink-0 ${active ? "text-blue-400" : "text-zinc-500"}`} aria-hidden="true" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/** Navegación horizontal para celular (la barra lateral solo aparece desde 768 px). */
export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="md:hidden flex gap-1 overflow-x-auto border-b border-zinc-800 bg-zinc-950 px-3 py-2" aria-label="Secciones del CRM">
      {CRM_NAVIGATION.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-lg px-3 py-2 text-sm ${active ? "bg-zinc-800 text-white" : "text-zinc-400"}`}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
