import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import ServiceIndex from '@/components/home/ServiceIndex'

export const metadata: Metadata = {
  title: 'Services',
  description: 'IMMEX importer and shelter, customs brokerage, bonded warehousing, VMI, freight and value-added services for manufacturers in Mexico.',
  alternates: { canonical: '/services' },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          title="Services for manufacturers in Mexico"
          lead="Customs, storage, freight and value-added work — use one service or combine them into a single flow from the port to your line."
        />
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-24">
          <ServiceIndex />
        </section>
      </main>
      <Footer />
    </div>
  )
}
