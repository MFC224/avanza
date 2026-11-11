import React from "react";
import { Reveal } from "@/components/site/reveal";

export function FoundersBlock() {
  return (
    <section
      data-tone="ink"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-24 lg:py-36 border-t border-[var(--line-on-ink)] overflow-hidden"
      aria-label="Manifiesto y fundadores"
    >
      <div className="max-w-4xl mx-auto px-5 lg:px-12 w-full text-center">
        <Reveal>
          <span className="text-small text-[var(--muted-on-ink)] block mb-6 font-normal tracking-wider uppercase">
            Manifiesto de Ingeniería
          </span>

          <blockquote className="text-section font-light text-[var(--paper)] tracking-tight leading-[1.3] mb-10 mx-auto max-w-[44ch]">
            &ldquo;El software bien construido no es un adorno visual; es el activo operativo más rentable que una empresa puede poseer.&rdquo;
          </blockquote>

          <div className="space-y-1">
            <p className="text-card font-medium text-[var(--paper)]">
              Manuel Callañaupa & Magno Alomía
            </p>
            <p className="text-small text-[var(--muted-on-ink)] font-normal">
              Cofundadores · AVANZA Software Studio
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
