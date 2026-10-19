'use client'
import Image from 'next/image'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PROCESS_IMAGES } from '@/content/site'
import { useI18n } from '@/i18n/I18nProvider'

// Scroll distance per step while pinned on desktop: one mouse-wheel notch (100px) moves one step.
const STEP_PX = 100
// On touch screens a swipe travels further, so each step gets a bit less than half a screen.
const STEP_SVH = 40
// Header height the pinned section sits under (h-16 on phones, 72px from md up).
const headerPx = (mode: Mode) => (mode === 'touch' && typeof window !== 'undefined' && window.innerWidth < 768 ? 64 : 72)

type Mode = 'desktop' | 'touch' | 'static'

// Desktop and phones: the section pins while you scroll, and the scroll position picks the step.
// Scrolling is never intercepted. On desktop tapping a step scrolls to it.
// Reduced motion: every step open, each with its photo below the text.
export default function ProcessSteps() {
  const { t } = useI18n()
  const steps = t.process
  const N = steps.length
  const outer = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const [mode, setMode] = useState<Mode>('static')
  const reduce = useReducedMotion()

  const setStep = useCallback((i: number) => {
    activeRef.current = i
    setActive(i)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setMode(reduce ? 'static' : mq.matches ? 'desktop' : 'touch')
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  const { scrollYProgress } = useScroll({ target: outer, offset: [`start ${headerPx(mode)}px`, 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (mode === 'static') return
    const i = Math.min(N - 1, Math.max(0, Math.floor(p * N)))
    if (i !== activeRef.current) setStep(i)
  })

  const goTo = (i: number) => {
    setStep(i)
    const el = outer.current
    if (!el) return
    const start = el.getBoundingClientRect().top + window.scrollY - headerPx(mode)
    window.scrollTo({ top: start + i * STEP_PX + STEP_PX / 2, behavior: 'smooth' })
  }

  const step = steps[active]

  // While pinned, very short screens drop the lead paragraph so the steps and photo still fit.
  const intro = (pinned: boolean) => (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-dasza-cyan600">
        <span className="h-px w-8 bg-dasza-cyan" aria-hidden />
        {t.nav.how}
      </p>
      <h2 className="mt-3 lg:mt-4 font-display text-[28px] sm:text-4xl lg:text-5xl lg:[@media(max-height:800px)]:text-4xl font-semibold leading-[1.05]">{t.home.howTitle}</h2>
      <p className={`mt-3 lg:mt-4 text-base lg:text-lg lg:[@media(max-height:800px)]:text-base text-dasza-navy leading-relaxed ${pinned ? '[@media(max-height:700px)]:hidden' : ''}`}>
        {t.home.howText}
      </p>
    </div>
  )

  // Photo stack: the active step's photo fades in, the others stay mounted so switching is instant.
  const photos = (sizes: string) =>
    PROCESS_IMAGES.map((src, i) => (
      <motion.div
        key={src}
        className="absolute inset-0"
        initial={false}
        animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.05 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      </motion.div>
    ))

  if (mode === 'static') {
    // Keeps `outer` attached: useScroll needs its target mounted in every layout.
    return (
      <div ref={outer} className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mb-8">{intro(false)}</div>
        <ol className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 sm:space-y-0">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-dasza-line pt-5">
              <span className="font-display text-lg tabular-nums text-dasza-cyan600">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-1 font-display text-xl md:text-2xl font-semibold text-dasza-ink">{s.title}</h3>
              <p className="mt-2 text-dasza-navy leading-relaxed">{s.text}</p>
              <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded-lg bg-dasza-paper">
                <Image src={PROCESS_IMAGES[i]} alt="" fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                <span className="absolute left-3 bottom-3 px-3 py-1.5 rounded bg-dasza-ink/85 text-white text-sm">{s.place}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }

  if (mode === 'touch') {
    return (
      <div ref={outer} className="relative" style={{ height: `calc(100svh - ${headerPx(mode)}px + ${N * STEP_SVH}svh)` }}>
        <div className="sticky top-16 md:top-[72px] h-[calc(100svh-4rem)] md:h-[calc(100svh-72px)]">
          <div className="mx-auto h-full max-w-3xl px-5 sm:px-8 pt-6 pb-5 flex flex-col">
            {intro(true)}

            {/* Scroll length: fills as you move through the steps */}
            <div className="mt-5 flex items-center gap-3" aria-hidden>
              <span className="font-display text-sm tabular-nums text-dasza-navy">
                <span className="text-dasza-cyan600">{String(active + 1).padStart(2, '0')}</span> / {String(N).padStart(2, '0')}
              </span>
              <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-dasza-line">
                <motion.div className="absolute inset-0 origin-left bg-dasza-cyan" style={{ scaleX: progress }} />
                {steps.slice(1).map((_, i) => (
                  <span key={i} className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${((i + 1) / N) * 100}%` }} />
                ))}
              </div>
            </div>

            {/* Every step is stacked in one cell, so the block keeps the height of the longest one */}
            <ol className="mt-4 grid">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={i === active ? 'step' : undefined}
                  className={`col-start-1 row-start-1 transition-[opacity,translate] duration-300 ${
                    i === active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-dasza-ink">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] sm:text-base text-dasza-navy leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>

            <div className="relative mt-4 flex-1 min-h-[160px] overflow-hidden rounded-lg bg-dasza-paper">
              {photos('(min-width: 768px) 768px, 100vw')}
              <span className="absolute left-3 bottom-3 px-3 py-1.5 rounded bg-dasza-ink/85 text-white text-sm">{step.place}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div ref={outer} className="relative" style={{ height: `calc(100vh - 72px + ${N * STEP_PX}px)` }}>
      <div className="sticky top-[72px] h-[calc(100vh-72px)] flex flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-8 [@media(max-height:800px)]:mb-6">{intro(true)}</div>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 relative">
              <div className="absolute -left-4 top-0 bottom-0 w-[3px] bg-dasza-line rounded-full overflow-hidden" aria-hidden>
                <motion.div className="w-full h-full bg-dasza-cyan origin-top" style={{ scaleY: progress }} />
              </div>
              <ol className="border-t border-dasza-line">
                {steps.map((s, i) => {
                  const on = i === active
                  return (
                    <li key={s.title} className="border-b border-dasza-line">
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on ? 'step' : undefined}
                        className="w-full text-left py-4 xl:py-5 [@media(max-height:800px)]:py-3 grid grid-cols-[2.5rem_1fr] gap-x-3 group"
                      >
                        <span className={`font-display text-lg tabular-nums transition-colors ${on ? 'text-dasza-cyan600' : 'text-dasza-gray'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>
                          <span className={`block font-display text-xl md:text-2xl [@media(max-height:800px)]:text-xl font-semibold transition-colors ${on ? 'text-dasza-ink' : 'text-dasza-navy/60 group-hover:text-dasza-ink'}`}>
                            {s.title}
                          </span>
                          <span className={`grid transition-[grid-template-rows,opacity] duration-300 ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <span className="overflow-hidden">
                              <span className="block pt-2 text-dasza-navy leading-relaxed max-w-md">{s.text}</span>
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="lg:col-span-7">
              <div className="relative h-[52vh] [@media(max-height:800px)]:h-[46vh] overflow-hidden rounded-lg bg-dasza-paper">
                {photos('(min-width: 1024px) 55vw, 100vw')}
                <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between gap-4 bg-gradient-to-t from-dasza-ink/70 to-transparent">
                  <span className="px-3 py-1.5 rounded bg-dasza-ink/85 text-white text-sm">{step.place}</span>
                  <span className="flex gap-1.5" aria-hidden>
                    {steps.map((_, i) => (
                      <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-dasza-cyan' : 'w-3 bg-white/50'}`} />
                    ))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
