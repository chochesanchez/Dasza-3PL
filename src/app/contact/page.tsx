import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import ContactForm from '@/components/ui/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to a Dasza 3PL specialist about customs, IMMEX, warehousing and freight in Mexico. We reply within one business day.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro title="Talk to a specialist" lead="Tell us what you need and we’ll reply within one business day." crumbs={[{ href: '/', label: 'Home' }]} />
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
