import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/shared/Analytics";
import { SITE_URL } from "@/lib/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dasza 3PL',
  url: SITE_URL,
  logo: `${SITE_URL}/images/Dasza%20Logistics%20Logo%20Complete.png`,
  contactPoint: [{ '@type': 'ContactPoint', telephone: '+52-81-1916-1086', email: 'jmsanchez@dasza.com', contactType: 'sales', areaServed: 'MX', availableLanguage: ['English', 'Spanish'] }],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Dasza 3PL | IMMEX logistics for manufacturers in Mexico", template: "%s | Dasza 3PL" },
  description: "Customs, bonded warehousing and freight for manufacturers in Mexico. DASZA imports under its IMMEX AAA program and delivers to your production line from Apodaca and Querétaro.",
  openGraph: { type: "website", siteName: "Dasza 3PL", images: [{ url: "/images/site/port-aerial.jpg", width: 2000, height: 1333 }] },
  icons: {
    icon: "/favicon-2025.ico",
    shortcut: "/favicon-2025.ico",
    apple: "/favicon-2025-512.png",
  },
};

export const viewport = {
  themeColor: '#1E2833',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.variable}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
