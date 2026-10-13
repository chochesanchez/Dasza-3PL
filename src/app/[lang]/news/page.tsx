import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import { isLang, localePath, alternatesFor } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'

const LINKS = ['https://www.sat.gob.mx/', 'https://ustr.gov/', 'https://www.cbp.gov/']
type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return { title: t.news.title, description: t.news.description, alternates: alternatesFor(lang, '/news') }
}

export default async function NewsPage({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro title={t.news.title} lead={t.news.lead} crumbs={[{ href: localePath(lang, '/'), label: t.common.home }]} crumbLabel={t.common.breadcrumb} />
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-14">
          <ul className="border-t border-dasza-line">
            {t.news.items.map((i, k) => (
              <li key={i.title} className="border-b border-dasza-line">
                <a href={LINKS[k]} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-5">
                  <span>
                    <span className="block font-display text-xl font-semibold group-hover:text-dasza-cyan600">{i.title}</span>
                    <span className="block text-dasza-navy text-sm mt-1">{i.source}</span>
                  </span>
                  <ArrowUpRightIcon className="h-5 w-5 shrink-0 text-dasza-gray group-hover:text-dasza-cyan600" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}
