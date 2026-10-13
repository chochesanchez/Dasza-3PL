'use client'
import Image from 'next/image'
import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import { CLIENT_LOGOS, logoSrc } from '@/content/site'
import { useI18n } from '@/i18n/I18nProvider'

// The invitation tile fills whatever is left of the last row, so the grid always ends square.
const BASE = ['col-span-2', 'col-span-1']
const SM = ['sm:col-span-3', 'sm:col-span-2', 'sm:col-span-1']
const LG = ['lg:col-span-6', 'lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3', 'lg:col-span-2', 'lg:col-span-1']

// Full client grid (About page), in original logo colors, ending with an invitation tile.
export default function ClientLogos() {
  const { t, href } = useI18n()
  const n = CLIENT_LOGOS.length
  const span = `${BASE[n % 2]} ${SM[n % 3]} ${LG[n % 6]}`
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-l border-t border-dasza-line">
      {CLIENT_LOGOS.map((l) => (
        <li key={l.name} className="h-24 md:h-28 border-r border-b border-dasza-line grid place-items-center px-6 bg-white">
          <span className="relative block h-11 md:h-12 w-full max-w-[150px]">
            <Image src={logoSrc(l.src)} alt={l.name} fill sizes="150px" className="object-contain" />
          </span>
        </li>
      ))}
      <li className={`${span} min-h-24 md:min-h-28 border-r border-b border-dasza-line bg-dasza-paper`}>
        <Link href={href('/contact')} className="group h-full min-h-24 md:min-h-28 flex items-center gap-4 px-5 sm:px-6 py-4">
          <span className="grid place-items-center h-11 w-11 shrink-0 rounded-full bg-dasza-cyan text-dasza-ink transition-transform group-hover:scale-105">
            <PlusIcon className="h-6 w-6" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-dasza-ink">{t.clients.youTitle}</span>
            <span className="block text-sm text-dasza-navy mt-1">{t.clients.youText}</span>
          </span>
        </Link>
      </li>
    </ul>
  )
}
