/**
 * Límite de uso del asistente, en memoria de cada instancia del servidor.
 * Es una primera barrera contra abusos; en Vercel cada instancia lleva su propia
 * cuenta, así que no reemplaza a un límite compartido (por ejemplo, Upstash).
 */

export const ARM_LIMITS = {
  MAX_MESSAGES_PER_SESSION: 40,
  MAX_REQUESTS_PER_MINUTE_PER_IP: 15,
  MAX_FORMS_PER_HOUR_PER_IP: 6,
} as const;

const buckets = new Map<string, number[]>();

function hit(key: string, windowMs: number, max: number): boolean {
  const now = Date.now();
  const recent = (buckets.get(key) ?? []).filter((t) => t > now - windowMs);
  if (recent.length >= max) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) if (!times.some((t) => t > now - 3_600_000)) buckets.delete(k);
  }
  return true;
}

export function checkChatLimit(ip: string, messageCount: number): { allowed: boolean; reason?: string } {
  if (messageCount > ARM_LIMITS.MAX_MESSAGES_PER_SESSION) {
    return {
      allowed: false,
      reason: "Esta conversación ya es larga. Para seguir, escríbele directamente a Magno por WhatsApp y te atiende en persona.",
    };
  }
  if (!hit(`chat:${ip}`, 60_000, ARM_LIMITS.MAX_REQUESTS_PER_MINUTE_PER_IP)) {
    return { allowed: false, reason: "Estás enviando mensajes muy rápido. Espera unos segundos e inténtalo de nuevo." };
  }
  return { allowed: true };
}

export function checkFormLimit(ip: string): boolean {
  return hit(`form:${ip}`, 3_600_000, ARM_LIMITS.MAX_FORMS_PER_HOUR_PER_IP);
}

/**
 * IP del visitante. En Vercel, x-real-ip y x-vercel-forwarded-for los pone la plataforma
 * (el visitante no puede falsificarlos); x-forwarded-for queda solo como último recurso.
 */
export function clientIp(headers: Headers): string {
  const trusted = headers.get("x-real-ip") ?? headers.get("x-vercel-forwarded-for")?.split(",")[0];
  return (trusted ?? headers.get("x-forwarded-for")?.split(",")[0] ?? "local").trim();
}

export function resetRateLimitsForTesting(): void {
  buckets.clear();
}
