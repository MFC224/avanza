import React from "react";

/** Canales directos como enlaces de texto (PLAN_DISENO_UNICO.md, sección 5). */
const CHANNELS = [
  {
    label: "WhatsApp",
    detail: "+51 942 498 841, Magno Alomía",
    href: "https://wa.me/51942498841?text=Hola%20Magno,%20quisiera%20conversar%20sobre%20un%20proyecto",
    external: true,
  },
  {
    label: "Teléfono",
    detail: "+51 921 195 037, Manuel Callañaupa",
    href: "tel:+51921195037",
    external: false,
  },
  {
    label: "Correo",
    detail: "contacto@avanzape.com",
    href: "mailto:contacto@avanzape.com",
    external: false,
  },
];

export function ContactoDirectChannels() {
  return (
    <div className="mt-2 flex flex-col gap-8">
      <ul className="flex flex-col gap-6">
        {CHANNELS.map((channel) => (
          <li key={channel.label}>
            <p className="type-small text-[var(--muted-on-paper)]">{channel.label}</p>
            <a
              href={channel.href}
              {...(channel.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="type-body text-[var(--ink)] underline underline-offset-[6px] decoration-[var(--muted-on-paper)] hover:decoration-[var(--ink)] transition-colors"
            >
              {channel.detail}
            </a>
          </li>
        ))}
      </ul>
      <p className="type-small text-[var(--muted-on-paper)] max-w-[40ch]">
        Si lo necesitas, firmamos un acuerdo de confidencialidad antes de conversar los detalles.
      </p>
    </div>
  );
}
