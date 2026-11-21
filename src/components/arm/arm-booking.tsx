"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CalendarPlus } from "lucide-react";
import { formatLimaDate, formatTime12h, upcomingBusinessDays } from "@/lib/arm/scheduling";
import { ArmContactForm } from "./arm-contact-form";
import type { ContactPrefill } from "./use-arm-chat";

interface Props {
  sessionId: string;
  prefill: ContactPrefill;
  transcript: () => { role: "user" | "assistant"; text: string }[];
  onBooked: (info: { when: string; calendarUrl: string; whatsappUrl: string }) => string;
  onCancel: () => void;
}

const chip =
  "px-3 py-1.5 rounded-full border text-xs font-medium transition-colors cursor-pointer disabled:opacity-50";

/** Reserva de videollamada en tres pasos: día, hora y datos. */
export function ArmBooking({ sessionId, prefill, transcript, onBooked, onCancel }: Props) {
  const days = useMemo(() => upcomingBusinessDays(5), []);
  const [day, setDay] = useState<string | null>(null);
  const [slots, setSlots] = useState<string[] | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ text: string; url?: string } | null>(null);
  const [calendarUrl, setCalendarUrl] = useState<string | null>(null);
  const [offline, setOffline] = useState(false);
  const firstDay = useRef<HTMLButtonElement>(null);

  // Al abrir la agenda, el foco va al primer día (accesibilidad con teclado).
  useEffect(() => {
    firstDay.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!day) return;
    let cancelled = false;
    fetch(`/api/arm/schedule?date=${day}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.bookingEnabled === false) {
          setNotice({
            text: "La agenda en línea no está disponible ahora. Escríbenos por WhatsApp y la coordinamos.",
            url: `https://wa.me/51942498841?text=${encodeURIComponent(`Hola Magno, quisiera agendar una videollamada el ${formatLimaDate(day)}.`)}`,
          });
          setSlots(null);
          setOffline(true);
          return;
        }
        setSlots(data.slots ?? []);
        if (data.reason) setNotice({ text: data.reason });
      })
      .catch(() => !cancelled && setNotice({ text: "No pudimos cargar los horarios. Inténtalo de nuevo." }));
    return () => {
      cancelled = true;
    };
  }, [day]);

  function pickDay(d: string) {
    setDay(d);
    setSlots(null);
    setTime(null);
    setNotice(null);
  }

  async function book(form: ContactPrefill & { consent: boolean }) {
    const res = await fetch("/api/arm/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sessionId, date: day, time, history: transcript(), pagePath: window.location.pathname }),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      if (Array.isArray(data.alternatives)) {
        setSlots(data.alternatives);
        setTime(null);
      }
      if (data.fallbackUrl) setNotice({ text: data.error, url: data.fallbackUrl });
      return { ok: false, error: data.error as string };
    }
    setCalendarUrl(onBooked({ when: data.when, calendarUrl: data.calendarUrl, whatsappUrl: data.whatsappUrl }));
    return { ok: true };
  }

  if (calendarUrl) {
    return (
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-800 hover:bg-slate-50"
      >
        <CalendarPlus className="w-4 h-4" aria-hidden="true" />
        Agregar a mi Google Calendar
      </a>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-3">
      <div>
        <p className="text-xs font-medium text-slate-700 mb-2">1. Elige el día</p>
        <div className="flex flex-wrap gap-1.5">
          {days.map((d, i) => (
            <button
              key={d}
              ref={i === 0 ? firstDay : undefined}
              type="button"
              onClick={() => pickDay(d)}
              aria-pressed={day === d}
              className={`${chip} ${day === d ? "bg-[#021761] text-white border-[#021761]" : "bg-white text-slate-700 border-slate-300 hover:border-[#021761]"}`}
            >
              {formatLimaDate(d)}
            </button>
          ))}
        </div>
      </div>

      {day && !offline && (
        <div>
          <p className="text-xs font-medium text-slate-700 mb-2">2. Elige la hora (hora de Lima)</p>
          {slots === null ? (
            <p className="text-xs text-slate-500">Cargando horarios…</p>
          ) : slots.length === 0 ? (
            <p className="text-xs text-slate-500">No quedan horarios libres ese día. Prueba con otro.</p>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {slots.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setTime(s)}
                  aria-pressed={time === s}
                  className={`${chip} ${time === s ? "bg-[#021761] text-white border-[#021761]" : "bg-white text-slate-700 border-slate-300 hover:border-[#021761]"}`}
                >
                  {formatTime12h(s)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {notice && (
        <p role="status" className="text-xs text-amber-800">
          {notice.text}{" "}
          {notice.url && (
            <a href={notice.url} target="_blank" rel="noopener noreferrer" className="underline font-medium">
              Abrir WhatsApp
            </a>
          )}
        </p>
      )}

      {day && time && (
        <div>
          <p className="text-xs font-medium text-slate-700 mb-2">3. Tus datos</p>
          <ArmContactForm prefill={prefill} submitLabel={`Reservar ${formatTime12h(time)}`} onSubmit={book} />
        </div>
      )}

      <button type="button" onClick={onCancel} className="text-xs text-slate-500 underline cursor-pointer">
        Ahora no
      </button>
    </div>
  );
}
