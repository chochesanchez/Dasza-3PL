import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Image from "next/image";
import { UserGroupIcon, BuildingOfficeIcon, AdjustmentsHorizontalIcon, ArrowsRightLeftIcon, ChartBarIcon, MapPinIcon } from '@heroicons/react/24/outline'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader
          title="About Dasza 3PL"
          subtitle="We design and operate logistics and warehousing solutions tailored to your manufacturing needs."
          image="/images/Light Modern Warehouse Interior.jpg"
        />
        <section className="mx-auto max-w-7xl px-6 py-16 text-dasza-navy">
          <div className="grid md:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-2">Who we are</h2>
              <div className="flex items-center gap-3 mb-6">
                <Image src="/images/Dasza Logistics Logo.jpeg" alt="Dasza 3PL" width={36} height={36} />
                <div className="text-2xl font-semibold text-dasza-navy">Dasza <span className="font-extrabold text-dasza-cyan">3PL</span></div>
              </div>
              <div className="space-y-4 text-lg leading-8 max-w-2xl">
                <p>
                  We are Dasza 3PL. With <strong>+17 years of experience</strong>, we design and operate <strong>logistics and warehousing solutions</strong> tailored to your manufacturing needs—covering raw materials, components, and finished goods.
                </p>
                <p>
                  Our approach supports your decision‑making with <strong>accurate data, real‑time inventory visibility, and disciplined processes</strong> across <strong>Warehousing, VMI, Logistics and Customs</strong>.
                </p>
              </div>
              {/* buttons removed per request */}
              {/* Value widgets */}
              <div className="mt-8 grid grid-cols-2 gap-5 items-stretch">
                <div className="rounded-xl border border-dasza-gray/30 bg-white shadow p-5 text-center h-full min-h-36 flex flex-col justify-center">
                  <div className="mx-auto h-10 w-10 grid place-items-center text-dasza-cyan mb-2"><BuildingOfficeIcon className="h-7 w-7" /></div>
                  <div className="text-sm font-semibold">200,000 sqf</div>
                  <div className="text-xs text-dasza-navy/70">of operational space</div>
                </div>
                <div className="rounded-xl border border-dasza-gray/30 bg-white shadow p-5 text-center h-full min-h-36 flex flex-col justify-center">
                  <div className="mx-auto h-10 w-10 grid place-items-center text-dasza-cyan mb-2"><AdjustmentsHorizontalIcon className="h-7 w-7" /></div>
                  <div className="text-sm font-semibold">Tailored</div>
                  <div className="text-xs text-dasza-navy/70">to manufacturing plants</div>
                </div>
                <div className="rounded-xl border border-dasza-gray/30 bg-white shadow p-5 text-center h-full min-h-36 flex flex-col justify-center">
                  <div className="mx-auto h-10 w-10 grid place-items-center text-dasza-cyan mb-2"><ArrowsRightLeftIcon className="h-7 w-7" /></div>
                  <div className="text-sm font-semibold">Scope</div>
                  <div className="text-xs text-dasza-navy/70">raw materials → finished goods</div>
                </div>
                <div className="rounded-xl border border-dasza-gray/30 bg-white shadow p-5 text-center h-full min-h-36 flex flex-col justify-center">
                  <div className="mx-auto h-10 w-10 grid place-items-center text-dasza-cyan mb-2"><ChartBarIcon className="h-7 w-7" /></div>
                  <div className="text-sm font-semibold">Value</div>
                  <div className="text-xs text-dasza-navy/70">data + process discipline</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">Infrastructure</h2>
              <p className="mb-3 text-lg leading-8 max-w-2xl">
                Our network of <strong>industrial warehouses (naves industriales)</strong> is strategically located to serve Mexico’s main manufacturing clusters.
              </p>
              <p className="mb-6 text-lg leading-8 max-w-2xl">All our facilities are equipped with <strong>RF scanning, BI dashboards, and seamless integrations with SAP and Dynamics</strong> to ensure real‑time visibility and compliance.</p>
              <div className="grid grid-cols-1 gap-4 max-w-2xl items-stretch">
                {[{city:'Apodaca',desc:'Bonded and general-purpose warehouses with advanced security and inventory systems.'},{city:'Querétaro',desc:'Dedicated space for vendor‑managed inventory and sub‑assembly operations.'},{city:'Manzanillo Office',desc:'Direct support for port operations and international trade flows.'}].map(loc => (
                  <div key={loc.city} className="rounded-xl border border-dasza-gray/30 bg-white shadow p-5 flex items-start gap-3 h-full min-h-28">
                    <MapPinIcon className="h-6 w-6 text-dasza-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-dasza-navy">{loc.city}</div>
                      <div className="text-sm text-dasza-navy/80">{loc.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners gallery */}
        <section id="partners" className="mx-auto max-w-7xl px-6 py-16">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <UserGroupIcon className="h-9 w-9 text-dasza-cyan" aria-hidden />
              <h2 className="text-2xl md:text-3xl font-bold">Our Partners</h2>
            </div>
            <p className="text-dasza-navy/80 text-lg leading-8 mb-10 max-w-5xl">
              We are trusted by leaders across automotive, electronics, appliances, retail and more. Here’s a snapshot of brands who rely on our logistics and distribution network.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {(() => {
              const base = [
              '/images/Trusted By logos/Carrier Corporation Logo.png',
              '/images/Trusted By logos/Magna Logo.png',
              '/images/Trusted By logos/US Motors Logo.webp',
              '/images/Trusted By logos/RXN logo.png',
              '/images/Trusted By logos/Regal Beloit Logo.png',
              '/images/Trusted By logos/fluidmaster logo.png',
              '/images/Trusted By logos/Tuopu Group Logo.jpeg',
              '/images/Trusted By logos/superior industries logo.png',
              '/images/Trusted By logos/Dubai Logo Dark.png',
              '/images/Trusted By logos/Dometic Logo.webp',
              '/images/Trusted By logos/erd-metal-canada logo.png',
              '/images/Trusted By logos/NSK Japan Logo.webp',
              '/images/Trusted By logos/MotoRad Logo.webp',
              '/images/Trusted By logos/Metalsa Logo.avif',
              '/images/Trusted By logos/Pilgrims Logo.png',
              '/images/Trusted By logos/Munters Logo.webp',
              '/images/Trusted By logos/Ternium Logo.png',
              '/images/Trusted By logos/Magnesitas Logo.png',
              '/images/Trusted By logos/Mitsuba Corporation Logo.png',
              '/images/Trusted By logos/elematec logo.gif',
              '/images/Trusted By logos/Daimler Trucks Logo.png',
              '/images/Trusted By logos/Conmet Logo.png',
              '/images/Trusted By logos/Toyota Logo.png',
              '/images/Trusted By logos/Whirlpool Logo copy.png',
              '/images/Trusted By logos/Soriana Logo copy.webp',
              '/images/Trusted By logos/Walmart Logo 2008 copy.png',
              '/images/Trusted By logos/bbvalogo copy.png',
              '/images/Trusted By logos/Celestica Logo copy.png',
              '/images/Trusted By logos/Office Depot Logo copy.webp',
              '/images/Trusted By logos/Embraco Logo copy.png',
              '/images/Trusted By logos/sanminalogo copy.png',
              '/images/Trusted By logos/Rockwell Automation Logo copy.jpg',
              ]
              const shuffled = base.slice().sort(() => Math.random() - 0.5)
              return shuffled.map((src, i) => (
              <div key={i} className="partner-card">
                <div className="relative w-40 h-20">
                  <Image src={encodeURI(src)} alt="Partner" fill sizes="160px" className="partner-logo" style={{ objectFit: 'contain', backgroundColor: 'white' }} />
                </div>
              </div>
              ))
            })()}
          </div>

          <div className="max-w-4xl mx-auto px-6 pt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">You can be here, too</h3>
            <p className="text-dasza-navy/80 mb-6">Join a growing network of industry leaders who trust our logistics, warehousing and last‑mile solutions.</p>
            <a href="/contact" className="inline-block px-8 py-3 rounded-full bg-dasza-cyan text-white font-semibold shadow-md hover:shadow-lg transition">Contact us</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


