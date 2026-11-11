import { LuxuryMeshGradient } from "@/components/ui/luxury-mesh-gradient";
import { HeroMotion } from "@/components/home/hero-motion";
import { PortfolioRow } from "@/components/home/portfolio-row";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { ServicesTabs } from "@/components/home/services-tabs";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ProjectEstimator } from "@/components/home/project-estimator";
import { PillarsAccordion } from "@/components/home/pillars-accordion";
import { ComparisonMatrix } from "@/components/home/comparison-matrix";
import { FoundersBlock } from "@/components/home/founders-block";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center overflow-x-clip bg-white text-slate-900 selection:bg-blue-500/20 font-sans antialiased">
      {/* GPU-Accelerated Luxury Mesh Gradient */}
      <LuxuryMeshGradient />

      {/* 1. Portada: Imagen a pantalla completa, título aprobado, un solo botón */}
      <HeroMotion />

      {/* 2. Portafolio: Fila horizontal 16:10 deslizable */}
      <PortfolioRow />

      {/* 3. Cifras: Tres cifras de impacto sobre fondo Ink */}
      <MetricsStrip />

      {/* 4. Qué hacemos: Fila de 4 pestañas accesibles */}
      <ServicesTabs />

      {/* 5. Testimonios: Tres columnas limpias sobre fondo Paper */}
      <TestimonialsSection />

      {/* 6. Simulador: Opciones rectas sobre fondo Ink */}
      <ProjectEstimator />

      {/* 7. Cómo trabajamos: Los 4 pilares en acordeón accesible (Velocidad SCRUM, Arquitectura Cloud, Cero Vendor Lock-In) */}
      <PillarsAccordion />

      {/* 8. Comparación: Tabla en 2 columnas sin iconos de colores */}
      <ComparisonMatrix />

      {/* 9. Fundadores: Fotografía y cita del manifiesto */}
      <FoundersBlock />

      {/* 10. Llamada final: Fondo fotográfico con un único botón */}
      <FinalCta />
    </div>
  );
}
