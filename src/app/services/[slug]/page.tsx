import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import { SERVICES } from '@/content/site'

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { images: [{ url: service.image }] },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()
  const related = SERVICES.filter((s) => s.group === service.group && s.slug !== service.slug)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          title={service.name}
          lead={service.summary}
          image={service.image}
          crumbs={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
          ]}
        >
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center h-12 px-6 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-white transition-colors">
              Get a quote
            </Link>
            <Link href="/contact" className="inline-flex items-center h-12 px-6 rounded-md border border-white/30 hover:border-white transition-colors">
              Talk to a specialist
            </Link>
          </div>
        </PageIntro>

        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">What you get</h2>
          <div className="grid md:grid-cols-3 gap-px bg-dasza-line border border-dasza-line rounded-lg overflow-hidden">
            {service.deliverables.map((d) => (
              <div key={d.title} className="bg-white p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold">{d.title}</h3>
                <p className="mt-3 text-dasza-navy leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10">
            <h2 className="lg:col-span-4 font-display text-3xl md:text-4xl font-semibold">Capabilities</h2>
            <ul className="lg:col-span-8 border-t border-dasza-line">
              {service.capabilities.map((c) => (
                <li key={c} className="py-5 border-b border-dasza-line text-lg flex gap-4">
                  <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-dasza-cyan" aria-hidden />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
            <h2 className="font-display text-2xl md:text-3xl font-semibold mb-8">Often combined with</h2>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/services/${r.slug}`} className="group block border-t-2 border-dasza-ink pt-4">
                    <span className="block font-display text-xl font-semibold group-hover:text-dasza-cyan600">{r.name}</span>
                    <span className="block mt-2 text-dasza-navy">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
