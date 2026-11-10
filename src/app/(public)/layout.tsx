import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { FloatingContact } from "@/components/ui/floating-contact";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CommandMenu, CommandMenuTrigger } from "@/components/ui/command-menu";
import { AutoLanguageTranslator } from "@/components/ui/auto-language-translator";
import { AvanzaBrandLogo } from "@/components/ui/avanza-brand-logo";
import { Menu, ArrowUpRight, ShieldCheck, Mail, Phone, MessageCircle, BookOpen } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500/20 font-sans antialiased relative">
      {/* High-Precision Scroll Progress Indicator (Apple/Stripe Style) */}
      <ScrollProgress />
      {/* Global Command Palette (Cmd + K) */}
      <CommandMenu />
      {/* WCAG Skip to Main Content Landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#021761] focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Saltar al contenido principal
      </a>

      {/* Buttery-Smooth Scrolling by Lenis */}
      <SmoothScroll />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 backdrop-blur-xl bg-white/80 transition-all shadow-xs">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <AvanzaBrandLogo variant="horizontal" size={38} className="group-hover:opacity-95 transition-opacity" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 p-1 bg-slate-100/70 border border-slate-200/80 backdrop-blur-md rounded-full">
            <Link
              href="/"
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all"
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all"
            >
              Servicios
            </Link>
            <Link
              href="/metodologia"
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all flex items-center gap-1.5"
            >
              Metodología
              <span className="text-[9px] bg-slate-950 text-white px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">SCRUM</span>
            </Link>
            <Link
              href="/nosotros"
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all"
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 hover:text-slate-950 hover:bg-white rounded-full transition-all"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Automatic Language Translation Selector */}
            <AutoLanguageTranslator />

            <CommandMenuTrigger />

            <Link href="/contacto" className="hidden sm:block">
              <Button className="bg-slate-950 hover:bg-[#021761] text-white shadow-xs hover:shadow-md transition-all px-6 py-2.5 rounded-none md:rounded-xs text-[11px] uppercase font-bold tracking-[0.16em] group cursor-pointer">
                <span>Cotizar Proyecto</span>
                <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger aria-label="Abrir menú de navegación" className="xl:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-white border-slate-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
                    <AvanzaBrandLogo variant="horizontal" size={32} />
                  </div>
                  <nav className="flex flex-col gap-5 mt-8">
                    <Link href="/" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">Inicio</Link>
                    <Link href="/servicios" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">Servicios</Link>
                    <Link href="/metodologia" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">Metodología SCRUM</Link>
                    <Link href="/nosotros" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">Nosotros</Link>
                    <Link href="/contacto" className="text-lg font-semibold text-slate-700 hover:text-blue-600 transition-colors">Contacto</Link>
                  </nav>
                </div>
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Disponibilidad activa para nuevos proyectos</span>
                  </div>
                  <Link href="/contacto" className="w-full block">
                    <Button className="w-full bg-[#021761] hover:bg-blue-700 text-white shadow-sm">
                      Cotizar Proyecto Ahora
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      
      {/* Page Content */}
      <main id="main-content" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none">
        {children}
      </main>
      
      {/* High-Impact Light Footer */}
      <footer className="border-t border-slate-200/80 bg-slate-50 py-16 mt-24 relative overflow-hidden text-slate-600">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid gap-12 md:grid-cols-4 pb-12 border-b border-slate-200">
            {/* Col 1 */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3">
                <AvanzaBrandLogo variant="horizontal" size={36} />
              </Link>
              <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
                Studio de software ágil, plataformas web de alta conversión y automatización con Inteligencia Artificial. Construimos soluciones de alto rendimiento para empresas líderes.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full w-fit mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sistemas Operativos 24/7 · Q4</span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-base tracking-wide">Soluciones</h3>
              <div className="flex flex-col gap-2.5 text-sm text-slate-600">
                <Link href="/servicios" className="hover:text-blue-600 transition-colors">Páginas Web de Alto Impacto</Link>
                <Link href="/servicios" className="hover:text-blue-600 transition-colors">Sistemas Web & CRM Interno</Link>
                <Link href="/servicios" className="hover:text-blue-600 transition-colors">Soluciones a Medida con IA</Link>
                <Link href="/servicios" className="hover:text-blue-600 transition-colors">Automatización de Procesos</Link>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-base tracking-wide">Empresa</h3>
              <div className="flex flex-col gap-2.5 text-sm text-slate-600">
                <Link href="/metodologia" className="hover:text-blue-600 transition-colors">Metodología SCRUM</Link>
                <Link href="/nosotros" className="hover:text-blue-600 transition-colors">Equipo & Misión</Link>
                <Link href="/contacto" className="hover:text-blue-600 transition-colors">Solicitar Cotización</Link>
                <Link href="/reclamaciones" className="hover:text-blue-600 transition-colors flex items-center gap-1.5 font-medium text-slate-800">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600" />
                  <span>Libro de Reclamaciones</span>
                </Link>
              </div>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-slate-900 text-base tracking-wide">Contacto Directo</h3>
              <div className="flex flex-col gap-2.5 text-sm text-slate-600">
                <a href="mailto:contacto@avanzape.com" className="flex items-center gap-2 hover:text-blue-700 transition-colors">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>contacto@avanzape.com</span>
                </a>
                <a href="https://wa.me/51942498841" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-700 transition-colors">
                  <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>+51 942 498 841 (WhatsApp / Magno)</span>
                </a>
                <a href="tel:+51921195037" className="flex items-center gap-2 hover:text-blue-700 transition-colors">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>+51 921 195 037 (Manuel Callañaupa)</span>
                </a>
              </div>

              {/* Official Libro de Reclamaciones Card Badge */}
              <div className="pt-2">
                <Link
                  href="/reclamaciones"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white border border-slate-200/90 hover:border-blue-300 hover:bg-blue-50/30 transition-all group shadow-2xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors block leading-tight">
                      Libro de Reclamaciones
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      D.S. N° 011-2011-PCM
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} AVANZA Software Studio. Todos los derechos reservados.</p>
            <div className="flex items-center gap-3.5 text-xs text-slate-500">
              <Link href="/privacidad" className="hover:text-blue-600 transition-colors">
                Privacidad
              </Link>
              <span>·</span>
              <Link href="/terminos" className="hover:text-blue-600 transition-colors">
                Términos
              </Link>
              <span>·</span>
              <Link href="/reclamaciones" className="hover:text-blue-600 transition-colors font-medium text-slate-700">
                Libro de Reclamaciones
              </Link>
            </div>
            <p className="flex items-center gap-1">
              <span>Construido con</span>
              <span className="text-blue-600 font-semibold">Next.js 16</span>
              <span>&</span>
              <span className="text-emerald-600 font-semibold">Supabase</span>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Widget (WhatsApp Quick Consultation) */}
      <FloatingContact />
    </div>
  );
}
