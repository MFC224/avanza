import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "AVANZA Software Studio | Desarrollo de software y plataformas web con IA",
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_CONFIG.url}/#organization`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      logo: `${SITE_CONFIG.url}/images/logo-avanza.webp`,
      image: `${SITE_CONFIG.url}/images/hero-studio-desk-night.webp`,
      description: SITE_CONFIG.description,
      founder: [
        {
          "@type": "Person",
          name: SITE_CONFIG.founders.manuel.name,
          jobTitle: SITE_CONFIG.founders.manuel.role,
        },
        {
          "@type": "Person",
          name: SITE_CONFIG.founders.magno.name,
          jobTitle: SITE_CONFIG.founders.magno.role,
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.contact.commercialPhone,
        contactType: "sales",
        areaServed: ["PE", "LatAm"],
        availableLanguage: ["Spanish", "English"],
      },
      sameAs: [
        SITE_CONFIG.social.linkedin,
        SITE_CONFIG.social.github,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}/#website`,
      url: SITE_CONFIG.url,
      name: SITE_CONFIG.name,
      publisher: { "@id": `${SITE_CONFIG.url}/#organization` },
      inLanguage: "es-PE",
    },
  ],
};

/**
 * Analytics ya no se carga aquí: solo se activa si la persona acepta las cookies
 * (componente CookieConsent, Ley 29733 y D.S. 016-2024-JUS).
 */
const THEME_BOOT_SCRIPT = `(function(){try{var t=localStorage.getItem("avanza-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Tema claro u oscuro antes de pintar, para evitar un destello (PLAN_DISENO_UNICO, ronda 2). */}
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500/20">
        {children}
      </body>
    </html>
  );
}
