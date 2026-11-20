import React from "react";

interface FaqItem {
  q: string;
  a: string;
}

/** Preguntas frecuentes visibles de una vez: son cuatro y cortas, no hace falta acordeón. */
const FAQS: FaqItem[] = [
  {
    q: "¿Cuánto demora tener mi proyecto listo?",
    a: "Una página web suele estar lista en una o dos semanas. Un sistema a medida o una automatización con IA toma entre dos y cuatro semanas, con entregas que puedes usar desde la primera.",
  },
  {
    q: "¿Cómo son los pagos?",
    a: "Normalmente 50% al empezar y 50% cuando apruebas la entrega final. Mientras tanto ves cada avance en un enlace de prueba.",
  },
  {
    q: "¿El código me pertenece?",
    a: "Sí. El código, las cuentas y los datos quedan a nombre de tu empresa. No cobramos licencias mensuales.",
  },
  {
    q: "¿Y si después necesito cambios?",
    a: "Puedes contratar soporte mensual o paquetes de horas para nuevas funciones, actualizaciones y mejoras.",
  },
];

export function ContactoFaq() {
  return (
    <dl className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-14 max-w-5xl">
      {FAQS.map((faq) => (
        <div key={faq.q}>
          <dt className="type-card text-[var(--paper)]">{faq.q}</dt>
          <dd className="type-body text-[var(--muted-on-ink)] mt-4 max-w-[52ch]">{faq.a}</dd>
        </div>
      ))}
    </dl>
  );
}
