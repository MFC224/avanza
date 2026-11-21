import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { leadRequestSchema } from "@/lib/arm/schemas";
import { buildProfile } from "@/lib/arm/profile";
import { summarizeProfile } from "@/lib/arm/engine";
import { ARM_CONTACT } from "@/lib/arm/catalog";
import { checkFormLimit, clientIp } from "@/lib/arm/rate-limit";
import { captureLead } from "@/lib/crm/capture";

/**
 * El cliente deja sus datos dentro del chat, con consentimiento explícito
 * (Ley N° 29733). Crea o actualiza el lead con todo el contexto de la conversación.
 */
export async function POST(req: NextRequest) {
  if (!checkFormLimit(clientIp(req.headers))) {
    return NextResponse.json(
      { success: false, error: "Recibimos varios envíos seguidos. Escríbenos por WhatsApp y te atendemos." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Solicitud inválida." }, { status: 400 });
  }
  const parsed = leadRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const profile = buildProfile(d.history.filter((t) => t.role === "user").map((t) => t.text));
  const result = await captureLead({
    name: d.name,
    phone: d.phone,
    email: d.email,
    company: d.company,
    source: "arm",
    profile,
    sessionId: d.sessionId,
    transcript: d.history,
    landingPage: d.pagePath,
  });

  const summary = summarizeProfile(profile);
  const text = `Hola Magno, soy ${d.name}. Acabo de dejar mis datos en el asistente de la web.${summary ? ` ${summary}.` : ""}`;
  const whatsappUrl = `https://wa.me/${ARM_CONTACT.whatsappRaw}?text=${encodeURIComponent(text.slice(0, 900))}`;

  // Ni guardado ni avisado: no le decimos "te escribiremos"; le damos el WhatsApp directo.
  if (!result.ok && !result.notified) {
    return NextResponse.json(
      { success: false, error: "No pudimos registrar tus datos en este momento. Escríbele a Magno por WhatsApp y te atiende.", fallbackUrl: whatsappUrl },
      { status: 503 }
    );
  }

  return NextResponse.json({
    success: true,
    stored: result.ok,
    temperature: result.scoring.temperature,
    whatsappUrl,
  });
}
