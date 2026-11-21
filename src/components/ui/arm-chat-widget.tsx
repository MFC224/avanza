"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, Bot, CalendarDays, MessageCircle, RefreshCw, Send } from "lucide-react";
import { useArmChat } from "@/components/arm/use-arm-chat";
import { ArmContactForm } from "@/components/arm/arm-contact-form";
import { ArmBooking } from "@/components/arm/arm-booking";
import { trackEvent } from "@/lib/analytics";

/**
 * Asistente ARM v2: califica al visitante, le da precios del catálogo,
 * guarda sus datos con consentimiento, agenda videollamadas reales y lo deriva
 * a WhatsApp con un resumen. Todo lo que capta llega al CRM interno (/leads).
 */
export function ArmChatWidget() {
  const chat = useArmChat();
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [chat.messages, chat.loading, chat.panel]);

  const last = chat.messages[chat.messages.length - 1];
  const chips = !chat.loading && chat.panel === "none" && last?.role === "assistant" ? last.quickReplies ?? [] : [];

  function submit(text?: string) {
    const value = (text ?? input).trim();
    if (!value) return;
    setInput("");
    void chat.send(value);
  }

  return (
    <div className="flex flex-col h-[480px] max-h-[70vh] text-slate-900">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm" aria-live="polite">
        {chat.messages.map((m) => {
          const isArm = m.role === "assistant";
          return (
            <div key={m.id} className={`flex items-start gap-2 ${isArm ? "justify-start" : "justify-end"}`}>
              {isArm && (
                <div className="w-7 h-7 rounded-lg bg-[#021761] text-white flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`px-3 py-2.5 rounded-2xl max-w-[85%] leading-relaxed whitespace-pre-line ${
                  isArm ? "bg-slate-100 text-slate-800 border border-slate-200/80" : "bg-[#021761] text-white"
                }`}
              >
                <span className="sr-only">{isArm ? "ARM: " : "Tú: "}</span>
                {m.text}
                {m.handoffUrl && (
                  <a
                    href={m.handoffUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("arm_whatsapp_handoff", {})}
                    className="mt-2.5 flex w-fit items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    Escribir a Magno por WhatsApp
                  </a>
                )}
              </div>
            </div>
          );
        })}

        {chat.loading && (
          <div className="flex items-center gap-2 text-xs text-slate-500" role="status">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
            Escribiendo…
          </div>
        )}

        {chat.panel === "contact" && (
          <ArmContactForm
            prefill={chat.prefill}
            submitLabel="Enviar mis datos"
            intro="Déjanos un WhatsApp o un correo y Magno te escribe con una propuesta."
            onSubmit={chat.submitContact}
            onCancel={() => chat.setPanel("none")}
          />
        )}

        {chat.panel === "booking" && (
          <ArmBooking
            sessionId={chat.sessionId}
            prefill={chat.prefill}
            transcript={chat.transcript}
            onBooked={chat.onBooked}
            onCancel={() => chat.setPanel("none")}
          />
        )}

        {chat.error && (
          <div role="alert" className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 text-amber-700" aria-hidden="true" />
              {chat.error.text}
            </div>
            <a
              href={chat.error.url ?? "https://wa.me/51942498841"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              WhatsApp de Magno
            </a>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {chips.length > 0 && (
        <div className="px-3 py-2 border-t border-slate-100 flex flex-wrap gap-1.5">
          {chips.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => submit(c)}
              className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 cursor-pointer"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 bg-white border-t border-slate-200 space-y-2">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <label htmlFor="arm-input" className="sr-only">Escribe tu mensaje</label>
          <input
            id="arm-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cuéntanos qué necesitas…"
            maxLength={600}
            autoComplete="off"
            disabled={chat.loading}
            className="flex-1 h-10 px-3 text-base sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#021761]/30"
          />
          <button
            type="submit"
            disabled={chat.loading || !input.trim()}
            aria-label="Enviar mensaje"
            className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#021761] hover:bg-[#0a2a8f] text-white disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
          </button>
        </form>
        <p className="text-[11px] leading-snug text-slate-500">
          Asistente automático. Tus datos solo se guardan si los envías con el formulario y aceptas la{" "}
          <a href="/privacidad" target="_blank" className="underline">política de privacidad</a>.
        </p>
        {!chat.contactCaptured && chat.panel === "none" && chips.length === 0 && (
          <div className="flex gap-3 text-xs">
            <button type="button" onClick={() => chat.setPanel("booking")} className="inline-flex items-center gap-1 text-[#021761] hover:underline cursor-pointer">
              <CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
              Agendar videollamada
            </button>
            <button type="button" onClick={() => chat.setPanel("contact")} className="text-slate-600 hover:underline cursor-pointer">
              Que me escriban
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
