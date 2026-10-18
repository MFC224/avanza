import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { FloatingContact } from "@/components/ui/floating-contact";
import { CinematicOverlay } from "@/components/ui/cinematic-overlay";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CommandMenu, CommandMenuTrigger } from "@/components/ui/command-menu";
import { Menu, ArrowUpRight, ShieldCheck, Mail, Phone, MessageCircle } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500/30 font-sans antialiased relative">
      {/* High-Precision Scroll Progress Indicator (Apple/Stripe Style) */}
      <ScrollProgress />
      {/* Global Command Palette (Cmd + K) */}
      <CommandMenu />
      {/* 35mm Film Grain, Anamorphic Vignette, Flare & Director HUD */}
      <CinematicOverlay />
      {/* WCAG Skip to Main Content Landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Saltar al contenido principal
      </a>

      {/* Buttery-Smooth Scrolling by Lenis */}
      <SmoothScroll />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 backdrop-blur-xl bg-slate-950/75 transition-all">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo-avanza.jpg"
                alt="AVANZA Logo"
                className="h-10 w-auto rounded-lg border border-slate-800 group-hover:border-indigo-500/60 transition-colors shadow-sm"
              />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                AVANZA
              </span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono -mt-1 hidden sm:block">
                AI & Software Studio
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <Link
              href="/"
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all"
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all"
            >
              Servicios
            </Link>
            <Link
              href="/metodologia"
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all flex items-center gap-1.5"
            >
              Metodología
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-mono">SCRUM</span>
            </Link>
            <Link
              href="/nosotros"
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all"
            >
              Nosotros
            </Link>
            <Link
              href="/contacto"
              className="px-4 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-full transition-all"
            >
              Contacto
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <CommandMenuTrigger />

            <Link href="/contacto" className="hidden sm:block">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(79,70,229,0.6)] transition-all px-6 py-5 rounded-full font-semibold group">
                <span>Cotizar Proyecto</span>
                <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </Link>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger aria-label="Abrir menú de navegación" className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-900 border border-slate-800 transition-colors">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-950 border-slate-800 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                    <img src="/logo-avanza.jpg" alt="AVANZA Logo" className="h-9 w-auto rounded-md" />
                    <span className="text-xl font-bold text-white">AVANZA</span>
                  </div>
                  <nav className="flex flex-col gap-5 mt-8">
                    <Link href="/" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-colors">Inicio</Link>
                    <Link href="/servicios" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-colors">Servicios</Link>
                    <Link href="/metodologia" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-colors">Metodología SCRUM</Link>
                    <Link href="/nosotros" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-colors">Nosotros</Link>
                    <Link href="/contacto" className="text-lg font-semibold text-slate-300 hover:text-indigo-400 transition-colors">Contacto</Link>
                  </nav>
                </div>
                <div className="space-y-4 pt-6 border-t border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Disponibilidad activa para nuevos proyectos</span>
                  </div>
                  <Link href="/contacto" className="w-full block">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]">
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
      
      {/* High-Impact Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-16 mt-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-600/5 blur-[160px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid gap-12 md:grid-cols-4 pb-12 border-b border-slate-800/80">
            {/* Col 1 */}
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-3">
                <img src="/logo-avanza.jpg" alt="AVANZA Logo" className="h-9 w-auto rounded-md" />
                <span className="text-2xl font-black text-white">AVANZA</span>
              </Link>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Agencia de desarrollo de software y transformación digital impulsada por Inteligencia Artificial. Creamos soluciones escalables para empresas líderes.
              </p>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit mt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sistemas Operativos 24/7 · Q4</span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-white text-base tracking-wide">Soluciones</h3>
              <div className="flex flex-col gap-2.5 text-sm text-slate-400">
                <Link href="/servicios" className="hover:text-indigo-400 transition-colors">Páginas Web de Alto Impacto</Link>
                <Link href="/servicios" className="hover:text-indigo-400 transition-colors">Sistemas Web & CRM Interno</Link>
                <Link href="/servicios" className="hover:text-indigo-400 transition-colors">Soluciones a Medida con IA</Link>
                <Link href="/servicios" className="hover:text-indigo-400 transition-colors">Automatización de Procesos</Link>
              </div>
            </div>

            {/* Col 3 */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-white text-base tracking-wide">Empresa</h3>
              <div className="flex flex-col gap-2.5 text-sm text-slate-400">
                <Link href="/metodologia" className="hover:text-indigo-400 transition-colors">Metodología SCRUM</Link>
                <Link href="/nosotros" className="hover:text-indigo-400 transition-colors">Equipo & Misión</Link>
                <Link href="/contacto" className="hover:text-indigo-400 transition-colors">Solicitar Cotización</Link>
                <Link href="/login" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Portal Interno (Admin)</span>
                </Link>
              </div>
            </div>

            {/* Col 4 */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-white text-base tracking-wide">Contacto Directo</h3>
              <div className="flex flex-col gap-2.5 text-sm text-slate-400">
                <a href="mailto:avanza.mmoficial@gmail.com" className="flex items-center gap-2 hover:text-indigo-300 transition-colors">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>avanza.mmoficial@gmail.com</span>
                </a>
                <a href="https://wa.me/51942498841" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
                  <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>+51 942 498 841 (WhatsApp / Magno)</span>
                </a>
                <a href="tel:921195037" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>921 195 037 (Manuel)</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>&copy; {new Date().getFullYear()} AVANZA Technology Studio. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1">
              <span>Construido con</span>
              <span className="text-indigo-400 font-semibold">Next.js 16</span>
              <span>&</span>
              <span className="text-emerald-400 font-semibold">Supabase</span>
            </p>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Widget (WhatsApp Quick Consultation) */}
      <FloatingContact />
    </div>
  );
}
