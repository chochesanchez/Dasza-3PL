import type { Metadata } from 'next'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'

export const metadata: Metadata = {
  title: 'Trade resources',
  description: 'Official sources for customs and trade rules affecting imports into Mexico.',
}

const ITEMS = [
  { title: 'Customs bulletins and rules', href: 'https://www.sat.gob.mx/', source: 'SAT (Mexico)' },
  { title: 'USMCA rules of origin', href: 'https://ustr.gov/', source: 'USTR (United States)' },
  { title: 'Cargo Systems Messaging Service', href: 'https://www.cbp.gov/', source: 'CBP (United States)' },
]

export default function NewsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro title="Trade resources" lead="Official sources we follow for customs and trade rules." crumbs={[{ href: '/', label: 'Home' }]} />
        <section className="mx-auto max-w-4xl px-5 sm:px-8 py-14">
          <ul className="border-t border-dasza-line">
            {ITEMS.map((i) => (
              <li key={i.title} className="border-b border-dasza-line">
                <a href={i.href} target="_blank" rel="noopener noreferrer" className="group flex justify-between gap-4 py-5">
                  <span className="font-display text-xl font-semibold group-hover:text-dasza-cyan600">{i.title}</span>
                  <span className="text-dasza-navy text-sm self-center">{i.source}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  )
}
