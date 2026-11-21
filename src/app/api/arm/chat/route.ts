import { NextResponse, after } from "next/server";
import type { NextRequest } from "next/server";
import { chatRequestSchema } from "@/lib/arm/schemas";
import { buildProfile, hasContact } from "@/lib/arm/profile";
import { planTurn, summarizeProfile } from "@/lib/arm/engine";
import { craftReplyWithGemini } from "@/lib/arm/gemini";
import { checkChatLimit, clientIp } from "@/lib/arm/rate-limit";
import { ARM_CONTACT } from "@/lib/arm/catalog";
import { scoreLead } from "@/lib/crm/scoring";
import { markConversationOutcome, recordArmTurn } from "@/lib/crm/conversations";

/**
 * Turno de conversación del asistente ARM.
 * 1) reconstruye el perfil del cliente con todos sus mensajes,
 * 2) el motor decide la respuesta y la acción (contacto, agenda o WhatsApp),
 * 3) Gemini, si está configurado, solo mejora la redacción,
 * 4) después de responder, guarda métricas anónimas de la conversación.
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: "Solicitud inválida." }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
      { status: 400 }
    );
  }
  const { sessionId, message, history, asked, hasCapturedContact, pagePath } = parsed.data;

  const userMessages = [...history.filter((t) => t.role === "user").map((t) => t.text), message];
  const limit = checkChatLimit(clientIp(req.headers), userMessages.length);
  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: limit.reason, fallbackUrl: `https://wa.me/${ARM_CONTACT.whatsappRaw}` },
      { status: 429 }
    );
  }

  const profile = buildProfile(userMessages);
  const plan = planTurn({ profile, lastMessage: message, asked, hasCapturedContact });
  const scoring = scoreLead({
    serviceId: profile.serviceId,
    businessType: profile.businessType,
    budgetPEN: profile.budgetPEN,
    timeline: profile.timeline,
    objections: profile.objections,
    wantsMeeting: profile.wantsMeeting,
    hasContact: hasContact(profile),
    messageCount: profile.userMessageCount,
  });

  const summary = summarizeProfile(profile);
  const crafted = await craftReplyWithGemini({
    history: [...history, { role: "user", text: message }],
    draft: plan.reply,
    profileSummary: summary,
  });

  after(async () => {
    await recordArmTurn({ sessionId, profile, scoring, pagePath });
    if (plan.action === "whatsapp_handoff") await markConversationOutcome(sessionId, "whatsapp");
  });

  const handoffText = `Hola Magno, vengo del asistente de la web de AVANZA.${summary ? ` ${summary}.` : ""} Quisiera conversar sobre mi proyecto.`;

  return NextResponse.json({
    success: true,
    reply: crafted ?? plan.reply,
    action: plan.action,
    quickReplies: plan.quickReplies,
    asked: plan.asked,
    prefill: {
      name: profile.name ?? "",
      phone: profile.phone ?? "",
      email: profile.email ?? "",
      company: profile.company ?? "",
    },
    handoffUrl: `https://wa.me/${ARM_CONTACT.whatsappRaw}?text=${encodeURIComponent(handoffText.slice(0, 900))}`,
  });
}
