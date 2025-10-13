import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import { TruckIcon, DocumentCheckIcon, MapPinIcon, CubeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function LastMilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Last-Mile" subtitle="Milk-runs, vendor pickups, B2B last-mile." image="/images/Dasza 3pl Home Page Image.png" />
        <Section className="pt-6">
          <Breadcrumbs items={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '#', label: 'Last-Mile' },
          ]} />
        </Section>
        <Section title="What you get" subtitle="On‑time deliveries per your schedule, with proof of delivery">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="On‑time delivery" description="Executed as requested with scheduled service windows." icon={<TruckIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Proof of delivery" description="POD photo/e‑signature provided upon completion." icon={<DocumentCheckIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Scheduled pickups" description="Milk‑runs, vendor pickups, and dock appointments." icon={<CalendarDaysIcon className="h-7 w-7" aria-hidden />} />
          </div>
        </Section>

        <Section title="Capabilities">
          <div className="text-center">
            <ul className="inline-block text-left list-disc pl-6 space-y-2 text-dasza-navy">
              <li>Palletized, parcel, and B2B store/plant deliveries.</li>
              <li>Milk‑runs and scheduled vendor pickups.</li>
              <li>Dock appointments, returns, and reverse logistics.</li>
              <li>On‑time KPI dashboards and root‑cause analysis.</li>
            </ul>
          </div>
        </Section>

        <Section title="Coverage & vehicle types">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-dasza-gray/30 bg-white shadow-sm p-5 flex items-start gap-3">
              <TruckIcon className="h-6 w-6 text-dasza-cyan mt-0.5" />
              <div>
                <div className="font-semibold text-dasza-navy">Urban deliveries</div>
                <div className="text-sm text-dasza-navy/80">Sprinters & 3.5T trucks for city routes</div>
              </div>
            </div>
            <div className="rounded-xl border border-dasza-gray/30 bg-white shadow-sm p-5 flex items-start gap-3">
              <MapPinIcon className="h-6 w-6 text-dasza-cyan mt-0.5" />
              <div>
                <div className="font-semibold text-dasza-navy">Intercity lanes</div>
                <div className="text-sm text-dasza-navy/80">Tractors for regional and milk‑run circuits</div>
              </div>
            </div>
            <div className="rounded-xl border border-dasza-gray/30 bg-white shadow-sm p-5 flex items-start gap-3">
              <CubeIcon className="h-6 w-6 text-dasza-cyan mt-0.5" />
              <div>
                <div className="font-semibold text-dasza-navy">Special handling</div>
                <div className="text-sm text-dasza-navy/80">Temperature control and secure packaging when needed</div>
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}


