"use client";

import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";

export type SectionTone = "ink" | "paper";

const ToneContext = createContext<SectionTone>("paper");

export function useSectionTone(): SectionTone {
  return useContext(ToneContext);
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tone?: SectionTone;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  tone = "paper",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const isInk = tone === "ink";

  return (
    <ToneContext.Provider value={tone}>
      <section
        data-tone={tone}
        className={cn(
          "py-24 lg:py-40 transition-colors duration-300",
          isInk
            ? "bg-[var(--ink)] text-[var(--paper)]"
            : "bg-[var(--paper)] text-[var(--ink)]",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "max-w-7xl mx-auto px-5 lg:px-12 w-full",
            containerClassName
          )}
        >
          {children}
        </div>
      </section>
    </ToneContext.Provider>
  );
}
