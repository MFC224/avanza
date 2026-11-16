import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvanzaLogoProps {
  className?: string;
  variant?: "full" | "symbol" | "horizontal";
  theme?: "light" | "dark";
  size?: number;
}

/**
 * Logotipo e Isotipo Oficial de AVANZA Software Studio
 * Renderizado oficial mediante asset WebP de alta fidelidad:
 * - Viga diagonal izquierda: Azul Royal / Cobalto Oficial (#00358E)
 * - Viga diagonal central: Azul Marino Carbón (#1E2A38)
 * - Pata diagonal derecha: Azul Marino Carbón (#1E2A38)
 * - Tipografía: AVANZA + SOFTWARE STUDIO
 */
export const AVANZA_BRAND_COLORS = {
  cobalt: "#00358E",
  slate: "#1E2A38",
};

export function AvanzaSymbol({
  size = 36,
  className = "",
  theme = "light",
}: {
  size?: number;
  className?: string;
  theme?: "light" | "dark";
}) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn("relative shrink-0 flex items-center justify-center select-none", className)}
      style={{ width: Math.round(size * 1.45), height: size }}
      aria-label="AVANZA Symbol"
    >
      <Image
        src={isDark ? "/images/logo-avanza-white.webp" : "/images/logo-avanza.webp"}
        alt="AVANZA Symbol"
        width={Math.round(size * 1.45)}
        height={size}
        className="w-full h-full object-contain"
        priority
      />
    </div>
  );
}

export function AvanzaBrandLogo({
  variant = "horizontal",
  theme = "light",
  className = "",
  size = 36,
}: AvanzaLogoProps) {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const subtextColor = isDark ? "text-slate-400" : "text-slate-500";

  if (variant === "symbol") {
    return <AvanzaSymbol size={size} className={className} theme={theme} />;
  }

  if (variant === "full") {
    return (
      <div className={cn("flex flex-col items-center text-center select-none", className)}>
        <AvanzaSymbol size={Math.round(size * 1.5)} theme={theme} />
        <span
          className={cn("mt-3 text-2xl sm:text-3xl font-black tracking-[0.22em] uppercase leading-none", textColor)}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          AVANZA
        </span>
        <span
          className={cn("mt-1.5 text-[10px] sm:text-xs font-mono font-medium tracking-[0.32em] uppercase", subtextColor)}
        >
          SOFTWARE STUDIO
        </span>
      </div>
    );
  }

  // Variant "horizontal" (Default para Header y Footer)
  return (
    <div className={cn("flex items-center gap-3 select-none", className)}>
      <AvanzaSymbol size={size} theme={theme} />
      <div className="flex flex-col">
        <span
          className={cn("text-xl sm:text-2xl font-black tracking-tight uppercase leading-none", textColor)}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          AVANZA
        </span>
        <span
          className={cn("text-[9px] sm:text-[10px] font-mono font-medium tracking-[0.24em] uppercase -mt-0.5", subtextColor)}
        >
          SOFTWARE STUDIO
        </span>
      </div>
    </div>
  );
}
