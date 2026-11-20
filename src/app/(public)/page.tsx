import { HeroMotion } from "@/components/home/hero-motion";
import { ArcCarousel } from "@/components/home/arc-carousel";
import { SystemsOffer } from "@/components/home/systems-offer";
import { ServicesList } from "@/components/home/services-list";
import { ProcessSteps } from "@/components/home/process-steps";
import { ProjectEstimator } from "@/components/home/project-estimator";
import { TestimonialsSection } from "@/components/home/testimonials";
import { ContactClosing } from "@/components/home/contact-closing";

/**
 * Portada (PLAN_DISENO_UNICO.md, sección 4).
 * Orden: portada, carrusel en arco con las páginas que hicimos, sistemas
 * que construimos, qué hacemos, cómo trabajamos, simulador, testimonios y cierre.
 */
export default function Home() {
  return (
    <div className="relative flex flex-col overflow-x-clip bg-[var(--paper)] text-[var(--ink)] antialiased">
      <HeroMotion />
      <ArcCarousel />
      <SystemsOffer />
      <ServicesList />
      <ProcessSteps />
      <ProjectEstimator />
      <TestimonialsSection />
      <ContactClosing />
    </div>
  );
}
