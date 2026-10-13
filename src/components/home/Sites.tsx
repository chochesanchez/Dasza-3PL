'use client'
import { motion, useReducedMotion } from 'framer-motion'
import { SITES, GATEWAYS } from '@/content/site'
import CountUp from '@/components/motion/CountUp'

export default function Sites() {
  const reduce = useReducedMotion()
  const max = Math.max(...SITES.map((s) => s.area))
  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <ul className="lg:col-span-8 space-y-8">
        {SITES.map((s, i) => (
          <li key={s.name}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-display text-xl md:text-2xl font-semibold">{s.name}</h3>
              <span className="font-display text-xl md:text-2xl tabular-nums">
                <CountUp value={s.area.toLocaleString('en-US')} /> <span className="text-base text-dasza-navy">sq ft</span>
              </span>
            </div>
            <div className="mt-3 h-3 rounded-sm bg-dasza-paper overflow-hidden" aria-hidden>
              <motion.div
                className="h-full bg-dasza-cyan origin-left"
                style={{ width: `${(s.area / max) * 100}%` }}
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <p className="mt-3 text-dasza-navy"><span className="text-dasza-ink">{s.location}.</span> {s.text}</p>
          </li>
        ))}
      </ul>
      <div className="lg:col-span-4 lg:border-l lg:border-dasza-line lg:pl-10">
        <h3 className="text-sm text-dasza-navy/70 mb-4">Ports and borders</h3>
        <ul className="space-y-5">
          {GATEWAYS.map((g) => (
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
