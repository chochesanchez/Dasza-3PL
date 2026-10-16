'use client'
import Image from 'next/image'
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PROCESS_IMAGES } from '@/content/site'
import { useI18n } from '@/i18n/I18nProvider'

const HEADER = 72
// Scroll distance per step while pinned: one mouse-wheel notch (100px) moves one step.
const STEP_PX = 100

// Desktop: the section pins while you scroll; every STEP_PX of normal scrolling advances one step.
// Scrolling is never intercepted. Tapping a step scrolls to it.
// Phones / reduced motion: a plain list you tap to open each step.
export default function ProcessSteps() {
  const { t } = useI18n()
  const steps = t.process
  const N = steps.length
  const outer = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const activeRef = useRef(0)
  const [pinned, setPinned] = useState(false)
  const reduce = useReducedMotion()

  const setStep = useCallback((i: number) => {
    activeRef.current = i
    setActive(i)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setPinned(mq.matches && !reduce)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [reduce])

  const { scrollYProgress } = useScroll({ target: outer, offset: [`start ${HEADER}px`, 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    if (!pinned) return
    const i = Math.min(N - 1, Math.max(0, Math.floor(p * N)))
    if (i !== activeRef.current) setStep(i)
  })

  const scrollToStep = useCallback((i: number) => {
    const el = outer.current
    if (!el) return
    const pinStart = el.getBoundingClientRect().top + window.scrollY - HEADER
    window.scrollTo({ top: pinStart + i * STEP_PX + STEP_PX / 2, behavior: 'smooth' })
  }, [])

  const goTo = (i: number) => {
    setStep(i)
    if (pinned) scrollToStep(i)
  }

  const step = steps[active]

  return (
    <div ref={outer} className="relative" style={pinned ? { height: `calc(100vh - ${HEADER}px + ${N * STEP_PX}px)` } : undefined}>
      <div className={pinned ? 'sticky top-[72px] h-[calc(100vh-72px)] flex flex-col justify-center' : ''}>
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl mb-8 lg:mb-10">
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">{t.home.howTitle}</h2>
            <p className="mt-4 text-lg text-dasza-navy leading-relaxed">{t.home.howText}</p>
          </div>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 relative">
              {pinned && (
                <div className="absolute -left-4 top-0 bottom-0 w-[3px] bg-dasza-line rounded-full overflow-hidden" aria-hidden>
                  <motion.div className="w-full h-full bg-dasza-cyan origin-top" style={{ scaleY: progress }} />
                </div>
              )}
              <ol className="border-t border-dasza-line">
                {steps.map((s, i) => {
                  const on = i === active
                  return (
                    <li key={s.title} className="border-b border-dasza-line">
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={on ? 'step' : undefined}
                        className="w-full text-left py-4 xl:py-5 grid grid-cols-[2.5rem_1fr] gap-x-3 group"
                      >
                        <span className={`font-display text-lg tabular-nums transition-colors ${on ? 'text-dasza-cyan600' : 'text-dasza-gray'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>
                          <span className={`block font-display text-xl md:text-2xl font-semibold transition-colors ${on ? 'text-dasza-ink' : 'text-dasza-navy/60 group-hover:text-dasza-ink'}`}>
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
              <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[52vh] overflow-hidden rounded-lg bg-dasza-paper">
                {PROCESS_IMAGES.map((src, i) => (
                  <motion.div
                    key={src}
                    className="absolute inset-0"
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.05 }}
                    transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image src={src} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                  </motion.div>
                ))}
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
