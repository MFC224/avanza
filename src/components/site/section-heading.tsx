"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useSectionTone, SectionTone } from "./section";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tone?: SectionTone;
  align?: "left" | "center";
  /** Nivel del título. Usa "h1" en el primer encabezado de cada página. */
  as?: "h1" | "h2";
}

export function SectionHeading({
  title,
  description,
  tone,
  align = "left",
  as: Heading = "h2",
  className,
  ...props
}: SectionHeadingProps) {
  const contextTone = useSectionTone();
  const currentTone = tone ?? contextTone;
  const isInk = currentTone === "ink";

  return (
    <div
      className={cn(
        "mb-14 lg:mb-20 flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      <Heading
        className={cn(
          Heading === "h1" ? "type-display" : "type-section",
          "max-w-4xl",
          isInk ? "text-[var(--paper)]" : "text-[var(--ink)]"
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "type-body mt-6 max-w-[60ch]",
            isInk ? "text-[var(--muted-on-ink)]" : "text-[var(--muted-on-paper)]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
