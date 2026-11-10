import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones Virtual | AVANZA",
  description: "Libro de Reclamaciones Virtual conforme a las disposiciones de INDECOPI y la Ley N° 29571 del Perú.",
  alternates: {
    canonical: "/reclamaciones",
  },
};

export default function ReclamacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
