"use client";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageIntro from "@/components/ui/PageIntro";
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
      comments: String(formData.get('comments') || '').trim(),
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
      alert('Your quote request could not be sent. Please try again, or message us on WhatsApp at +52 81 1916 1086.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageIntro title="Get a quote" lead="Tell us about your product and how it moves. The more we know, the more precise the proposal — fields marked * are required." crumbs={[{ href: "/", label: "Home" }]} />
        <section className="bg-dasza-paper"><div className="mx-auto max-w-4xl px-5 sm:px-8 py-14 md:py-20 text-dasza-ink">
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
            <Script src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`} strategy="afterInteractive" />
          )}
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 rounded-lg border border-dasza-line bg-white p-6 sm:p-10">
            <div className="md:col-span-2"><h3 className="font-display text-xl font-semibold pb-3 border-b border-dasza-line">Information</h3></div>
            <label className="text-sm font-medium text-dasza-ink">Name*
              <input name="name" required placeholder="Name" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Company*
              <input name="company" required placeholder="Company" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Email*
              <input name="email" type="email" required placeholder="Email" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Phone
              <input name="phone" placeholder="Phone" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink md:col-span-2">Address
              <input name="address" placeholder="Address" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink md:col-span-2">Business URL
              <input name="businessUrl" placeholder="Business URL" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            <div className="md:col-span-2 mt-6"><h3 className="font-display text-xl font-semibold pb-3 border-b border-dasza-line">Product</h3></div>
            <label className="text-sm font-medium text-dasza-ink">Product | Value*
              <input name="product" required placeholder="Product | Value" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Quantity*
              <input name="quantity" type="number" required placeholder="Quantity" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Dimensions / Size
              <input name="volume" placeholder="Dimensions / Size" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Weight
              <input name="weight" placeholder="Weight" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <div className="md:col-span-2">
              <div className="text-sm font-medium text-dasza-ink">Photos (PDF, PNG, JPG/JPEG)</div>
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
                <button type="button" onClick={() => fileInputRef.current?.click()} className="rounded-md border border-dasza-ink text-dasza-ink px-3 py-1.5 text-sm hover:bg-dasza-ink hover:text-white">Add file</button>
              </div>
            </div>

            <div className="md:col-span-2 mt-6"><h3 className="font-display text-xl font-semibold pb-3 border-b border-dasza-line">Trade/Customs</h3></div>
            <label className="text-sm font-medium text-dasza-ink">HS Code*
              <input name="hsCode" required placeholder="HS Code" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Country of Origin*
              <input name="origin" required placeholder="Country of Origin" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Incoterm
              <input name="incoterm" placeholder="Incoterm" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            

            <div className="md:col-span-2 mt-6"><h3 className="font-display text-xl font-semibold pb-3 border-b border-dasza-line">Service requirements</h3></div>
            <label className="text-sm font-medium text-dasza-ink">Frequency
              <input name="frequency" placeholder="Frequency" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="text-sm font-medium text-dasza-ink">Destinations
              <input name="destinations" placeholder="Destinations" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="storageRequired" className="h-4 w-4 accent-dasza-cyan" /> Storage required</label>
            <div className="flex gap-4 md:col-span-2">
              {['fragile','hazmat','refrigerated'].map(c => (
                <label key={c} className="flex items-center gap-2 text-sm capitalize"><input type="checkbox" name="conditions" value={c} className="h-4 w-4 accent-dasza-cyan" /> {c}</label>
              ))}
            </div>
            <label className="text-sm font-medium text-dasza-ink md:col-span-2">Timing
              <input name="timing" placeholder="Timing" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            <div className="md:col-span-2 mt-6"><h3 className="font-display text-xl font-semibold pb-3 border-b border-dasza-line">Options</h3></div>
            <label className="flex items-center gap-2 text-sm font-medium text-dasza-ink"><input type="checkbox" name="tracking" /> Tracking</label>
            <label className="flex items-center gap-2 text-sm font-medium text-dasza-ink"><input type="checkbox" name="packaging" /> Packaging</label>
            <label className="flex items-center gap-2 text-sm font-medium text-dasza-ink"><input type="checkbox" name="insurance" /> Insurance</label>
            <label className="text-sm font-medium text-dasza-ink">Other
              <input name="other" placeholder="Other" className="mt-1.5 block w-full h-12 px-3.5 rounded-md border border-dasza-line bg-white text-dasza-ink placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            
            <label className="text-sm font-medium text-dasza-ink md:col-span-2">Additional details
              <textarea name="comments" className="mt-1.5 block w-full px-3.5 py-3 rounded-md border border-dasza-line placeholder:text-dasza-gray focus:outline-none focus:ring-2 focus:ring-dasza-cyan focus:border-dasza-cyan" />
            </label>

            <div className="md:col-span-2 pt-2">
              <button disabled={loading} className="inline-flex items-center h-12 px-8 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-dasza-cyan600 disabled:opacity-60 transition-colors">
                {loading ? 'Sending…' : 'Send quote request'}
              </button>
            </div>
          </form>
        </div></section>
      </main>
      <Modal open={Boolean(ok)} onClose={() => setOk(null)} title="Submitted" status="success">
        Your request was sent. Our team will contact you shortly at the email you provided.
      </Modal>
      <Footer />
    </div>
  );
}


