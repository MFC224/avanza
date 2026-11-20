"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AvanzaBrandLogo } from "@/components/ui/avanza-brand-logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/#trabajo", label: "Trabajo" },
  { href: "/servicios", label: "Servicios" },
  { href: "/metodologia", label: "Cómo trabajamos" },
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
          : "bg-white text-[var(--ink)] border-b border-[var(--line-on-paper)]"
      )}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 py-4 flex items-center justify-between">
        {/* Brand Logo - clean without animated ping dot */}
        <Link
          href="/"
          className="flex items-center group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
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
                  "type-small transition-opacity hover:opacity-70 underline-offset-[6px]",
                  isActive ? "underline" : "",
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
              "type-button px-5 py-3 rounded-none transition-colors duration-200 select-none inline-flex items-center justify-center",
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
                "lg:hidden w-11 h-11 rounded-none transition-opacity cursor-pointer inline-flex items-center justify-center hover:opacity-70",
                isTransparent ? "text-white" : "text-[var(--ink)]"
              )}
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-white border-neutral-200 p-8 flex flex-col justify-between w-full sm:max-w-md"
            >
              <div>
                <div className="pb-6">
                  <AvanzaBrandLogo variant="horizontal" size={32} theme="light" />
                </div>
                <nav className="flex flex-col gap-6 mt-8" aria-label="Navegación móvil">
                  {NAV_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "type-section text-[var(--ink)] hover:opacity-70 transition-opacity",
                        pathname === item.href && "underline underline-offset-8"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="pt-6 space-y-4">
                <Link
                  href="/contacto"
                  className="w-full type-button py-3.5 bg-[var(--brand)] text-white text-center block rounded-none hover:bg-[#032085] transition-colors"
                >
                  Cotizar proyecto
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
