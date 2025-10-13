import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import { QrCodeIcon, ChartBarIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import Gallery from "@/components/ui/Gallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function WarehousingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader eyebrow="Dasza Services" title="Warehousing" subtitle="Automotive, refrigeration & general" image="/images/Cargo Safety Temperature Control.jpg" />
        <Section className="pt-6">
          <Breadcrumbs items={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '#', label: 'Warehousing' },
          ]} />
        </Section>

        <Section title="What you get" subtitle="Inventory integrity, safety, and speed to operations">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="Serialized inventory + RF" description="Labeling, scanning, and full traceability from dock to location." icon={<QrCodeIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title= "Performance KPIs" description="Cycle count ≥99.8%, dock‑to‑stock ≤2 hours, damage ≤0.2%." icon={<ChartBarIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Compliance & safety" description="IMMEX/OEA aligned processes, temperature control, chain‑of‑custody." icon={<ShieldCheckIcon className="h-7 w-7" aria-hidden />} />
          </div>
        </Section>

        <Section id="capabilities" title="Capabilities">
          <div className="text-center">
          <ul className="inline-block text-left list-disc pl-6 space-y-2 text-dasza-navy">
            <li>Bonded & general storage areas with dedicated zones by customer and product class.</li>
            <li>Put‑away and pick strategies optimized per SKU dimensions and velocity.</li>
            <li>Cross‑dock for inbound containers and domestic milk runs.</li>
            <li>Quality inspection, rework, packing, and kitting.</li>
          </ul>
          </div>
          {/* CTA removed to keep only one CTA at the bottom */}
        </Section>

        <Section id="gallery" title="Gallery">
          <Gallery images={[
            '/images/Light Modern Warehouse Interior.jpg',
            '/images/Light Modern Warehouse Photo.jpg',
            '/images/Warehouse Stock Photo.jpg',
            '/images/Industrial Warehouse AI Image.jpg',
            '/images/Forklift Driver Warehouse.jpg',
            '/images/Highbay Osram.jpg',
          ]} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}


