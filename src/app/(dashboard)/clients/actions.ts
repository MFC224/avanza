"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addClient(formData: FormData) {
  const supabase = await createClient();
  
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const status = formData.get("status") as string;
  
  if (!name || !company || !email) {
    throw new Error("Faltan campos requeridos");
  }

  const { error } = await supabase.from("clients").insert({
    name,
    company,
    email,
    status: status || "Activo",
  });

  if (error) {
    console.error("Error adding client:", error);
    throw new Error("Error al agregar el cliente");
  }

  revalidatePath("/clients");
}
