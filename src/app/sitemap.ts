import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { SERVICES } from '@/content/site'
import { localePath } from '@/i18n/config'

const PATHS = ['/', '/about', '/services', ...SERVICES.map((s) => `/services/${s.slug}`), '/dasza-system', '/quote', '/contact', '/news']

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.map((p) => ({
    url: `${SITE_URL}${localePath('en', p) === '/' ? '' : localePath('en', p)}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${SITE_URL}${localePath('en', p) === '/' ? '' : localePath('en', p)}`,
        es: `${SITE_URL}${localePath('es', p)}`,
      },
    },
  }))
}
