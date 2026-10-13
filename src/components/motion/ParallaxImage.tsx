'use client'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// Image that drifts slightly slower than the page while it scrolls past.
export default function ParallaxImage({ src, alt, sizes, className = '' }: { src: string; alt: string; sizes: string; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y }}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  )
}
