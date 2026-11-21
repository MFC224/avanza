"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

/**
 * Botón de modo claro u oscuro. El tema inicial lo fija el script de
 * src/app/layout.tsx según el dispositivo; aquí solo se cambia y se recuerda.
 */
function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  // null en el servidor; en el navegador sigue el atributo data-theme de <html>.
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => null);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("avanza-theme", next);
    } catch {
      // Sin almacenamiento: el cambio dura hasta recargar.
    }
  };

  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
      className={cn(
        "w-11 h-11 inline-flex items-center justify-center rounded-full transition-opacity hover:opacity-70 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
        className
      )}
    >
      {/* Antes de hidratar se muestra la luna; el ícono no altera el diseño. */}
      {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}
