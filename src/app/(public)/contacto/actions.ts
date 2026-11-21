"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { captureLead } from "@/lib/crm/capture";
import { checkFormLimit, clientIp } from "@/lib/arm/rate-limit";
import { extractEmail } from "@/lib/arm/extract";
import { buildProfile } from "@/lib/arm/profile";

const contactSchema = z.object({
  nombre: z.string().trim().min(2, "Por favor ingresa tu nombre (mínimo 2 letras).").max(100),
  contacto: z.string().trim().min(5, "Ingresa un número de WhatsApp o correo válido.").max(150),
  servicio: z.string().trim().max(100).optional().default("Página web"),
  pais: z.string().trim().max(60).optional().default("Perú (+51)"),
  mensaje: z.string().trim().max(2000).optional().default(""),
  consentimiento: z.literal("si", "Debes aceptar la Política de Privacidad (Ley N° 29733) para enviar tus datos."),
  _honey: z.string().optional().default(""),
});

/**
 * Formulario de /contacto → lead en el CRM (fuente "formulario") + aviso al equipo.
 * Si la base de datos falla, el aviso por Telegram o webhook igual llega.
 */
export async function submitContactForm(formData: FormData) {
  const get = (key: string) => (formData.get(key) as string | null) ?? undefined;
  const validation = contactSchema.safeParse({
    nombre: [get("nombre"), get("apellidos")].filter(Boolean).join(" "),
    contacto: get("contacto") ?? get("correo") ?? get("telefono") ?? "",
    servicio: get("servicio"),
    pais: get("pais"),
    mensaje: get("mensaje"),
    consentimiento: get("consentimiento"),
    _honey: get("_honey"),
  });

  if (!validation.success) {
    return { success: false, error: validation.error.issues[0]?.message || "Datos incompletos." };
  }
  const data = validation.data;

  // Campo trampa lleno = robot. Se responde "éxito" para no darle pistas.
  if (data._honey) return { success: true };

  if (!checkFormLimit(clientIp(await headers()))) {
    return { success: false, error: "Recibimos varios envíos seguidos. Escríbenos por WhatsApp y te atendemos." };
  }

  const email = extractEmail(data.contacto);
  const dial = data.pais.match(/\+(\d{1,4})/)?.[1];
  const digits = data.contacto.replace(/\D/g, "");
  const phone = email ? null : dial && !digits.startsWith(dial) && digits.length <= 10 ? `+${dial}${digits}` : digits;

  const result = await captureLead({
    name: data.nombre,
    phone,
    email,
    source: "formulario",
    serviceName: data.servicio,
    message: data.mensaje || null,
    profile: data.mensaje ? buildProfile([data.mensaje]) : undefined,
    landingPage: "/contacto",
  });

  // Si no se guardó ni se pudo avisar al equipo, la solicitud se perdería: se lo decimos
  // a la persona para que use WhatsApp en vez de esperar una respuesta que no llegará.
  if (!result.ok && !result.notified) {
    return {
      success: false,
      error: "No pudimos registrar tu solicitud en este momento. Escríbenos por WhatsApp al +51 942 498 841 y te respondemos hoy.",
    };
  }
  return { success: true };
}
