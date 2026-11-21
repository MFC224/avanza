import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/utils/supabase/server";

/**
 * Acceso al CRM: además de iniciar sesión, la cuenta debe estar en public.crm_staff.
 * La base de datos aplica la misma regla con RLS (función public.is_staff()).
 */

export interface StaffContext {
  userId: string;
  email: string;
  isStaff: boolean;
  /** false si todavía no se ejecutó supabase/migrations/20261121_arm_crm.sql */
  dbReady: boolean;
}

export const getStaffContext = cache(async (): Promise<StaffContext | null> => {
  // Siempre por solicitud: sin esto, una página del CRM podía generarse como estática en el build.
  await connection();
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return null;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase.rpc("is_staff");
  return {
    userId: user.id,
    email: user.email ?? "",
    isStaff: !error && data === true,
    dbReady: !error,
  };
});

/** Para Server Actions: corta la ejecución si la cuenta no es del equipo. */
export async function requireStaff() {
  const ctx = await getStaffContext();
  if (!ctx) redirect("/login");
  if (!ctx.isStaff) throw new Error("Tu cuenta no tiene acceso al CRM.");
  const supabase = await createClient();
  return { ctx, supabase };
}
