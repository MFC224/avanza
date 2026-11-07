"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Phone, X, Sparkles, ChevronRight, Laptop, Bot, Layers } from "lucide-react";

export function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  const quickTopics = [
    {
      title: "Página Web de Alto Impacto",
      desc: "Presencia digital en 7 a 12 días",
      icon: Laptop,
      text: "Hola AVANZA, quisiera cotizar una Página Web de Alto Impacto para mi negocio.",
    },
    {
      title: "Sistema Web / CRM Interno",
      desc: "Automatizar operaciones y ventas",
      icon: Layers,
      text: "Hola AVANZA, busco desarrollar un Sistema Web / CRM a medida para mi empresa.",
    },
    {
      title: "Automatización con IA",
      desc: "Agentes inteligentes y chatbots",
      icon: Bot,
      text: "Hola AVANZA, deseo integrar Inteligencia Artificial y agentes autónomos a mis procesos.",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Expanded Quick Contact Hub Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[340px] sm:w-[380px] rounded-3xl bg-white/95 border border-slate-200 backdrop-blur-2xl shadow-[0_20px_50px_rgba(15,23,42,0.15)] overflow-hidden text-slate-900 p-5 flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    Centro de Contacto
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">En línea ahora · Magno & Manuel</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
                aria-label="Cerrar modal de contacto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Topic Selection */}
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-2.5 uppercase tracking-wider font-mono">
                ¿Qué necesitas cotizar hoy?
              </p>
              <div className="space-y-2">
                {quickTopics.map((topic, idx) => {
                  const Icon = topic.icon;
                  const waUrl = `https://wa.me/51942498841?text=${encodeURIComponent(topic.text)}`;
                  return (
                    <a
                      key={idx}
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-emerald-500/60 hover:bg-emerald-50/40 transition-all text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600 group-hover:text-emerald-700 group-hover:bg-emerald-100 transition-colors shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                            {topic.title}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {topic.desc}
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Direct Telephone & Email Channel Strip */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
              <a
                href="tel:+51921195037"
                title="Llamada directa: +51 921 195 037"
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs text-slate-700 hover:text-slate-900 transition-all font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">+51 921 195 037</span>
              </a>

              <Link
                href="/contacto"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#021761] hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cotizador Web</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mini Prompt Bubble (When closed) */}
      <AnimatePresence>
        {!isOpen && bubbleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-3 p-3.5 pr-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.1)] text-xs text-slate-800 cursor-pointer hover:border-emerald-500/50 transition-colors"
          >
            <div className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">¿Tienes un proyecto en mente?</p>
              <p className="text-slate-500 text-[11px]">Toca aquí para cotizar en 1 minuto</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setBubbleVisible(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-1 -mr-1 rounded-lg transition-colors"
              aria-label="Cerrar aviso"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Pill Trigger */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-[0_4px_20px_rgba(16,185,129,0.35)] hover:shadow-[0_6px_25px_rgba(16,185,129,0.5)] transition-all group cursor-pointer"
        aria-label="Abrir centro de contacto"
      >
        <MessageCircle className="w-5 h-5 text-white fill-white/20 group-hover:rotate-12 transition-transform" />
        <span className="hidden md:inline font-bold">Contactar Asesor</span>
        <span className="md:hidden font-bold">Contacto</span>
      </motion.button>
    </div>
  );
}
