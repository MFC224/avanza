"use server";

import { complaintSchema, type ComplaintFormData } from "@/lib/complaints-schema";
import { createClient } from "@/utils/supabase/server";

export type ComplaintResult =
  | { ok: true; code: string; createdAt: string }
  | { ok: false; reason: "validation"; errors: Record<string, string> }
  | { ok: false; reason: "storage" };

/**
 * Registra una hoja del Libro de Reclamaciones en Supabase
 * (tabla public.complaints, ver supabase/migrations/20261120_complaints_book.sql).
 * Si el registro falla, la página ofrece enviar la hoja por correo para que
 * nunca se pierda un reclamo.
 */
export async function submitComplaint(input: unknown): Promise<ComplaintResult> {
  const parsed = complaintSchema.safeParse(input);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      if (issue.path[0] && !errors[String(issue.path[0])]) errors[String(issue.path[0])] = issue.message;
    }
    return { ok: false, reason: "validation", errors };
  }

  const d: ComplaintFormData = parsed.data;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("register_complaint", {
      payload: {
        full_name: d.fullName,
        document_type: d.documentType,
        document_number: d.documentNumber,
        email: d.email,
        phone: d.phone,
        address: d.address,
        is_minor: d.isMinor,
        guardian_name: d.guardianName,
        guardian_document: d.guardianDocument,
        service_type: d.serviceType,
        amount_claimed: d.amountClaimed,
        service_description: d.serviceDescription,
        complaint_type: d.complaintType,
        description: d.description,
        request: d.request,
      },
    });
    const row = Array.isArray(data) ? data[0] : data;
    if (error || !row?.code) {
      console.error("[Libro de Reclamaciones] No se pudo registrar:", error?.message);
      return { ok: false, reason: "storage" };
    }
    return { ok: true, code: row.code as string, createdAt: row.created_at as string };
  } catch (err) {
    console.error("[Libro de Reclamaciones] Error inesperado:", err);
    return { ok: false, reason: "storage" };
  }
}
