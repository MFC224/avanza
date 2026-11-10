"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AvanzaBrandLogo } from "@/components/ui/avanza-brand-logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/metodologia", label: "Metodología" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent only on the home page when within the first 80px
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isTransparent
          ? "bg-transparent text-white border-b border-transparent"
          : "bg-white/95 backdrop-blur-md text-[var(--ink)] border-b border-[var(--line-on-paper)] shadow-xs"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 py-4 flex items-center justify-between">
        {/* Brand Logo - clean without animated ping dot */}
        <Link
          href="/"
          className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="AVANZA Software Studio - Inicio"
        >
          <AvanzaBrandLogo
            variant="horizontal"
            size={34}
            theme={isTransparent ? "dark" : "light"}
            className="transition-opacity group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Navigation (>= 1024px) - Clean typography without pills */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-small transition-opacity hover:opacity-70",
                  isActive ? "font-medium" : "font-normal opacity-90",
                  isTransparent ? "text-white" : "text-[var(--ink)]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Action button and Mobile drawer */}
        <div className="flex items-center gap-3">
          <Link
            href="/contacto"
            className={cn(
              "text-button px-5 py-2.5 rounded-none font-medium transition-colors duration-200 select-none inline-flex items-center justify-center",
              isTransparent
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-[var(--brand)] text-white hover:bg-[#032085]"
            )}
          >
            Cotizar
          </Link>

          {/* Mobile Navigation Trigger (< 1024px) */}
          <Sheet>
            <SheetTrigger
              aria-label="Abrir menú de navegación"
              className={cn(
                "lg:hidden p-2 rounded-none transition-colors border cursor-pointer inline-flex items-center justify-center",
                isTransparent
                  ? "text-white border-white/20 hover:bg-white/10"
                  : "text-[var(--ink)] border-[var(--line-on-paper)] hover:bg-black/5"
              )}
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white border-neutral-200 p-8 flex flex-col justify-between w-full sm:max-w-md"
            >
              <div>
                <div className="pb-6 border-b border-neutral-200">
                  <AvanzaBrandLogo variant="horizontal" size={32} theme="light" />
                </div>
                <nav className="flex flex-col gap-6 mt-8" aria-label="Navegación móvil">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "text-section text-[var(--ink)] hover:opacity-70 transition-opacity font-normal",
                        pathname === item.href && "font-medium text-[var(--brand)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-neutral-200 space-y-4">
                <Link
                  href="/contacto"
                  className="w-full text-button py-3.5 bg-[var(--brand)] text-white text-center block rounded-none hover:bg-[#032085] transition-colors"
                >
                  Cotizar Proyecto
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
