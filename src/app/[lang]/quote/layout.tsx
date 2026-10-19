import type { Metadata } from 'next'
import { isLang } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata(lang, '/quote', { title: t.quote.title, description: t.quote.lead })
}

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children
}
