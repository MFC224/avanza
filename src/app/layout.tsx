import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-blue-500/20">
        {children}
      </body>
    </html>
  );
}
