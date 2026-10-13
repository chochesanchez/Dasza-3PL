'use client'
import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Counts from 0 to the number inside `value` when it scrolls into view, keeping any prefix/suffix
// and thousands separators ("240,000", "17+", "97.9%", "4.8/5").
export default function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const match = value.match(/^(\D*)([\d,]*\.?\d+)(.*)$/)
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value)

  useEffect(() => {
    if (!match) return
    if (reduce) {
      setDisplay(value)
      return
    }
    if (!inView) return
    const [, prefix, num, suffix] = match
    const target = parseFloat(num.replace(/,/g, ''))
    const decimals = num.includes('.') ? num.split('.')[1].length : 0
    const useCommas = num.includes(',')
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = useCommas ? Math.round(v).toLocaleString('en-US') : v.toFixed(decimals)
        setDisplay(`${prefix}${n}${suffix}`)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value])

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{display}</span>
    </span>
  )
}
