import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizar Proyecto de Software & IA | AVANZA",
  description: "Solicita una asesoría técnica sin costo. Cuéntanos sobre tu idea o requerimiento y te entregamos un plan de desarrollo claro y sin compromiso.",
  openGraph: {
    title: "Cotizar Proyecto | AVANZA",
    description: "Inicia el desarrollo de tu página web, sistema empresarial o solución con Inteligencia Artificial.",
  },
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
