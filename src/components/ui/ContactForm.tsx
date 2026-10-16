'use client'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import MultiSelect from '@/components/ui/MultiSelect'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { PHONE_COUNTRIES, WHATSAPP_NUMBER } from '@/lib/phoneCountries'
import { COMPANY } from '@/content/site'
import { useI18n } from '@/i18n/I18nProvider'
import { fmt } from '@/i18n/dictionaries'
import TextButton from '@/components/ui/TextButton'

const inputCls =
  'mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan'

export default function ContactForm() {
  const { t } = useI18n()
  const f = t.form
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
          `${f.waHello} ${name}${company ? ` ${f.waFrom} ${company}` : ''}.`,
          selected.length ? `${f.waInterested} ${selected.join(', ')}.` : '',
          message,
          fmt(f.waContact, { email, phone }),
        ]
          .filter(Boolean)
          .join('\n'),
      )
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div className="lg:col-span-2 rounded-lg border border-dasza-line bg-white p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5 items-start">
          <label className="text-sm font-medium text-dasza-ink">
            {f.name}*
            <input name="name" autoComplete="name" placeholder={f.namePh} required minLength={2} className={inputCls} />
          </label>
          <label className="text-sm font-medium text-dasza-ink">
            {f.email}*
            <input name="email" type="email" autoComplete="email" placeholder="you@company.com" required className={inputCls} />
          </label>
          <div className="text-sm font-medium text-dasza-ink">
            <label htmlFor="contact-phone">{f.phone}*</label>
            <div className="mt-1.5 flex gap-2">
              <select name="phoneCountry" aria-label={f.countryCode} defaultValue="MX" className="h-12 border border-dasza-line rounded-md px-2 bg-white focus:outline-none focus:ring-2 focus:ring-dasza-cyan">
                {PHONE_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.code === 'OTHER' ? f.other : `${c.code} ${c.dial}`}</option>
                ))}
              </select>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel-national"
                placeholder={f.phonePh}
                required
                minLength={7}
                className="flex-1 min-w-0 h-12 px-3.5 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan"
              />
            </div>
          </div>
          <label className="text-sm font-medium text-dasza-ink">
            {f.company}
            <input name="company" autoComplete="organization" placeholder={f.company} className={inputCls} />
          </label>
        </div>

        <MultiSelect
          label={f.need}
          options={f.solutions}
          selected={selected}
          onToggle={toggle}
          placeholder={f.needPh}
          countLabel={(n) => fmt(f.needCount, { n })}
        />

        <label className="block text-sm font-medium text-dasza-ink">
          {f.message}
          <textarea
            name="message"
            rows={3}
            placeholder={f.messagePh}
            className="mt-1.5 block w-full px-3.5 py-3 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan"
          />
        </label>

        {/* Honeypot — hidden from people, filled by bots */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

        {failedMessage && (
          <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-medium">{f.failTitle}</p>
            <p className="mt-1">{f.failText}</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              <TextButton href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(failedMessage)}`} newTab>{f.viaWhatsapp}</TextButton>
              <TextButton href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(f.emailSubject)}&body=${encodeURIComponent(failedMessage)}`}>{f.viaEmail}</TextButton>
            </div>
          </div>
        )}

        <div className="pt-1">
          <button disabled={loading} className="inline-flex items-center h-12 px-8 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 disabled:opacity-60 transition-colors">
            {loading ? f.sending : f.send}
          </button>
        </div>
      </div>

      <aside className="rounded-lg bg-dasza-ink text-white p-6 sm:p-8 text-sm flex flex-col">
        <h3 className="font-display text-xl font-semibold">{f.asideTitle}</h3>
        <dl className="mt-6 space-y-5">
          <div className="flex gap-3">
            <PhoneIcon className="h-5 w-5 mt-0.5 text-dasza-cyan shrink-0" aria-hidden />
            <div><dt className="text-white/60">{f.asidePhone}</dt><dd><a href={COMPANY.phoneHref} className="hover:text-dasza-cyan whitespace-nowrap">{COMPANY.phone}</a></dd></div>
          </div>
          <div className="flex gap-3">
            <EnvelopeIcon className="h-5 w-5 mt-0.5 text-dasza-cyan shrink-0" aria-hidden />
            <div><dt className="text-white/60">{f.asideEmail}</dt><dd><a href={`mailto:${COMPANY.email}`} className="hover:text-dasza-cyan">{COMPANY.email}</a></dd></div>
          </div>
          <div className="flex gap-3">
            <MapPinIcon className="h-5 w-5 mt-0.5 text-dasza-cyan shrink-0" aria-hidden />
            <div><dt className="text-white/60">{f.asideOffice}</dt><dd className="leading-relaxed">{COMPANY.office}</dd></div>
          </div>
        </dl>
        <div className="mt-auto pt-8 flex flex-wrap gap-x-6 gap-y-3">
          <TextButton href={`https://wa.me/${WHATSAPP_NUMBER}`} tone="dark" newTab>{f.asideWhatsapp}</TextButton>
          <TextButton href={COMPANY.mapsUrl} tone="dark" newTab>{f.asideMaps}</TextButton>
        </div>
      </aside>
      <Modal open={ok} onClose={() => setOk(false)} title={f.sentTitle} status="success" closeLabel={t.common.close}>
        {f.sentText}
      </Modal>
    </form>
  )
}
