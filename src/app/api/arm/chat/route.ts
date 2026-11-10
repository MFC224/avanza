import { NextRequest, NextResponse } from "next/server";
import {
  armChatSchema,
  checkArmRateLimit,
  resolveGroundedArmResponse,
} from "@/lib/arm-engine";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction for rate limiting
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    // 2. Parse request body
    const body = await req.json();
    const validation = armChatSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Datos de mensaje inválidos.";
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { sessionId, message, consentGiven, clientName, contactInfo } = validation.data;

    // 3. Rate Limit verification (10 msgs per session, 5 req/min per IP)
    const rateCheck = checkArmRateLimit(sessionId, ip);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        { success: false, error: rateCheck.reason },
        { status: 429 }
      );
    }

    // 4. Inferencia: Gemini API Paid o Grounded Engine
    let assistantReply = "";
    let detectedService;
    let suggestedAction: "consent_required" | "whatsapp_redirect" | "continue" = "continue";

    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (geminiApiKey) {
      try {
        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: message }] }],
              systemInstruction: {
                parts: [
                  {
                    text: "Eres el asistente comercial ARM de AVANZA Software Studio (avanzape.com). Respondes preguntas de clientes en Perú y Latinoamérica sobre desarrollo de software a medida. Catálogo en Soles: Páginas Web desde S/ 1,200 (7-12 días), Sistemas CRM desde S/ 2,800 (12-20 días), IA desde S/ 3,500. Sprints SCRUM de 7 a 14 días. 100% código propio. Antes de pedir WhatsApp o correo, debes solicitar consentimiento conforme a la Ley N° 29733. Fundadores: Magno Alomía (+51 942 498 841) y Manuel Callañaupa (+51 921 195 037). Sé conciso, profesional y formal.",
                  },
                ],
              },
              generationConfig: {
                temperature: 0.2,
                maxOutputTokens: 350,
              },
            }),
            signal: AbortSignal.timeout(4000), // 4s timeout
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          assistantReply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
        }
      } catch (err) {
        console.warn("Fallo o timeout en Gemini API, utilizando motor de respaldo:", err);
      }
    }

    // Fallback al motor Grounded determinista si no hubo respuesta de Gemini
    if (!assistantReply) {
      const grounded = resolveGroundedArmResponse(message, consentGiven);
      assistantReply = grounded.reply;
      detectedService = grounded.detectedService;
      suggestedAction = grounded.suggestedAction || "continue";
    }

    // 5. Registro seguro en Supabase si se proveyeron datos de contacto con consentimiento
    if (contactInfo && consentGiven) {
      try {
        const supabase = await createClient();
        const contactEmail = contactInfo.includes("@")
          ? contactInfo.toLowerCase()
          : `${contactInfo.replace(/\D/g, "")}@lead-arm.avanzape.com`;

        await supabase.from("leads").insert({
          contact_name: clientName || `Prospecto ARM (${sessionId.slice(0, 8)})`,
          contact_email: contactEmail,
          interest_level: "Alto",
          funnel_status: "Calificado por ARM",
        });
      } catch (dbErr) {
        console.error("Error al registrar lead ARM en Supabase:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      reply: assistantReply,
      detectedService,
      suggestedAction,
    });
  } catch (error) {
    console.error("Error en /api/arm/chat:", error);
    return NextResponse.json(
      {
        success: false,
        error: "El asistente está temporalmente ocupado. Puedes escribir directamente a Manuel y Magno por WhatsApp.",
        fallbackUrl: "https://wa.me/51942498841",
      },
      { status: 500 }
    );
  }
}
