import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import TextButton from '@/components/ui/TextButton'
import Sites from '@/components/home/Sites'
import ClientLogos from '@/components/home/ClientLogos'
import { COMPANY, CERTIFICATIONS } from '@/content/site'
import { isLang, localePath } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { pageMetadata } from '@/lib/metadata'

type Props = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const t = getDictionary(lang)
  return pageMetadata(lang, '/about', { title: t.nav.about, description: t.about.metaDescription })
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = getDictionary(lang)
  const a = t.about

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          title={a.title}
          lead={a.lead}
          image="/images/site/dasza-warehouse.jpg"
          imageAlt={a.heroAlt}
          crumbs={[{ href: localePath(lang, '/'), label: t.common.home }]}
          crumbLabel={t.common.breadcrumb}
        />

        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-[1.1]">{a.howTitle}</h2>
            <p className="mt-5 text-lg text-dasza-navy leading-relaxed">{a.howText}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t.common.certifications}>
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="px-3 py-1.5 rounded border border-dasza-line text-sm">{c}</li>
              ))}
            </ul>
          </div>
          <ul className="lg:col-span-7 border-t border-dasza-line">
            {a.principles.map((p) => (
              <li key={p.title} className="py-6 border-b border-dasza-line">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-dasza-navy leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">{a.sitesTitle}</h2>
            <Sites />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-4">
          {['/images/site/dasza-pick-pack.jpg', '/images/site/dasza-rework.jpg'].map((src, i) => (
            <div key={src} className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image src={src} alt={a.photoAlts[i]} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </section>

        <section id="clients" className="scroll-mt-20 mx-auto max-w-7xl px-5 sm:px-8 pb-16 md:pb-24">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3">{t.clients.title}</h2>
          <p className="text-dasza-navy text-lg mb-10 max-w-2xl">{t.clients.lead}</p>
          <ClientLogos />
        </section>

        <section className="bg-dasza-ink text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">{a.dltTitle}</h2>
              <p className="mt-2 text-white/70">{a.dltText}</p>
            </div>
            <TextButton href={COMPANY.dltUrl} tone="dark" external>{a.dltCta}</TextButton>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
