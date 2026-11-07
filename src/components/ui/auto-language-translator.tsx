"use client";

import { useEffect, useState } from "react";
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

export function AutoLanguageTranslator() {
  const [currentLang, setCurrentLang] = useState<string>("es");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // 1. Detect visitor browser language
    const browserLang = (typeof navigator !== "undefined" ? navigator.language : "es").toLowerCase();
    let targetLang = "es";

    if (browserLang.startsWith("hi")) {
      targetLang = "hi";
    } else if (browserLang.startsWith("en")) {
      targetLang = "en";
    } else if (browserLang.startsWith("pt")) {
      targetLang = "pt";
    } else if (!browserLang.startsWith("es")) {
      // For any other international visitor (e.g. from India using English or other non-Spanish), default to English or detected
      targetLang = browserLang.split("-")[0];
    }

    // 2. Read existing cookie if present
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const existingTrans = getCookie("googtrans");
    if (existingTrans) {
      const code = existingTrans.split("/").pop();
      if (code) {
        targetLang = code;
      }
    } else if (targetLang !== "es") {
      // Auto-set translation cookie so Google Translate translates immediately
      document.cookie = `googtrans=/es/${targetLang}; path=/;`;
      document.cookie = `googtrans=/es/${targetLang}; path=/; domain=${window.location.hostname};`;
    }

    setCurrentLang(targetLang);

    // 3. Initialize Google Translate Script
    window.googleTranslateElementInit = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "es",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setIsOpen(false);

    if (langCode === "es") {
      // Clear cookie to return to native Spanish
      document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/es/${langCode}; path=/;`;
    document.cookie = `googtrans=/es/${langCode}; path=/; domain=${window.location.hostname};`;
    window.location.reload();
  };

  if (!mounted) return null;

  const activeLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || {
    code: currentLang,
    label: currentLang.toUpperCase(),
    flag: "🌐",
  };

  return (
    <div className="relative inline-block text-left notranslate">
      {/* Hidden element required for Google Translate engine */}
      <div id="google_translate_element" className="hidden" style={{ display: "none" }} />

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors shadow-2xs"
        aria-label="Seleccionar idioma"
        title="Detección automática de idioma activa"
      >
        <Globe className="w-3.5 h-3.5 text-blue-600" />
        <span>{activeLangObj.flag}</span>
        <span className="hidden sm:inline font-mono uppercase">{activeLangObj.code}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl py-1.5 z-50">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-400 border-b border-slate-100 font-bold">
            Idioma Detectado / Select
          </div>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className={`w-full flex items-center justify-between px-3.5 py-2 text-xs text-left transition-colors ${
                currentLang === lang.code
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
              {currentLang === lang.code && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
