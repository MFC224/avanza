"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-purple-500 z-[100] origin-left shadow-[0_0_12px_rgba(99,102,241,0.8)] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
