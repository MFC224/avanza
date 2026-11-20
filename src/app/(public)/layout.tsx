import Link from "next/link";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicMainWrapper } from "@/components/layout/public-main-wrapper";
import { FloatingContact } from "@/components/ui/floating-contact";
import { CommandMenu } from "@/components/ui/command-menu";
import { AutoLanguageTranslator } from "@/components/ui/auto-language-translator";
import { AvanzaBrandLogo } from "@/components/ui/avanza-brand-logo";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)] font-sans antialiased relative">
      {/* Global Command Palette (Cmd + K keyboard listener preserved) */}
      <CommandMenu />

      {/* WCAG Skip to Main Content Landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#021761] focus:text-white focus:rounded-none focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Saltar al contenido principal
      </a>

      {/* Buttery-Smooth Scrolling by Lenis */}
      <SmoothScroll />

      {/* Minimal Editorial Header (Transparent over hero, transitioning to white on scroll) */}
      <PublicHeader />

      {/* Page Content with dynamic padding for non-home routes */}
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
        <PublicMainWrapper>
          {children}
        </PublicMainWrapper>
      </main>

      {/* Pie de página: texto simple sobre tinta, sin iconos ni separadores */}
      <footer
        data-tone="ink"
        className="bg-[var(--ink)] text-[var(--paper)] pt-24 pb-12 lg:pt-32"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-12">
          <div className="grid gap-14 md:grid-cols-12 pb-20">
            <div className="md:col-span-5 flex flex-col gap-6">
              <Link href="/" aria-label="AVANZA Software Studio, inicio" className="w-fit">
                <AvanzaBrandLogo variant="horizontal" size={36} theme="dark" />
              </Link>
              <p className="type-small text-[var(--muted-on-ink)] max-w-sm">
                Páginas web, sistemas a medida y automatización con inteligencia artificial para empresas del Perú.
              </p>
            </div>

            <nav className="md:col-span-2 flex flex-col gap-3" aria-label="Servicios">
              <span className="type-small text-[var(--paper)] mb-1">Servicios</span>
              <Link href="/servicios#web" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">Páginas web</Link>
              <Link href="/servicios#systems" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">Sistemas a medida</Link>
              <Link href="/servicios#ai" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">Automatización con IA</Link>
            </nav>

            <nav className="md:col-span-2 flex flex-col gap-3" aria-label="Empresa">
              <span className="type-small text-[var(--paper)] mb-1">Empresa</span>
              <Link href="/#trabajo" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">Trabajo</Link>
              <Link href="/metodologia" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">Cómo trabajamos</Link>
              <Link href="/nosotros" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">Nosotros</Link>
            </nav>

            <div className="md:col-span-3 flex flex-col gap-3">
              <span className="type-small text-[var(--paper)] mb-1">Contacto</span>
              <a href="https://wa.me/51942498841" target="_blank" rel="noopener noreferrer" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">WhatsApp +51 942 498 841</a>
              <a href="tel:+51921195037" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">Teléfono +51 921 195 037</a>
              <a href="mailto:contacto@avanzape.com" className="type-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors">contacto@avanzape.com</a>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 type-small text-[var(--muted-on-ink)]">
            <p>&copy; {new Date().getFullYear()} AVANZA Software Studio</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link href="/privacidad" className="hover:text-[var(--paper)] transition-colors">Privacidad</Link>
              <Link href="/terminos" className="hover:text-[var(--paper)] transition-colors">Términos</Link>
              <Link href="/reclamaciones" className="hover:text-[var(--paper)] transition-colors">Libro de Reclamaciones</Link>
              <AutoLanguageTranslator />
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Widget (WhatsApp Quick Consultation) */}
      <FloatingContact />
    </div>
  );
}
