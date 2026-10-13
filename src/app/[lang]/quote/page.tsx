'use client'
import Script from 'next/script'
import { useState } from 'react'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import PageIntro from '@/components/ui/PageIntro'
import Modal from '@/components/ui/Modal'
import { useI18n } from '@/i18n/I18nProvider'

const inputCls =
  'mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan'
const labelCls = 'text-sm font-medium text-dasza-ink'

function Section({ title }: { title: string }) {
  return (
    <div className="md:col-span-2 pt-4 first:pt-0">
      <h2 className="font-display text-xl font-semibold pb-3 border-b border-dasza-line">{title}</h2>
    </div>
  )
}
function Field({ name, label, required, type = 'text', span }: { name: string; label: string; required?: boolean; type?: string; span?: boolean }) {
  return (
    <label className={`${labelCls} ${span ? 'md:col-span-2' : ''}`}>
      {label}
      {required && '*'}
      <input name={name} type={type} required={required} className={inputCls} />
    </label>
  )
}
function Check({ name, value, label }: { name: string; value?: string; label: string }) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-dasza-ink">
      <input type="checkbox" name={name} value={value} className="h-4 w-4 accent-dasza-cyan" />
      {label}
    </label>
  )
}

export default function QuotePage() {
  const { t, href } = useI18n()
  const q = t.quote
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const w = window as unknown as { grecaptcha?: { execute: (key?: string, opts?: { action: string }) => Promise<string> } }
    const captchaToken = w.grecaptcha ? await w.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }) : undefined
    const payload = {
      contact: {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        address: formData.get('address'),
        website: formData.get('businessUrl'),
      },
      product: {
        type: formData.get('product'),
        quantity: Number(formData.get('quantity') || 0),
        volume: formData.get('volume'),
        weight: formData.get('weight'),
      },
      trade: {
        hsCode: formData.get('hsCode'),
        origin: formData.get('origin'),
        incoterm: formData.get('incoterm'),
        port: formData.get('port'),
      },
      service: {
        frequency: formData.get('frequency'),
        destinations: formData.get('destinations'),
        storageRequired: formData.get('storageRequired') === 'on',
        conditions: Array.from(formData.getAll('conditions')),
        timing: formData.get('timing'),
      },
      options: {
        tracking: formData.get('tracking') === 'on',
        packaging: formData.get('packaging') === 'on',
        insurance: formData.get('insurance') === 'on',
        other: formData.get('other'),
      },
      comments: String(formData.get('comments') || '').trim(),
      captchaToken,
    }
    setLoading(true)
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
      form.reset()
    } else {
      alert(q.error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro title={q.title} lead={q.lead} crumbs={[{ href: href('/'), label: t.common.home }]} crumbLabel={t.common.breadcrumb} />
        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 py-14 md:py-20 text-dasza-ink">
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
              <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="afterInteractive" />
            )}
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 rounded-lg border border-dasza-line bg-white p-6 sm:p-10">
              <Section title={q.sections.info} />
              <Field name="name" label={q.name} required />
              <Field name="company" label={q.company} required />
              <Field name="email" label={q.email} type="email" required />
              <Field name="phone" label={q.phone} type="tel" />
              <Field name="address" label={q.address} span />
              <Field name="businessUrl" label={q.url} span />

              <Section title={q.sections.product} />
              <Field name="product" label={q.product} required />
              <Field name="quantity" label={q.quantity} type="number" required />
              <Field name="volume" label={q.volume} />
              <Field name="weight" label={q.weight} />
              <p className="md:col-span-2 text-sm text-dasza-navy">{q.filesNote}</p>

              <Section title={q.sections.trade} />
              <Field name="hsCode" label={q.hsCode} required />
              <Field name="origin" label={q.origin} required />
              <Field name="incoterm" label={q.incoterm} />

              <Section title={q.sections.service} />
              <Field name="frequency" label={q.frequency} />
              <Field name="destinations" label={q.destinations} />
              <div className="md:col-span-2 flex flex-wrap gap-x-6 gap-y-3">
                <Check name="storageRequired" label={q.storage} />
                <Check name="conditions" value="fragile" label={q.conditions.fragile} />
                <Check name="conditions" value="hazmat" label={q.conditions.hazmat} />
                <Check name="conditions" value="refrigerated" label={q.conditions.refrigerated} />
              </div>
              <Field name="timing" label={q.timing} span />

              <Section title={q.sections.options} />
              <div className="md:col-span-2 flex flex-wrap gap-x-6 gap-y-3">
                <Check name="tracking" label={q.tracking} />
                <Check name="packaging" label={q.packaging} />
                <Check name="insurance" label={q.insurance} />
              </div>
              <Field name="other" label={q.other} span />
              <label className={`${labelCls} md:col-span-2`}>
                {q.comments}
                <textarea name="comments" rows={4} className="mt-1.5 block w-full px-3.5 py-3 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
              </label>

              <div className="md:col-span-2 pt-2">
                <button disabled={loading} className="inline-flex items-center h-12 px-8 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 disabled:opacity-60 transition-colors">
                  {loading ? q.sending : q.send}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Modal open={ok} onClose={() => setOk(false)} title={q.sentTitle} status="success" closeLabel={t.common.close}>
        {q.sentText}
      </Modal>
      <Footer />
    </div>
  )
}
