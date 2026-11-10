"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";

export function HeroMotion() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { damping: 25, stiffness: 180 });

  // Camera Dolly-out & 3D tilt effects tied to vertical scroll
  const cameraY = useTransform(smoothY, [0, 800], [0, 80]);
  const cameraScale = useTransform(smoothY, [0, 800], [1, 0.96]);

  // 3D Perspective Tilt on the Hero Device Frame (Squarespace standard)
  const deviceRotateX = useTransform(smoothY, [0, 500], [14, 0]);
  const deviceScale = useTransform(smoothY, [0, 500], [0.92, 1]);
  const deviceY = useTransform(smoothY, [0, 500], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 overflow-hidden flex flex-col items-center text-center px-4"
    >
      {/* Subtle Architectural Ambient Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-slate-100/70 blur-[160px] rounded-full pointer-events-none -z-10" />

      {/* Main Hero Container */}
      <motion.div
        style={{
          y: cameraY,
          scale: cameraScale,
        }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Squarespace-Style Editorial Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-slate-500 font-semibold px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-950" />
            <span>AVANZA SOFTWARE STUDIO · ESTÁNDAR ÉLITE</span>
          </div>
        </motion.div>

        {/* Hero Title with Squarespace Sans + Serif Pairing */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.4rem] font-black tracking-[-0.04em] text-slate-950 mb-8 leading-[0.94] max-w-5xl"
        >
          Sistemas web y software con IA <br className="hidden md:block" />
          <span className="font-serif italic font-normal text-[#021761]">para liderar tu industria.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="text-lg md:text-2xl text-slate-600 max-w-3xl mb-12 leading-relaxed font-normal"
        >
          Diseñamos plataformas web de alta conversión, sistemas a medida y arquitecturas con Inteligencia Artificial. Entregas ágiles cada 7 a 14 días. 100% código propio.
        </motion.p>

        {/* Squarespace Iconic CTA Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-5"
        >
          <Link href="/contacto">
            <Button
              size="lg"
              className="bg-slate-950 hover:bg-[#021761] text-white h-15 px-10 text-[12px] uppercase font-bold tracking-[0.16em] transition-all shadow-md hover:shadow-xl rounded-none md:rounded-xs cursor-pointer group"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/metodologia">
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 bg-white hover:bg-slate-50 text-slate-900 h-15 px-8 text-[12px] uppercase font-bold tracking-[0.16em] transition-all rounded-none md:rounded-xs shadow-2xs hover:border-slate-900 cursor-pointer"
            >
              Ver Metodología SCRUM
            </Button>
          </Link>
        </motion.div>

        {/* Squarespace Iconic Statistics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-200/80 w-full max-w-4xl"
        >
          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">7 a 14 Días</div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mt-1 font-medium">Sprints Ágiles en Producción</div>
          </div>

          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">100% Type-Safe</div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mt-1 font-medium">Next.js 16 & PostgreSQL 3NF</div>
          </div>

          <div className="text-center sm:text-left">
            <div className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">Zero Lock-In</div>
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500 mt-1 font-medium">100% Propiedad del Código</div>
          </div>
        </motion.div>

        {/* Squarespace Device Showcase: 3D Perspective Tilt Stage that flattens on scroll */}
        <div style={{ perspective: 1200 }} className="w-full max-w-5xl mt-16">
          <motion.div
            style={{
              rotateX: deviceRotateX,
              scale: deviceScale,
              y: deviceY,
              transformStyle: "preserve-3d",
            }}
            className="w-full rounded-2xl border border-slate-200/90 bg-white shadow-2xl overflow-hidden text-left transition-shadow duration-500"
          >
            {/* Browser Window Chrome */}
            <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="w-3 h-3 rounded-full bg-slate-300" />
                <span className="w-3 h-3 rounded-full bg-slate-300" />
              </div>
              <div className="px-4 py-1 rounded-md bg-white border border-slate-200 text-xs font-mono text-slate-600 flex items-center gap-2 max-w-xs w-full justify-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>avanzape.com/portal</span>
              </div>
              <div className="text-xs font-mono text-slate-400 hidden sm:block">Next.js 16 · Supabase</div>
            </div>

            {/* Interactive UI Mockup Showcase */}
            <div className="p-6 sm:p-10 bg-slate-50/40 grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Sistema Operativo en Producción</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                  Panel de Control de Clientes & Facturación Automatizada
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Arquitectura PostgreSQL con Row Level Security, sincronización de pagos en tiempo real y agentes de Inteligencia Artificial que procesan consultas 24/7.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs font-mono bg-white border border-slate-200 px-3 py-1 rounded text-slate-700">TypeScript Estricto</span>
                  <span className="text-xs font-mono bg-white border border-slate-200 px-3 py-1 rounded text-slate-700">Supabase SSR</span>
                  <span className="text-xs font-mono bg-white border border-slate-200 px-3 py-1 rounded text-slate-700">OpenAI LLM Orchestrator</span>
                </div>
              </div>

              <div className="md:col-span-5 space-y-3">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-mono text-slate-500 uppercase">Tasa de Conversión</div>
                  <div className="text-2xl font-black text-slate-950 mt-1">+284%</div>
                  <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">Optimizado para ventas directas</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="text-xs font-mono text-slate-500 uppercase">Tiempo de Respuesta Edge</div>
                  <div className="text-2xl font-black text-[#021761] mt-1">14ms</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Despliegue distribuido en CDN global</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
