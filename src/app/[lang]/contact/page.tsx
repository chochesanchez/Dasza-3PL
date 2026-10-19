import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import ContactForm from '@/components/ui/ContactForm'
import { isLang, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata(lang, '/contact', { title: t.nav.contact, description: t.contactPage.description })
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          title={t.contactPage.title}
          lead={t.contactPage.lead}
          crumbs={[{ href: localePath(lang, '/'), label: t.common.home }]}
          crumbLabel={t.common.breadcrumb}
        />
        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 md:py-20">
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
