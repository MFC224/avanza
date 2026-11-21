"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireStaff } from "@/lib/crm/auth";
import { scoreLead } from "@/lib/crm/scoring";
import { isLeadStage, stageInfo } from "@/lib/crm/stages";
import { normalizePhone } from "@/lib/crm/whatsapp";
import { getService } from "@/lib/arm/catalog";
import { limaToUtc } from "@/lib/arm/scheduling";

/**
 * Acciones del embudo. Cada una verifica que la cuenta sea del equipo (requireStaff)
 * y la base de datos lo vuelve a comprobar con RLS.
 */

const id = z.string().uuid();
const text = (max: number) => z.string().trim().max(max).optional().transform((v) => (v ? v : null));
const money = z
  .string()
  .optional()
  .transform((v) => (v && v.trim() !== "" ? Number(v.replace(/[^\d.]/g, "")) : null))
  .refine((v) => v === null || (Number.isFinite(v) && v >= 0 && v < 10_000_000), "Monto inválido");

function refresh(leadId?: string) {
  revalidatePath("/leads");
  revalidatePath("/dashboard");
  if (leadId) revalidatePath(`/leads/${leadId}`);
}

/** "2026-11-25" + "10:30" (hora de Lima) → ISO UTC. */
function limaInputToIso(date: string | null, time: string | null): string | null {
  if (!date) return null;
  try {
    return limaToUtc(date, time || "09:00").toISOString();
  } catch {
    return null;
  }
}

export async function createLead(formData: FormData) {
  const { ctx, supabase } = await requireStaff();
  const data = z
    .object({
      contact_name: z.string().trim().min(2, "Escribe el nombre").max(120),
      phone: text(30),
      contact_email: text(120),
      company_name: text(120),
      source: z.enum(["whatsapp", "referido", "redes", "manual", "formulario"]).default("manual"),
      service_id: text(20),
      estimated_value: money,
      need_summary: text(500),
    })
    .parse(Object.fromEntries(formData));

  const service = getService(data.service_id);
  const scoring = scoreLead({ serviceId: service?.id, budgetPEN: data.estimated_value, hasContact: Boolean(data.phone || data.contact_email) });
  const { data: row, error } = await supabase
    .from("leads")
    .insert({
      ...data,
      phone: normalizePhone(data.phone),
      contact_email: data.contact_email?.toLowerCase() ?? null,
      service_id: service?.id ?? null,
      service_name: service?.name ?? null,
      estimated_value: data.estimated_value ?? scoring.estimatedValuePEN,
      score: scoring.score,
      temperature: scoring.temperature,
      score_reasons: scoring.reasons,
      stage: "nuevo",
      owner_email: ctx.email,
      next_action: "Primer contacto",
      next_action_at: new Date().toISOString(),
    })
    .select("id")
    .single();
  if (error) throw new Error(`No se pudo crear el lead: ${error.message}`);
  await supabase.from("lead_activities").insert({ lead_id: row.id, kind: "sistema", body: "Lead creado a mano.", created_by: ctx.email });
  refresh();
  redirect(`/leads/${row.id}`);
}

export async function changeStage(formData: FormData) {
  const { ctx, supabase } = await requireStaff();
  const leadId = id.parse(formData.get("id"));
  const stage = String(formData.get("stage"));
  if (!isLeadStage(stage)) throw new Error("Etapa inválida");
  const lostReason = String(formData.get("lost_reason") ?? "").trim() || null;
  const now = new Date();
  const update: Record<string, unknown> = { stage, next_action: stageInfo(stage).hint, next_action_at: now.toISOString() };

  if (stage === "ganado") {
    Object.assign(update, { won_at: now.toISOString(), closed_at: now.toISOString(), next_action: "Pasar a proyecto y pedir anticipo" });
  } else if (stage === "perdido") {
    const reactivate = new Date(now.getTime() + 60 * 86_400_000).toISOString();
    Object.assign(update, { closed_at: now.toISOString(), lost_reason: lostReason, next_action: "Reactivar", next_action_at: reactivate });
  } else {
    Object.assign(update, { closed_at: null, lost_reason: null });
  }

  const { data: lead, error } = await supabase.from("leads").update(update).eq("id", leadId).select("*").single();
  if (error) throw new Error(`No se pudo cambiar la etapa: ${error.message}`);
  await supabase.from("lead_activities").insert({
    lead_id: leadId,
    kind: "etapa",
    body: `Etapa: ${stageInfo(stage).label}${lostReason ? ` (motivo: ${lostReason})` : ""}.`,
    created_by: ctx.email,
  });

  if (stage === "ganado") {
    const { data: existing } = await supabase.from("clients").select("id").eq("lead_id", leadId).maybeSingle();
    if (!existing) {
      await supabase.from("clients").insert({
        name: lead.contact_name,
        company: lead.company_name ?? "",
        email: lead.contact_email,
        phone: lead.phone,
        status: "Activo",
        lead_id: leadId,
        lifetime_value: lead.estimated_value ?? 0,
        notes: lead.service_name,
      });
      revalidatePath("/clients");
    }
  }
  refresh(leadId);
}

export async function updateLead(formData: FormData) {
  const { supabase } = await requireStaff();
  const data = z
    .object({
      id,
      contact_name: z.string().trim().min(2).max(120),
      phone: text(30),
      contact_email: text(120),
      company_name: text(120),
      service_id: text(20),
      estimated_value: money,
      next_action: text(160),
      next_action_date: text(10),
      next_action_time: text(5),
      need_summary: text(500),
    })
    .parse(Object.fromEntries(formData));

  const service = getService(data.service_id);
  const { error } = await supabase
    .from("leads")
    .update({
      contact_name: data.contact_name,
      phone: normalizePhone(data.phone),
      contact_email: data.contact_email?.toLowerCase() ?? null,
      company_name: data.company_name,
      service_id: service?.id ?? null,
      service_name: service?.name ?? null,
      estimated_value: data.estimated_value,
      next_action: data.next_action,
      next_action_at: limaInputToIso(data.next_action_date, data.next_action_time),
      need_summary: data.need_summary,
    })
    .eq("id", data.id);
  if (error) throw new Error(`No se pudo guardar: ${error.message}`);
  refresh(data.id);
}

export async function logActivity(formData: FormData) {
  const { ctx, supabase } = await requireStaff();
  const data = z
    .object({
      id,
      kind: z.enum(["nota", "llamada", "whatsapp", "correo", "reunion"]),
      body: z.string().trim().min(1, "Escribe algo").max(2000),
      follow_up_days: z.coerce.number().int().min(0).max(90).optional(),
    })
    .parse(Object.fromEntries(formData));

  const { error } = await supabase
    .from("lead_activities")
    .insert({ lead_id: data.id, kind: data.kind, body: data.body, created_by: ctx.email });
  if (error) throw new Error(`No se pudo guardar la actividad: ${error.message}`);

  const update: Record<string, unknown> = {};
  if (data.kind !== "nota") update.last_contact_at = new Date().toISOString();
  if (data.follow_up_days) {
    update.next_action_at = new Date(Date.now() + data.follow_up_days * 86_400_000).toISOString();
    update.next_action = "Hacer seguimiento";
  }
  // Primer contacto hecho: el lead nuevo pasa a "contactado".
  if (data.kind !== "nota") {
    await supabase.from("leads").update({ stage: "contactado" }).eq("id", data.id).eq("stage", "nuevo");
  }
  if (Object.keys(update).length) await supabase.from("leads").update(update).eq("id", data.id);
  refresh(data.id);
}
