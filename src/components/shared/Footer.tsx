'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { COMPANY, SERVICES, CERTIFICATIONS } from '@/content/site'

export default function Footer() {
  const pathname = usePathname()
  const showCta = !(pathname?.startsWith('/contact') || pathname?.startsWith('/quote') || pathname === '/')

  return (
    <footer className="bg-dasza-ink text-white">
      {showCta && (
        <div className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-20 grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-2xl">
                Tell us what you import. We’ll show you how it reaches your line.
              </h2>
              <p className="mt-4 text-white/70 max-w-xl">A specialist replies within one business day with a proposal for your volumes.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center h-12 px-6 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-white transition-colors">
                Get a quote
              </Link>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-12 px-6 rounded-md border border-white/30 hover:border-white transition-colors">
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-12 text-sm">
        <div className="md:col-span-4">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/Dasza Logistics Logo 2.png" alt="" width={30} height={30} />
            <span className="font-display text-lg">Dasza <span className="font-bold text-dasza-cyan">3PL</span></span>
          </Link>
          <p className="mt-4 text-white/65 max-w-xs leading-relaxed">
            Customs, bonded warehousing and freight for manufacturers in Mexico.
          </p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Certifications">
            {CERTIFICATIONS.map((c) => (
              <li key={c} className="px-2.5 py-1 rounded border border-white/20 text-xs text-white/80">{c}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-white/50 mb-4">Services</h3>
          <ul className="space-y-2.5">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}><Link href={`/services/${s.slug}`} className="text-white/85 hover:text-dasza-cyan">{s.name}</Link></li>
            ))}
            <li><Link href="/services" className="text-white/85 hover:text-dasza-cyan">All services</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-white/50 mb-4">Company</h3>
          <ul className="space-y-2.5">
            <li><Link href="/about" className="text-white/85 hover:text-dasza-cyan">About</Link></li>
            <li><Link href="/dasza-system" className="text-white/85 hover:text-dasza-cyan">Dasza System</Link></li>
            <li><Link href="/quote" className="text-white/85 hover:text-dasza-cyan">Get a quote</Link></li>
            <li><Link href="/contact" className="text-white/85 hover:text-dasza-cyan">Contact</Link></li>
            <li><a href={COMPANY.dltUrl} className="text-white/85 hover:text-dasza-cyan">DLT Logistics (last mile)</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-white/50 mb-4">Contact</h3>
          <ul className="space-y-2.5 text-white/85">
            <li><a href={COMPANY.phoneHref} className="hover:text-dasza-cyan">{COMPANY.phone}</a></li>
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-dasza-cyan">{COMPANY.email}</a></li>
            <li><a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-dasza-cyan">WhatsApp</a></li>
            <li className="text-white/60 leading-relaxed pt-1">{COMPANY.office}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 text-xs text-white/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Dasza 3PL. All rights reserved.</span>
          <span>Apodaca, Nuevo León, México</span>
        </div>
      </div>
    </footer>
  )
}
