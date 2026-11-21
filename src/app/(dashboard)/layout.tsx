import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { MobileNav, Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { getStaffContext } from "@/lib/crm/auth";

export const metadata: Metadata = {
  title: "CRM",
  robots: { index: false, follow: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // El proxy ya redirige a /login; esta segunda verificación protege aunque el proxy falle.
  const ctx = await getStaffContext();
  if (!ctx) redirect("/login");

  if (ctx.dbReady && !ctx.isStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6 text-zinc-300">
        <div className="max-w-md space-y-3 text-center">
          <h1 className="text-xl font-semibold text-white">Tu cuenta no tiene acceso al CRM</h1>
          <p className="text-sm">
            Iniciaste sesión como {ctx.email}. Pide a un administrador que agregue tu cuenta a la tabla
            <code className="mx-1 text-zinc-200">crm_staff</code> en Supabase.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950 text-zinc-200">
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header email={ctx.email} />
        <MobileNav />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {!ctx.dbReady && (
              <div role="alert" className="mb-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
                Falta activar la base de datos del CRM. En Supabase, abre SQL Editor y ejecuta
                <code className="mx-1">supabase/migrations/20261121_arm_crm.sql</code>. Luego agrega
                <code className="mx-1">SUPABASE_SERVICE_ROLE_KEY</code> en Vercel para que el asistente guarde los leads.
              </div>
            )}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
