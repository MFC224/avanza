"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  staggerIndex?: number;
  className?: string;
}

export function Reveal({
  children,
  delay,
  staggerIndex,
  className,
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // Sin entradas escalonadas por tarjeta (PLAN_DISENO_UNICO.md, 3.4):
  // staggerIndex se acepta por compatibilidad pero ya no retrasa nada.
  void staggerIndex;
  const computedDelay = delay ?? 0;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: computedDelay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
