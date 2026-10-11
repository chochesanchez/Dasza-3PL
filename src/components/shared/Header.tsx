'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const NAV = [
  { href: '/services', label: 'Services' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/dasza-system', label: 'Dasza System' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const isActive = (href: string) => !href.includes('#') && (href === '/' ? pathname === '/' : pathname?.startsWith(href))

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_1px_0_var(--color-dasza-line)]' : ''}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Dasza 3PL home">
          <Image src="/images/Dasza Logistics Logo 2.png" alt="" width={30} height={30} priority />
          <span className="font-display text-[19px] text-dasza-ink">
            Dasza <span className="font-bold text-dasza-cyan600">3PL</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-8 text-[15px]">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`py-2 border-b-2 transition-colors ${
                isActive(item.href) ? 'border-dasza-cyan text-dasza-ink' : 'border-transparent text-dasza-navy hover:text-dasza-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/quote"
            className="hidden sm:inline-flex items-center h-10 px-5 rounded-md bg-dasza-cyan text-dasza-ink font-semibold text-[15px] hover:bg-dasza-cyan600 transition-colors"
          >
            Get a quote
          </Link>
          <button
            className="lg:hidden grid place-items-center h-10 w-10 -mr-2 text-dasza-ink"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-white overflow-y-auto"
      >
        <nav aria-label="Mobile" className="px-5 py-6 flex flex-col">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="font-display text-2xl py-4 border-b border-dasza-line text-dasza-ink">
              {item.label}
            </Link>
          ))}
          <Link href="/quote" className="mt-8 inline-flex justify-center items-center h-12 rounded-md bg-dasza-cyan text-dasza-ink font-semibold">
            Get a quote
          </Link>
        </nav>
      </div>
    </header>
  )
}
