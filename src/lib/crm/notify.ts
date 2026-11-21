import "server-only";

/**
 * Aviso inmediato al equipo cuando entra un lead o una cita.
 * Responder en los primeros minutos multiplica las ventas, así que el aviso
 * llega al celular aunque la base de datos falle.
 *
 * Opcional, se activa con variables de entorno:
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID   → mensaje de Telegram
 *   CRM_NOTIFY_WEBHOOK_URL                  → POST JSON (Make, Zapier, n8n, Slack, Discord…)
 */

export interface CrmNotice {
  title: string;
  lines: string[];
  url?: string;
  payload: Record<string, unknown>;
}

/** Devuelve cuántos avisos se entregaron (0 si no hay canales configurados o todos fallaron). */
export async function notifyTeam(notice: CrmNotice): Promise<number> {
  const tasks: Promise<unknown>[] = [];
  const text = [notice.title, ...notice.lines, notice.url].filter(Boolean).join("\n");

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (token && chatId) {
    tasks.push(
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
        signal: AbortSignal.timeout(5000),
      })
    );
  }

  const webhook = process.env.CRM_NOTIFY_WEBHOOK_URL;
  if (webhook) {
    tasks.push(
      fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, ...notice.payload }),
        signal: AbortSignal.timeout(5000),
      })
    );
  }

  const results = await Promise.allSettled(tasks);
  let delivered = 0;
  for (const r of results) {
    if (r.status === "rejected") console.error("[CRM] Falló un aviso al equipo:", r.reason);
    else if (r.value instanceof Response && !r.value.ok) console.error(`[CRM] Aviso rechazado: HTTP ${r.value.status}`);
    else delivered++;
  }
  return delivered;
}
