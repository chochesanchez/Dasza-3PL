// Canonical public URL of the site. NEXT_PUBLIC_APP_URL may override it (e.g. a staging domain),
// but a localhost value is ignored so production never advertises http://localhost URLs.
const envUrl = process.env.NEXT_PUBLIC_APP_URL
export const SITE_URL = (envUrl && !envUrl.includes('localhost') ? envUrl : 'https://www.dasza.com').replace(/\/$/, '')
