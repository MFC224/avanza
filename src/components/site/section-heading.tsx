"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSectionTone, SectionTone } from "./section";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: SectionTone;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  const currentTone = tone ?? useSectionTone();
  const isInk = currentTone === "ink";

  return (
    <div
      className={cn(
        "mb-12 lg:mb-18 flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <span
          className={cn(
            "text-small mb-3 font-normal",
            isInk ? "text-[var(--muted-on-ink)]" : "text-[var(--muted-on-paper)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-section font-normal tracking-tight max-w-3xl",
          isInk ? "text-[var(--paper)]" : "text-[var(--ink)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-body mt-4 max-w-[60ch]",
            isInk ? "text-[var(--muted-on-ink)]" : "text-[var(--muted-on-paper)]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
