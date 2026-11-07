/**
 * Detector y Catálogo Internacional de Países para Contacto Global: AVANZA
 * Soporte para detección automática por Timezone y Locale de navegador.
 */

export interface CountryInfo {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export const COUNTRIES: CountryInfo[] = [
  { code: "PE", name: "Perú", dialCode: "+51", flag: "🇵🇪" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flag: "🇺🇸" },
  { code: "MX", name: "México", dialCode: "+52", flag: "🇲🇽" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "ES", name: "España", dialCode: "+34", flag: "🇪🇸" },
  { code: "BR", name: "Brasil", dialCode: "+55", flag: "🇧🇷" },
  { code: "GB", name: "Reino Unido", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canadá", dialCode: "+1", flag: "🇨🇦" },
  { code: "DE", name: "Alemania", dialCode: "+49", flag: "🇩🇪" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "OTHER", name: "Otro País / Internacional", dialCode: "+", flag: "🌐" },
];

/**
 * Detecta el país del visitante basado en zona horaria y configuración de idioma
 */
export function detectUserCountry(timeZoneOverride?: string, localeOverride?: string): CountryInfo {
  try {
    const tz =
      timeZoneOverride ||
      (typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone
        : "");

    const locale =
      localeOverride ||
      (typeof navigator !== "undefined" ? navigator.language : "es-PE");

    const tzLower = (tz || "").toLowerCase();
    const locLower = (locale || "").toLowerCase();

    // 1. Detección por Timezone
    if (tzLower.includes("calcutta") || tzLower.includes("kolkata") || locLower.includes("-in") || locLower === "hi") {
      return COUNTRIES.find((c) => c.code === "IN") || COUNTRIES[0];
    }
    if (tzLower.includes("lima") || locLower.includes("-pe")) {
      return COUNTRIES.find((c) => c.code === "PE") || COUNTRIES[0];
    }
    if (
      tzLower.includes("new_york") ||
      tzLower.includes("chicago") ||
      tzLower.includes("los_angeles") ||
      tzLower.includes("denver") ||
      locLower === "en-us"
    ) {
      return COUNTRIES.find((c) => c.code === "US") || COUNTRIES[0];
    }
    if (tzLower.includes("mexico") || locLower.includes("-mx")) {
      return COUNTRIES.find((c) => c.code === "MX") || COUNTRIES[0];
    }
    if (tzLower.includes("bogota") || locLower.includes("-co")) {
      return COUNTRIES.find((c) => c.code === "CO") || COUNTRIES[0];
    }
    if (tzLower.includes("santiago") || locLower.includes("-cl")) {
      return COUNTRIES.find((c) => c.code === "CL") || COUNTRIES[0];
    }
    if (tzLower.includes("buenos_aires") || locLower.includes("-ar")) {
      return COUNTRIES.find((c) => c.code === "AR") || COUNTRIES[0];
    }
    if (tzLower.includes("madrid") || locLower.includes("-es")) {
      return COUNTRIES.find((c) => c.code === "ES") || COUNTRIES[0];
    }
    if (tzLower.includes("sao_paulo") || locLower.includes("-br") || locLower === "pt") {
      return COUNTRIES.find((c) => c.code === "BR") || COUNTRIES[0];
    }
    if (tzLower.includes("london") || locLower.includes("-gb")) {
      return COUNTRIES.find((c) => c.code === "GB") || COUNTRIES[0];
    }

    // Default fallback a Perú si estamos en entorno latinoamericano o en blanco
    return COUNTRIES[0];
  } catch {
    return COUNTRIES[0];
  }
}
