import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Archivo } from 'next/font/google'
import '../globals.css'
import Analytics from '@/components/shared/Analytics'
import { SITE_URL } from '@/lib/site'
import { LOCALES, isLang } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { I18nProvider } from '@/i18n/I18nProvider'
import { pageMetadata } from '@/lib/metadata'

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
})

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Dasza 3PL',
  url: SITE_URL,
  logo: `${SITE_URL}/images/Dasza%20Logistics%20Logo%20Complete.png`,
  contactPoint: [
    { '@type': 'ContactPoint', telephone: '+52-81-1916-1086', email: 'jmsanchez@dasza.com', contactType: 'sales', areaServed: 'MX', availableLanguage: ['English', 'Spanish'] },
  ],
}

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  const home = pageMetadata(lang, '/', { description: t.meta.description })
  return {
    ...home,
    metadataBase: new URL(SITE_URL),
    title: { default: t.meta.title, template: '%s | Dasza 3PL' },
    openGraph: { ...home.openGraph, title: t.meta.title },
    icons: { icon: '/favicon-2025.ico', shortcut: '/favicon-2025.ico', apple: '/favicon-2025-512.png' },
  }
}

export const viewport = { themeColor: '#1E2833' }

export default async function RootLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  return (
    <html lang={lang === 'es' ? 'es-MX' : 'en'}>
      <body className={archivo.variable}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <I18nProvider lang={lang} dict={getDictionary(lang)}>
          {children}
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  )
}
