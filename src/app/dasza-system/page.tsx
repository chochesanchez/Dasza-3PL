import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import DemoExperience from '@/components/dasza-system/DemoExperience'
import PageIntro from '@/components/ui/PageIntro'

export const metadata: Metadata = {
  title: 'Dasza System interactive demo',
  description: 'Take a guided tour of Dasza System: inventory, receipts, shipments, pallet traceability, cycle counts and billing for your operation.',
}

export default function DaszaSystemPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro
          title="Dasza System"
          lead="See how our clients track their inventory, movements, pallets and billing — in a two-minute guided tour with sample data."
          crumbs={[{ href: '/', label: 'Home' }]}
        />
        <section className="bg-dasza-paper"><div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 md:py-16">
          <DemoExperience />
        </div></section>
      </main>
      <Footer />
    </div>
  )
}
