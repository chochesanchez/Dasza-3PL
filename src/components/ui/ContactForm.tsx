'use client'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { PHONE_COUNTRIES, WHATSAPP_NUMBER } from '@/lib/phoneCountries'

const SOLUTIONS = [
  'Warehousing',
  'IMMEX / Shelter',
  'VMI',
  'Customs',
  'Transportation',
  'Last mile',
  'Fulfillment',
  'Other',
] as const

const inputCls =
  'mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan'

export default function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [failedMessage, setFailedMessage] = useState<string | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const toggle = (opt: string) => setSelected((s) => (s.includes(opt) ? s.filter((x) => x !== opt) : [...s, opt]))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('website')) return // honeypot
    const country = PHONE_COUNTRIES.find((c) => c.code === fd.get('phoneCountry')) ?? PHONE_COUNTRIES[0]
    const phone = `${country.dial} ${String(fd.get('phone') || '').trim()}`.trim()
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const company = String(fd.get('company') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const payload = {
      contact: { name, email, phone, company, phoneCountry: country.label },
      interests: selected,
      comments: message || undefined,
    }

    setLoading(true)
    setFailedMessage(null)
    let sent = false
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      sent = res.ok
    } catch {
      sent = false
    }
    setLoading(false)

    if (sent) {
      setOk(true)
      setSelected([])
      form.reset()
    } else {
      // Keep the form filled and give the visitor a one-click way to still reach us.
      setFailedMessage(
        [
          `Hello Dasza 3PL, I'm ${name}${company ? ` from ${company}` : ''}.`,
          selected.length ? `Interested in: ${selected.join(', ')}.` : '',
          message,
          `Email: ${email} · Phone: ${phone}`,
        ].filter(Boolean).join('\n'),
      )
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 rounded-2xl border border-dasza-gray/30 bg-white p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <label className="text-sm text-dasza-navy/80">Full name*
            <input name="name" autoComplete="name" placeholder="Your name" required minLength={2} className={inputCls} />
          </label>
          <label className="text-sm text-dasza-navy/80">Email*
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required className={inputCls} />
          </label>
          <div className="text-sm text-dasza-navy/80">
            <label htmlFor="contact-phone">Phone*</label>
            <div className="mt-1 flex gap-2">
              <select name="phoneCountry" aria-label="Country code" defaultValue="MX" className="h-11 border rounded-xl px-2 bg-white focus:outline-none focus:ring-2 focus:ring-dasza-cyan">
                {PHONE_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code === 'OTHER' ? 'Other' : `${c.code} ${c.dial}`}</option>
                ))}
              </select>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel-national" placeholder="81 1234 5678" required minLength={7} className="flex-1 min-w-0 border p-3 rounded-xl h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </div>
          </div>
          <label className="text-sm text-dasza-navy/80">Company
            <input name="company" autoComplete="organization" placeholder="Company" className={inputCls} />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm text-dasza-navy/80">What do you need?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOLUTIONS.map((opt) => {
              const on = selected.includes(opt)
              return (
                <button
                  type="button"
                  key={opt}
                  aria-pressed={on}
                  onClick={() => toggle(opt)}
                  className={`px-3 py-1.5 rounded-full border text-sm transition-colors ${on ? 'bg-dasza-navy border-dasza-navy text-white' : 'border-dasza-gray/60 text-dasza-navy hover:border-dasza-navy'}`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </fieldset>

        <label className="block text-sm text-dasza-navy/80">Message (optional)
          <textarea name="message" rows={3} placeholder="Tell us briefly about your operation" className="mt-1 border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
        </label>

        {/* Honeypot — hidden from people, filled by bots */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

        {failedMessage && (
          <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-medium">We couldn’t send your message right now.</p>
            <p className="mt-1">Your details are still here. Send them to us directly so we don’t miss you:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(failedMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-[#25D366] text-dasza-charcoal font-medium hover:brightness-95"
              >
                Send via WhatsApp
              </a>
              <a
                href={`mailto:jmsanchez@dasza.com?subject=${encodeURIComponent('Contact request')}&body=${encodeURIComponent(failedMessage)}`}
                className="px-4 py-2 rounded-full border border-red-300 text-red-800 hover:bg-red-100"
              >
                Send by email
              </a>
            </div>
          </div>
        )}

        <div className="text-center mt-2">
          <button disabled={loading} className="px-8 py-3 rounded-full bg-dasza-navy text-white hover:bg-dasza-charcoal disabled:opacity-60">
            {loading ? 'Sending…' : 'Send'}
          </button>
        </div>
      </div>
      <aside className="rounded-2xl border border-dasza-gray/30 bg-white p-6 shadow-sm text-sm">
        <div className="text-lg font-semibold text-dasza-navy">Get in Touch</div>
        <p className="mt-2 text-dasza-navy/80">We usually respond within one business day.</p>
        <div className="mt-4 space-y-6 text-dasza-navy/80">
          <div className="flex items-start gap-3">
            <MapPinIcon className="h-7 w-7 text-dasza-cyan flex-none" />
            <div>
              <div className="font-medium text-dasza-navy">Address</div>
              <div>GDS Business Park, Av. Miguel Alemán 762, El Milagro, 66634 Cdad. Apodaca, N.L.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <PhoneIcon className="h-7 w-7 text-dasza-cyan flex-none" />
            <div>
              <div className="font-medium text-dasza-navy">Phone</div>
              <a href="tel:+528119161086" className="hover:text-dasza-cyan">+52 811916 1086</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <EnvelopeIcon className="h-7 w-7 text-dasza-cyan flex-none" />
            <div>
              <div className="font-medium text-dasza-navy">Email</div>
              <a href="mailto:jmsanchez@dasza.com" className="hover:text-dasza-cyan">jmsanchez@dasza.com</a>
            </div>
          </div>
          <a href="https://www.google.com/maps/place/GDS+Business+Park/@25.7595496,-100.1962086,967m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8662eb930eb5389b:0xa6c6f4ff0b1622c8!8m2!3d25.7595496!4d-100.1962086!16s%2Fg%2F11c424kch_?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-lg border border-dasza-cyan text-dasza-cyan hover:bg-dasza-cyan hover:text-white">Open in Google Maps</a>
        </div>
      </aside>
      <Modal open={ok} onClose={() => setOk(false)} title="Message sent" status="success">
        Thank you! Our team will contact you within one business day.
      </Modal>
    </form>
  )
}
