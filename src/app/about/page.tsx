import type { Metadata } from 'next'
import Image from 'next/image'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import Sites from '@/components/home/Sites'
import ClientLogos from '@/components/home/ClientLogos'
import { COMPANY, CERTIFICATIONS } from '@/content/site'

export const metadata: Metadata = {
  title: 'About',
  description: 'DASZA is a third-party logistics company for manufacturers in Mexico: IMMEX importer, customs broker 6078 and bonded warehouses in Apodaca and Querétaro.',
  alternates: { canonical: '/about' },
}

const PRINCIPLES = [
  {
    title: 'We work as part of your supply chain',
    text: 'Our teams follow your production plan, your suppliers’ schedules and your compliance rules — not a generic warehouse routine.',
  },
  {
    title: 'Every pallet is accounted for',
    text: 'Material is checked against your packing list, labeled and located on arrival, and stays visible to you in Dasza System until it ships.',
  },
  {
    title: 'Compliance is built in',
    text: 'IMMEX AAA, OEA and our own customs broker mean the paperwork moves with the material, and you’re ready for any audit.',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          title="A logistics partner built for manufacturing"
          lead="DASZA imports, stores and delivers raw materials, components and finished goods for manufacturers and their suppliers in Mexico."
          image="/images/site/warehouse-forklift.jpg"
          crumbs={[{ href: '/', label: 'Home' }]}
        />

        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-[1.1]">How we work</h2>
            <p className="mt-5 text-lg text-dasza-navy leading-relaxed">
              Most of our clients are foreign suppliers to Mexican plants, and the plants themselves. We act as importer under our IMMEX program,
              clear customs with our own broker (license {COMPANY.customsLicense}), hold material in bonded warehouses and release it to production as needed.
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Certifications">
              {CERTIFICATIONS.map((c) => (
                <li key={c} className="px-3 py-1.5 rounded border border-dasza-line text-sm">{c}</li>
              ))}
            </ul>
          </div>
          <ul className="lg:col-span-7 border-t border-dasza-line">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="py-6 border-b border-dasza-line">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-dasza-navy leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-10">Our sites</h2>
            <Sites />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24 grid md:grid-cols-2 gap-4">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src="/images/site/dasza-pick-pack.jpg" alt="Dasza team member labeling a box at a packing station" fill sizes="50vw" className="object-cover" />
          </div>
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image src="/images/site/dasza-rework.jpg" alt="Technician reworking a compressor" fill sizes="50vw" className="object-cover" />
          </div>
        </section>

        <section id="clients" className="scroll-mt-20 mx-auto max-w-7xl px-5 sm:px-8 pb-16 md:pb-24">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3">Clients</h2>
          <p className="text-dasza-navy text-lg mb-10 max-w-2xl">Manufacturers in automotive, appliances, steel, electronics and industrial equipment — and the suppliers that serve them.</p>
          <ClientLogos />
        </section>

        <section className="bg-dasza-ink text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-semibold">Need last-mile delivery too?</h2>
              <p className="mt-2 text-white/70">Our sister company DLT Logistics handles storage, distribution and fulfillment across Mexico’s main metros.</p>
            </div>
            <a href={COMPANY.dltUrl} className="inline-flex items-center h-12 px-6 rounded-md bg-[#FFCC00] text-dasza-charcoal font-semibold">Visit DLT Logistics</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
