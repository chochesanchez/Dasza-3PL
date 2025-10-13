import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  return [
    '',
    '/about',
    '/services',
    '/services/last-mile',
    '/services/storage',
    '/services/retail',
    '/services/fulfillment',
    '/quote',
    '/contact',
    '/news',
  ].map((p) => ({ url: `${base}${p}`, lastModified: new Date() }))
}
