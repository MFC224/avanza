import "server-only";
import { getAdminClient } from "./admin";
import { notifyTeam } from "./notify";
import { scoreLead } from "./scoring";
import type { ScoringResult } from "./scoring";
import { formatPEN, sourceLabel } from "./stages";
import { formatPhone, normalizePhone, whatsappLink } from "./whatsapp";
import { getService } from "../arm/catalog";
import { TIMELINE_LABELS } from "../arm/engine";
import { detectService } from "../arm/extract";
import type { ArmProfile } from "../arm/profile";
import { SITE_CONFIG } from "../site-config";

/**
 * Alta de leads desde el sitio público (asistente ARM, agenda y formulario).
 * Evita duplicados: si el teléfono o el correo ya existen, actualiza ese lead
 * y deja constancia en su historial.
 */

export type TranscriptEntry = { role: "user" | "assistant"; text: string };

export interface LeadCaptureInput {
  name: string;
  phone?: string | null;
  email?: string | null;
  company?: string | null;
  source: "arm" | "agenda" | "formulario";
  profile?: ArmProfile;
  serviceName?: string | null;
  message?: string | null;
  sessionId?: string | null;
  transcript?: TranscriptEntry[] | null;
  landingPage?: string | null;
  wantsMeeting?: boolean;
  /** false = no avisar al equipo aquí (quien llama envía su propio aviso). */
  notify?: boolean;
}

export interface LeadCaptureResult {
  /** Quedó guardado en el CRM. */
  ok: boolean;
  /** El equipo recibió al menos un aviso (Telegram o webhook). */
  notified: boolean;
  leadId?: string;
  isNew?: boolean;
  scoring: ScoringResult;
}

/** El servicio elegido en el formulario manda; si no hay, el que se detectó en la conversación. */
function matchService(input: LeadCaptureInput) {
  const byName = input.serviceName ? getService(detectService(input.serviceName)) : undefined;
  return byName ?? getService(input.profile?.serviceId);
}

export async function captureLead(input: LeadCaptureInput): Promise<LeadCaptureResult> {
  const phone = normalizePhone(input.phone);
  const email = input.email?.trim().toLowerCase() || null;
  const profile = input.profile;
  const service = matchService(input);

  const scoring = scoreLead({
    serviceId: service?.id,
    businessType: profile?.businessType,
    budgetPEN: profile?.budgetPEN,
    timeline: profile?.timeline,
    objections: profile?.objections,
    wantsMeeting: input.wantsMeeting || profile?.wantsMeeting,
    hasContact: Boolean(phone || email),
    messageCount: profile?.userMessageCount,
  });

  const needSummary = (input.message ?? profile?.needSummary ?? "").trim().slice(0, 500) || null;
  const now = new Date();
  const fields = {
    contact_name: input.name.trim().slice(0, 120),
    contact_email: email,
    phone,
    company_name: input.company?.trim() || profile?.company || null,
    service_id: service?.id ?? null,
    service_name: service?.name ?? input.serviceName ?? null,
    business_type: profile?.businessType ?? null,
    need_summary: needSummary,
    budget_pen: profile?.budgetPEN ?? null,
    timeline: profile?.timeline ?? null,
    estimated_value: scoring.estimatedValuePEN,
    score: scoring.score,
    temperature: scoring.temperature,
    score_reasons: scoring.reasons,
    consent_at: now.toISOString(),
    arm_session_id: input.sessionId ?? null,
    landing_page: input.landingPage?.slice(0, 200) ?? null,
  };

  const db = getAdminClient();
  let leadId: string | undefined;
  let isNew = false;

  if (db) {
    try {
      // Busca por teléfono y, si no aparece, por correo: la misma persona puede volver
      // con un teléfono nuevo pero el mismo correo (o al revés).
      let existing: { id: string; stage: string; score: number } | null = null;
      for (const [column, value] of [["phone", phone], ["contact_email", email]] as const) {
        if (!value || existing) continue;
        const { data, error } = await db
          .from("leads")
          .select("id, stage, score")
          .eq(column, value)
          .order("created_at", { ascending: false })
          .limit(1);
        if (error) throw error;
        existing = data?.[0] ?? null;
      }

      if (existing) {
        leadId = existing.id;
        const reopen = existing.stage === "perdido";
        const update: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(fields)) if (v !== null && v !== undefined) update[k] = v;
        if (existing.score > scoring.score) {
          delete update.score;
          delete update.temperature;
          delete update.score_reasons;
        }
        if (reopen) update.stage = "nuevo";
        update.next_action = existing.stage === "ganado" ? "Cliente actual volvió a escribir" : "Responder: volvió a escribir";
        update.next_action_at = now.toISOString();
        const { error: updateError } = await db.from("leads").update(update).eq("id", leadId);
        if (updateError) console.error("[CRM] No se pudo actualizar el lead existente:", updateError.message);
        await db.from("lead_activities").insert({
          lead_id: leadId,
          kind: input.source === "arm" ? "arm" : "sistema",
          body: `Volvió a escribir por ${sourceLabel(input.source)}.${reopen ? " Se reabrió el lead." : ""}${needSummary ? ` Mensaje: "${needSummary}"` : ""}`,
        });
      } else {
        const { data, error } = await db
          .from("leads")
          .insert({
            ...fields,
            source: input.source,
            stage: "nuevo",
            next_action: "Responder por WhatsApp",
            next_action_at: new Date(now.getTime() + 60 * 60_000).toISOString(),
          })
          .select("id")
          .single();
        if (error) throw error;
        leadId = data.id;
        isNew = true;
        await db.from("lead_activities").insert({
          lead_id: leadId,
          kind: input.source === "arm" ? "arm" : "sistema",
          body: `Lead nuevo desde ${sourceLabel(input.source)}. Puntaje ${scoring.score}/100.${needSummary ? ` Necesidad: "${needSummary}"` : ""}`,
        });
      }

      if (input.sessionId) {
        await db.from("arm_conversations").upsert(
          {
            session_id: input.sessionId,
            lead_id: leadId,
            outcome: input.source === "agenda" ? "cita" : "contacto",
            transcript: input.transcript?.slice(-40) ?? null,
            last_message_at: now.toISOString(),
          },
          { onConflict: "session_id" }
        );
      }
    } catch (err) {
      console.error("[CRM] No se pudo guardar el lead:", err);
    }
  }

  // La agenda manda un solo aviso combinado (lead + cita) después de reservar.
  if (input.notify === false) return { ok: Boolean(leadId), notified: false, leadId, isNew, scoring };

  const wa = whatsappLink(phone, `Hola ${fields.contact_name.split(" ")[0]}, soy Magno de AVANZA.`);
  const delivered = await notifyTeam({
    title: `${scoring.temperature === "caliente" ? "LEAD CALIENTE" : "Nuevo lead"} (${scoring.score}/100) · ${sourceLabel(input.source)}`,
    lines: [
      fields.contact_name + (fields.company_name ? ` · ${fields.company_name}` : ""),
      service ? `Servicio: ${service.name}` : "",
      profile?.budgetPEN !== undefined ? `Presupuesto: ${formatPEN(profile.budgetPEN)}` : "",
      profile?.timeline ? `Plazo: ${TIMELINE_LABELS[profile.timeline]}` : "",
      phone ? `WhatsApp: ${formatPhone(phone)} ${wa ?? ""}` : "",
      email ? `Correo: ${email}` : "",
      needSummary ? `"${needSummary}"` : "",
      leadId ? "" : "AVISO: no se guardó en el CRM (revisar configuración).",
    ].filter(Boolean),
    url: leadId ? `${SITE_CONFIG.url}/leads/${leadId}` : undefined,
    payload: { event: "lead", leadId, source: input.source, score: scoring.score, temperature: scoring.temperature },
  });

  return { ok: Boolean(leadId), notified: delivered > 0, leadId, isNew, scoring };
}
