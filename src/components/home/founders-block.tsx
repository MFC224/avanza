import React from "react";
import Image from "next/image";
import { Reveal } from "@/components/site/reveal";

export function FoundersBlock() {
  return (
    <section
      data-tone="ink"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-24 lg:py-36 border-t border-[var(--line-on-ink)] overflow-hidden"
      aria-label="Manifiesto y fundadores"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Founders Portrait (3:2) */}
          <div className="lg:col-span-5 w-full">
            <Reveal>
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[12px] bg-neutral-900 border border-[var(--line-on-ink)]">
                <Image
                  src="/images/founders-portrait.webp"
                  alt="Manuel Callañaupa y Magno Alomía, cofundadores de AVANZA Software Studio"
                  fill
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  quality={85}
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: Manifesto Quote & Names */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal delay={0.1}>
              <span className="text-small text-[var(--muted-on-ink)] block mb-4 font-normal">
                Manifiesto de Ingeniería
              </span>

              <blockquote className="text-section font-light text-[var(--paper)] tracking-tight leading-[1.25] mb-8 max-w-[50ch]">
                &ldquo;El software bien construido no es un adorno visual; es el activo operativo más rentable que una empresa puede poseer.&rdquo;
              </blockquote>

              <div className="space-y-1">
                <p className="text-card font-normal text-[var(--paper)]">
                  Manuel Callañaupa & Magno Alomía
                </p>
                <p className="text-small text-[var(--muted-on-ink)] font-normal">
                  Cofundadores · AVANZA Software Studio
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
