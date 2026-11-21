import { getImageProps } from "next/image";
import Link from "next/link";

/**
 * Portada aprobada (MEJORAS_VISUALES.md V2.2, reconfirmada el 2026-11-19):
 * foto a pantalla completa, título de dos líneas, una frase y un botón.
 * Componente de servidor: el texto existe en el HTML sin JavaScript.
 * La entrada usa animación CSS (clase .hero-rise en globals.css), el único
 * momento orquestado de la página.
 */
const heroCommon = { alt: "", sizes: "100vw", quality: 75 };
const {
  props: { srcSet: desktopSrcSet },
} = getImageProps({ ...heroCommon, src: "/images/hero-studio-desk-night.webp", width: 2400, height: 1350 });
const { props: mobileImg } = getImageProps({
  ...heroCommon,
  src: "/images/hero-studio-desk-night-mobile.webp",
  width: 768,
  height: 1376,
});

export function HeroMotion() {
  return (
    <section
      data-tone="ink"
      className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-[var(--ink)] text-[var(--paper)]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {/* Una sola imagen según el ancho (art direction): el navegador descarga solo la que usa. */}
        <picture>
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} sizes="100vw" />
          <img
            {...mobileImg}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 lg:px-12 flex flex-col items-center text-center">
        <h1 className="type-display hero-rise">
          Software a medida
          <br />
          que hace crecer tu empresa
        </h1>

        <p
          className="type-body text-[var(--muted-on-ink)] mt-8 max-w-[44ch] hero-rise"
          style={{ animationDelay: "180ms" }}
        >
          Páginas web, sistemas e inteligencia artificial para empresas del Perú.
        </p>

        <div className="mt-12 hero-rise" style={{ animationDelay: "360ms" }}>
          <Link
            href="/contacto"
            className="type-button inline-flex items-center justify-center px-8 py-4 bg-[var(--paper)] text-[var(--ink)] hover:bg-neutral-200 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--paper)]"
          >
            Cotizar proyecto
          </Link>
        </div>
      </div>
    </section>
  );
}
