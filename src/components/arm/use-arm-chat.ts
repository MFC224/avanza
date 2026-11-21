"use client";

import { useCallback, useEffect, useState } from "react";
import { WELCOME_CHIPS, WELCOME_MESSAGE } from "@/lib/arm/engine";
import type { ArmAction, QuestionKey } from "@/lib/arm/engine";
import { trackEvent } from "@/lib/analytics";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  quickReplies?: string[];
  handoffUrl?: string;
}

export interface ContactPrefill {
  name: string;
  phone: string;
  email: string;
  company: string;
}

export type ArmPanel = "none" | "contact" | "booking";

const STORAGE_KEY = "avanza_arm_v2";
const EMPTY_PREFILL: ContactPrefill = { name: "", phone: "", email: "", company: "" };
const WELCOME: ChatMessage = { id: "welcome", role: "assistant", text: WELCOME_MESSAGE, quickReplies: WELCOME_CHIPS };

function newSessionId(): string {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().replace(/-/g, "") : Math.random().toString(36).slice(2);
  return `arm_${random.slice(0, 24)}`;
}

interface Persisted {
  sessionId: string;
  messages: ChatMessage[];
  asked: QuestionKey[];
  contactCaptured: boolean;
}

function load(): Persisted | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch {
    return null;
  }
}

export function useArmChat() {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [asked, setAsked] = useState<QuestionKey[]>([]);
  const [contactCaptured, setContactCaptured] = useState(false);
  const [panel, setPanel] = useState<ArmPanel>("none");
  const [prefill, setPrefill] = useState<ContactPrefill>(EMPTY_PREFILL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ text: string; url?: string } | null>(null);

  // Restaurar la conversación al volver a abrir el chat en la misma pestaña.
  useEffect(() => {
    const saved = load();
    /* eslint-disable react-hooks/set-state-in-effect -- lectura única de sessionStorage al montar */
    if (saved?.sessionId) {
      setSessionId(saved.sessionId);
      if (saved.messages?.length) setMessages(saved.messages);
      setAsked(saved.asked ?? []);
      setContactCaptured(Boolean(saved.contactCaptured));
    } else {
      setSessionId(newSessionId());
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    try {
      const data: Persisted = { sessionId, messages: messages.slice(-60), asked, contactCaptured };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Sin almacenamiento (modo privado): la conversación igual funciona.
    }
  }, [sessionId, messages, asked, contactCaptured]);

  const transcript = useCallback(
    (list: ChatMessage[]) => list.filter((m) => m.id !== "welcome").map((m) => ({ role: m.role, text: m.text })),
    []
  );

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading || !sessionId) return;
      const userMsg: ChatMessage = { id: `u_${Date.now()}`, role: "user", text };
      const history = transcript(messages);
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/arm/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            message: text,
            history,
            asked,
            hasCapturedContact: contactCaptured,
            pagePath: window.location.pathname,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError({ text: data.error ?? "No pudimos responder ahora.", url: data.fallbackUrl });
          return;
        }
        const action = data.action as ArmAction;
        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}`,
            role: "assistant",
            text: data.reply,
            quickReplies: data.quickReplies,
            handoffUrl: action === "whatsapp_handoff" ? data.handoffUrl : undefined,
          },
        ]);
        setAsked(data.asked ?? []);
        setPrefill((p) => ({
          name: data.prefill?.name || p.name,
          phone: data.prefill?.phone || p.phone,
          email: data.prefill?.email || p.email,
          company: data.prefill?.company || p.company,
        }));
        if (action === "capture_contact" && !contactCaptured) setPanel("contact");
        else if (action === "offer_booking") setPanel("booking");
        else setPanel("none");
      } catch {
        setError({ text: "Se perdió la conexión. Puedes escribirnos directo por WhatsApp." });
      } finally {
        setLoading(false);
      }
    },
    [asked, contactCaptured, loading, messages, sessionId, transcript]
  );

  const submitContact = useCallback(
    async (form: ContactPrefill & { consent: boolean }) => {
      const res = await fetch("/api/arm/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, sessionId, history: transcript(messages), pagePath: window.location.pathname }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.fallbackUrl) setError({ text: data.error, url: data.fallbackUrl });
        return { ok: false as const, error: data.error as string };
      }
      trackEvent("arm_lead_captured", { temperature: data.temperature });
      setContactCaptured(true);
      setPanel("none");
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}`,
          role: "assistant",
          text: `Listo, ${form.name.split(" ")[0]}. Magno te escribirá en horario de oficina (lunes a viernes). Si prefieres adelantarte, escríbele ahora con un resumen de esta conversación.`,
          handoffUrl: data.whatsappUrl,
        },
      ]);
      return { ok: true as const };
    },
    [messages, sessionId, transcript]
  );

  const onBooked = useCallback((info: { when: string; calendarUrl: string; whatsappUrl: string }) => {
    trackEvent("arm_booking_created", {});
    setContactCaptured(true);
    setPanel("none");
    setMessages((prev) => [
      ...prev,
      {
        id: `a_${Date.now()}`,
        role: "assistant",
        text: `Reservado: ${info.when} (hora de Lima). Te enviaremos el enlace de Google Meet por WhatsApp o correo antes de la reunión.`,
        handoffUrl: info.whatsappUrl,
      },
    ]);
    return info.calendarUrl;
  }, []);

  return {
    sessionId,
    messages,
    loading,
    error,
    panel,
    setPanel,
    prefill,
    contactCaptured,
    send,
    submitContact,
    onBooked,
    transcript: () => transcript(messages),
  };
}
