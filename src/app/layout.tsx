import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SITE_CONFIG } from "@/lib/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "AVANZA Software Studio | Desarrollo de Software & Plataformas Web de Élite",
    template: "%s | AVANZA Software Studio",
  },
  description: SITE_CONFIG.description,
  keywords: [
    "desarrollo de software peru",
    "agencia de software lima",
    "inteligencia artificial empresas",
    "sistemas web a medida",
    "next.js supabase desarrollo",
    "desarrollo web peru",
    "automatizacion con ia",
    "metodologia scrum software",
  ],
  authors: [
    { name: SITE_CONFIG.founders.manuel.name },
    { name: SITE_CONFIG.founders.magno.name },
  ],
  openGraph: {
    title: "AVANZA Software Studio",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: SITE_CONFIG.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AVANZA Software Studio",
    description: "Desarrollo de software ágil, plataformas web de alta conversión y automatización con IA.",
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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500/20">
        {children}
      </body>
    </html>
  );
}
