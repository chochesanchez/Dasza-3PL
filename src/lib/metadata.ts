import type { Metadata } from 'next'
import { alternatesFor, localePath, type Lang } from '@/i18n/config'

const SITE_NAME = 'Dasza 3PL'
const DEFAULT_IMAGE = { url: '/images/site/dasza-warehouse.jpg', width: 1920, height: 1080 }

/**
 * Title, description, canonical/hreflang and a complete Open Graph block for a page.
 * A page's `openGraph` replaces the layout's instead of merging, so every page builds the full set here.
 */
export function pageMetadata(lang: Lang, path: string, { title, description, image }: { title?: string; description?: string; image?: string }): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: alternatesFor(lang, path),
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: lang === 'es' ? 'es_MX' : 'en_US',
      url: localePath(lang, path),
      title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
      description,
      images: [image ? { url: image } : DEFAULT_IMAGE],
    },
  }
}
