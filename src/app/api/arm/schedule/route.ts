import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { bookingRequestSchema } from "@/lib/arm/schemas";
import { buildProfile } from "@/lib/arm/profile";
import { ARM_CONTACT, getService } from "@/lib/arm/catalog";
import { checkFormLimit, clientIp } from "@/lib/arm/rate-limit";
import {
  formatLimaDate,
  formatTime12h,
  googleCalendarUrl,
  isBusinessDay,
  isValidSlot,
  limaToUtc,
  openSlots,
  parseDate,
} from "@/lib/arm/scheduling";
import { createAppointment, getBookedStarts } from "@/lib/crm/conversations";
import { captureLead } from "@/lib/crm/capture";
import { getAdminClient } from "@/lib/crm/admin";
import { notifyTeam } from "@/lib/crm/notify";
import { SITE_CONFIG } from "@/lib/site-config";
import { formatPhone, normalizePhone } from "@/lib/crm/whatsapp";

/**
 * GET ?date=YYYY-MM-DD → horarios libres de ese día (solo horas, sin datos de nadie).
 * Antes este endpoint devolvía la lista completa de citas con nombres y teléfonos.
 */
export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date") ?? "";
  if (!parseDate(date)) {
    return NextResponse.json({ success: false, error: "Indica una fecha (YYYY-MM-DD)." }, { status: 400 });
  }
  const business = isBusinessDay(date);
  if (!business.valid) {
    return NextResponse.json({ success: true, date, slots: [], reason: business.reason });
  }
  const booked = await getBookedStarts(date);
  if (booked === null) {
    return NextResponse.json({ success: true, date, slots: [], bookingEnabled: false });
  }
  return NextResponse.json(
    { success: true, date, slots: openSlots(date, booked), bookingEnabled: true },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/** Reserva una videollamada: crea o actualiza el lead y bloquea el horario en la base de datos. */
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
  const parsed = bookingRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Datos inválidos." },
      { status: 400 }
    );
  }
  const d = parsed.data;
  const when = `${formatLimaDate(d.date)} a las ${formatTime12h(d.time)}`;
  const fallbackUrl = `https://wa.me/${ARM_CONTACT.whatsappRaw}?text=${encodeURIComponent(
    `Hola Magno, soy ${d.name}. Quisiera agendar una videollamada el ${when} (hora de Lima).`
  )}`;

  if (!isValidSlot(d.date, d.time)) {
    return NextResponse.json({ success: false, error: "Ese horario ya no está disponible. Elige otro." }, { status: 409 });
  }
  if (!getAdminClient()) {
    return NextResponse.json(
      { success: false, error: "La agenda en línea no está disponible ahora. Escríbenos por WhatsApp y la coordinamos.", fallbackUrl },
      { status: 503 }
    );
  }

  const startUtc = limaToUtc(d.date, d.time);
  const profile = buildProfile(d.history.filter((t) => t.role === "user").map((t) => t.text));
  // El contacto de la cita debe servir para escribirle: teléfono válido o, si no, el correo.
  const phone = normalizePhone(d.phone);
  const contact = phone ? formatPhone(phone) : d.email;

  // 1) Primero el lead: aunque el horario se ocupe en este instante, la persona queda en el CRM.
  const lead = await captureLead({
    name: d.name,
    phone: d.phone,
    email: d.email,
    company: d.company,
    source: d.sessionId ? "arm" : "agenda",
    profile,
    sessionId: d.sessionId,
    transcript: d.history.length ? d.history : null,
    landingPage: d.pagePath,
    wantsMeeting: true,
    notify: false,
  });

  // 2) La cita, ya vinculada al lead. El índice único de la base impide la doble reserva.
  const appointment = await createAppointment({
    leadId: lead.leadId,
    startUtc,
    clientName: d.name,
    clientContact: contact,
    notes: d.notes || profile.needSummary || null,
  });

  if (!appointment.ok) {
    if (appointment.reason === "conflict") {
      const booked = (await getBookedStarts(d.date)) ?? [];
      return NextResponse.json(
        { success: false, error: "Alguien acaba de reservar ese horario. Estos siguen libres:", alternatives: openSlots(d.date, booked) },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, error: "No pudimos registrar la cita. Escríbenos por WhatsApp y la coordinamos.", fallbackUrl },
      { status: 500 }
    );
  }

  // 3) Etapa y historial del lead.
  const db = getAdminClient();
  if (db && lead.leadId) {
    const { error: stageError } = await db
      .from("leads")
      .update({ stage: "reunion", next_action: `Enviar enlace de Meet para el ${when}`, next_action_at: new Date().toISOString() })
      .eq("id", lead.leadId)
      .in("stage", ["nuevo", "contactado"]);
    if (stageError) console.error("[ARM] No se pudo mover el lead a Reunión:", stageError.message);
    await db.from("lead_activities").insert({ lead_id: lead.leadId, kind: "reunion", body: `Agendó una videollamada para el ${when}.` });
  }

  // 4) Un solo aviso al equipo con todo el contexto.
  const service = getService(profile.serviceId);
  await notifyTeam({
    title: `Nueva videollamada: ${when} · ${lead.scoring.temperature === "caliente" ? "LEAD CALIENTE" : "lead"} (${lead.scoring.score}/100)`,
    lines: [
      d.name + (d.company ? ` · ${d.company}` : ""),
      `Contacto: ${contact}`,
      service ? `Servicio: ${service.name}` : "",
      profile.needSummary ? `"${profile.needSummary}"` : "",
      "Pendiente: crear la reunión en Google Meet y enviar el enlace.",
      lead.leadId ? "" : "AVISO: el lead no se guardó en el CRM (revisar configuración).",
    ].filter(Boolean),
    url: `${SITE_CONFIG.url}/agenda`,
    payload: { event: "appointment", appointmentId: appointment.id, leadId: lead.leadId, startUtc: startUtc.toISOString() },
  });

  return NextResponse.json({
    success: true,
    when,
    calendarUrl: googleCalendarUrl({
      title: "Videollamada con AVANZA",
      details: "Magno o Manuel te enviarán el enlace de Google Meet por WhatsApp o correo antes de la reunión.",
      startUtc,
    }),
    whatsappUrl: fallbackUrl.replace("Quisiera agendar", "Acabo de agendar"),
  });
}
