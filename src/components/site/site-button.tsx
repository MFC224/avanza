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
  const contextTone = useSectionTone();
  const currentTone = tone ?? contextTone;
  const isInk = currentTone === "ink";

  let colorClasses = "";
  if (variant === "primary") {
    colorClasses = isInk
      ? "bg-[var(--paper)] text-[var(--ink)] hover:bg-neutral-200"
      : "bg-[var(--brand)] text-[var(--on-brand)] hover:opacity-90";
  } else {
    // Variante secundaria: enlace de texto subrayado, sin recuadro.
    colorClasses = isInk
      ? "bg-transparent text-[var(--paper)] underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)] !px-0"
      : "bg-transparent text-[var(--ink)] underline underline-offset-[6px] decoration-[var(--muted-on-paper)] hover:decoration-[var(--ink)] !px-0";
  }

  const baseClasses = cn(
    "type-button inline-flex items-center justify-center px-7 py-4 rounded-none transition-colors duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]",
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
