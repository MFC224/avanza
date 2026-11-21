"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (
          options: { pageLanguage: string; autoDisplay?: boolean },
          elementId: string
        ) => void;
      };
    };
  }
}

const SUPPORTED_LANGUAGES = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "hi", label: "हिन्दी (India)", flag: "🇮🇳" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

/*
 * Privacidad (Ley N° 29733): Google Translate NO se carga ni deja cookies por su cuenta.
 * Solo se activa cuando la persona elige otro idioma en este menú; esa elección queda
 * en la cookie "googtrans", que Google necesita para traducir. Volver a Español la borra.
 */

function readLanguageCookie(): string {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  return match?.[1]?.split("/").pop() || "es";
}

function writeLanguageCookie(langCode: string): void {
  const host = window.location.hostname;
  if (langCode === "es") {
    const expired = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = `googtrans=; path=/; ${expired}`;
    document.cookie = `googtrans=; path=/; domain=${host}; ${expired}`;
  } else {
    document.cookie = `googtrans=/es/${langCode}; path=/; SameSite=Lax`;
    document.cookie = `googtrans=/es/${langCode}; path=/; domain=${host}; SameSite=Lax`;
  }
}

function loadGoogleTranslate(): void {
  if (document.getElementById("google-translate-script")) return;
  window.googleTranslateElementInit = () => {
    if (window.google?.translate?.TranslateElement) {
      new window.google.translate.TranslateElement({ pageLanguage: "es", autoDisplay: false }, "google_translate_element");
    }
  };
  const script = document.createElement("script");
  script.id = "google-translate-script";
  script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  script.async = true;
  document.body.appendChild(script);
}

const noopSubscribe = () => () => {};

export function AutoLanguageTranslator() {
  // null en el servidor; en el navegador, el idioma elegido antes (o "es").
  const currentLang = useSyncExternalStore(noopSubscribe, readLanguageCookie, () => null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentLang && currentLang !== "es") loadGoogleTranslate();
  }, [currentLang]);

  if (currentLang === null) return null;

  const changeLanguage = (langCode: string) => {
    setIsOpen(false);
    if (langCode === currentLang) return;
    writeLanguageCookie(langCode);
    window.location.reload();
  };

  const active = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) ?? {
    code: currentLang,
    label: currentLang.toUpperCase(),
    flag: "🌐",
  };

  return (
    <div className="relative inline-block text-left notranslate">
      <div id="google_translate_element" className="hidden" style={{ display: "none" }} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
        aria-label={`Idioma: ${active.label}. Cambiar idioma`}
      >
        <Globe className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
        <span aria-hidden="true">{active.flag}</span>
        <span className="hidden sm:inline uppercase">{active.code}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 w-56 rounded-2xl bg-white border border-slate-200 shadow-xl py-1.5 z-50">
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => changeLanguage(lang.code)}
              aria-current={currentLang === lang.code ? "true" : undefined}
              className={`w-full flex items-center gap-2 px-3.5 py-2 text-xs text-left transition-colors ${
                currentLang === lang.code ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span aria-hidden="true">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
          <p className="px-3.5 pt-1.5 pb-1 text-[10px] leading-snug text-slate-500 border-t border-slate-100">
            Otros idiomas usan Google Translate, que guarda una cookie con tu elección.
          </p>
        </div>
      )}
    </div>
  );
}
