import React from "react";
import { MessageCircle, Phone, ShieldCheck } from "lucide-react";

export function ContactoDirectChannels() {
  return (
    <>
      <div className="space-y-4 my-8">
        <a
          href="https://wa.me/51942498841?text=Hola%20Magno,%20quisiera%20conversar%20sobre%20un%20proyecto"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-5 border border-[var(--line-on-paper)] bg-white text-[var(--ink)] hover:border-black transition-colors"
        >
          <div className="flex items-center gap-4">
            <MessageCircle className="w-5 h-5 text-[var(--ink)]" />
            <div>
              <span className="text-card font-normal block">
                WhatsApp Directo
              </span>
              <span className="text-small text-[var(--muted-on-paper)] font-normal">
                +51 942 498 841 · Magno Alomía
              </span>
            </div>
          </div>
          <span className="text-small text-[var(--brand)] font-normal">
            Chat &rarr;
          </span>
        </a>

        <a
          href="tel:+51921195037"
          className="flex items-center justify-between p-5 border border-[var(--line-on-paper)] bg-white text-[var(--ink)] hover:border-black transition-colors"
        >
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-[var(--ink)]" />
            <div>
              <span className="text-card font-normal block">
                Llamada Telefónica
              </span>
              <span className="text-small text-[var(--muted-on-paper)] font-normal">
                +51 921 195 037 · Manuel Callañaupa
              </span>
            </div>
          </div>
          <span className="text-small text-[var(--brand)] font-normal">
            Llamar &rarr;
          </span>
        </a>
      </div>

      <div className="flex items-center gap-3 text-small text-[var(--muted-on-paper)] pt-4 border-t border-[var(--line-on-paper)] font-normal">
        <ShieldCheck className="w-4 h-4 text-[var(--ink)] shrink-0" />
        <span>Garantía de confidencialidad comercial y NDA disponible.</span>
      </div>
    </>
  );
}
