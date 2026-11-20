"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

/**
 * Aviso de cookies (Ley 29733 y su reglamento, D.S. 016-2024-JUS):
 * las cookies de analítica no son imprescindibles, así que Google Analytics
 * solo se carga después de un "Aceptar" expreso. Rechazar es igual de fácil.
 * La elección se guarda con fecha y se puede cambiar desde el pie de página
 * (evento "avanza:cookies-open").
 */
const STORAGE_KEY = "avanza-cookie-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-T3BPNFH9K1";

type Choice = "granted" | "denied";

function loadAnalytics() {
  if (typeof window === "undefined" || document.getElementById("ga-script")) return;
  const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID, { anonymize_ip: true });
  const s = document.createElement("script");
  s.id = "ga-script";
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice?: Choice };
    return parsed.choice === "granted" || parsed.choice === "denied" ? parsed.choice : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const choice = readChoice();
    if (choice === "granted") loadAnalytics();
    if (choice === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener("avanza:cookies-open", reopen);
    return () => window.removeEventListener("avanza:cookies-open", reopen);
  }, []);

  const decide = useCallback((choice: Choice) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, date: new Date().toISOString(), version: 1 }));
    } catch {
      // Sin almacenamiento: se respeta la elección solo en esta visita.
    }
    if (choice === "granted") {
      loadAnalytics();
    } else if (document.getElementById("ga-script")) {
      // Retiro del consentimiento: se recarga para descargar Analytics.
      window.location.reload();
      return;
    }
    setOpen(false);
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-labelledby="cookies-titulo"
      data-tone="paper"
      className="fixed left-4 right-4 bottom-4 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md z-[60] bg-[var(--paper)] text-[var(--ink)] p-6 rounded-[6px] shadow-[0_8px_40px_rgba(0,0,0,0.18)] cookie-rise"
    >
      <p id="cookies-titulo" className="type-body font-medium">
        Cookies
      </p>
      <p className="type-small text-[var(--muted-on-paper)] mt-2">
        Usamos cookies de analítica para saber qué páginas se visitan y mejorar el sitio. Solo las activamos si aceptas.
        Más detalles en la{" "}
        <Link href="/privacidad" className="underline underline-offset-4 text-[var(--ink)]">
          Política de privacidad
        </Link>
        .
      </p>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => decide("granted")}
          className="type-button px-5 py-3 bg-[var(--brand)] text-[var(--on-brand)] hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
        >
          Aceptar
        </button>
        <button
          type="button"
          onClick={() => decide("denied")}
          className="type-button px-5 py-3 text-[var(--ink)] border border-[var(--line-on-paper)] hover:border-[var(--ink)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
        >
          Rechazar
        </button>
      </div>
    </div>
  );
}

/** Enlace del pie de página para volver a abrir el aviso. */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("avanza:cookies-open"))}
      className={className}
    >
      Cookies
    </button>
  );
}
