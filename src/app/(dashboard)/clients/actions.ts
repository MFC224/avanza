"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireStaff } from "@/lib/crm/auth";
import { normalizePhone } from "@/lib/crm/whatsapp";

const clientSchema = z.object({
  name: z.string().trim().min(2, "Escribe el nombre").max(120),
  company: z.string().trim().max(120).default(""),
  email: z.string().trim().max(120).optional().transform((v) => v || null),
  phone: z.string().trim().max(30).optional().transform((v) => normalizePhone(v)),
  status: z.enum(["Activo", "En proyecto", "Soporte", "Inactivo"]).default("Activo"),
});

export async function addClient(formData: FormData) {
  const { supabase } = await requireStaff();
  const parsed = clientSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Datos inválidos");
  const { error } = await supabase.from("clients").insert(parsed.data);
  if (error) {
    console.error("Error adding client:", error);
    throw new Error("Error al agregar el cliente");
  }
  revalidatePath("/clients");
}
