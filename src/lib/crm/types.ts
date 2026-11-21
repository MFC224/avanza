import type { LeadStage } from "./stages";
import type { Temperature } from "./scoring";

/** Filas de las tablas del CRM (ver supabase/migrations/20261121_arm_crm.sql). */

export interface LeadRow {
  id: string;
  contact_name: string;
  contact_email: string | null;
  phone: string | null;
  company_name: string | null;
  source: string;
  stage: LeadStage;
  service_id: string | null;
  service_name: string | null;
  business_type: string | null;
  need_summary: string | null;
  budget_pen: number | null;
  timeline: string | null;
  estimated_value: number | null;
  score: number;
  temperature: Temperature;
  score_reasons: string[];
  next_action: string | null;
  next_action_at: string | null;
  last_contact_at: string | null;
  lost_reason: string | null;
  won_at: string | null;
  closed_at: string | null;
  consent_at: string | null;
  arm_session_id: string | null;
  landing_page: string | null;
  owner_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadActivityRow {
  id: string;
  lead_id: string;
  kind: string;
  body: string;
  created_by: string | null;
  created_at: string;
}

export type AppointmentStatus = "pendiente" | "confirmada" | "completada" | "no_asistio" | "cancelada";

export interface AppointmentRow {
  id: string;
  lead_id: string | null;
  scheduled_at: string;
  duration_minutes: number;
  status: AppointmentStatus;
  client_name: string;
  client_contact: string;
  client_notes: string | null;
  host_name: string;
  meet_url: string | null;
  created_at: string;
}

export interface ArmConversationRow {
  session_id: string;
  lead_id: string | null;
  service_id: string | null;
  score: number;
  temperature: Temperature;
  objections: string[];
  message_count: number;
  wants_meeting: boolean;
  outcome: "en_curso" | "contacto" | "cita" | "whatsapp";
  transcript: { role: "user" | "assistant"; text: string }[] | null;
  page_path: string | null;
  created_at: string;
  last_message_at: string;
}

export interface ClientRow {
  id: string;
  name: string;
  company: string;
  email: string | null;
  phone: string | null;
  status: string;
  lead_id: string | null;
  notes: string | null;
  lifetime_value: number;
  created_at: string;
}

export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  pendiente: "Por confirmar",
  confirmada: "Confirmada",
  completada: "Realizada",
  no_asistio: "No asistió",
  cancelada: "Cancelada",
};
