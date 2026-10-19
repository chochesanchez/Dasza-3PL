import type { NextConfig } from "next";
import path from "path";

const isDev = process.env.NODE_ENV !== 'production'

function buildSecurityHeaders() {
  const scriptSrc = [
    "'self'",
    "'unsafe-inline'",
    'https://www.googletagmanager.com',
  ]
  if (isDev) {
    // Allow eval in development for tooling like Next dev/React refresh
    scriptSrc.push("'unsafe-eval'")
  }

  return [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    {
      key: 'Content-Security-Policy',
      value: [
        "default-src 'self'",
        "img-src 'self' https: data:",
        `script-src ${scriptSrc.join(' ')}`,
        "style-src 'self' 'unsafe-inline'",
        // Google Analytics 4 beacons (only loaded when NEXT_PUBLIC_GA_MEASUREMENT_ID is set)
        "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
        'frame-src https://www.google.com',
      ].join('; '),
    },
  ]
}

const nextConfig: NextConfig = {
  headers: async () => [
    {
      source: '/:path*',
      headers: buildSecurityHeaders(),
    },
    {
      // Vercel preview and *.vercel.app URLs serve the same pages; keep them out of search results.
      source: '/:path*',
      missing: [{ type: 'host', value: '(www\\.)?dasza\\.com' }],
      headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
    },
    {
      // Media file names are not hashed, so cache for a week and revalidate in the background.
      source: '/:dir(videos|images)/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
    },
  ],
  // Silence incorrect workspace root inference (multiple lockfiles on machine)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
