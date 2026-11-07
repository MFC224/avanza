"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroMotion() {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { damping: 25, stiffness: 180 });

  // Camera Dolly-out & 3D tilt effects tied to vertical scroll
  const cameraY = useTransform(smoothY, [0, 700], [0, 160]);
  const cameraScale = useTransform(smoothY, [0, 700], [1, 0.92]);
  const cameraOpacity = useTransform(smoothY, [0, 550], [1, 0.25]);
  const cameraRotateX = useTransform(smoothY, [0, 700], [0, 5]);

  return (
    <section className="relative w-full py-28 md:py-36 lg:py-44 overflow-hidden flex flex-col items-center text-center px-4 perspective-[1200px]">
      {/* Soft Ambient Radiance in Light Mode */}
      <motion.div
        style={{ y: useTransform(smoothY, [0, 700], [0, -80]) }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-blue-100/40 blur-[150px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(smoothY, [0, 700], [0, 60]) }}
        className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-slate-100/60 blur-[130px] rounded-full pointer-events-none"
      />

      {/* Camera Stage (Dollying in 3D perspective) */}
      <motion.div
        style={{
          y: cameraY,
          scale: cameraScale,
          opacity: cameraOpacity,
          rotateX: cameraRotateX,
          transformStyle: "preserve-3d",
        }}
        className="relative z-10 max-w-5xl mx-auto flex flex-col items-center transition-all"
      >
        {/* Editorial Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/[0.08] text-slate-800 text-[11px] sm:text-xs font-mono font-medium tracking-[0.16em] uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#021761]" />
            <span>Studio de Ingeniería de Software & Inteligencia Artificial</span>
          </div>
        </motion.div>

        {/* Hero Title with Kinetic Stagger & High Contrast Typography */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] font-black tracking-[-0.04em] text-slate-950 mb-8 leading-[0.98] max-w-5xl"
        >
          Impulsa tu empresa con <br className="hidden md:block" />
          <span className="text-slate-950">tecnología que </span>
          <span className="text-[#021761]">impresiona.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="text-lg md:text-2xl text-slate-600 max-w-3xl mb-12 leading-relaxed font-normal"
        >
          Diseñamos sistemas web de alta gama, plataformas a medida y arquitecturas con Inteligencia Artificial. Precisión milimétrica, entregas cada 7 a 14 días y cero deuda técnica.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/contacto">
            <Button
              size="lg"
              className="bg-[#021761] hover:bg-[#082282] text-white h-15 px-10 text-base shadow-sm hover:shadow-lg transition-all rounded-full font-semibold group cursor-pointer"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/metodologia">
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300/80 bg-white hover:bg-slate-50 text-slate-900 h-15 px-8 text-base rounded-full font-semibold shadow-2xs hover:border-slate-400 cursor-pointer"
            >
              Ver Metodología SCRUM
            </Button>
          </Link>
        </motion.div>

        {/* Executive Value Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-12 border-t border-slate-200/70 w-full max-w-4xl"
        >
          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">7 a 14 Días</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mt-1">Sprints Ágiles en Producción</div>
          </div>

          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">100% Type-Safe</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mt-1">Next.js 16 & PostgreSQL 3NF</div>
          </div>

          <div className="text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">Zero Lock-In</div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500 mt-1">100% Propiedad del Código</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
