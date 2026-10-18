"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "motion/react";

export function CinematicOverlay() {
  const { scrollYProgress, scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });

  // Transforms for anamorphic lens flare
  const flareOpacity = useTransform(smoothVelocity, [-1500, 0, 1500], [0.55, 0.15, 0.55]);
  const flareScaleX = useTransform(smoothVelocity, [-1500, 0, 1500], [1.3, 1, 1.3]);
  const flareY = useTransform(scrollYProgress, [0, 1], ["10%", "85%"]);

  // Calculate simulated cinematic timecode (00:00:SS:FF) based on scroll
  const [timecode, setTimecode] = useState("00:00:01:00");
  const [isCinematicHudVisible, setIsCinematicHudVisible] = useState(true);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const totalFrames = Math.floor(latest * 1440); // 60 seconds * 24 fps
      const seconds = Math.floor(totalFrames / 24) % 60;
      const minutes = Math.floor(totalFrames / (24 * 60));
      const frames = totalFrames % 24;
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimecode(`00:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* 1. Cinematic 35mm Film Grain Simulation */}
      <div
        className="fixed inset-0 pointer-events-none z-40 opacity-[0.035] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* 2. Anamorphic Lens Vignette (Darkened Edges) */}
      <div
        className="fixed inset-0 pointer-events-none z-30 shadow-[inset_0_0_120px_rgba(2,6,23,0.85)] sm:shadow-[inset_0_0_180px_rgba(2,6,23,0.92)]"
        aria-hidden="true"
      />

      {/* 3. Dynamic Anamorphic Lens Flare (Streaks softly with scroll velocity) */}
      <motion.div
        style={{
          top: flareY,
          opacity: flareOpacity,
          scaleX: flareScaleX,
        }}
        className="fixed left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent pointer-events-none z-30 blur-[1px] transition-opacity"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-[8px] h-6 -top-3" />
      </motion.div>

      {/* 4. Film Director HUD / Timecode / REC Indicator (Bottom-Left) */}
      {isCinematicHudVisible && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-3 px-3.5 py-2 rounded-full bg-slate-950/80 border border-slate-800/80 backdrop-blur-md shadow-2xl text-[11px] font-mono text-slate-400 pointer-events-auto selection:bg-none"
        >
          {/* Pulsing REC Dot */}
          <div className="flex items-center gap-1.5 text-red-400 font-bold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-red-500 -ml-3.5" />
            <span>REC</span>
          </div>

          <span className="w-px h-3.5 bg-slate-800" />

          {/* Real-time Scroll Timecode */}
          <span className="text-slate-200 tracking-widest font-semibold">{timecode}</span>

          <span className="w-px h-3.5 bg-slate-800" />

          {/* Camera Specs */}
          <span className="text-slate-500 text-[10px] uppercase tracking-wider">
            24 FPS · 4K SCOPE
          </span>

          <button
            onClick={() => setIsCinematicHudVisible(false)}
            className="text-slate-600 hover:text-slate-400 text-[10px] ml-1 transition-colors"
            title="Ocultar indicador"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* 5. Top Cinematic Scroll Progress Rail */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-400 transform-origin-left z-50 shadow-[0_0_12px_rgba(99,102,241,0.8)]"
        aria-hidden="true"
      />
    </>
  );
}
