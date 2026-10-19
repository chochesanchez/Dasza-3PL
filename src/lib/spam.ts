// Server-side bot filtering shared by the form routes.
// Forms send a hidden `website` field (people leave it empty) and `startedAt`, the time the form was shown.

const MIN_FILL_MS = 2_000

export type BotCheck = 'ok' | 'bot' | 'invalid'

export function checkSubmission(body: unknown): BotCheck {
  if (typeof body !== 'object' || body === null) return 'invalid'
  const { website, startedAt } = body as { website?: unknown; startedAt?: unknown }
  if (typeof website === 'string' && website.trim()) return 'bot'
  if (typeof startedAt !== 'number' || !Number.isFinite(startedAt)) return 'invalid'
  // Faster than a person can fill the form (also catches timestamps from the future).
  if (Date.now() - startedAt < MIN_FILL_MS) return 'bot'
  return 'ok'
}

// Best-effort per-instance limit; the durable limit is a Vercel WAF rule on /api/*.
export function createRateLimit(limit: number, windowMs = 60_000) {
  const hits = new Map<string, { count: number; ts: number }>()
  return (ip: string) => {
    const now = Date.now()
    const rec = hits.get(ip)
    if (!rec || now - rec.ts > windowMs) {
      hits.set(ip, { count: 1, ts: now })
      return true
    }
    rec.count += 1
    return rec.count <= limit
  }
}

export function clientIp(headers: Headers) {
  return headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}
