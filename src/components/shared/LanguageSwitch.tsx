'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { GlobeAltIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'
import { basePath, localePath, LOCALES, type Lang } from '@/i18n/config'
import { useI18n } from '@/i18n/I18nProvider'

const NAMES: Record<Lang, string> = { en: 'English', es: 'Español' }

// Globe button that opens a small English / Español menu. `up` opens it above the button (footer).
export default function LanguageSwitch({ tone = 'light', up = false }: { tone?: 'light' | 'dark'; up?: boolean }) {
  const { lang, t } = useI18n()
  const path = basePath(usePathname() || '/')
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement | null>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const dark = tone === 'dark'
  return (
    <div ref={root} className="relative">
      <button
        type="button"
        aria-label={`${t.nav.language}: ${NAMES[lang]}`}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 h-10 px-2 -mx-2 rounded-md text-[13px] font-semibold uppercase transition-colors ${
          dark ? 'text-white/80 hover:text-white' : 'text-dasza-navy hover:text-dasza-ink'
        }`}
      >
        <GlobeAltIcon className="h-5 w-5" aria-hidden />
        {lang}
      </button>
      {open && (
        <ul
          id={menuId}
          className={`absolute z-50 min-w-[10rem] rounded-md border border-dasza-line bg-white py-1.5 text-[15px] text-dasza-ink shadow-lg ${
            up ? 'bottom-full mb-2 left-0' : 'top-full mt-2 right-0'
          }`}
        >
          {LOCALES.map((l) => (
            <li key={l}>
              <Link
                href={localePath(l, path)}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? 'true' : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between gap-4 px-3.5 py-2.5 hover:bg-dasza-paper"
              >
                {NAMES[l]}
                {l === lang && <CheckIcon className="h-4 w-4 text-dasza-cyan600" aria-hidden />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
