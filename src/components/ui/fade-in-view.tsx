"use client";

import { motion } from "motion/react";
import React from "react";

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export function FadeInView({
  children,
  delay = 0,
  duration = 0.6,
  yOffset = 24,
  className = "",
}: FadeInViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
