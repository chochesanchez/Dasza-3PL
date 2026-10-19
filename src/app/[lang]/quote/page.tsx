'use client'
import { useEffect, useRef, useState } from 'react'
import { CheckIcon } from '@heroicons/react/20/solid'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import Modal from '@/components/ui/Modal'
import { PHONE_COUNTRIES, WHATSAPP_NUMBER } from '@/lib/phoneCountries'
import { COMPANY } from '@/content/site'
import { useI18n } from '@/i18n/I18nProvider'
import { fmt } from '@/i18n/dictionaries'
import TextButton from '@/components/ui/TextButton'
import type { Dict } from '@/i18n/dictionaries/en'

const inputCls =
  'mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan'
const labelCls = 'block text-sm font-medium text-dasza-ink'

type NeedKey = keyof Dict['quote']['needOptions']

type Answers = {
  name: string
  company: string
  email: string
  phoneCountry: string
  phone: string
  product: string
  quantity: string
  origin: string
  hsCode: string
  needs: NeedKey[]
  frequency: string
  handling: string[]
  comments: string
}

const EMPTY: Answers = {
  name: '',
  company: '',
  email: '',
  phoneCountry: 'MX',
  phone: '',
  product: '',
  quantity: '',
  origin: '',
  hsCode: '',
  needs: [],
  frequency: '',
  handling: [],
  comments: '',
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-10 px-4 rounded-md border text-sm transition-colors ${on ? 'bg-dasza-ink border-dasza-ink text-white' : 'border-dasza-line text-dasza-ink hover:border-dasza-ink'}`}
    >
      {children}
    </button>
  )
}

// Short three-step quote: each step is its own form, so the browser validates only what's on screen
// and answers are kept when moving back and forth.
export default function QuotePage() {
  const { t, href } = useI18n()
  const q = t.quote
  const [step, setStep] = useState(0)
  const [a, setA] = useState<Answers>(EMPTY)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [failed, setFailed] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const startedAt = useRef(0)
  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((p) => ({ ...p, [k]: v }))
  const toggleNeed = (v: NeedKey) => set('needs', a.needs.includes(v) ? a.needs.filter((x) => x !== v) : [...a.needs, v])
  const toggleHandling = (v: string) => set('handling', a.handling.includes(v) ? a.handling.filter((x) => x !== v) : [...a.handling, v])
  const next = (e: React.FormEvent) => {
    e.preventDefault()
    setStep((s) => Math.min(2, s + 1))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const country = PHONE_COUNTRIES.find((c) => c.code === a.phoneCountry) ?? PHONE_COUNTRIES[0]
    const phone = a.phone ? `${country.dial} ${a.phone}`.trim() : ''
    const needLabels = a.needs.map((k) => q.needOptions[k])
    const payload = {
      contact: { name: a.name, email: a.email, phone, company: a.company, phoneCountry: country.label },
      product: { type: a.product, volume: a.quantity },
      trade: { hsCode: a.hsCode || undefined, origin: a.origin },
      service: {
        frequency: a.frequency || undefined,
        storageRequired: a.needs.includes('storage'),
        conditions: a.handling,
      },
      interests: needLabels,
      comments: a.comments || undefined,
      website: honeypot,
      startedAt: startedAt.current,
    }
    setSending(true)
    setFailed(null)
    let ok = false
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      ok = res.ok
    } catch {
      ok = false
    }
    setSending(false)
    if (ok) {
      setSent(true)
      setA(EMPTY)
      setStep(0)
    } else {
      setFailed(
        [
          `${q.waIntro}: ${a.name}${a.company ? `, ${a.company}` : ''}`,
          `${q.product} ${a.product}`,
          `${q.quantity}: ${a.quantity}`,
          `${q.origin}: ${a.origin}`,
          needLabels.length ? `${q.needs}: ${needLabels.join(', ')}` : '',
          a.comments,
          `${a.email} ${phone}`.trim(),
        ]
          .filter(Boolean)
          .join('\n'),
      )
    }
  }

  const progress = ((step + 1) / q.steps.length) * 100

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro title={q.title} lead={q.lead} crumbs={[{ href: href('/'), label: t.common.home }]} crumbLabel={t.common.breadcrumb} />
        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-3xl px-5 sm:px-8 py-12 md:py-16">
            <div className="rounded-lg border border-dasza-line bg-white overflow-hidden">
              {/* Progress */}
              <div className="px-6 sm:px-10 pt-6 sm:pt-8">
                <ol className="grid grid-cols-3 gap-3" aria-label={q.progress}>
                  {q.steps.map((label, i) => {
                    const done = i < step
                    const current = i === step
                    return (
                      <li key={label} aria-current={current ? 'step' : undefined} className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`grid place-items-center h-7 w-7 shrink-0 rounded-full text-sm font-semibold transition-colors ${
                            done ? 'bg-dasza-ink text-white' : current ? 'bg-dasza-cyan text-dasza-ink' : 'bg-dasza-paper text-dasza-navy'
                          }`}
                        >
                          {done ? <CheckIcon className="h-4 w-4" aria-hidden /> : i + 1}
                        </span>
                        <span className={`hidden sm:block truncate text-sm ${current ? 'font-semibold text-dasza-ink' : 'text-dasza-navy'}`}>{label}</span>
                      </li>
                    )
                  })}
                </ol>
                <div className="mt-5 h-1 rounded-full bg-dasza-paper overflow-hidden" aria-hidden>
                  <div className="h-full bg-dasza-cyan transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-3 text-sm text-dasza-navy sm:hidden">
                  {fmt(q.stepOf, { n: step + 1, total: q.steps.length })}: <span className="font-semibold text-dasza-ink">{q.steps[step]}</span>
                </p>
              </div>

              <div className="p-6 sm:p-10">
                {step === 0 && (
                  <form onSubmit={next} className="grid sm:grid-cols-2 gap-x-5 gap-y-5">
                    <label className={labelCls}>
                      {q.name}*
                      <input value={a.name} onChange={(e) => set('name', e.target.value)} required minLength={2} autoComplete="name" className={inputCls} />
                    </label>
                    <label className={labelCls}>
                      {q.company}*
                      <input value={a.company} onChange={(e) => set('company', e.target.value)} required autoComplete="organization" className={inputCls} />
                    </label>
                    <label className={labelCls}>
                      {q.email}*
                      <input type="email" value={a.email} onChange={(e) => set('email', e.target.value)} required autoComplete="email" className={inputCls} />
                    </label>
                    <div className={labelCls}>
                      <label htmlFor="quote-phone">{q.phone}*</label>
                      <div className="mt-1.5 flex gap-2">
                        <select
                          aria-label={t.form.countryCode}
                          value={a.phoneCountry}
                          onChange={(e) => set('phoneCountry', e.target.value)}
                          className="h-12 border border-dasza-line rounded-md px-2 bg-white focus:outline-none focus:ring-2 focus:ring-dasza-cyan"
                        >
                          {PHONE_COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>{c.code === 'OTHER' ? t.form.other : `${c.code} ${c.dial}`}</option>
                          ))}
                        </select>
                        <input
                          id="quote-phone"
                          type="tel"
                          value={a.phone}
                          onChange={(e) => set('phone', e.target.value)}
                          required
                          minLength={7}
                          autoComplete="tel-national"
                          placeholder={t.form.phonePh}
                          className="flex-1 min-w-0 h-12 px-3.5 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex justify-end pt-2">
                      <button className="inline-flex items-center h-12 px-8 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 transition-colors">{q.next}</button>
                    </div>
                  </form>
                )}

                {step === 1 && (
                  <form onSubmit={next} className="grid sm:grid-cols-2 gap-x-5 gap-y-5">
                    <label className={`${labelCls} sm:col-span-2`}>
                      {q.product}*
                      <input value={a.product} onChange={(e) => set('product', e.target.value)} required placeholder={q.productPh} className={inputCls} />
                    </label>
                    <label className={labelCls}>
                      {q.quantity}*
                      <input value={a.quantity} onChange={(e) => set('quantity', e.target.value)} required placeholder={q.quantityPh} className={inputCls} />
                    </label>
                    <label className={labelCls}>
                      {q.origin}*
                      <input value={a.origin} onChange={(e) => set('origin', e.target.value)} required autoComplete="country-name" className={inputCls} />
                    </label>
                    <label className={`${labelCls} sm:col-span-2`}>
                      {q.hsCode} <span className="font-normal text-dasza-navy">({q.optional})</span>
                      <input value={a.hsCode} onChange={(e) => set('hsCode', e.target.value)} className={inputCls} />
                    </label>
                    <div className="sm:col-span-2 flex items-center justify-between gap-3 pt-2">
                      <button type="button" onClick={() => setStep(0)} className="h-12 px-5 rounded-md text-dasza-ink font-medium hover:bg-dasza-paper">{q.back}</button>
                      <button className="inline-flex items-center h-12 px-8 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 transition-colors">{q.next}</button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={submit} className="space-y-6">
                    <fieldset>
                      <legend className={labelCls}>{q.needs}</legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(Object.keys(q.needOptions) as NeedKey[]).map((k) => (
                          <Chip key={k} on={a.needs.includes(k)} onClick={() => toggleNeed(k)}>{q.needOptions[k]}</Chip>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className={labelCls}>{q.frequency}</legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {q.frequencies.map((o) => (
                          <Chip key={o} on={a.frequency === o} onClick={() => set('frequency', a.frequency === o ? '' : o)}>{o}</Chip>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className={labelCls}>
                        {q.handling} <span className="font-normal text-dasza-navy">({q.optional})</span>
                      </legend>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(Object.keys(q.handlingOptions) as (keyof typeof q.handlingOptions)[]).map((k) => (
                          <Chip key={k} on={a.handling.includes(k)} onClick={() => toggleHandling(k)}>{q.handlingOptions[k]}</Chip>
                        ))}
                      </div>
                    </fieldset>
                    <label className={labelCls}>
                      {q.comments}
                      <textarea
                        value={a.comments}
                        onChange={(e) => set('comments', e.target.value)}
                        rows={3}
                        placeholder={q.commentsPh}
                        className="mt-1.5 block w-full px-3.5 py-3 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan"
                      />
                    </label>

                    {/* Honeypot — hidden from people, filled by bots */}
                    <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                    {failed && (
                      <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                        <p className="font-medium">{q.failTitle}</p>
                        <p className="mt-1">{q.failText}</p>
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                          <TextButton href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(failed)}`} newTab>{t.form.viaWhatsapp}</TextButton>
                          <TextButton href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(q.waIntro)}&body=${encodeURIComponent(failed)}`}>{t.form.viaEmail}</TextButton>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button type="button" onClick={() => setStep(1)} className="h-12 px-5 rounded-md text-dasza-ink font-medium hover:bg-dasza-paper">{q.back}</button>
                      <button disabled={sending} className="inline-flex items-center h-12 px-8 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 disabled:opacity-60 transition-colors">
                        {sending ? q.sending : q.send}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Modal open={sent} onClose={() => setSent(false)} title={q.sentTitle} status="success" closeLabel={t.common.close}>
        {q.sentText}
      </Modal>
      <Footer />
    </div>
  )
}
