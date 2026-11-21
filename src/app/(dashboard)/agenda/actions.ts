"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireStaff } from "@/lib/crm/auth";
import { APPOINTMENT_STATUS_LABELS } from "@/lib/crm/types";

const schema = z.object({
  id: z.string().uuid(),
  status: z.enum(["pendiente", "confirmada", "completada", "no_asistio", "cancelada"]).optional(),
  meet_url: z
    .string()
    .trim()
    .max(300)
    .optional()
    .refine((v) => !v || /^https:\/\/(meet\.google\.com|[\w.-]*zoom\.us|teams\.microsoft\.com)\//.test(v), "Pega un enlace de Google Meet, Zoom o Teams."),
});

/** Confirmar con enlace de Meet, marcar realizada, no asistió o cancelar. */
export async function updateAppointment(formData: FormData) {
  const { ctx, supabase } = await requireStaff();
  const data = schema.parse(Object.fromEntries(formData));
  const update: Record<string, unknown> = {};
  if (data.meet_url) {
    update.meet_url = data.meet_url;
    update.status = "confirmada";
  }
  if (data.status) update.status = data.status;
  if (Object.keys(update).length === 0) return;

  const { data: apt, error } = await supabase.from("appointments").update(update).eq("id", data.id).select("lead_id, status").single();
  if (error) throw new Error(`No se pudo actualizar la cita: ${error.message}`);

  if (apt.lead_id) {
    const label = APPOINTMENT_STATUS_LABELS[apt.status as keyof typeof APPOINTMENT_STATUS_LABELS] ?? apt.status;
    await supabase.from("lead_activities").insert({
      lead_id: apt.lead_id,
      kind: "reunion",
      body: `Videollamada: ${label}.${data.meet_url ? ` Enlace: ${data.meet_url}` : ""}`,
      created_by: ctx.email,
    });
    if (apt.status === "completada") {
      await supabase
        .from("leads")
        .update({ next_action: "Enviar propuesta (máximo 24 h después de la reunión)", next_action_at: new Date(Date.now() + 86_400_000).toISOString() })
        .eq("id", apt.lead_id);
    }
    if (apt.status === "no_asistio") {
      await supabase
        .from("leads")
        .update({ next_action: "Reprogramar: no asistió", next_action_at: new Date().toISOString() })
        .eq("id", apt.lead_id);
    }
    revalidatePath(`/leads/${apt.lead_id}`);
  }
  revalidatePath("/agenda");
  revalidatePath("/dashboard");
}
