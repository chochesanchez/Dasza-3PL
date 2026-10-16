'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { COMPANY, SERVICES, CERTIFICATIONS } from '@/content/site'
import { useI18n } from '@/i18n/I18nProvider'
import { basePath } from '@/i18n/config'
import LanguageSwitch from './LanguageSwitch'
import TextButton from '@/components/ui/TextButton'

export default function Footer() {
  const { t, href } = useI18n()
  const path = basePath(usePathname() || '/')
  const showCta = !(path.startsWith('/contact') || path.startsWith('/quote') || path === '/')

  return (
    <footer className="bg-dasza-ink text-white">
      {showCta && (
        <div className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 md:py-20 grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-2xl">{t.footer.ctaTitle}</h2>
              <p className="mt-4 text-white/70 max-w-xl">{t.footer.ctaText}</p>
            </div>
            <TextButton href={href('/contact')} tone="dark" size="lg">{t.footer.ctaButton}</TextButton>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-12 text-sm">
        <div className="md:col-span-4">
          <Link href={href('/')} className="flex items-center gap-2.5">
            <Image src="/images/Dasza Logistics Logo 2.png" alt="" width={30} height={30} />
            <span className="font-display text-lg">Dasza <span className="font-bold text-dasza-cyan">3PL</span></span>
          </Link>
          <p className="mt-4 text-white/65 max-w-xs leading-relaxed">{t.footer.tagline}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={t.common.certifications}>
            {CERTIFICATIONS.map((c) => (
              <li key={c} className="px-2.5 py-1 rounded border border-white/20 text-xs text-white/80">{c}</li>
            ))}
          </ul>
          <div className="mt-6"><LanguageSwitch tone="dark" up /></div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-white/50 mb-4">{t.footer.services}</h3>
          <ul className="space-y-2.5">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}><Link href={href(`/services/${s.slug}`)} className="text-white/85 hover:text-dasza-cyan">{t.services[s.slug].name}</Link></li>
            ))}
            <li><Link href={href('/services')} className="text-white/85 hover:text-dasza-cyan">{t.common.allServices}</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-white/50 mb-4">{t.footer.company}</h3>
          <ul className="space-y-2.5">
            <li><Link href={href('/about')} className="text-white/85 hover:text-dasza-cyan">{t.footer.about}</Link></li>
            <li><Link href={href('/dasza-system')} className="text-white/85 hover:text-dasza-cyan">{t.footer.system}</Link></li>
            <li><Link href={href('/quote')} className="text-white/85 hover:text-dasza-cyan">{t.footer.quote}</Link></li>
            <li><Link href={href('/contact')} className="text-white/85 hover:text-dasza-cyan">{t.footer.contactLink}</Link></li>
            <li><a href={COMPANY.dltUrl} className="text-white/85 hover:text-dasza-cyan">{t.footer.dlt}</a></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-white/50 mb-4">{t.footer.contact}</h3>
          <ul className="space-y-2.5 text-white/85">
            <li><a href={COMPANY.phoneHref} className="hover:text-dasza-cyan whitespace-nowrap">{COMPANY.phone}</a></li>
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-dasza-cyan">{COMPANY.email}</a></li>
            <li><a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-dasza-cyan">WhatsApp</a></li>
            <li className="text-white/60 leading-relaxed pt-1">{COMPANY.office}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 text-xs text-white/50 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Dasza 3PL. {t.footer.rights}</span>
          <span>{t.footer.location}</span>
        </div>
      </div>
    </footer>
  )
}
