import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '',
    '/about',
    '/services',
    '/services/warehousing',
    '/services/vmi',
    '/services/logistics',
    '/services/customs',
    '/services/sorting',
    '/services/door-to-door',
    '/services/last-mile',
    '/services/storage',
    '/services/retail',
    '/services/fulfillment',
    '/quote',
    '/contact',
    '/news',
  ].map((p) => ({ url: `${SITE_URL}${p}`, lastModified: new Date() }))
}
