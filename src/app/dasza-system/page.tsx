import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import DemoExperience from '@/components/dasza-system/DemoExperience'

export const metadata: Metadata = {
  title: 'Dasza System — Interactive Demo | Dasza 3PL',
  description: 'Take a guided tour of Dasza System: inventory, receipts, shipments, pallet traceability, cycle counts and billing for your operation.',
}

export default function DaszaSystemPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-16">
          <div className="text-center mb-10">
            <div className="text-xs uppercase tracking-widest text-dasza-navy/60">Interactive demo</div>
            <h1 className="text-3xl md:text-5xl font-bold text-dasza-navy mt-2">Dasza System</h1>
            <p className="text-dasza-navy/80 mt-3 max-w-2xl mx-auto">
              See how our clients track their inventory, movements, pallets and billing — in a two-minute guided tour.
            </p>
          </div>
          <DemoExperience />
        </section>
      </main>
      <Footer />
    </div>
  )
}
