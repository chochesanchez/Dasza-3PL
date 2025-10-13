/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { quoteSchema } from '@/lib/zod'
import { supabase } from '@/lib/supabaseClient'
import { sendQuoteEmail } from '@/lib/mail'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 10
const ipHits = new Map<string, { count: number; ts: number }>()

function rateLimit(ip: string): boolean {
  const now = Date.now()
  const rec = ipHits.get(ip)
  if (!rec || now - rec.ts > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, ts: now })
    return true
  }
  if (rec.count >= RATE_LIMIT_MAX) return false
  rec.count += 1
  return true
}

async function verifyRecaptcha(token?: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET
  if (!secret || !token) return true
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = (await res.json()) as { success?: boolean; score?: number }
    return Boolean(data.success && (data.score ?? 0) >= 0.3)
  } catch {
    return false
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  try {
    const body = await req.json()
    const captchaOk = await verifyRecaptcha(body?.captchaToken)
    if (!captchaOk) return NextResponse.json({ error: 'reCAPTCHA failed' }, { status: 400 })
    const parsed = quoteSchema.safeParse(body)
    if (!parsed.success) {
      const issues = parsed.error.flatten()
      console.error('Quote validation failed, sending anyway:', issues)
      // Send email with raw body so submissions are not blocked
      await sendQuoteEmail(body as any)
      return NextResponse.json({ ok: true, validation: issues })
    }
    const { contact, product, trade, service, options, comments } = parsed.data

    // Best-effort: insert to Supabase if configured, but don't block email on failure
    let inserted: any = null
    try {
      const { data: sb, error: sbError } = await supabase
        .from('quotes')
        .insert({
          name: contact.name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          address: contact.address,
          product_type: product.type,
          quantity: product.quantity,
          volume: product.volume,
          weight: product.weight,
          photo_url: (product as any).photoUrl,
          hs_code: trade.hsCode,
          origin: trade.origin,
          incoterm: trade.incoterm,
          port: (trade as any).port,
          frequency: service?.frequency,
          destinations: service?.destinations,
          storage_required: service?.storageRequired ?? false,
          conditions: service?.conditions ?? [],
          timing: service?.timing,
          options: Object.entries(options ?? {})
            .filter(([, v]) => Boolean(v))
            .map(([k]) => k),
          comments,
        })
        .select()
      if (!sbError) inserted = sb?.[0]
    } catch {}
    await sendQuoteEmail(inserted ?? parsed.data)
    return NextResponse.json({ ok: true, id: inserted?.id })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}


