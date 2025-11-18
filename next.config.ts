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
  ],
  // Silence incorrect workspace root inference (multiple lockfiles on machine)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
