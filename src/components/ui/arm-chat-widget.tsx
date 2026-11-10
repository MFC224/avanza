"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Send,
  Bot,
  User,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
  Phone,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  sender: "user" | "arm";
  text: string;
  timestamp: string;
  suggestedAction?: "consent_required" | "whatsapp_redirect" | "continue";
}

export function ArmChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-1",
      sender: "arm",
      text: "¡Hola! Soy el asistente comercial ARM de AVANZA Software Studio. Cuéntame, ¿qué solución de software o proceso deseas sistematizar en tu empresa?",
      timestamp: "Ahora",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorFallback, setErrorFallback] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("avanza_arm_sid");
      if (stored) return stored;
      const newSid = `arm_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
      sessionStorage.setItem("avanza_arm_sid", newSid);
      return newSid;
    }
    return `arm_sid_${Date.now()}`;
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const quickPrompts = [
    "¿Cuánto cuesta una página web?",
    "¿Qué incluye un sistema CRM?",
    "¿Cómo son los Sprints SCRUM?",
    "Quiero hablar con Magno o Manuel",
  ];

  async function handleSendMessage(textToSend?: string) {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setErrorFallback(false);

    try {
      const res = await fetch("/api/arm/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: messageContent,
          consentGiven: consentChecked,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "No se pudo obtener respuesta.");
      }

      const armMsg: Message = {
        id: `arm_${Date.now()}`,
        sender: "arm",
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestedAction: data.suggestedAction,
      };

      setMessages((prev) => [...prev, armMsg]);
    } catch (err) {
      console.error("Error en ArmChatWidget:", err);
      setErrorFallback(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[440px] text-slate-900">
      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs sm:text-sm">
        {messages.map((m) => {
          const isArm = m.sender === "arm";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isArm ? "justify-start" : "justify-end"}`}
            >
              {isArm && (
                <div className="w-7 h-7 rounded-lg bg-[#021761] text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                  isArm
                    ? "bg-slate-100 text-slate-800 rounded-tl-xs border border-slate-200/80 whitespace-pre-line"
                    : "bg-[#021761] text-white rounded-tr-xs"
                }`}
              >
                {m.text}

                {/* WhatsApp redirect button if suggested */}
                {m.suggestedAction === "whatsapp_redirect" && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80">
                    <a
                      href="https://wa.me/51942498841?text=Hola%20Magno,%20estuve%20conversando%20con%20el%20asistente%20ARM%20y%20quisiera%20coordinar%20una%20reunión%20técnica."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Escribir a Magno (+51 942 498 841)</span>
                    </a>
                  </div>
                )}
              </div>
              {!isArm && (
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono italic">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
            <span>ARM está procesando tu respuesta...</span>
          </div>
        )}

        {/* Error Boundary & Resilient Fallback to WhatsApp */}
        {errorFallback && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-800">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Asistente temporalmente ocupado</span>
            </div>
            <p className="text-slate-600 leading-normal">
              Para atenderte sin esperas, puedes comunicarte directamente con los fundadores:
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <a
                href="https://wa.me/51942498841?text=Hola%20Magno,%20quisiera%20consultar%20sobre%20un%20proyecto%20de%20software."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: Magno Alomía</span>
              </a>
              <a
                href="tel:+51921195037"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Llamar: Manuel Callañaupa</span>
              </a>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Chips */}
      <div className="px-3 py-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {quickPrompts.map((qp, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(qp)}
            disabled={loading}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-all font-medium text-slate-700 cursor-pointer"
          >
            {qp}
          </button>
        ))}
      </div>

      {/* Ley N° 29733 Privacy Consent Micro-Check */}
      <div className="px-3 pt-2 bg-slate-50/90 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-500">
        <input
          type="checkbox"
          id="arm-consent"
          checked={consentChecked}
          onChange={(e) => setConsentChecked(e.target.checked)}
          className="w-3.5 h-3.5 rounded text-blue-600 border-slate-300 cursor-pointer"
        />
        <label htmlFor="arm-consent" className="cursor-pointer leading-tight select-none">
          Autorizo el tratamiento de mis datos conforme a la{" "}
          <Link href="/privacidad" target="_blank" className="underline text-blue-600 font-semibold">
            Ley N° 29733
          </Link>
          .
        </label>
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder="Pregunta sobre precios, tiempos o alcance..."
          disabled={loading}
          className="h-10 text-xs sm:text-sm bg-slate-50 border-slate-200 rounded-xl focus:bg-white"
        />
        <Button
          onClick={() => handleSendMessage()}
          disabled={loading || !input.trim()}
          className="h-10 px-3.5 bg-[#021761] hover:bg-blue-700 text-white rounded-xl shrink-0 cursor-pointer"
          aria-label="Enviar mensaje a ARM"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
