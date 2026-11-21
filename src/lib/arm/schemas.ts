import { z } from "zod";
import { normalizePhone } from "../crm/whatsapp";

/** Validación de lo que el chat público envía al servidor. */

const sessionId = z.string().regex(/^[A-Za-z0-9_-]{8,64}$/, "Sesión inválida.");
const pagePath = z.string().max(200).optional();

export const transcriptSchema = z
  .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(2000) }))
  .max(80);

export const chatRequestSchema = z.object({
  sessionId,
  message: z.string().trim().min(1, "Escribe un mensaje.").max(600, "Mensaje demasiado largo (máximo 600 caracteres)."),
  /** Turnos anteriores, sin el mensaje actual. */
  history: transcriptSchema.default([]),
  asked: z.array(z.enum(["need", "business", "timeline", "budget", "next_step"])).max(10).default([]),
  hasCapturedContact: z.boolean().default(false),
  pagePath,
});

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v);

const contactFields = {
  name: z.string().trim().min(2, "Escribe tu nombre.").max(80),
  phone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().max(120).optional().default(""),
  company: z.string().trim().max(80).optional().default(""),
  consent: z.literal(true, "Para continuar, acepta la política de privacidad."),
  history: transcriptSchema.default([]),
  pagePath,
};

const hasReachableContact = (d: { phone: string; email: string }) =>
  Boolean(normalizePhone(d.phone)) || isEmail(d.email);
const contactError = { message: "Déjanos un WhatsApp o un correo válido.", path: ["phone"] };

export const leadRequestSchema = z
  .object({ sessionId, ...contactFields })
  .refine(hasReachableContact, contactError);

export const bookingRequestSchema = z
  .object({
    sessionId: sessionId.optional(),
    ...contactFields,
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida."),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida."),
    notes: z.string().trim().max(300).optional().default(""),
  })
  .refine(hasReachableContact, contactError);

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type Transcript = z.infer<typeof transcriptSchema>;
