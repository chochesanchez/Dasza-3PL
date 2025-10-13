"use client"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from 'react'

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const lastYRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      if (open) {
        setHidden(false)
        lastYRef.current = y
        return
      }
      const delta = y - lastYRef.current
      if (y < 10) {
        setHidden(false)
      } else if (delta > 5) {
        setHidden(true)
      } else if (delta < -5) {
        setHidden(false)
      }
      lastYRef.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Allow page scrolling even when the mobile menu is open

  return (
    <header className={`sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-dasza-gray/40 transition-transform duration-300 ${hidden ? '-translate-y-full' : ''}`}>
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/Dasza Logistics Logo 2.png" alt="Dasza 3PL" width={32} height={32} />
          <span className="text-dasza-navy text-lg md:text-xl">Dasza <span className="font-extrabold text-dasza-cyan">3PL</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-dasza-navy">
          {[
            { href: '/about', label: 'About us' },
            { href: '/services', label: 'Services' },
            { href: '/quote', label: 'Get Quote' },
          ].map((item) => (
            <Link key={item.href} href={item.href} className="relative hover:text-dasza-cyan after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-dasza-cyan after:transition-all hover:after:w-full">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="px-4 py-2 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600 shadow-md hover:shadow-lg transition">Contact us</Link>
        </nav>
        <button aria-label="Open menu" className="md:hidden text-dasza-navy" onClick={() => setOpen((v) => !v)}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-dasza-gray/40 bg-white/95 backdrop-blur">
          <nav className="mx-auto max-w-7xl px-6 py-4 grid gap-4 text-dasza-navy">
            {[
              { href: '/about', label: 'About us' },
              { href: '/services', label: 'Services' },
              { href: '/quote', label: 'Get Quote' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="py-2" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="mt-2 px-4 py-3 rounded-full bg-dasza-cyan text-white text-center shadow-md hover:shadow-lg transition" onClick={() => setOpen(false)}>
              Contact us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


