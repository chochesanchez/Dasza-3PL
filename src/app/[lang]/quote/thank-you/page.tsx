import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import TextButton from '@/components/ui/TextButton'
import { isLang, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  // Only reached after sending the quote form; keep it out of search results.
  const t = getDictionary(lang)
  return { ...pageMetadata(lang, '/quote/thank-you', { title: t.thanks.title, description: t.thanks.text }), robots: { index: false, follow: true } }
}

export default async function ThankYouPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-dasza-paper">
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-24">
          <h1 className="font-display text-4xl md:text-5xl font-semibold">{t.thanks.title}</h1>
          <p className="mt-4 text-lg text-dasza-navy">{t.thanks.text}</p>
          <div className="mt-8"><TextButton href={localePath(lang, '/')}>{t.thanks.back}</TextButton></div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
