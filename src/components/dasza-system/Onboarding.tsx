'use client'
import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import { MATERIALS, type MaterialId } from './demoData'

export type Visitor = {
  name: string
  company: string
  email: string
  phone: string
  materials: MaterialId[]
  otherMaterial: string
  palletsPerMonth: string
}

type Props = { onComplete: (v: Visitor) => void }

const inputCls =
  'w-full rounded-lg border border-dasza-gray/60 px-3 py-2.5 text-dasza-charcoal placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan'

export default function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState<1 | 2>(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [v, setV] = useState<Visitor>({
    name: '',
    company: '',
    email: '',
    phone: '',
    materials: [],
    otherMaterial: '',
    palletsPerMonth: '',
  })
  const [honeypot, setHoneypot] = useState('')

  const set = <K extends keyof Visitor>(k: K, val: Visitor[K]) => setV((p) => ({ ...p, [k]: val }))
  const toggleMaterial = (id: MaterialId) =>
    set('materials', v.materials.includes(id) ? v.materials.filter((m) => m !== id) : [...v.materials, id])

  function nextStep(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setStep(2)
  }

  async function finish(e: React.FormEvent) {
    e.preventDefault()
    if (v.materials.length === 0 && !v.otherMaterial.trim()) {
      setError('Select at least one material type (or describe it under “Other”).')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, website: honeypot }),
      })
      if (!res.ok) console.warn('Demo lead was not delivered', res.status)
    } catch (err) {
      console.warn('Demo lead request failed', err)
    } finally {
      setSubmitting(false)
      // The demo is shown either way; lead delivery problems are logged server-side.
      onComplete(v)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <ol className="flex items-center gap-3 mb-8 text-sm" aria-label="Onboarding progress">
        {[
          { n: 1, label: 'Your details' },
          { n: 2, label: 'Your materials' },
          { n: 3, label: 'Guided tour' },
        ].map((s, i) => {
          const done = step > s.n
          const current = step === s.n
          return (
            <li key={s.n} className="flex items-center gap-3 flex-1" aria-current={current ? 'step' : undefined}>
              <span
                className={`grid place-items-center h-8 w-8 shrink-0 rounded-full font-semibold ${
                  done ? 'bg-dasza-navy text-white' : current ? 'bg-dasza-cyan text-dasza-charcoal' : 'bg-gray-100 text-dasza-navy/60'
                }`}
              >
                {done ? <CheckIcon className="h-4 w-4" aria-hidden /> : s.n}
              </span>
              <span className={`hidden sm:inline ${current ? 'text-dasza-navy font-semibold' : 'text-dasza-navy/60'}`}>{s.label}</span>
              {i < 2 && <span className="hidden sm:block h-px flex-1 bg-dasza-gray/40" aria-hidden />}
            </li>
          )
        })}
      </ol>

      <div className="rounded-lg border border-dasza-line bg-white p-6 sm:p-8">
        {step === 1 ? (
          <form onSubmit={nextStep} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold text-dasza-navy">Let’s set up your demo</h2>
              <p className="text-dasza-navy/70 mt-1">We’ll personalize the walkthrough with your company name. A specialist may reach out to answer questions.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-name" className="block text-sm font-medium text-dasza-navy mb-1">Full name *</label>
                <input id="demo-name" required minLength={2} autoComplete="name" className={inputCls} value={v.name} onChange={(e) => set('name', e.target.value)} />
              </div>
              <div>
                <label htmlFor="demo-company" className="block text-sm font-medium text-dasza-navy mb-1">Company</label>
                <input id="demo-company" autoComplete="organization" className={inputCls} value={v.company} onChange={(e) => set('company', e.target.value)} />
              </div>
              <div>
                <label htmlFor="demo-email" className="block text-sm font-medium text-dasza-navy mb-1">Work email *</label>
                <input id="demo-email" type="email" required autoComplete="email" className={inputCls} value={v.email} onChange={(e) => set('email', e.target.value)} />
              </div>
              <div>
                <label htmlFor="demo-phone" className="block text-sm font-medium text-dasza-navy mb-1">Phone *</label>
                <input id="demo-phone" type="tel" required minLength={7} autoComplete="tel" placeholder="+52 81 0000 0000" className={inputCls} value={v.phone} onChange={(e) => set('phone', e.target.value)} />
              </div>
            </div>
            {/* Honeypot — hidden from people, visible to bots */}
            <div className="hidden" aria-hidden>
              <label htmlFor="demo-website">Website</label>
              <input id="demo-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-6 py-2.5 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 transition-colors">
                Continue
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={finish} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold text-dasza-navy">What do you store?</h2>
              <p className="text-dasza-navy/70 mt-1">Select all that apply. We’ll fill the demo with sample items of the same type.</p>
            </div>
            <fieldset>
              <legend className="sr-only">Material types</legend>
              <div className="grid sm:grid-cols-2 gap-3">
                {MATERIALS.map((m) => {
                  const on = v.materials.includes(m.id)
                  return (
                    <button
                      type="button"
                      key={m.id}
                      onClick={() => toggleMaterial(m.id)}
                      aria-pressed={on}
                      className={`text-left rounded-xl border px-4 py-3 transition-colors ${
                        on ? 'border-dasza-cyan bg-dasza-cyan/10' : 'border-dasza-gray/50 hover:border-dasza-cyan'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-dasza-navy">{m.label}</span>
                        {on && <CheckIcon className="h-5 w-5 text-dasza-navy" aria-hidden />}
                      </div>
                      <div className="text-xs text-dasza-navy/60 mt-0.5">{m.hint}</div>
                    </button>
                  )
                })}
              </div>
            </fieldset>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="demo-other" className="block text-sm font-medium text-dasza-navy mb-1">Other (optional)</label>
                <input id="demo-other" className={inputCls} value={v.otherMaterial} onChange={(e) => set('otherMaterial', e.target.value)} />
              </div>
              <div>
                <label htmlFor="demo-volume" className="block text-sm font-medium text-dasza-navy mb-1">Estimated pallets / month</label>
                <select id="demo-volume" className={inputCls} value={v.palletsPerMonth} onChange={(e) => set('palletsPerMonth', e.target.value)}>
                  <option value="">Not sure yet</option>
                  <option>Under 50</option>
                  <option>50 – 200</option>
                  <option>200 – 1,000</option>
                  <option>1,000+</option>
                </select>
              </div>
            </div>
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-full text-dasza-navy hover:bg-gray-100">
                Back
              </button>
              <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 disabled:opacity-60 transition-colors">
                {submitting ? 'Preparing your demo…' : 'Start the guided tour'}
              </button>
            </div>
            <p className="text-xs text-dasza-navy/60">By continuing you agree that Dasza 3PL may contact you about this demo. All data shown in the demo is fictional.</p>
          </form>
        )}
      </div>
    </div>
  )
}
