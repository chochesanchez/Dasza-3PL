import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/shared/Analytics";
import PageTransition from "@/components/ui/PageTransition";
import ScrollProgress from "@/components/shared/ScrollProgress";
import AuthProvider from "@/components/shared/AuthProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dasza 3PL | Supply Chain Solutions",
  description: "Supply chain solutions for manufacturing in Mexico: IMMEX AAA warehousing, inventory control, intermodal via Manzanillo, Altamira & Veracruz.",
  icons: {
    icon: "/favicon-2025.ico",
    shortcut: "/favicon-2025.ico",
    apple: "/favicon-2025-512.png",
  },
};

export const viewport = {
  themeColor: '#00B4EF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <ScrollProgress />
        <AuthProvider>
          <PageTransition>{children}</PageTransition>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
