"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: "¿Cuánto tiempo toma tener mi software en producción?",
    a: "Operamos bajo metodología ágil de entregas continuas. Los proyectos web y plataformas se completan en 7 a 12 días; sistemas web, CRM o automatización con IA demoran de 12 a 20 días con entregas funcionales semanales.",
  },
  {
    q: "¿Cómo son los pagos y qué garantías tengo?",
    a: "Trabajamos con hitos por Sprint (50% inicial y 50% contra entrega probada y aprobada en producción). Cada semana tienes acceso a un despliegue en vivo en servidores de prueba para verificar los avances.",
  },
  {
    q: "¿El código y la base de datos me pertenecen al 100%?",
    a: "Sí, absolutamente. Todo el código fuente en GitHub, las cuentas de base de datos, APIs y la infraestructura quedan a nombre de tu empresa sin cobros ocultos de licenciamiento mensual.",
  },
  {
    q: "¿Qué pasa si requiero soporte o cambios en el futuro?",
    a: "Ofrecemos planes de soporte mensual o bolsas de horas por sprint para agregar nuevas funciones, actualizaciones de seguridad y optimizaciones continuas.",
  },
];

export function ContactoFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[var(--line-on-ink)] border-y border-[var(--line-on-ink)] mt-12 max-w-4xl">
      {FAQS.map((faq, index) => {
        const isOpen = openFaq === index;
        return (
          <div key={index} className="py-6">
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : index)}
              className="w-full text-left flex items-center justify-between text-[var(--paper)] hover:opacity-80 transition-opacity cursor-pointer group"
            >
              <span className="text-card font-normal tracking-tight">
                {faq.q}
              </span>
              <div className="w-6 h-6 flex items-center justify-center text-[var(--paper)] shrink-0 ml-4">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            {isOpen && (
              <p className="text-body text-[var(--muted-on-ink)] font-normal leading-relaxed mt-4 max-w-[65ch]">
                {faq.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
