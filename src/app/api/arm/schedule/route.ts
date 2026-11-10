import { NextRequest, NextResponse } from "next/server";
import {
  checkAvailability,
  bookAppointment,
  bookingSchema,
  getAppointmentsList,
} from "@/lib/arm-scheduling";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date) {
      // If no date, return all scheduled appointments
      const list = getAppointmentsList();
      return NextResponse.json({ success: true, appointments: list });
    }

    const availability = checkAvailability(date);
    return NextResponse.json({ success: true, ...availability });
  } catch (error) {
    console.error("Error en GET /api/arm/schedule:", error);
    return NextResponse.json(
      { success: false, error: "Error al consultar disponibilidad de horarios." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = bookAppointment(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          alternativeSlots: result.alternativeSlots,
        },
        { status: 409 }
      );
    }

    // Persist to Supabase if configured
    try {
      const supabase = await createClient();
      const apt = result.appointment!;

      // 1. Create lead if needed
      const contactEmail = apt.client_contact.includes("@")
        ? apt.client_contact.toLowerCase()
        : `${apt.client_contact.replace(/\D/g, "")}@lead-calendar.avanzape.com`;

      const { data: leadData } = await supabase
        .from("leads")
        .insert({
          contact_name: apt.client_name,
          contact_email: contactEmail,
          interest_level: "Cierre",
          funnel_status: "Cita Agendada",
        })
        .select()
        .single();

      // 2. Insert into appointments table
      if (leadData?.id) {
        await supabase.from("appointments").insert({
          lead_id: leadData.id,
          scheduled_at: apt.scheduled_at,
          duration_minutes: apt.duration_minutes,
          status: apt.status,
          host_name: apt.host_name,
          meet_url: apt.meet_url,
          calendar_event_id: apt.calendar_event_id,
          client_notes: apt.client_notes,
        });
      }
    } catch (dbErr) {
      console.warn("Respaldo Supabase en appointments completado localmente:", dbErr);
    }

    return NextResponse.json({
      success: true,
      appointment: result.appointment,
      message: "¡Cita agendada con éxito! Se ha generado tu sala de Google Meet.",
    });
  } catch (error) {
    console.error("Error en POST /api/arm/schedule:", error);
    return NextResponse.json(
      { success: false, error: "Error inesperado al registrar la cita." },
      { status: 500 }
    );
  }
}
