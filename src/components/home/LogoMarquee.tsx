'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import { CLIENT_LOGOS, logoSrc } from '@/content/site'
import { useI18n } from '@/i18n/I18nProvider'

// Infinite left-to-right strip that never pauses. The list is duplicated so the loop is seamless,
// and a "your company here" card closes each loop.
export default function LogoMarquee() {
  const { t, href } = useI18n()
  const loop = (copy: number) => [
    ...CLIENT_LOGOS.map((l, i) => (
      <li key={`${copy}-${i}`} className="partner-card h-28 w-64 shrink-0" aria-hidden={copy > 0}>
        <span className="relative block h-14 w-48">
          <Image src={logoSrc(l.src)} alt={copy === 0 ? l.name : ''} fill sizes="192px" className="object-contain" />
        </span>
      </li>
    )),
    <li key={`${copy}-you`} className="shrink-0" aria-hidden={copy > 0}>
      <Link
        href={href('/contact')}
        tabIndex={copy > 0 ? -1 : undefined}
        className="h-28 w-64 rounded-2xl border-2 border-dashed border-dasza-cyan/60 bg-dasza-paper flex items-center gap-3 px-5 hover:border-dasza-cyan transition-colors"
      >
        <span className="grid place-items-center h-10 w-10 shrink-0 rounded-full bg-dasza-cyan text-dasza-ink"><PlusIcon className="h-5 w-5" /></span>
        <span className="text-left leading-tight">
          <span className="block font-display font-semibold text-dasza-ink">{t.clients.youTitle}</span>
          <span className="block text-xs text-dasza-navy mt-0.5">{t.clients.youCta}</span>
        </span>
      </Link>
    </li>,
  ]
  return (
    <div className="partners-marquee-viewport">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white to-transparent" />
      <ul className="partners-marquee-track">{[...loop(0), ...loop(1)]}</ul>
    </div>
  )
}
