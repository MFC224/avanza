import "server-only";
import { getAdminClient } from "./admin";
import type { ScoringResult } from "./scoring";
import type { ArmProfile } from "../arm/profile";
import { limaToUtc } from "../arm/scheduling";

/**
 * Registro anónimo de cada conversación del asistente (sin nombre, teléfono ni texto):
 * permite ver en el panel qué servicios se consultan y dónde se pierden ventas.
 */
export async function recordArmTurn(args: {
  sessionId: string;
  profile: ArmProfile;
  scoring: ScoringResult;
  pagePath?: string | null;
}): Promise<void> {
  const db = getAdminClient();
  if (!db) return;
  const { error } = await db.from("arm_conversations").upsert(
    {
      session_id: args.sessionId,
      service_id: args.profile.serviceId ?? null,
      score: args.scoring.score,
      temperature: args.scoring.temperature,
      objections: args.profile.objections,
      message_count: args.profile.userMessageCount,
      wants_meeting: args.profile.wantsMeeting,
      page_path: args.pagePath?.slice(0, 200) ?? null,
      last_message_at: new Date().toISOString(),
    },
    { onConflict: "session_id" }
  );
  if (error) console.error("[ARM] No se pudo registrar la conversación:", error.message);
}

export async function markConversationOutcome(sessionId: string, outcome: "whatsapp"): Promise<void> {
  const db = getAdminClient();
  if (!db) return;
  await db.from("arm_conversations").update({ outcome }).eq("session_id", sessionId).eq("outcome", "en_curso");
}

/** Inicios (ISO) de las citas activas de un día de Lima. */
export async function getBookedStarts(dateStr: string): Promise<string[] | null> {
  const db = getAdminClient();
  if (!db) return null;
  const from = limaToUtc(dateStr, "00:00");
  const to = new Date(from.getTime() + 86_400_000);
  const { data, error } = await db
    .from("appointments")
    .select("scheduled_at")
    .in("status", ["pendiente", "confirmada"])
    .gte("scheduled_at", from.toISOString())
    .lt("scheduled_at", to.toISOString());
  if (error) {
    console.error("[ARM] No se pudo leer la agenda:", error.message);
    return null;
  }
  return (data ?? []).map((r) => r.scheduled_at as string);
}

export type CreateAppointmentResult =
  | { ok: true; id: string }
  | { ok: false; reason: "conflict" | "storage" };

export async function createAppointment(args: {
  leadId?: string;
  startUtc: Date;
  clientName: string;
  clientContact: string;
  notes?: string | null;
}): Promise<CreateAppointmentResult> {
  const db = getAdminClient();
  if (!db) return { ok: false, reason: "storage" };
  const { data, error } = await db
    .from("appointments")
    .insert({
      lead_id: args.leadId ?? null,
      scheduled_at: args.startUtc.toISOString(),
      client_name: args.clientName,
      client_contact: args.clientContact,
      client_notes: args.notes ?? null,
      status: "pendiente",
    })
    .select("id")
    .single();
  if (error) {
    // 23505 = el índice único appointments_active_slot_unique bloqueó una doble reserva.
    if (error.code === "23505") return { ok: false, reason: "conflict" };
    console.error("[ARM] No se pudo crear la cita:", error.message);
    return { ok: false, reason: "storage" };
  }
  return { ok: true, id: data.id as string };
}
