"use client";

import { motion } from "motion/react";

interface InfiniteMarqueeProps {
  items: { name: string; icon?: string }[];
  direction?: "left" | "right";
  speed?: number;
}

export function InfiniteMarquee({
  items,
  direction = "left",
  speed = 25,
}: InfiniteMarqueeProps) {
  // Duplicate items to create seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
      <motion.div
        className="flex gap-4 w-max"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-slate-300 font-mono text-xs hover:border-indigo-500/40 hover:text-white transition-colors cursor-default"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            <span>{item.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
