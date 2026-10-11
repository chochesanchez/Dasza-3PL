import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import ContactForm from '@/components/ui/ContactForm'
import RouteMap from '@/components/home/RouteMap'
import ProcessSteps from '@/components/home/ProcessSteps'
import ServiceIndex from '@/components/home/ServiceIndex'
import SystemPreview from '@/components/home/SystemPreview'
import ClientLogos from '@/components/home/ClientLogos'
import Sites from '@/components/home/Sites'
import { FACTS, CERTIFICATIONS, COMPANY } from '@/content/site'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-dasza-ink text-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-14 md:pt-20 pb-12 grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            <div className="lg:col-span-5">
              <h1 className="font-display text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-[3.55rem] font-semibold">
                From the port to your production line.
              </h1>
              <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-lg">
                DASZA imports your materials under our IMMEX AAA program, clears customs with our own broker, stores them in bonded
                warehouses in Apodaca and Querétaro, and delivers to your plant on schedule.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quote" className="inline-flex items-center h-12 px-6 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-white transition-colors">
                  Get a quote
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center h-12 px-6 rounded-md border border-white/30 hover:border-white transition-colors">
                  See how it works
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-2" aria-label="Certifications">
                {CERTIFICATIONS.map((c) => (
                  <li key={c} className="px-2.5 py-1 rounded border border-white/20 text-xs text-white/75">{c}</li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-7 lg:-mr-8">
              <RouteMap />
            </div>
          </div>
          <div className="border-t border-white/10">
            <dl className="mx-auto max-w-7xl grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
              {FACTS.map((f) => (
                <div key={f.label} className="bg-dasza-ink px-5 sm:px-8 py-6 lg:py-8">
                  <dt className="sr-only">{f.label}</dt>
                  <dd>
                    <span className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tabular-nums">{f.value}</span>
                    {f.unit && <span className="ml-1.5 text-sm sm:text-base text-white/70 whitespace-nowrap">{f.unit}</span>}
                    <span className="block mt-1 text-sm text-white/60">{f.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="scroll-mt-20 mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-2xl mb-12">
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">One partner from the port to your plant</h2>
            <p className="mt-5 text-lg text-dasza-navy leading-relaxed">
              Instead of coordinating a customs broker, a carrier and a warehouse separately, you work with one team and see everything in one system.
            </p>
          </div>
          <ProcessSteps />
        </section>

        {/* Services */}
        <section className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05] max-w-xl">What we do for manufacturers</h2>
              <Link href="/services" className="text-dasza-ink font-semibold underline decoration-dasza-cyan decoration-2 underline-offset-4 hover:text-dasza-cyan600">
                All services
              </Link>
            </div>
            <ServiceIndex />
          </div>
        </section>

        {/* Dasza System */}
        <section className="bg-dasza-ink text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">See every pallet you have with us</h2>
              <p className="mt-5 text-lg text-white/75 leading-relaxed">
                Dasza System shows your inventory by item and location, every receipt and shipment, storage age, cycle counts and billing —
                updated as our team scans pallets on the floor.
              </p>
              <Link href="/dasza-system" className="mt-8 inline-flex items-center h-12 px-6 rounded-md bg-dasza-cyan text-dasza-ink font-semibold hover:bg-white transition-colors">
                Try the interactive demo
              </Link>
            </div>
            <div className="lg:col-span-7">
              <SystemPreview />
            </div>
          </div>
        </section>

        {/* Sites */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-12 gap-10 mb-12">
            <h2 className="lg:col-span-6 font-display text-3xl md:text-5xl font-semibold leading-[1.05]">Where your inventory lives</h2>
            <p className="lg:col-span-6 text-lg text-dasza-navy leading-relaxed self-end">
              Three warehouses in Mexico’s two largest manufacturing regions, with racked positions of 1 × 1 × 1.30 m and floor space for heavy or oversize loads.
            </p>
          </div>
          <Sites />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { src: '/images/site/dasza-pick-pack.jpg', alt: 'Dasza team member weighing and labeling a box at a packing station' },
              { src: '/images/site/dasza-rework.jpg', alt: 'Technician reworking a compressor at a Dasza facility' },
              { src: '/images/site/dasza-queretaro-plant.jpg', alt: 'Manufacturing floor at the Querétaro industrial site' },
            ].map((p) => (
              <div key={p.src} className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Clients */}
        <section className="mx-auto max-w-7xl px-5 sm:px-8 pb-20 md:pb-28">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold leading-[1.1] max-w-2xl">
              Manufacturers and their suppliers move materials through DASZA
            </h2>
            <Link href="/about#clients" className="text-dasza-ink font-semibold underline decoration-dasza-cyan decoration-2 underline-offset-4 hover:text-dasza-cyan600">
              See all clients
            </Link>
          </div>
          <ClientLogos limit={18} />
        </section>

        {/* Contact */}
        <section id="contact" className="bg-dasza-paper">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 py-20 md:py-28">
            <div className="max-w-2xl mb-10">
              <h2 className="font-display text-3xl md:text-5xl font-semibold leading-[1.05]">Talk to a specialist</h2>
              <p className="mt-5 text-lg text-dasza-navy leading-relaxed">
                Tell us what you need and we’ll reply within one business day. Prefer to call? <a href={COMPANY.phoneHref} className="text-dasza-ink underline decoration-dasza-cyan decoration-2 underline-offset-4 whitespace-nowrap">{COMPANY.phone}</a>
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
