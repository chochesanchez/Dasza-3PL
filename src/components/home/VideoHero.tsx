'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

type Sources = { mp4: string; webm: string }

// Full-screen looping video that stays pinned under the header while the page content
// (rendered after this component, with a higher z-index) slides up over it.
export default function VideoHero({
  desktop,
  mobile,
  poster,
  label,
  children,
}: {
  desktop: Sources
  mobile: Sources
  poster: string
  label: string
  children: React.ReactNode
}) {
  const video = useRef<HTMLVideoElement | null>(null)
  const frame = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()

  // Hero text fades and drifts up as the content layer covers it.
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 420], [1, 0])
  const y = useTransform(scrollY, [0, 420], [0, -60])

  // Playback starts here (not via autoPlay) so reduced-motion visitors never see it move.
  // Reduced motion: keep the poster frame. Otherwise play, and pause once the video is fully covered.
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (reduce) {
      v.pause()
      return
    }
    const onScroll = () => {
      const covered = window.scrollY > (frame.current?.offsetHeight ?? window.innerHeight) * 1.1
      if (covered && !v.paused) v.pause()
      else if (!covered && v.paused) v.play().catch(() => {})
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduce])

  return (
    <div ref={frame} className="sticky top-(--nav-offset) transition-[top] duration-300 ease-out motion-reduce:transition-none z-0 h-[calc(100svh-4rem)] md:h-[calc(100svh-72px)] overflow-hidden bg-dasza-ink">
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={label}
      >
        <source src={mobile.webm} type="video/webm" media="(max-width: 767px)" />
        <source src={mobile.mp4} type="video/mp4" media="(max-width: 767px)" />
        <source src={desktop.webm} type="video/webm" />
        <source src={desktop.mp4} type="video/mp4" />
      </video>
      {/* Light tint; the bottom gradient keeps the headline readable while the ship stays visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-dasza-ink/80 via-dasza-ink/10 to-transparent" aria-hidden />
      <motion.div style={reduce ? undefined : { opacity, y }} className="relative h-full mx-auto max-w-7xl px-5 sm:px-8 flex flex-col justify-end pb-14 md:pb-20 text-white">
        {children}
      </motion.div>
    </div>
  )
}
