import React from "react";

interface Criterion {
  feature: string;
  avanza: string;
  traditional: string;
}

const CRITERIA: Criterion[] = [
  {
    feature: "Velocidad de Entrega (Time-to-Market)",
    avanza: "7 a 14 días (Sprints ágiles con módulos funcionales semanales)",
    traditional: "3 a 6 meses de retrasos, reuniones y burocracia",
  },
  {
    feature: "Arquitectura & Ecosistema de Código",
    avanza: "Next.js 16, React 19, Supabase RLS, TypeScript estricto (100% Type-Safe)",
    traditional: "Plantillas genéricas de WordPress o código espagueti desactualizado",
  },
  {
    feature: "Inteligencia Artificial Integrada",
    avanza: "Agentes autónomos, pipelines LLM y automatización de procesos a medida",
    traditional: "Nula; se limitan a webs estáticas sin procesamiento inteligente",
  },
  {
    feature: "Seguridad, RLS & OWASP Top 10",
    avanza: "Row Level Security (RLS) PostgreSQL, Zero-Trust, CSP y auditoría continua",
    traditional: "Plugins vulnerables propensos a inyecciones SQL y ataques XSS",
  },
  {
    feature: "Demos Semanales & Transparencia",
    avanza: "Acceso semanal a despliegues en vivo probando el sistema real",
    traditional: "Presentaciones estáticas en PDF y mockups durante meses",
  },
  {
    feature: "Comunicación & Respaldo",
    avanza: "Línea directa por WhatsApp con los fundadores y arquitectos técnicos",
    traditional: "Intermediarios, ejecutivos de ventas y sistemas lentos de tickets",
  },
];

export function ComparisonMatrix() {
  return (
    <section
      data-tone="paper"
      className="w-full bg-[var(--paper)] text-[var(--ink)] py-24 lg:py-36 border-t border-[var(--line-on-paper)] overflow-hidden"
      aria-label="Comparativa de estándares de ingeniería"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-12 w-full">
        {/* Section Header */}
        <div className="mb-14 lg:mb-20">
          <span className="text-small text-[var(--muted-on-paper)] block mb-3 font-normal">
            Diferenciación
          </span>
          <h2 className="text-section font-normal text-[var(--ink)] tracking-tight max-w-3xl">
            Por qué las empresas eligen AVANZA frente al modelo tradicional
          </h2>
        </div>

        {/* 2-Column Comparison Table (Desktop: 2 columns, Mobile: stacked per row without horizontal scroll) */}
        <div className="divide-y divide-[var(--line-on-paper)] border-y border-[var(--line-on-paper)]">
          {CRITERIA.map((item, idx) => (
            <div
              key={idx}
              className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
            >
              {/* Feature Title (Desktop 4 cols) */}
              <div className="md:col-span-4">
                <span className="text-card font-normal text-[var(--ink)] tracking-tight">
                  {item.feature}
                </span>
              </div>

              {/* AVANZA Column (Desktop 4 cols) */}
              <div className="md:col-span-4 p-4 md:p-0 bg-neutral-50 md:bg-transparent rounded-none">
                <span className="text-small text-[var(--brand)] font-medium block md:hidden mb-1">
                  AVANZA Software Studio
                </span>
                <p className="text-body text-[var(--ink)] font-normal leading-relaxed">
                  {item.avanza}
                </p>
              </div>

              {/* Traditional Agency Column (Desktop 4 cols) */}
              <div className="md:col-span-4 p-4 md:p-0">
                <span className="text-small text-[var(--muted-on-paper)] font-normal block md:hidden mb-1">
                  Agencias Tradicionales
                </span>
                <p className="text-body text-[var(--muted-on-paper)] font-normal leading-relaxed">
                  {item.traditional}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
