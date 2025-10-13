"use client";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { useRef, useState } from "react";
import Modal from "@/components/ui/Modal";
import Script from "next/script";

export default function QuotePage() {
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState<string | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files || [])
    const allowed = selected.filter(f => /^(application\/pdf|image\/(png|jpe?g))$/.test(f.type))
    setFiles(prev => [...prev, ...allowed])
    // reset input so the same file can be selected again later
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function removeFileAt(index: number) {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const w = window as unknown as { grecaptcha?: { execute: (key?: string, opts?: { action: string }) => Promise<string> } }
    const captchaToken = w.grecaptcha ? await w.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit' }) : undefined
    // Compose extended lead details (Ryder-style) into comments in ENGLISH
    const ryderBlock = [
      `How can we help you? (EN)`,
      `First name: ${String(formData.get('firstName') || '').trim()}`,
      `Last name: ${String(formData.get('lastName') || '').trim()}`,
      `Title: ${String(formData.get('title') || '').trim()}`,
      `Postal code: ${String(formData.get('postalCode') || '').trim()}`,
      `Interested solutions: ${Array.from(formData.getAll('interest')).join(', ')}`,
    ].join('\n')
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
        photos: files.map(f => ({ name: f.name, type: f.type, size: f.size })),
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
      comments: [String(formData.get('comments') || '').trim(), ryderBlock].filter(Boolean).join('\n\n'),
      captchaToken,
    }
    setLoading(true)
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)
    if (res.ok) {
      const data = await res.json()
      setOk(data.id || 'ok')
      ;(e.target as HTMLFormElement).reset()
    } else {
      alert('There was an error. Please check fields and try again.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Get a Quote" subtitle="Tell us about your product and flow" image="/images/Industrial Properties Mexico.jpg" />
        <section className="mx-auto max-w-5xl px-6 py-12 text-dasza-navy">
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="afterInteractive" />
          )}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2"><h3 className="text-xl font-semibold">Information</h3></div>
            <label className="text-sm text-dasza-navy/80">Name*
              <input name="name" required placeholder="Name" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Company*
              <input name="company" required placeholder="Company" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Email*
              <input name="email" type="email" required placeholder="Email" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Phone
              <input name="phone" placeholder="Phone" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80 md:col-span-2">Address
              <input name="address" placeholder="Address" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80 md:col-span-2">Business URL
              <input name="businessUrl" placeholder="Business URL" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            <div className="md:col-span-2 mt-4"><h3 className="text-xl font-semibold">Product</h3></div>
            <label className="text-sm text-dasza-navy/80">Product | Value*
              <input name="product" required placeholder="Product | Value" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Quantity*
              <input name="quantity" type="number" required placeholder="Quantity" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Dimensions / Size
              <input name="volume" placeholder="Dimensions / Size" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Weight
              <input name="weight" placeholder="Weight" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <div className="md:col-span-2">
              <div className="text-sm text-dasza-navy/80">Photos (PDF, PNG, JPG/JPEG)</div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="application/pdf,image/png,image/jpeg"
                onChange={onFilesSelected}
                className="sr-only"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-2 rounded-full border border-dasza-gray/40 px-3 py-1 text-sm text-dasza-navy bg-white">
                    <button type="button" onClick={() => removeFileAt(i)} className="text-dasza-navy/60 hover:text-dasza-navy">✕</button>
                    {f.name}
                  </span>
                ))}
                <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-full border border-dasza-cyan text-dasza-cyan px-3 py-1 text-sm hover:bg-dasza-cyan hover:text-white">Add file</button>
              </div>
            </div>

            <div className="md:col-span-2 mt-4"><h3 className="text-xl font-semibold">Trade/Customs</h3></div>
            <label className="text-sm text-dasza-navy/80">HS Code*
              <input name="hsCode" required placeholder="HS Code" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Country of Origin*
              <input name="origin" required placeholder="Country of Origin" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Incoterm
              <input name="incoterm" placeholder="Incoterm" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            

            <div className="md:col-span-2 mt-4"><h3 className="text-xl font-semibold">Service requirements</h3></div>
            <label className="text-sm text-dasza-navy/80">Frequency
              <input name="frequency" placeholder="Frequency" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm text-dasza-navy/80">Destinations
              <input name="destinations" placeholder="Destinations" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="flex items-center gap-2"><input type="checkbox" name="storageRequired" /> Storage required</label>
            <div className="flex gap-4 md:col-span-2">
              {['fragile','hazmat','refrigerated'].map(c => (
                <label key={c} className="flex items-center gap-2"><input type="checkbox" name="conditions" value={c} /> {c}</label>
              ))}
            </div>
            <label className="text-sm text-dasza-navy/80 md:col-span-2">Timing
              <input name="timing" placeholder="Timing" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            <div className="md:col-span-2 mt-4"><h3 className="text-xl font-semibold">Options</h3></div>
            <label className="flex items-center gap-2 text-sm text-dasza-navy/80"><input type="checkbox" name="tracking" /> Tracking</label>
            <label className="flex items-center gap-2 text-sm text-dasza-navy/80"><input type="checkbox" name="packaging" /> Packaging</label>
            <label className="flex items-center gap-2 text-sm text-dasza-navy/80"><input type="checkbox" name="insurance" /> Insurance</label>
            <label className="text-sm text-dasza-navy/80">Other
              <input name="other" placeholder="Other" className="mt-1 border p-3 rounded-xl w-full h-11 focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            
            <label className="text-sm text-dasza-navy/80 md:col-span-2">Additional details
              <textarea name="comments" className="mt-1 border p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            <div className="md:col-span-2 text-center">
              <button disabled={loading} className="px-8 py-3 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">
                {loading ? 'Submitting…' : 'Submit'}
              </button>
            </div>
          </form>
        </section>
      </main>
      <Modal open={Boolean(ok)} onClose={() => setOk(null)} title="Submitted">
        Your request was sent. Our team will contact you shortly at the email you provided.
      </Modal>
      <Footer />
    </div>
  );
}


