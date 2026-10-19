import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import DemoExperience from '@/components/dasza-system/DemoExperience'
import { isLang, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata(lang, '/dasza-system', { title: t.demo.metaTitle, description: t.demo.metaDescription })
}

export default async function DaszaSystemPage({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro title={t.demo.title} lead={t.demo.lead} crumbs={[{ href: localePath(lang, '/'), label: t.common.home }]} crumbLabel={t.common.breadcrumb} />
        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 md:py-16">
            <DemoExperience />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
