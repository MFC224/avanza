import "server-only";
import { createClient } from "@/utils/supabase/server";
import { limaToUtc, todayInLima } from "../arm/scheduling";
import { OPEN_STAGES, isLeadStage } from "./stages";
import type { AppointmentRow, ArmConversationRow, ClientRow, LeadActivityRow, LeadRow } from "./types";

/** Lecturas del panel. Usan la sesión del usuario: RLS decide qué puede ver. */

export interface LeadFilters {
  q?: string;
  stage?: string;
  temperature?: string;
  source?: string;
}

/** Quita los caracteres que romperían el filtro .or() de PostgREST. */
function cleanSearch(q: string): string {
  return q.replace(/[,()%*\\:"']/g, " ").trim().slice(0, 60);
}

export async function listLeads(filters: LeadFilters = {}) {
  const supabase = await createClient();
  let query = supabase.from("leads").select("*").order("score", { ascending: false }).limit(500);
  if (filters.stage && isLeadStage(filters.stage)) query = query.eq("stage", filters.stage);
  if (filters.temperature) query = query.eq("temperature", filters.temperature);
  if (filters.source) query = query.eq("source", filters.source);
  const q = filters.q ? cleanSearch(filters.q) : "";
  if (q) {
    const like = `%${q}%`;
    query = query.or(
      `contact_name.ilike.${like},company_name.ilike.${like},phone.ilike.${like},contact_email.ilike.${like},service_name.ilike.${like}`
    );
  }
  const { data, error } = await query;
  return { leads: (data ?? []) as LeadRow[], error: error?.message ?? null };
}

export async function getLeadDetail(id: string) {
  const supabase = await createClient();
  const { data: lead, error } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();
  if (error || !lead) return null;
  const [activities, appointments, conversation, client] = await Promise.all([
    supabase.from("lead_activities").select("*").eq("lead_id", id).order("created_at", { ascending: false }).limit(100),
    supabase.from("appointments").select("*").eq("lead_id", id).order("scheduled_at", { ascending: false }),
    supabase.from("arm_conversations").select("*").eq("lead_id", id).order("last_message_at", { ascending: false }).limit(1),
    supabase.from("clients").select("*").eq("lead_id", id).maybeSingle(),
  ]);
  return {
    lead: lead as LeadRow,
    activities: (activities.data ?? []) as LeadActivityRow[],
    appointments: (appointments.data ?? []) as AppointmentRow[],
    conversation: ((conversation.data ?? [])[0] ?? null) as ArmConversationRow | null,
    client: (client.data ?? null) as ClientRow | null,
  };
}

export async function getDashboardData() {
  const supabase = await createClient();
  const now = Date.now();
  const days = (n: number) => new Date(now - n * 86_400_000).toISOString();
  const endOfToday = limaToUtc(todayInLima(), "23:59").toISOString();

  const [open, closed, recent, upcoming, conversations] = await Promise.all([
    supabase.from("leads").select("*").in("stage", OPEN_STAGES as string[]).order("score", { ascending: false }).limit(500),
    supabase.from("leads").select("id, stage, estimated_value, closed_at, lost_reason").in("stage", ["ganado", "perdido"]).gte("closed_at", days(90)),
    supabase.from("leads").select("id, source, created_at").gte("created_at", days(90)),
    supabase
      .from("appointments")
      .select("*")
      .in("status", ["pendiente", "confirmada"])
      .gte("scheduled_at", new Date(now - 3_600_000).toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(8),
    supabase
      .from("arm_conversations")
      .select("session_id, lead_id, service_id, objections, outcome, message_count, last_message_at")
      .gte("last_message_at", days(30))
      .limit(2000),
  ]);

  const openLeads = (open.data ?? []) as LeadRow[];
  const closedLeads = (closed.data ?? []) as Pick<LeadRow, "id" | "stage" | "estimated_value" | "lost_reason">[];
  const recentLeads = (recent.data ?? []) as Pick<LeadRow, "id" | "source" | "created_at">[];
  const convs = (conversations.data ?? []) as Pick<
    ArmConversationRow,
    "session_id" | "lead_id" | "service_id" | "objections" | "outcome" | "message_count" | "last_message_at"
  >[];

  const won = closedLeads.filter((l) => l.stage === "ganado");
  const lost = closedLeads.filter((l) => l.stage === "perdido");
  const halfHourAgo = now - 30 * 60_000;
  const abandoned = convs.filter(
    (c) => !c.lead_id && c.outcome === "en_curso" && c.message_count >= 2 && new Date(c.last_message_at).getTime() < halfHourAgo
  );

  const countBy = <T,>(items: T[], key: (i: T) => string | null | undefined) => {
    const map = new Map<string, number>();
    for (const i of items) {
      const k = key(i);
      if (k) map.set(k, (map.get(k) ?? 0) + 1);
    }
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  };

  return {
    error: open.error?.message ?? null,
    openLeads,
    followUps: openLeads
      .filter((l) => l.next_action_at && l.next_action_at <= endOfToday)
      .sort((a, b) => (a.next_action_at! < b.next_action_at! ? -1 : 1)),
    newLast7: recentLeads.filter((l) => l.created_at >= days(7)).length,
    hotOpen: openLeads.filter((l) => l.temperature === "caliente").length,
    wonCount: won.length,
    lostCount: lost.length,
    wonValue: won.reduce((sum, l) => sum + (l.estimated_value ?? 0), 0),
    lostReasons: countBy(lost, (l) => l.lost_reason),
    sources: countBy(recentLeads, (l) => l.source),
    upcoming: (upcoming.data ?? []) as AppointmentRow[],
    arm: {
      total: convs.length,
      withContact: convs.filter((c) => c.lead_id || c.outcome !== "en_curso").length,
      abandoned: abandoned.length,
      abandonedServices: countBy(abandoned, (c) => c.service_id),
      objections: countBy(convs.flatMap((c) => c.objections.map((o) => ({ o }))), (x) => x.o),
    },
  };
}

export async function listAppointments() {
  const supabase = await createClient();
  const since = new Date(Date.now() - 30 * 86_400_000).toISOString();
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .gte("scheduled_at", since)
    .order("scheduled_at", { ascending: true })
    .limit(300);
  return { appointments: (data ?? []) as AppointmentRow[], error: error?.message ?? null };
}

export async function listClients() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("clients").select("*").order("created_at", { ascending: false }).limit(500);
  return { clients: (data ?? []) as ClientRow[], error: error?.message ?? null };
}

/** Hora de la solicitud, para calcular vencidos y "hace X horas" (las páginas del CRM son dinámicas). */
export function requestTime(): number {
  return Date.now();
}
