import React from "react";

interface Criterion {
  feature: string;
  avanza: string;
  traditional: string;
}

const CRITERIA: Criterion[] = [
  {
    feature: "Velocidad de Entrega",
    avanza: "7 a 14 días con avances y módulos funcionales desde la primera semana",
    traditional: "3 a 6 meses de retrasos, reuniones innecesarias y burocracia",
  },
  {
    feature: "Calidad y Estabilidad de la Plataforma",
    avanza: "Sistemas modernos, rápidos y sin caídas, construidos para durar y escalar",
    traditional: "Plantillas genéricas y lentas propensas a fallas constantes y bloqueos",
  },
  {
    feature: "Inteligencia Artificial y Automatización",
    avanza: "Asistentes y automatización a medida que atienden clientes y cotizan 24/7",
    traditional: "Páginas estáticas sin automatización que exigen atención manual continua",
  },
  {
    feature: "Seguridad y Protección de Datos",
    avanza: "Máxima protección de datos confidenciales con estándares de seguridad bancaria",
    traditional: "Sistemas frágiles con plugins de terceros vulnerables a ataques y filtraciones",
  },
  {
    feature: "Transparencia y Pruebas en Vivo",
    avanza: "Acceso semanal a la plataforma en vivo para probar cada avance real",
    traditional: "Meses de presentaciones en PDF y maquetas antes de ver algo funcional",
  },
  {
    feature: "Comunicación y Respaldo",
    avanza: "Línea directa por WhatsApp y videollamadas con los fundadores del estudio",
    traditional: "Intermediarios, ejecutivos comerciales y sistemas lentos de tickets",
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
        <div className="border border-[var(--line-on-paper)] divide-y divide-[var(--line-on-paper)]">
          {/* Header Row (Desktop only) */}
          <div className="hidden md:grid grid-cols-12 bg-neutral-100/60 font-medium text-small text-[var(--ink)]">
            <div className="col-span-4 p-5 lg:p-6 border-r border-[var(--line-on-paper)]">
              Criterio de Evaluación
            </div>
            <div className="col-span-4 p-5 lg:p-6 border-r border-[var(--line-on-paper)] font-semibold text-[var(--brand)]">
              AVANZA Software Studio
            </div>
            <div className="col-span-4 p-5 lg:p-6 text-[var(--muted-on-paper)]">
              Agencias Tradicionales / Freelancers
            </div>
          </div>

          {/* Rows */}
          {CRITERIA.map((item, idx) => (
            <div
              key={item.feature}
              className={`grid grid-cols-1 md:grid-cols-12 transition-colors duration-150 ${
                idx % 2 === 0 ? "bg-[var(--paper)]" : "bg-neutral-50/50"
              }`}
            >
              {/* Feature Title */}
              <div className="p-5 lg:p-6 md:col-span-4 md:border-r border-[var(--line-on-paper)] flex items-center font-normal text-[var(--ink)] text-body">
                <span>{item.feature}</span>
              </div>

              {/* AVANZA Column */}
              <div className="p-5 lg:p-6 md:col-span-4 md:border-r border-[var(--line-on-paper)] bg-blue-50/30 md:bg-transparent">
                <span className="md:hidden text-small font-medium text-[var(--brand)] block mb-1">
                  AVANZA Software Studio:
                </span>
                <p className="text-body text-[var(--ink)] font-normal">
                  {item.avanza}
                </p>
              </div>

              {/* Traditional Column */}
              <div className="p-5 lg:p-6 md:col-span-4 text-[var(--muted-on-paper)]">
                <span className="md:hidden text-small font-medium text-[var(--muted-on-paper)] block mb-1">
                  Agencias Tradicionales:
                </span>
                <p className="text-body text-[var(--muted-on-paper)] font-normal">
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
