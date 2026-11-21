"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ContactPrefill } from "./use-arm-chat";

interface Props {
  prefill: ContactPrefill;
  submitLabel: string;
  intro?: string;
  onSubmit: (data: ContactPrefill & { consent: boolean }) => Promise<{ ok: boolean; error?: string }>;
  onCancel?: () => void;
}

const field =
  "w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#021761]/40 focus:border-[#021761]";

/** Datos de contacto dentro del chat, con autorización expresa (Ley N° 29733). */
export function ArmContactForm({ prefill, submitLabel, intro, onSubmit, onCancel }: Props) {
  const [values, setValues] = useState<ContactPrefill>(prefill);
  const [consent, setConsent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const firstField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstField.current?.focus({ preventScroll: true });
  }, []);

  const set = (key: keyof ContactPrefill) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setError("Para continuar, acepta la política de privacidad.");
      return;
    }
    setSending(true);
    setError(null);
    try {
      const result = await onSubmit({ ...values, consent });
      if (!result.ok) setError(result.error ?? "No pudimos guardar tus datos. Inténtalo de nuevo.");
    } catch {
      setError("Se perdió la conexión. Inténtalo de nuevo o escríbenos por WhatsApp.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-2.5" noValidate>
      {intro && <p className="text-xs text-slate-600 leading-relaxed">{intro}</p>}
      <div className="space-y-1">
        <label htmlFor="arm-name" className="text-xs font-medium text-slate-700">Nombre</label>
        {/* Foco al aparecer el formulario: quien usa teclado o lector de pantalla llega directo al siguiente paso. */}
        <input id="arm-name" ref={firstField} className={field} value={values.name} onChange={set("name")} autoComplete="name" required maxLength={80} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label htmlFor="arm-phone" className="text-xs font-medium text-slate-700">WhatsApp</label>
          <input id="arm-phone" className={field} value={values.phone} onChange={set("phone")} inputMode="tel" autoComplete="tel" placeholder="987 654 321" maxLength={30} />
        </div>
        <div className="space-y-1">
          <label htmlFor="arm-email" className="text-xs font-medium text-slate-700">Correo (opcional)</label>
          <input id="arm-email" type="email" className={field} value={values.email} onChange={set("email")} autoComplete="email" maxLength={120} />
        </div>
      </div>
      <div className="space-y-1">
        <label htmlFor="arm-company" className="text-xs font-medium text-slate-700">Empresa (opcional)</label>
        <input id="arm-company" className={field} value={values.company} onChange={set("company")} autoComplete="organization" maxLength={80} />
      </div>
      <div className="flex items-start gap-2 pt-1">
        <input
          id="arm-consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-[#021761] cursor-pointer"
        />
        <label htmlFor="arm-consent" className="text-[11px] leading-snug text-slate-600 cursor-pointer">
          Autorizo a AVANZA a guardar estos datos y la conversación para contactarme sobre mi consulta, según su{" "}
          <Link href="/privacidad" target="_blank" className="underline text-[#021761]">política de privacidad</Link>{" "}
          (Ley N° 29733). El asistente usa proveedores como Google; a ellos no se les envían mis datos de contacto.
        </label>
      </div>
      {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={sending}
          className="flex-1 h-10 rounded-lg bg-[#021761] text-white text-sm font-medium hover:bg-[#0a2a8f] disabled:opacity-60 cursor-pointer"
        >
          {sending ? "Enviando…" : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="h-10 px-3 rounded-lg text-sm text-slate-600 hover:bg-slate-200 cursor-pointer">
            Ahora no
          </button>
        )}
      </div>
    </form>
  );
}
