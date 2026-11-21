import { UserPlus } from "lucide-react";
import { ARM_SERVICES } from "@/lib/arm/catalog";
import { createLead } from "./actions";

const input = "w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600";

/** Alta manual (lead que llegó por WhatsApp, referido o redes). Funciona sin JavaScript. */
export function NewLeadForm() {
  return (
    <details className="relative">
      <summary className="list-none cursor-pointer inline-flex items-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-sm font-medium text-white">
        <UserPlus className="w-4 h-4" aria-hidden="true" />
        Nuevo lead
      </summary>
      <form
        action={createLead}
        className="absolute right-0 z-30 mt-2 w-[min(92vw,380px)] space-y-3 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-xl"
      >
        <div className="space-y-1">
          <label htmlFor="nl-name" className="text-xs text-zinc-400">Nombre *</label>
          <input id="nl-name" name="contact_name" required minLength={2} className={input} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label htmlFor="nl-phone" className="text-xs text-zinc-400">WhatsApp</label>
            <input id="nl-phone" name="phone" inputMode="tel" placeholder="987 654 321" className={input} />
          </div>
          <div className="space-y-1">
            <label htmlFor="nl-email" className="text-xs text-zinc-400">Correo</label>
            <input id="nl-email" name="contact_email" type="email" className={input} />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="nl-company" className="text-xs text-zinc-400">Empresa</label>
          <input id="nl-company" name="company_name" className={input} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label htmlFor="nl-service" className="text-xs text-zinc-400">Servicio</label>
            <select id="nl-service" name="service_id" className={input} defaultValue="">
              <option value="">Por definir</option>
              {ARM_SERVICES.map((s) => <option key={s.id} value={s.id}>{s.shortName}</option>)}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="nl-source" className="text-xs text-zinc-400">Llegó por</label>
            <select id="nl-source" name="source" className={input} defaultValue="whatsapp">
              <option value="whatsapp">WhatsApp</option>
              <option value="referido">Referido</option>
              <option value="redes">Redes sociales</option>
              <option value="manual">Otro</option>
            </select>
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="nl-value" className="text-xs text-zinc-400">Valor estimado (S/)</label>
          <input id="nl-value" name="estimated_value" inputMode="numeric" placeholder="3500" className={input} />
        </div>
        <div className="space-y-1">
          <label htmlFor="nl-need" className="text-xs text-zinc-400">Qué necesita</label>
          <textarea id="nl-need" name="need_summary" rows={2} className={input} />
        </div>
        <button type="submit" className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 py-2 text-sm font-medium text-white cursor-pointer">
          Crear y abrir ficha
        </button>
      </form>
    </details>
  );
}
