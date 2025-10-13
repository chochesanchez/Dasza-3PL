'use client'
import { useEffect, useState } from 'react'

type Item = { href: string; label: string }

export default function StickySubnav({ items }: { items: Item[] }) {
  const [active, setActive] = useState<string>(items[0]?.href || '')

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] }
    )
    items.forEach((i) => {
      const el = document.querySelector(i.href)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [items])

  return (
    <div className="sticky top-[56px] z-40 bg-white/90 backdrop-blur border-b border-dasza-gray/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 overflow-x-auto">
        <nav className="flex gap-4 sm:gap-6 py-3 text-sm">
          {items.map((i) => (
            <a
              key={i.href}
              href={i.href}
              className={`whitespace-nowrap pb-2 border-b-2 ${active === i.href ? 'border-dasza-cyan text-dasza-cyan' : 'border-transparent text-dasza-navy/70 hover:text-dasza-navy'}`}
            >
              {i.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}


