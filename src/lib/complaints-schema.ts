import { z } from "zod";

/**
 * Esquema de Validación del Libro de Reclamaciones Virtual
 * Conforme a las disposiciones de INDECOPI y Ley N° 29571 (Código de Protección y Defensa del Consumidor del Perú).
 */

export const complaintSchema = z
  .object({
  fullName: z
    .string()
    .trim()
    .min(3, "Ingresa tu nombre completo o razón social (mínimo 3 caracteres).")
    .max(120),
  documentType: z.enum(["DNI", "CE", "RUC", "PASAPORTE"], {
    error: "Selecciona un tipo de documento válido.",
  }),
  documentNumber: z
    .string()
    .trim()
    .min(6, "Número de documento no válido.")
    .max(20),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo electrónico corporativo o personal válido."),
  phone: z
    .string()
    .trim()
    .min(7, "Ingresa un número telefónico válido (mínimo 7 dígitos).")
    .max(20),
  address: z
    .string()
    .trim()
    .min(5, "Ingresa tu dirección o ciudad de residencia.")
    .max(200),
  isMinor: z.boolean().default(false),
  guardianName: z.string().trim().max(120).optional().default(""),
  guardianDocument: z.string().trim().max(20).optional().default(""),
  serviceType: z.enum(["SERVICIO", "PRODUCTO"]).default("SERVICIO"),
  serviceDescription: z.string().trim().max(300).optional().default(""),
  complaintType: z.enum(["RECLAMO", "QUEJA"], {
    error: "Selecciona si es un Reclamo o una Queja.",
  }),
  amountClaimed: z.string().optional().default(""),
  description: z
    .string()
    .trim()
    .min(15, "Describe detalladamente los hechos (mínimo 15 caracteres).")
    .max(2000),
  request: z
    .string()
    .trim()
    .min(10, "Especifica qué solución o pedido concreto solicitas (mínimo 10 caracteres).")
    .max(1000),
  termsAccepted: z.literal(true, {
    error: "Debes declarar la veracidad de los datos conforme a ley.",
  }),
})
  .superRefine((data, ctx) => {
    // Si quien reclama es menor de edad, la hoja exige los datos de su padre, madre o apoderado.
    if (data.isMinor) {
      if (!data.guardianName || data.guardianName.length < 3) {
        ctx.addIssue({ code: "custom", path: ["guardianName"], message: "Ingresa el nombre del padre, madre o apoderado." });
      }
      if (!data.guardianDocument || data.guardianDocument.length < 6) {
        ctx.addIssue({ code: "custom", path: ["guardianDocument"], message: "Ingresa el documento del padre, madre o apoderado." });
      }
    }
  });

export type ComplaintFormData = z.infer<typeof complaintSchema>;

export function generateComplaintCode(): string {
  const year = new Date().getFullYear();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `REC-${year}-${randomPart}`;
}

export function validateComplaintData(input: unknown) {
  return complaintSchema.safeParse(input);
}
