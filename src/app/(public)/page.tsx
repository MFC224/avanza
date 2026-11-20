import { HeroMotion } from "@/components/home/hero-motion";
import { WorkShowcase } from "@/components/home/work-showcase";
import { ServicesList } from "@/components/home/services-list";
import { ProcessSteps } from "@/components/home/process-steps";
import { ProjectEstimator } from "@/components/home/project-estimator";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ContactClosing } from "@/components/home/contact-closing";

/**
 * Portada (PLAN_DISENO_UNICO.md, sección 4).
 * Orden: portada, trabajo real (el sello), qué hacemos, cómo trabajamos,
 * simulador, testimonios y cierre con personas.
 */
export default function Home() {
  return (
    <div className="relative flex flex-col overflow-x-clip bg-[var(--paper)] text-[var(--ink)] antialiased">
      <HeroMotion />
      <WorkShowcase />
      <ServicesList />
      <ProcessSteps />
      <ProjectEstimator />
      <TestimonialsSection />
      <ContactClosing />
    </div>
  );
}
