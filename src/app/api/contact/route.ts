import { NextRequest, NextResponse } from 'next/server'
import { quoteSchema } from '@/lib/zod'
import { sendQuoteEmail } from '@/lib/mail'
import { locationFromHeaders } from '@/lib/geo'
import { checkSubmission, clientIp, createRateLimit } from '@/lib/spam'

const rateLimit = createRateLimit(10)

export async function POST(req: NextRequest) {
  if (!rateLimit(clientIp(req.headers))) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  try {
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }
    const check = checkSubmission(body)
    // Bots get a quiet success so they don't retry.
    if (check === 'bot') return NextResponse.json({ ok: true })
    if (check === 'invalid') return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    const parsed = quoteSchema.safeParse(body)
    if (!parsed.success) {
      console.error('Contact/quote validation failed:', parsed.error.flatten())
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }
    // Approximate location from the visitor's IP (set by Vercel), never from the client.
    parsed.data.contact.location = locationFromHeaders(req.headers)
    await sendQuoteEmail(parsed.data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact/quote submission failed:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
