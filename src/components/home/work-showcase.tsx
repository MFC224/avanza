"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { PROJECTS, type Project } from "@/lib/projects";

/**
 * Sello de la página (PLAN_DISENO_UNICO.md, 1 y 4): el trabajo real primero.
 * Los proyectos van uno debajo del otro, alternando ancho completo y dos tercios.
 * Cada imagen se asienta de escala 1,06 a 1 ligada al scroll (solo transform).
 */
export function WorkShowcase() {
  return (
    <section
      id="trabajo"
      data-tone="ink"
      aria-labelledby="trabajo-titulo"
      className="w-full bg-[var(--ink)] text-[var(--paper)] py-[120px] lg:py-[200px]"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <h2 id="trabajo-titulo" className="type-section max-w-3xl">
          Trabajo reciente
        </h2>
        <p className="type-body text-[var(--muted-on-ink)] mt-6 max-w-[56ch]">
          Sitios y sistemas que hoy usan empresas reales. Cada uno se diseñó para ese negocio.
        </p>

        <ol className="mt-20 lg:mt-28 flex flex-col gap-28 lg:gap-44">
          {PROJECTS.map((project, index) => (
            <ProjectItem key={project.id} project={project} wide={index % 2 === 0} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function ProjectItem({ project, wide }: { project: Project; wide: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  const media = (
    <div
      ref={frameRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-neutral-900"
    >
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { scale }}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={wide ? "(min-width: 1280px) 1184px, 100vw" : "(min-width: 1280px) 790px, 100vw"}
          quality={80}
          className="object-cover object-top"
        />
      </motion.div>
    </div>
  );

  return (
    <li className={cn("w-full", wide ? "" : "lg:w-2/3 lg:ml-auto")}>
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--paper)]"
          aria-label={`Abrir el sitio de ${project.name} en una pestaña nueva`}
        >
          {media}
        </a>
      ) : (
        media
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-12 gap-y-3">
        <div>
          <h3 className="type-card">{project.name}</h3>
          {project.city && (
            <p className="type-small text-[var(--muted-on-ink)] mt-1">{project.city}</p>
          )}
        </div>
        <div>
          <p className="type-body text-[var(--muted-on-ink)] max-w-[52ch]">{project.summary}</p>
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="type-small inline-block mt-4 text-[var(--paper)] underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)] transition-colors"
            >
              Ver sitio
            </a>
          ) : (
            <p className="type-small mt-4 text-[var(--muted-on-ink)]">Sistema de uso interno</p>
          )}
        </div>
      </div>
    </li>
  );
}
