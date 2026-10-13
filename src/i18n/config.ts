// English is the default and lives at the root ("/about"); Spanish lives under "/es" ("/es/about").
export const LOCALES = ['en', 'es'] as const
export type Lang = (typeof LOCALES)[number]
export const DEFAULT_LANG: Lang = 'en'

export const isLang = (v: string | undefined): v is Lang => !!v && (LOCALES as readonly string[]).includes(v)

/** Public URL for a path in a language. `path` is always the English path, e.g. "/services/vmi". */
export function localePath(lang: Lang, path: string) {
  const clean = path.startsWith('/') ? path : `/${path}`
  if (lang === DEFAULT_LANG) return clean
  return clean === '/' ? '/es' : `/es${clean}`
}

/** Strips the "/es" prefix from a visible pathname to get the English path. */
export function basePath(pathname: string) {
  if (pathname === '/es') return '/'
  if (pathname.startsWith('/es/')) return pathname.slice(3)
  return pathname || '/'
}

/** Metadata alternates (canonical + hreflang) for a page. */
export function alternatesFor(lang: Lang, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: { en: localePath('en', path), es: localePath('es', path), 'x-default': localePath('en', path) },
  }
}
