import { AvanzaBrandLogo } from "@/components/ui/avanza-brand-logo";

/**
 * Pantalla de carga acorde al sistema visual (ronda 2): fondo del tema,
 * logo de AVANZA y una línea fina que avanza. Sin brillos ni giros.
 * Respeta el modo claro u oscuro y "reducir movimiento".
 */
export default function Loading() {
  return (
    <div
      data-tone="paper"
      role="status"
      aria-live="polite"
      className="min-h-[100svh] w-full flex flex-col items-center justify-center bg-[var(--paper)] text-[var(--ink)]"
    >
      <div className="avanza-load-fade flex flex-col items-center">
        <AvanzaBrandLogo variant="horizontal" size={40} theme="light" className="theme-light-only" />
        <AvanzaBrandLogo variant="horizontal" size={40} theme="dark" className="theme-dark-only" />
        <div className="mt-8 w-40 h-px bg-[var(--line-on-paper)] overflow-hidden" aria-hidden="true">
          <div className="avanza-load-bar h-full w-full bg-[var(--ink)]" />
        </div>
        <span className="sr-only">Cargando</span>
      </div>
    </div>
  );
}
