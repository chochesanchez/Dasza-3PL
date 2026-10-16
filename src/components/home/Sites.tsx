'use client'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { SITE_AREAS } from '@/content/site'
import CountUp from '@/components/motion/CountUp'
import { useI18n } from '@/i18n/I18nProvider'

export default function Sites() {
  const { t } = useI18n()
  // One observer for the whole list: when it's on screen, every bar fills (CSS transition, staggered).
  const listRef = useRef<HTMLUListElement | null>(null)
  const shown = useInView(listRef, { once: true, amount: 0.2 })
  const max = Math.max(...SITE_AREAS)
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <ul ref={listRef} className="lg:col-span-8 space-y-8">
        {t.sites.items.map((s, i) => (
          <li key={s.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-xl md:text-2xl font-semibold">{s.name}</h3>
              <span className="font-display text-xl md:text-2xl">
                <CountUp value={SITE_AREAS[i].toLocaleString('en-US')} /> <span className="text-base text-dasza-navy">{t.common.sqft}</span>
              </span>
            </div>
            <div className="mt-3 h-3 rounded-sm bg-dasza-paper overflow-hidden" aria-hidden>
              <div
                className={`h-full bg-dasza-cyan origin-left transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${shown ? 'scale-x-100' : 'scale-x-0'}`}
                style={{ width: `${(SITE_AREAS[i] / max) * 100}%`, transitionDelay: `${i * 150}ms` }}
              />
            </div>
            <p className="mt-3 text-sm font-medium text-dasza-ink">{s.location}</p>
            <p className="mt-1 text-dasza-navy">{s.text}</p>
          </li>
        ))}
      </ul>
      <div className="lg:col-span-4 lg:border-l lg:border-dasza-line lg:pl-10">
        <h3 className="text-sm text-dasza-navy/70 mb-4">{t.sites.portsTitle}</h3>
        <ul className="space-y-5">
          {t.sites.gateways.map((g) => (
            <li key={g.name}>
              <div className="font-semibold">{g.name}</div>
              <p className="text-dasza-navy text-sm mt-1">{g.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
