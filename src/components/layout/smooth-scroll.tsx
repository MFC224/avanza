"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Expose lenis globally for programmatic access or testing
    (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).__lenis = lenis;
    (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).__lenis;
      delete (window as unknown as { __lenis?: Lenis; lenis?: Lenis }).lenis;
    };
  }, []);

  // When pathname changes (e.g., navigating from /nosotros to /contacto),
  // immediately reset scroll position to the top.
  useEffect(() => {
    const resetScrollToTop = () => {
      // If there is an anchor hash target (e.g. #main-content), scroll to it instead
      if (typeof window !== "undefined" && window.location.hash) {
        const hashEl = document.querySelector(window.location.hash);
        if (hashEl) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(hashEl as HTMLElement, { immediate: true });
          }
          return;
        }
      }

      // 1. Reset Lenis internal virtual scroll position immediately
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }

      // 2. Enforce native browser window & document scroll position reset
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        if (document.documentElement) {
          document.documentElement.scrollTop = 0;
        }
        if (document.body) {
          document.body.scrollTop = 0;
        }
      }
    };

    // Immediate invocation on pathname change
    resetScrollToTop();

    // Secondary passes on animation frames and timer to ensure DOM reconciliation and layout shifts don't restore old scroll
    const rafId = requestAnimationFrame(resetScrollToTop);
    const timerId = setTimeout(resetScrollToTop, 50);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [pathname]);

  return null;
}

