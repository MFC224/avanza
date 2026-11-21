import { MessageCircle } from "lucide-react";
import { templatesForStage, whatsappLink } from "@/lib/crm/whatsapp";
import type { TemplateContext } from "@/lib/crm/whatsapp";

/**
 * Mensajes de WhatsApp listos según la etapa del lead. Funciona sin JavaScript
 * (details/summary) y abre WhatsApp con el texto escrito.
 */
export function WhatsappMenu({
  phone,
  stage,
  context,
  compact = false,
}: {
  phone: string | null;
  stage: string;
  context: TemplateContext;
  compact?: boolean;
}) {
  if (!whatsappLink(phone, "")) {
    return <span className="text-xs text-zinc-500">Sin WhatsApp registrado</span>;
  }
  const templates = templatesForStage(stage);
  return (
    <details className="relative group">
      <summary
        className={`list-none cursor-pointer inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium ${
          compact ? "px-2.5 py-1 text-xs" : "px-3 py-2 text-sm"
        }`}
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" />
        WhatsApp
      </summary>
      <div className="absolute z-30 mt-2 w-72 rounded-xl border border-zinc-700 bg-zinc-900 p-1.5 shadow-xl">
        <p className="px-2.5 py-1.5 text-[11px] text-zinc-500">Mensajes sugeridos para esta etapa primero</p>
        {templates.map((t) => (
          <a
            key={t.id}
            href={whatsappLink(phone, t.build(context)) ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-2.5 py-2 hover:bg-zinc-800"
          >
            <span className="block text-sm text-zinc-100">{t.label}</span>
            <span className="block text-xs text-zinc-500 line-clamp-2">{t.build(context)}</span>
          </a>
        ))}
        <a
          href={whatsappLink(phone, `Hola ${context.name.split(" ")[0]}, `) ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg px-2.5 py-2 text-sm text-zinc-300 hover:bg-zinc-800"
        >
          Mensaje en blanco
        </a>
      </div>
    </details>
  );
}
