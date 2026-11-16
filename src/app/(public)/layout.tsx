import Link from "next/link";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { PublicHeader } from "@/components/layout/public-header";
import { PublicMainWrapper } from "@/components/layout/public-main-wrapper";
import { FloatingContact } from "@/components/ui/floating-contact";
import { CommandMenu } from "@/components/ui/command-menu";
import { AutoLanguageTranslator } from "@/components/ui/auto-language-translator";
import { AvanzaBrandLogo } from "@/components/ui/avanza-brand-logo";
import { Mail, Phone, MessageCircle, BookOpen } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500/20 font-sans antialiased relative">
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

      {/* Quiet Luxury Dark Footer (#000000) */}
      <footer
        data-tone="ink"
        className="border-t border-[var(--line-on-ink)] bg-[var(--ink)] text-[var(--paper)] py-16 lg:py-24 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-12 relative z-10">
          <div className="grid gap-12 md:grid-cols-4 pb-16 border-b border-[var(--line-on-ink)]">
            {/* Col 1 */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3">
                <AvanzaBrandLogo variant="horizontal" size={36} theme="dark" />
              </Link>
              <p className="text-small text-[var(--muted-on-ink)] leading-relaxed max-w-sm font-normal">
                Studio de desarrollo de software, plataformas web de alta conversión y sistemas autónomos con Inteligencia Artificial.
              </p>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-4">
              <span className="text-small text-[var(--paper)] font-normal">
                Soluciones
              </span>
              <div className="flex flex-col gap-3">
                <Link href="/servicios" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors font-normal">
                  Páginas Web Editoriales
                </Link>
                <Link href="/servicios" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors font-normal">
                  Sistemas Web & CRM
                </Link>
                <Link href="/servicios" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors font-normal">
                  Agentes de IA
                </Link>
                <Link href="/servicios" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors font-normal">
                  Fintech & ERP
                </Link>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-4">
              <span className="text-small text-[var(--paper)] font-normal">
                Empresa
              </span>
              <div className="flex flex-col gap-3">
                <Link href="/metodologia" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors font-normal">
                  Metodología de Trabajo
                </Link>
                <Link href="/nosotros" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors font-normal">
                  Equipo & Misión
                </Link>
                <Link href="/contacto" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors font-normal">
                  Solicitar Cotización
                </Link>
                <Link href="/reclamaciones" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors flex items-center gap-2 font-normal">
                  <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Libro de Reclamaciones</span>
                </Link>
              </div>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-4">
              <span className="text-small text-[var(--paper)] font-normal">
                Contacto Directo
              </span>
              <div className="flex flex-col gap-3">
                <a href="mailto:contacto@avanzape.com" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors flex items-center gap-2 font-normal">
                  <Mail className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>contacto@avanzape.com</span>
                </a>
                <a href="https://wa.me/51942498841" target="_blank" rel="noopener noreferrer" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors flex items-center gap-2 font-normal">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+51 942 498 841 (WhatsApp / Magno)</span>
                </a>
                <a href="tel:+51921195037" className="text-small text-[var(--muted-on-ink)] hover:text-[var(--paper)] transition-colors flex items-center gap-2 font-normal">
                  <Phone className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>+51 921 195 037 (Manuel Callañaupa)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-small text-[var(--muted-on-ink)] gap-4 font-normal">
            <p>&copy; {new Date().getFullYear()} AVANZA Software Studio. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4 text-small text-[var(--muted-on-ink)] font-normal">
              <Link href="/privacidad" className="hover:text-[var(--paper)] transition-colors">
                Privacidad
              </Link>
              <span>·</span>
              <Link href="/terminos" className="hover:text-[var(--paper)] transition-colors">
                Términos
              </Link>
              <span>·</span>
              <Link href="/reclamaciones" className="hover:text-[var(--paper)] transition-colors">
                Libro de Reclamaciones
              </Link>
            </div>
            <div className="flex items-center gap-4">
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
