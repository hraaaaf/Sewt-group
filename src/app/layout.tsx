import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { fontDisplay, fontSans, fontMono } from "@/styles/fonts";
import { publicEnv } from "@/lib/env";
import { cn } from "@/lib/cn";
import "./globals.css";

const siteUrl = publicEnv.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SEWT Group — Énergie solaire, EPC et solutions photovoltaïques au Maroc",
    template: "%s · SEWT Group",
  },
  description:
    "SEWT Group accompagne les industriels, agriculteurs et institutions marocaines dans la conception, l'installation et la maintenance de centrales solaires performantes. EPC clé en main depuis 1992.",
  keywords: [
    "SEWT Group",
    "Sun Energy and Water Technologies",
    "énergie solaire Maroc",
    "centrale photovoltaïque industrielle Maroc",
    "EPC solaire Maroc",
    "installation solaire industrielle",
    "exploitation maintenance solaire",
    "pompage solaire",
    "autoconsommation solaire",
    "transition énergétique Maroc",
    "IRESEN MASEN",
    "distribution équipements solaires",
  ],
  authors: [{ name: "SEWT Group" }],
  creator: "SEWT Group",
  openGraph: {
    type: "website",
    locale: "fr_MA",
    url: siteUrl,
    siteName: "SEWT Group",
    title: "SEWT Group — Énergie solaire, EPC et solutions photovoltaïques au Maroc",
    description:
      "SEWT Group conçoit, installe et exploite des centrales solaires performantes au Maroc. Distribution équipements tier-1, EPC clé en main, O&M longue durée.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SEWT Group — Énergie solaire, EPC et solutions photovoltaïques au Maroc",
    description:
      "Énergie solaire industrielle, agricole et institutionnelle. EPC clé en main, O&M 25 ans, distribution équipements tier-1.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "industrial energy",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F4EE" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0D0C" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Schema.org JSON-LD — Organization + LocalBusiness + OfferCatalog
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: "SEWT Group",
      alternateName: "Sun Energy and Water Technologies Group",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/sewt-official-color.png`,
        width: 260,
        height: 92,
      },
      image: `${siteUrl}/opengraph-image`,
      description:
        "Entreprise marocaine spécialisée dans les études, l'installation et la maintenance de solutions d'énergie solaire pour les activités professionnelles.",
      // Date de création de la SARL d'après les informations d'immatriculation publiques.
      foundingDate: "2023-08-09",
      founder: {
        "@type": "Person",
        name: "Ali HAJJI",
        jobTitle: "Thermicien, fondateur",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Temara",
        addressRegion: "Rabat-Salé-Kénitra",
        addressCountry: "MA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 33.9166,
        longitude: -6.9142,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+212-661-117-155",
          contactType: "customer service",
          availableLanguage: ["French", "Arabic"],
        },
        {
          "@type": "ContactPoint",
          email: "contact@sewt-group.ma",
          contactType: "sales",
        },
      ],
      areaServed: {
        "@type": "Country",
        name: "Morocco",
      },
      knowsAbout: [
        "Énergie solaire photovoltaïque",
        "Pompage solaire",
        "Solaire thermique",
        "Monitoring IoT",
        "EPC industriel",
        "Autoconsommation solaire",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services SEWT Group",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Distribution équipements solaires tier-1",
              description:
                "Onduleurs Huawei et Deye, modules Jinko, structures Euro Tray et KBE Berlin, capteurs Suntherm. Garanties fabricant intégrales, stock local Casablanca.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Installation EPC clé en main",
              description:
                "Études, dimensionnement, ingénierie électrique, travaux structures, raccordement HTA. Équipe certifiée IEC, agréments IRESEN et MASEN.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Exploitation & Maintenance O&M",
              description:
                "Télé-surveillance 24/7, alertes IoT temps réel, maintenance préventive trimestrielle, reporting mensuel. Contrat O&M longue durée, garantie performance 25 ans.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "SEWT Group",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "fr-MA",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      dir="ltr"
      suppressHydrationWarning
      className={cn(
        fontDisplay.variable,
        fontSans.variable,
        fontMono.variable,
      )}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-svh bg-bg text-fg">
        <ThemeProvider>
          <LenisProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-[rgb(14_27_20)]"
            >
              Aller au contenu principal
            </a>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
