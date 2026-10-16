'use client'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useI18n } from '@/i18n/I18nProvider'
import { basePath } from '@/i18n/config'
import LanguageSwitch from './LanguageSwitch'

export default function Header() {
  const { t, href } = useI18n()
  const pathname = usePathname() || '/'
  const current = basePath(pathname)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const NAV = [
    { path: '/services', label: t.nav.services },
    { path: '/#how-it-works', label: t.nav.how },
    { path: '/dasza-system', label: t.nav.system },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    if (open) document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const isActive = (p: string) => !p.includes('#') && current.startsWith(p)

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow ${scrolled ? 'shadow-[0_1px_0_var(--color-dasza-line)]' : ''}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-6">
        <Link href={href('/')} className="flex items-center gap-2.5 shrink-0" aria-label={t.nav.home}>
          <Image src="/images/Dasza Logistics Logo 2.png" alt="" width={30} height={30} priority />
          <span className="font-display text-[19px] text-dasza-ink">
            Dasza <span className="font-bold text-dasza-cyan600">3PL</span>
          </span>
        </Link>

        <nav aria-label={t.nav.main} className="hidden lg:flex items-center gap-7 text-[15px]">
          {NAV.map((item) => (
            <Link
              key={item.path}
              href={href(item.path)}
              aria-current={isActive(item.path) ? 'page' : undefined}
              className={`py-2 border-b-2 transition-colors ${
                isActive(item.path) ? 'border-dasza-cyan text-dasza-ink' : 'border-transparent text-dasza-navy hover:text-dasza-ink'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block"><LanguageSwitch /></div>
          <Link
            href={href('/quote')}
            className="hidden sm:inline-flex items-center h-10 px-5 rounded-md bg-dasza-cyan text-dasza-ink font-semibold text-[15px] hover:bg-dasza-cyan600 transition-colors"
          >
            {t.nav.quote}
          </Link>
          <button
            className="lg:hidden grid place-items-center h-10 w-10 -mr-2 text-dasza-ink"
            aria-label={open ? t.nav.close : t.nav.open}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile menu: drops down only as tall as its content; tapping the dimmed page closes it */}
      {open && <div className="lg:hidden fixed inset-x-0 top-16 md:top-[72px] bottom-0 bg-dasza-ink/30" onClick={() => setOpen(false)} aria-hidden />}
      <div id="mobile-menu" hidden={!open} className="lg:hidden absolute inset-x-0 top-full bg-white rounded-b-xl shadow-[0_16px_32px_-12px_rgba(0,0,0,0.3)] border-t border-dasza-line">
        <nav aria-label={t.nav.mobile} className="px-5 pt-2 pb-5 flex flex-col">
          {NAV.map((item) => (
            <Link key={item.path} href={href(item.path)} onClick={() => setOpen(false)} className="font-display text-xl py-3 border-b border-dasza-line text-dasza-ink">
              {item.label}
            </Link>
          ))}
          <div className="mt-5 flex items-center justify-between gap-4">
            <LanguageSwitch up />
            <Link href={href('/quote')} onClick={() => setOpen(false)} className="flex-1 inline-flex justify-center items-center h-12 rounded-md bg-dasza-cyan text-dasza-ink font-semibold">
              {t.nav.quote}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
