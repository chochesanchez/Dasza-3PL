import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { MATERIALS } from '@/components/dasza-system/demoData'

// Lead capture for the Dasza System interactive demo (/dasza-system).
// Sends one notification email; never blocks the visitor from seeing the demo.

const materialIds = MATERIALS.map((m) => m.id) as [string, ...string[]]

const leadSchema = z.object({
  name: z.string().trim().min(2).max(120),
  company: z.string().trim().max(160).optional().default(''),
  email: z.email().max(200),
  phone: z.string().trim().min(7).max(40),
  materials: z.array(z.enum(materialIds)).max(materialIds.length).default([]),
  otherMaterial: z.string().trim().max(200).optional().default(''),
  palletsPerMonth: z.string().trim().max(40).optional().default(''),
  website: z.string().optional(), // honeypot
})

const hits = new Map<string, { count: number; ts: number }>()
function rateLimit(ip: string, limit = 5, windowMs = 60_000) {
  const now = Date.now()
  const rec = hits.get(ip)
  if (!rec || now - rec.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now })
    return true
  }
  rec.count += 1
  return rec.count <= limit
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string)
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(ip)) return NextResponse.json({ error: 'Too many requests' }, { status: 429 })

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  const lead = parsed.data

  // Bots fill the hidden field; pretend success so they don't retry.
  if (lead.website) return NextResponse.json({ ok: true })

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[demo-lead] RESEND_API_KEY not set; lead not emailed:', lead.email)
    return NextResponse.json({ ok: false, error: 'Email not configured' }, { status: 503 })
  }

  const materialLabels = lead.materials.map((id) => MATERIALS.find((m) => m.id === id)?.label ?? id)
  if (lead.otherMaterial) materialLabels.push(`Other: ${lead.otherMaterial}`)

  const rows: [string, string][] = [
    ['Name', lead.name],
    ['Company', lead.company || '—'],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Materials', materialLabels.join(', ') || '—'],
    ['Pallets / month (est.)', lead.palletsPerMonth || '—'],
  ]
  const text = ['New Dasza System demo lead', '', ...rows.map(([k, v]) => `${k}: ${v}`)].join('\n')
  const html = `
    <div style="font-family:Arial,sans-serif;color:#161517">
      <h2 style="color:#3E526C;margin:0 0 12px">New Dasza System demo lead</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${rows.map(([k, v]) => `<tr><td style="color:#6b7280">${escapeHtml(k)}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join('')}
      </table>
      <p style="color:#6b7280;font-size:12px;margin-top:16px">The visitor is now viewing the interactive demo with sample data.</p>
    </div>`

  const resend = new Resend(apiKey)
  const fromAddress = process.env.RESEND_FROM || 'forms@dasza.com'
  const to = (process.env.DEMO_LEADS_TO || 'jmsanchez@dasza.com').split(',').map((s) => s.trim()).filter(Boolean)
  const { error } = await resend.emails.send({
    from: `Dasza 3PL <${fromAddress}>`,
    to,
    subject: `Dasza System demo — ${lead.company || lead.name}`,
    text,
    html,
    replyTo: lead.email,
  })
  if (error) {
    console.error('[demo-lead] Resend error:', error)
    return NextResponse.json({ ok: false, error: 'Email failed' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
