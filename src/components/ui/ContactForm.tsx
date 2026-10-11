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
  'mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan'

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
    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 rounded-lg border border-dasza-line bg-white p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <label className="text-sm font-medium text-dasza-ink">Full name*
            <input name="name" autoComplete="name" placeholder="Your name" required minLength={2} className={inputCls} />
          </label>
          <label className="text-sm font-medium text-dasza-ink">Email*
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required className={inputCls} />
          </label>
          <div className="text-sm font-medium text-dasza-ink">
            <label htmlFor="contact-phone">Phone*</label>
            <div className="mt-1 flex gap-2">
              <select name="phoneCountry" aria-label="Country code" defaultValue="MX" className="h-12 border border-dasza-line rounded-md px-2 bg-white focus:outline-none focus:ring-2 focus:ring-dasza-cyan">
                {PHONE_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code === 'OTHER' ? 'Other' : `${c.code} ${c.dial}`}</option>
                ))}
              </select>
              <input id="contact-phone" name="phone" type="tel" autoComplete="tel-national" placeholder="81 1234 5678" required minLength={7} className="flex-1 min-w-0 h-12 px-3.5 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </div>
          </div>
          <label className="text-sm font-medium text-dasza-ink">Company
            <input name="company" autoComplete="organization" placeholder="Company" className={inputCls} />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-medium text-dasza-ink">What do you need?</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {SOLUTIONS.map((opt) => {
              const on = selected.includes(opt)
              return (
                <button
                  type="button"
                  key={opt}
                  aria-pressed={on}
                  onClick={() => toggle(opt)}
                  className={`h-9 px-3.5 rounded-md border text-sm transition-colors ${on ? 'bg-dasza-ink border-dasza-ink text-white' : 'border-dasza-line text-dasza-ink hover:border-dasza-ink'}`}
                >
                  {opt}
                </button>
              )
            })}
          </div>
        </fieldset>

        <label className="block text-sm font-medium text-dasza-ink">Message (optional)
          <textarea name="message" rows={3} placeholder="Tell us briefly about your operation" className="mt-1.5 block w-full px-3.5 py-3 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
        </label>

        {/* Honeypot — hidden from people, filled by bots */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

        {failedMessage && (
          <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-medium">We couldn’t send your message right now.</p>
            <p className="mt-1">Your details are still here. Send them to us directly so we don’t miss you:</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(failedMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-10 px-4 rounded-md bg-[#25D366] text-dasza-charcoal font-medium hover:brightness-95"
              >
                Send via WhatsApp
              </a>
              <a
                href={`mailto:jmsanchez@dasza.com?subject=${encodeURIComponent('Contact request')}&body=${encodeURIComponent(failedMessage)}`}
                className="inline-flex items-center h-10 px-4 rounded-md border border-red-300 text-red-800 hover:bg-red-100"
              >
                Send by email
              </a>
            </div>
          </div>
        )}

        <div className="pt-1">
          <button disabled={loading} className="inline-flex items-center h-12 px-8 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 disabled:opacity-60 transition-colors">
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </div>
      </div>
      <aside className="rounded-lg bg-dasza-ink text-white p-6 sm:p-8 text-sm flex flex-col">
        <h3 className="font-display text-xl font-semibold">Other ways to reach us</h3>
        <dl className="mt-6 space-y-5">
          <div className="flex gap-3">
            <PhoneIcon className="h-5 w-5 mt-0.5 text-dasza-cyan shrink-0" aria-hidden />
            <div><dt className="text-white/60">Phone</dt><dd><a href="tel:+528119161086" className="hover:text-dasza-cyan whitespace-nowrap">+52 81 1916 1086</a></dd></div>
          </div>
          <div className="flex gap-3">
            <EnvelopeIcon className="h-5 w-5 mt-0.5 text-dasza-cyan shrink-0" aria-hidden />
            <div><dt className="text-white/60">Email</dt><dd><a href="mailto:jmsanchez@dasza.com" className="hover:text-dasza-cyan">jmsanchez@dasza.com</a></dd></div>
          </div>
          <div className="flex gap-3">
            <MapPinIcon className="h-5 w-5 mt-0.5 text-dasza-cyan shrink-0" aria-hidden />
            <div><dt className="text-white/60">Office</dt><dd className="leading-relaxed">GDS Business Park, Av. Miguel Alemán 762, El Milagro, 66634 Apodaca, N.L.</dd></div>
          </div>
        </dl>
        <div className="mt-auto pt-8 flex flex-wrap gap-2">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-10 px-4 rounded-md bg-[#25D366] text-dasza-charcoal font-semibold">WhatsApp</a>
          <a href="https://www.google.com/maps/place/GDS+Business+Park/@25.7595496,-100.1962086,967m" target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-10 px-4 rounded-md border border-white/30 hover:border-white">Open in Maps</a>
        </div>
      </aside>
      <Modal open={ok} onClose={() => setOk(false)} title="Message sent" status="success">
        Thank you! Our team will contact you within one business day.
      </Modal>
    </form>
  )
}
