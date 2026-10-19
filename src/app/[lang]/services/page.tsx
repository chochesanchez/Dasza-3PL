import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import ServiceIndex from '@/components/home/ServiceIndex'
import { isLang, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata(lang, '/services', { title: t.nav.services, description: t.servicesPage.description })
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          title={t.servicesPage.title}
          lead={t.servicesPage.lead}
          crumbs={[{ href: localePath(lang, '/'), label: t.common.home }]}
          crumbLabel={t.common.breadcrumb}
        />
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
          <ServiceIndex />
        </section>
      </main>
      <Footer />
    </div>
  )
}
