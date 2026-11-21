"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/projects";

/**
 * Carrusel en arco (pedido del dueño, 2026-11-19): las páginas web que hicimos
 * giran sobre medio círculo hacia abajo. La tarjeta central queda arriba y
 * de frente; las vecinas bajan e inclinan siguiendo la curva.
 * Avanza solo cada 10 segundos; se pausa con el puntero encima, con foco de
 * teclado, con la pestaña oculta y con "reducir movimiento".
 */
const SLIDES = PROJECTS.filter((p) => p.service === "web" && p.url);
const AUTOPLAY_MS = 10_000;
const STEP_DEG = 24; // separación angular entre tarjetas
const RADIUS = 1500; // radio del arco en px (escala con el contenedor)

function signedOffset(index: number, active: number, total: number) {
  let d = (index - active) % total;
  if (d > total / 2) d -= total;
  if (d < -total / 2) d += total;
  return d;
}

export function ArcCarousel() {
  const total = SLIDES.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const startRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const go = useCallback(
    (delta: number) => {
      setActive((a) => (a + delta + total) % total);
      elapsedRef.current = 0;
      setProgress(0);
    },
    [total]
  );

  // Escala del arco según el ancho disponible (el arco se diseñó para 1280 px).
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, Math.max(0.42, entry.contentRect.width / 1280)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pausa cuando la pestaña no está visible.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Avance automático cada 10 s, con barra de progreso.
  useEffect(() => {
    if (reduceMotion || paused || userPaused) return;
    let raf = 0;
    startRef.current = performance.now() - elapsedRef.current;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      elapsedRef.current = elapsed;
      if (elapsed >= AUTOPLAY_MS) {
        go(1);
        startRef.current = now;
        elapsedRef.current = 0;
      } else {
        setProgress(elapsed / AUTOPLAY_MS);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, paused, userPaused, go, active]);

  const current = SLIDES[active];
  const autoplayOn = !reduceMotion && !userPaused;

  return (
    <section
      id="trabajo"
      data-tone="ink"
      aria-roledescription="carrusel"
      aria-labelledby="trabajo-titulo"
      className="w-full bg-[var(--ink)] text-[var(--paper)] pt-[120px] lg:pt-[180px] pb-[96px] lg:pb-[140px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 id="trabajo-titulo" className="type-section max-w-3xl">
              Páginas que hicimos
            </h2>
            <p className="type-body text-[var(--muted-on-ink)] mt-6 max-w-[52ch]">
              Sitios en línea hoy, diseñados para cada negocio. Pasa uno nuevo cada 10 segundos.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Proyecto anterior"
              className="w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--paper)] hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--paper)]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setUserPaused((v) => !v)}
              aria-label={userPaused ? "Reanudar el paso automático" : "Pausar el paso automático"}
              aria-pressed={userPaused}
              className="w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--paper)] hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--paper)]"
            >
              {userPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Proyecto siguiente"
              className="w-11 h-11 inline-flex items-center justify-center rounded-full text-[var(--paper)] hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--paper)]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Escenario del arco */}
      <div
        ref={stageRef}
        className="relative mx-auto mt-16 lg:mt-20 w-full max-w-[1400px]"
        style={{ height: `${Math.round(620 * scale)}px` }}
      >
        {SLIDES.map((project, index) => {
          const offset = signedOffset(index, active, total);
          const angle = offset * STEP_DEG;
          const rad = (angle * Math.PI) / 180;
          // Redondeo a 2 decimales: el HTML del servidor ya viene redondeado y, si el
          // cliente usa más decimales, React avisa de un error de hidratación.
          const round2 = (n: number) => Math.round(n * 100) / 100;
          const x = round2(RADIUS * Math.sin(rad) * scale);
          const y = round2(RADIUS * (1 - Math.cos(rad)) * scale);
          const isCenter = offset === 0;
          const visible = Math.abs(offset) <= 1.5;
          const cardWidth = 720 * scale;

          return (
            <motion.div
              key={project.id}
              className="absolute top-0 left-1/2 will-change-transform"
              style={{ width: cardWidth, marginLeft: -cardWidth / 2, transformOrigin: "50% 100%", zIndex: 10 - Math.abs(offset) }}
              initial={false}
              animate={{
                x,
                y,
                rotate: round2(angle * 0.85),
                scale: isCenter ? 1 : 0.84,
                opacity: visible ? (isCenter ? 1 : 0.55) : 0,
              }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden={!isCenter}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isCenter ? 0 : -1}
                onClick={(e) => {
                  if (!isCenter) {
                    e.preventDefault();
                    go(offset);
                  }
                }}
                aria-label={`Abrir el sitio de ${project.name} en una pestaña nueva`}
                className="group block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[var(--paper)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] bg-neutral-900">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 1280px) 720px, 70vw"
                    quality={80}
                    priority={index === 0}
                    className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.035]"
                  />
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Ficha del proyecto central */}
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full mt-6">
        <div className="max-w-2xl mx-auto text-center" aria-live="polite">
          <motion.div
            key={current.id}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3 className="type-card">{current.name}</h3>
            {current.city && (
              <p className="type-small text-[var(--muted-on-ink)] mt-1">{current.city}</p>
            )}
            <p className="type-body text-[var(--muted-on-ink)] mt-4">{current.summary}</p>
            <a
              href={current.url}
              target="_blank"
              rel="noopener noreferrer"
              className="type-small inline-block mt-5 text-[var(--paper)] underline underline-offset-[6px] decoration-[var(--muted-on-ink)] hover:decoration-[var(--paper)] transition-colors"
            >
              Ver sitio
            </a>
          </motion.div>

          {/* Indicadores y progreso */}
          <div className="mt-10 flex items-center justify-center gap-3" role="tablist" aria-label="Elegir proyecto">
            {SLIDES.map((project, index) => {
              const isActive = index === active;
              return (
                <button
                  key={project.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={project.name}
                  onClick={() => go(signedOffset(index, active, total))}
                  className="relative h-11 flex items-center cursor-pointer group"
                >
                  <span
                    className={cn(
                      "block h-[2px] rounded-full overflow-hidden transition-all duration-500",
                      isActive ? "w-14 bg-white/25" : "w-6 bg-white/25 group-hover:bg-white/50"
                    )}
                  >
                    {isActive && (
                      <span
                        className="block h-full bg-[var(--paper)] origin-left"
                        style={{ transform: `scaleX(${autoplayOn ? progress : 1})` }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
