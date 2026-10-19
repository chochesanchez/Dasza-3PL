'use client'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { PauseIcon, PlayIcon } from '@heroicons/react/24/solid'

// AV1 is the smallest; browsers without it fall back to VP9 (webm), then H.264 (mp4).
type Sources = { av1: string; webm: string; mp4: string }

// Full-screen looping video that stays pinned under the header while the page content
// (rendered after this component, with a higher z-index) slides up over it.
export default function VideoHero({
  desktop,
  mobile,
  poster,
  label,
  pauseLabel,
  playLabel,
  children,
}: {
  desktop: Sources
  mobile: Sources
  poster: string
  label: string
  pauseLabel: string
  playLabel: string
  children: React.ReactNode
}) {
  const video = useRef<HTMLVideoElement | null>(null)
  const frame = useRef<HTMLDivElement | null>(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  // The video starts downloading only after the page has loaded; the poster covers the wait.
  const [ready, setReady] = useState(false)
  // Set once the visitor uses the pause button; scrolling then never restarts the video.
  const stopped = useRef(false)

  // Hero text fades and drifts up as the content layer covers it.
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 420], [1, 0])
  const y = useTransform(scrollY, [0, 420], [0, -60])

  useEffect(() => {
    if (reduce) return
    const start = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
      else setTimeout(() => setReady(true), 200)
    }
    if (document.readyState === 'complete') return start()
    window.addEventListener('load', start, { once: true })
    return () => window.removeEventListener('load', start)
  }, [reduce])

  // Playback starts here (not via autoPlay) so reduced-motion visitors never see it move.
  // Reduced motion: keep the poster frame. Otherwise play, and pause once the video is fully covered.
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (reduce) {
      v.pause()
      return
    }
    if (!ready) return
    const onScroll = () => {
      if (stopped.current) return
      const covered = window.scrollY > (frame.current?.offsetHeight ?? window.innerHeight) * 1.1
      if (covered && !v.paused) v.pause()
      else if (!covered && v.paused) v.play().catch(() => {})
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [reduce, ready])

  // WCAG 2.2.2: anything that moves for more than five seconds needs a way to stop it.
  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) {
      stopped.current = false
      v.play().catch(() => {})
    } else {
      stopped.current = true
      v.pause()
    }
  }

  return (
    <div ref={frame} className="sticky top-(--nav-offset) transition-[top] duration-300 ease-out motion-reduce:transition-none z-0 h-[calc(100svh-4rem)] md:h-[calc(100svh-72px)] overflow-hidden bg-dasza-ink">
      <video
        ref={video}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={mobile.av1} type='video/mp4; codecs="av01.0.05M.08"' media="(max-width: 767px)" />
        <source src={mobile.webm} type='video/webm; codecs="vp9"' media="(max-width: 767px)" />
        <source src={mobile.mp4} type="video/mp4" media="(max-width: 767px)" />
        <source src={desktop.av1} type='video/mp4; codecs="av01.0.08M.08"' />
        <source src={desktop.webm} type='video/webm; codecs="vp9"' />
        <source src={desktop.mp4} type="video/mp4" />
      </video>
      {/* Light tint; the bottom gradient keeps the headline readable while the ship stays visible */}
      <div className="absolute inset-0 bg-gradient-to-t from-dasza-ink/80 via-dasza-ink/10 to-transparent" aria-hidden />
      <motion.div style={reduce ? undefined : { opacity, y }} className="relative h-full mx-auto max-w-7xl px-5 sm:px-8 flex flex-col justify-end pb-14 md:pb-20 text-white">
        {children}
      </motion.div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute top-4 right-4 md:top-6 md:right-6 grid h-10 w-10 place-items-center rounded-full bg-dasza-ink/60 text-white backdrop-blur-sm hover:bg-dasza-ink/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-dasza-cyan"
      >
        {playing ? <PauseIcon className="h-5 w-5" aria-hidden /> : <PlayIcon className="h-5 w-5" aria-hidden />}
      </button>
    </div>
  )
}
