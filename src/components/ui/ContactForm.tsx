'use client'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/components/shared/AuthProvider'
import Modal from '@/components/ui/Modal'
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'

export default function ContactForm() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const options = [
    'Warehousing - Dedicated','Warehousing - Shared','Warehousing - Short Term','Warehousing - Refrigerated / Frozen',
    'Transportation - Dedicated','Transportation - Transportation Management','Transportation - Freight Brokerage','Transportation - Inbound and/or Outbound',
    'Fulfillment - E-commerce','Fulfillment - Retail','Fulfillment - Wholesale','Last Mile Delivery',
    'Sign Up to be a Carrier','Co-Packaging','Lease & Maintenance','Used Trucks','Rent Trucks','Other',
  ] as const
  const [selected, setSelected] = useState<string[]>([])
  const selectRef = useRef<HTMLDivElement | null>(null)
  const toggle = (opt: string) => setSelected((s)=> s.includes(opt) ? s.filter(x=>x!==opt) : [...s, opt])

  // Close the dropdown on outside click or ESC
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!open) return
      const t = e.target as Node
      if (selectRef.current && !selectRef.current.contains(t)) setOpen(false)
    }
    function onEsc(e: KeyboardEvent) {
      if (open && e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEsc)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEsc)
    }
  }, [open])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = {
      contact: {
        name: `${formData.get('firstName') ?? ''} ${formData.get('lastName') ?? ''}`.trim() || String(formData.get('name')||'') ,
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
        address: formData.get('postalCode'),
      },
      product: {
        type: 'Contacto',
        quantity: 0,
      },
      trade: {
        hsCode: '0000',
        origin: 'MX',
      },
      comments: [
        String(formData.get('message')||'').trim(),
        selected.length ? `Interested: ${selected.join(', ')}` : ''
      ].filter(Boolean).join('\n') || undefined,
    }
    setLoading(true)
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    if (res.ok) {
      const data = await res.json()
      setOk(data.id || 'ok')
      ;(e.target as HTMLFormElement).reset()
    } else {
      alert('Hubo un error. Intenta de nuevo.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {ok && <div className="md:col-span-2 text-green-600">Thank you! We received your message.</div>}
      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 rounded-2xl border border-dasza-gray/30 bg-white p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <label className="text-sm text-dasza-navy/80">First name*
              <input name="firstName" placeholder="First name" required className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Last name*
              <input name="lastName" placeholder="Last name" required className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Email address*
              <input name="email" type="email" placeholder="Email address" defaultValue={user?.email || ''} required className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Phone
              <input name="phone" placeholder="Phone" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Postal code
              <input name="postalCode" placeholder="Postal code" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Company
              <input name="company" placeholder="Company" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Title
              <input name="title" placeholder="Title" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <div ref={selectRef} className="relative">
              <label className="text-sm text-dasza-navy/80 block">Which solution(s) are you interested in?</label>
              <button
                type="button"
                onClick={()=>setOpen(!open)}
                className="mt-1 w-full h-11 border rounded-xl bg-white px-3 text-left text-sm text-dasza-navy focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan flex items-center"
              >
                <span className={selected.length ? '' : 'text-dasza-navy/50'}>
                  {selected.length ? selected.join(', ') : 'Select all that apply'}
                </span>
              </button>
              {open && (
                <div className="absolute z-40 mt-2 w-full rounded-xl border bg-white shadow-lg p-3 max-h-60 overflow-auto">
                  {options.map((opt) => (
                    <label key={opt} className="flex items-center gap-2 py-1">
                      <input type="checkbox" name="interest" value={opt} checked={selected.includes(opt)} onChange={()=>toggle(opt)} /> {opt}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          <label className="text-sm text-dasza-navy/80">How can we help you?
            <textarea name="message" placeholder="Tell us about your current business needs" className="mt-1 border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
          </label>
          <div className="text-center mt-4">
            <button disabled={loading} className="px-8 py-3 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">
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
            <a href="https://www.google.com/maps/place/GDS+Business+Park/@25.7595496,-100.1962086,967m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8662eb930eb5389b:0xa6c6f4ff0b1622c8!8m2!3d25.7595496!4d-100.1962086!16s%2Fg%2F11c424kch_?entry=ttu&g_ep=EgoyMDI1MTAwOC4wIKXMDSoASAFQAw%3D%3D" target="_blank" className="inline-block px-4 py-2 rounded-lg border border-dasza-cyan text-dasza-cyan hover:bg-dasza-cyan hover:text-white">Open in Google Maps</a>
          </div>
        </aside>
      </div>
      <Modal open={Boolean(ok)} onClose={() => setOk(null)} title="Submitted">
        Your message was sent. Our team will contact you shortly.
      </Modal>
    </form>
  )
}
