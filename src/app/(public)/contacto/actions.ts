"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";

const contactSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Por favor ingresa tu nombre (mínimo 2 letras).")
    .max(100),
  contacto: z
    .string()
    .trim()
    .min(5, "Ingresa un número de WhatsApp o correo válido.")
    .max(150),
  servicio: z
    .string()
    .trim()
    .optional()
    .default("Página Web de Alto Impacto"),
  mensaje: z
    .string()
    .trim()
    .optional()
    .default("Solicitud de cotización rápida."),
  _honey: z
    .string()
    .optional()
    .default(""),
});

export async function submitContactForm(formData: FormData) {
  // Support either unified 'contacto' field or legacy 'correo'/'telefono'
  const rawContact = (formData.get("contacto") as string) || (formData.get("correo") as string) || (formData.get("telefono") as string) || "";
  const rawNombre = (formData.get("nombre") as string) || "";
  const rawApellidos = (formData.get("apellidos") as string) || "";
  const fullName = rawApellidos ? `${rawNombre} ${rawApellidos}`.trim() : rawNombre.trim();

  const rawData = {
    nombre: fullName,
    contacto: rawContact,
    servicio: (formData.get("servicio") as string) || "Página Web de Alto Impacto",
    mensaje: (formData.get("mensaje") as string) || "Interesado en una cotización de software.",
    _honey: (formData.get("_honey") as string) || "",
  };

  const validation = contactSchema.safeParse(rawData);

  if (!validation.success) {
    const firstError = validation.error.issues[0]?.message || "Datos incompletos.";
    return { success: false, error: firstError };
  }

  const data = validation.data;

  // Bot honeypot check
  if (data._honey && data._honey.length > 0) {
    return { success: true };
  }

  try {
    const supabase = await createClient();

    const isEmail = data.contacto.includes("@");
    const contactEmail = isEmail ? data.contacto.toLowerCase() : `${data.contacto.replace(/\D/g, '')}@lead-whatsapp.avanza.dev`;

    const { error: leadError } = await supabase.from("leads").insert({
      contact_name: data.nombre,
      contact_email: contactEmail,
      interest_level: "Alto",
      funnel_status: "Contacto Inicial",
    });

    if (leadError) {
      console.error("Error al registrar lead en Supabase:", leadError.message);
      // Even if database has an issue, return success to maintain user satisfaction
      return { success: true };
    }

    return { success: true };
  } catch (error) {
    console.error("Error inesperado en submitContactForm:", error);
    return { success: true };
  }
}
