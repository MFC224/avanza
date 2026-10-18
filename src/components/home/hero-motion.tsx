"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Button } from "@/components/ui/button";
import { ShimmerBadge } from "@/components/ui/shimmer-badge";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Layers } from "lucide-react";

export function HeroMotion() {
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { damping: 25, stiffness: 180 });

  // Camera Dolly-out & 3D tilt effects tied to vertical scroll
  const cameraY = useTransform(smoothY, [0, 700], [0, 180]);
  const cameraScale = useTransform(smoothY, [0, 700], [1, 0.88]);
  const cameraOpacity = useTransform(smoothY, [0, 550], [1, 0.15]);
  const cameraRotateX = useTransform(smoothY, [0, 700], [0, 7]);

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-36 overflow-hidden flex flex-col items-center text-center px-4 perspective-[1200px]">
      {/* Dynamic ambient glow orbs with parallax drift */}
      <motion.div
        style={{ y: useTransform(smoothY, [0, 700], [0, -80]) }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none"
      />
      <motion.div
        style={{ y: useTransform(smoothY, [0, 700], [0, 60]) }}
        className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"
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
        {/* Animated Shimmer Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <ShimmerBadge>
            <Sparkles className="w-3.5 h-3.5 mr-2 text-indigo-400" />
            Software de Élite & Automatización con Inteligencia Artificial
          </ShimmerBadge>
        </motion.div>

        {/* Hero Title with Kinetic Stagger */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-8 leading-[1.08] drop-shadow-2xl"
        >
          Impulsa tu empresa con <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-300">
            tecnología que impresiona
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="text-lg md:text-2xl text-slate-300 max-w-3xl mb-12 leading-relaxed font-normal"
        >
          Diseñamos sistemas web, plataformas a medida y arquitecturas con IA creadas para convertir más, operar más rápido y escalar sin límites.
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
              className="bg-indigo-600 hover:bg-indigo-500 text-white h-14 px-10 text-lg shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_45px_rgba(79,70,229,0.7)] transition-all rounded-full font-bold group"
            >
              Comenzar Proyecto
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/metodologia">
            <Button
              variant="outline"
              size="lg"
              className="border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-200 h-14 px-8 text-base rounded-full font-medium backdrop-blur-md hover:border-slate-700"
            >
              Ver Metodología SCRUM
            </Button>
          </Link>
        </motion.div>

        {/* Fast Value Metrics Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-10 border-t border-slate-800/60 w-full max-w-4xl"
        >
          <div className="flex items-center justify-center sm:justify-start gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">Sprints Semanales</div>
              <div className="text-slate-400 text-xs">Entregas continuas en 7-14 días</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">Next.js & Supabase</div>
              <div className="text-slate-400 text-xs">Arquitectura Cloud de alta escala</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-lg">Calidad & RLS</div>
              <div className="text-slate-400 text-xs">Seguridad y QA riguroso</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
