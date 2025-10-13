import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import { GlobeAltIcon, ArrowPathRoundedSquareIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Gallery from "@/components/ui/Gallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function LogisticsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader eyebrow="Dasza Services" title="Logistics" subtitle="Freight forwarding & domestic distribution" image="/images/Temperature Logistics Steps.jpg" />
        <Section className="pt-6">
          <Breadcrumbs items={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '#', label: 'Logistics' },
          ]} />
        </Section>
        <Section title="What you get" subtitle="On‑time flow from port to plant">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="Intermodal gateways" description="Manzanillo, Altamira, Veracruz with cross‑dock and drayage." icon={<GlobeAltIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Distribution & milk‑runs" description="From CEDIS to stores or plants with POD visibility." icon={<ArrowPathRoundedSquareIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Carrier performance" description="On‑time rate dashboards and proactive exception handling." icon={<ChartBarIcon className="h-7 w-7" aria-hidden />} />
          </div>
        </Section>
        <Section title="Capabilities">
          <div className="text-center">
          <ul className="inline-block text-left list-disc pl-6 space-y-2 text-dasza-navy">
            <li>Port drayage and customs coordination.</li>
            <li>FTL/LTL network with KPI tracking and scorecards.</li>
            <li>Consolidation and deconsolidation at regional hubs.</li>
            <li>Temperature control and special handling when required.</li>
          </ul>
          </div>
          {/* CTA removed to keep only one CTA at the bottom */}
        </Section>
        <Section title="Gallery">
          <Gallery images={[
            '/images/Temperature Logistics Steps.jpg',
            '/images/Temperature Control Technologies.jpg',
            '/images/Temperature Control Methods for Delivery.jpg',
          ]} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}


