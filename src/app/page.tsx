import Image from "next/image";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import { ShieldCheckIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import ContactForm from "@/components/ui/ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[560px] grid place-items-center text-center overflow-hidden">
          <Image src="/images/Dasza 3pl Home Page Image.png" alt="Warehouse" fill priority className="object-cover brightness-75" />
          <div className="absolute inset-0 bg-gradient-to-b from-dasza-charcoal/40 via-transparent to-dasza-charcoal/40" />
          <div className="relative z-10 px-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Third‑Party Logistics Experts</h1>
          </div>
        </section>

        {/* Stats */}
        <section className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { k: 'Years', v: '+17' },
            { k: 'Pallets', v: '+200k' },
            { k: 'areas', v: '+200,000 sqf' },
          ].map((s) => (
            <Reveal key={s.k}>
              <div className="rounded-xl border border-dasza-gray/40 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-dasza-navy">{s.v}</div>
                <div className="text-dasza-navy/70 text-sm">{s.k}</div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* Intro */}
        <section className="mx-auto max-w-7xl px-6 py-12 text-dasza-navy">
          <div className="text-center">
            <Reveal>
              <div className="inline-flex items-center gap-3">
                <Image src="/images/Dasza Logistics Logo 2.png" alt="Dasza 3PL" width={44} height={44} />
                <h2 className="text-2xl md:text-4xl font-semibold text-dasza-navy">Dasza <span className="font-extrabold text-dasza-cyan">3PL</span></h2>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-4 mx-auto max-w-7xl text-left">
                <p className="text-xl">With 17+ years of experience, we design and operate logistics and warehousing solutions for manufacturing in Mexico.</p>
                <p className="mt-3 text-xl">Our teams deliver disciplined processes, real‑time inventory visibility, and end‑to‑end control across Warehousing, VMI, Logistics, and Customs.</p>
                <div className="mt-4">
                  <a href="/about" className="text-dasza-cyan hover:text-dasza-cyan600 font-medium">Learn more…</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Services grid */}
        <section className="mx-auto max-w-7xl px-6 py-12">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-semibold text-dasza-navy mb-6 text-center">Our Services</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: 'IMMEX AAA Industrial | Shelter', img: '/images/Factory Modern Image.jpg', href: '/services/warehousing' },
              { title: 'IMMEX AAA Services | VMI', img: '/images/Industrial Properties Mexico.jpg', href: '/services/vmi' },
              { title: 'Warehousing', img: '/images/Cargo Safety Temperature Control.jpg', href: '/services/warehousing' },
              { title: 'Logistics', img: '/images/Temperature Logistics Steps.jpg', href: '/services/logistics' },
              { title: 'Distribution / Last Mile', img: '/images/Dasza 3pl Home Page Image.png', href: '/services/last-mile' },
            ].map((c) => (
              <a key={c.title} href={c.href} className="group rounded-xl overflow-hidden border border-dasza-gray/40 hover:border-dasza-cyan transition-colors shadow-sm hover:shadow-md">
                <div className="relative h-40">
                  <Image src={c.img} alt="" fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4 text-dasza-navy font-semibold group-hover:text-dasza-cyan">{c.title}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Dasza System information (moved below Services) */}
        <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 gap-8 items-center">
          <Image src="/images/Warehouse Technologies.png" alt="Dasza System" width={800} height={500} className="rounded-xl" />
          <div className="text-dasza-navy text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-semibold">Dasza System Information</h3>
            <p className="text-dasza-navy/80 mt-3">Our internal system tracks inventory, movements, KPIs, and documentation for each customer. Ask our team for a walkthrough.</p>
          </div>
        </section>

                {/* Trusted by Industry Leaders (infinite loop, LTR) */}
                <section className="w-full px-0 mt-10 md:mt-16 pb-4 md:pb-6">
  <div className="px-6">
    <Reveal>
      <h2 className="text-3xl md:text-4xl font-semibold text-dasza-navy mb-6 text-center">
        Trusted by Industry Leaders
      </h2>
    </Reveal>
  </div>

  <div className="partners-marquee-viewport">
    {/* gradient edge masks */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent" />
    <div className="partners-marquee-track">
      {(() => {
        // Randomize order on each render
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
        ];
        const logos = base.slice().sort(() => Math.random() - 0.5);
        const track = logos.concat(logos); // duplicate for seamless loop
        return track.map((src, i) => (
          <div key={i} className="partner-card h-28 w-64">
            <Image
              src={encodeURI(src)}
              alt="Partner"
              width={200}
              height={60}
              className="partner-logo max-h-12 md:max-h-14 w-auto opacity-90"
            />
          </div>
        ));
      })()}
    </div>
  </div>
</section>

        {/* See all partners link */}
                <div className="px-6 mt-0 text-right">
          <a href="/about#partners" className="inline-block font-semibold text-dasza-cyan hover:underline">See all →</a>
        </div>

        {/* Features */}
        <Section title="Why us" subtitle="">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="Immex AAA | OEA | CT-PAT | ISO" description="Compliance and certifications that matter." icon={<ShieldCheckIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Inventory control & visibility" description="Dasza System provides full inventory control, KPIs, and real‑time visibility for error‑free operations." icon={<ChartBarIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Operational Excellence" description="Disciplined processes, traceability, and KPI‑driven performance." icon={<Cog6ToothIcon className="h-7 w-7" aria-hidden />} />
          </div>
        </Section>

                {/* CTA Banner */}
                <section className="w-full py-20 bg-dasza-cyan text-center mt-10 md:mt-16 mb-24 md:mb-32">
          <h3 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">Ready to Optimize Your Logistics?</h3>
          <p className="mt-4 text-white/90 text-lg">Get in touch with our team for a customized solution.</p>
          <a href="/quote" className="inline-block mt-10 px-10 py-4 rounded-full bg-white text-dasza-cyan font-semibold shadow-lg hover:shadow-xl transition">Get Quote</a>
        </section>

        {/* Contact form near footer */}
        <section className="mx-auto max-w-7xl px-6 pb-24 text-dasza-navy">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-semibold text-dasza-navy mb-8 text-center">Contact Us</h2>
          </Reveal>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
