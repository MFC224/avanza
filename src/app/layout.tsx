import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AVANZA | Agencia de Desarrollo de Software & Inteligencia Artificial",
  description: "Desarrollo de páginas web de alto impacto, sistemas web a medida, automatización con IA y aplicaciones móviles en Perú. Metodología ágil SCRUM con entregas semanales.",
  keywords: [
    "desarrollo de software peru",
    "agencia de software lima",
    "inteligencia artificial empresas",
    "sistemas web a medida",
    "next.js supabase desarrollo",
    "desarrollo web peru",
    "automatizacion con ia",
    "metodologia scrum software"
  ],
  authors: [{ name: "Manuel Callañaupa" }, { name: "Magno Alomia" }],
  openGraph: {
    title: "AVANZA | AI & Software Studio",
    description: "Impulsa tu empresa con tecnología de vanguardia y arquitectura escalable. Entregas continuas cada 7 a 14 días.",
    url: "https://avanza.dev",
    siteName: "AVANZA",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVANZA | AI & Software Studio",
    description: "Desarrollo de software rápido, confiable y potenciado con Inteligencia Artificial.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground selection:bg-indigo-500/30">
        {children}
      </body>
    </html>
  );
}
