import React from "react";

interface AvanzaLogoProps {
  className?: string;
  variant?: "full" | "symbol" | "horizontal";
  theme?: "light" | "dark";
  size?: number;
}

/**
 * Logotipo e Isotipo Oficial de AVANZA Software Studio
 * Reproducción vectorial exacta de la identidad corporativa oficial (Imágenes 4 y 5):
 * - Viga diagonal izquierda: Azul Royal / Cobalto (#003B95)
 * - Viga diagonal central: Azul Marino Pizarra Carbón (#1E293B / #162032)
 * - Pata diagonal derecha: Azul Marino Carbón (#1E293B)
 * - Tipografía: AVANZA (Bold con tracking amplio) + SOFTWARE STUDIO (Medium mono espaciado)
 */
export function AvanzaSymbol({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="AVANZA Symbol"
    >
      {/* Viga diagonal izquierda (Azul Cobalto Oficial) */}
      <path
        d="M31.5 25.5L14 67.5H28.5L46 25.5H31.5Z"
        fill="#00358E"
      />
      {/* Viga diagonal central (Azul Marino Carbón / Charcoal Slate) */}
      <path
        d="M51.5 25.5L34 67.5H48.5L66 25.5H51.5Z"
        fill="#1E2A38"
      />
      {/* Pata diagonal derecha inferior (Charcoal Slate) */}
      <path
        d="M62 47.5L78.5 67.5H64L47.5 47.5H62Z"
        fill="#1E2A38"
      />
    </svg>
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
    return <AvanzaSymbol size={size} className={className} />;
  }

  if (variant === "full") {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        <AvanzaSymbol size={size * 1.6} />
        <span
          className={`mt-3 text-2xl sm:text-3xl font-black tracking-[0.22em] uppercase leading-none ${textColor}`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          AVANZA
        </span>
        <span
          className={`mt-1.5 text-[10px] sm:text-xs font-mono font-medium tracking-[0.32em] uppercase ${subtextColor}`}
        >
          SOFTWARE STUDIO
        </span>
      </div>
    );
  }

  // Variant "horizontal" (Default para Header y Footer)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <AvanzaSymbol size={size} />
      <div className="flex flex-col">
        <span
          className={`text-xl sm:text-2xl font-black tracking-tight uppercase leading-none ${textColor}`}
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          AVANZA
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-mono font-medium tracking-[0.24em] uppercase -mt-0.5 ${subtextColor}`}
        >
          SOFTWARE STUDIO
        </span>
      </div>
    </div>
  );
}
