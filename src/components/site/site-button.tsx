"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSectionTone, SectionTone } from "./section";
import { trackEvent } from "@/lib/analytics";

export interface SiteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  tone?: SectionTone;
  href?: string;
  external?: boolean;
}

export function SiteButton({
  variant = "primary",
  tone,
  href,
  external,
  className,
  children,
  ...props
}: SiteButtonProps) {
  const currentTone = tone ?? useSectionTone();
  const isInk = currentTone === "ink";

  let colorClasses = "";
  if (variant === "primary") {
    colorClasses = isInk
      ? "bg-[var(--paper)] text-[var(--ink)] hover:bg-neutral-200"
      : "bg-[var(--brand)] text-[var(--paper)] hover:bg-[#032085]";
  } else {
    colorClasses = isInk
      ? "bg-transparent text-[var(--paper)] hover:bg-white/10 border border-[var(--line-on-ink)]"
      : "bg-transparent text-[var(--ink)] hover:bg-black/5 border border-[var(--line-on-paper)]";
  }

  const baseClasses = cn(
    "text-button inline-flex items-center justify-center px-6 py-3.5 rounded-none font-medium transition-colors duration-200 cursor-pointer select-none",
    colorClasses,
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={(e) => {
          if (href === "/contacto") {
            trackEvent("click_cotizar_proyecto", {
              label: typeof children === "string" ? children : "cotizar",
            });
          }
          props.onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {children}
    </button>
  );
}
