import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import { TruckIcon, ClipboardDocumentListIcon, UsersIcon } from '@heroicons/react/24/outline'
import Gallery from "@/components/ui/Gallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function VMIPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader eyebrow="Dasza Services" title="VMI" subtitle="Representing your company in Mexico" image="/images/Industrial Properties Mexico.jpg" />
        <Section className="pt-6">
          <Breadcrumbs items={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '#', label: 'VMI' },
          ]} />
        </Section>
        <Section title="What you get" subtitle="Production continuity, lower inventory, and full visibility">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="Milk‑runs + line‑side" description="Scheduled vendor pickups, plant milk‑runs, and line‑side delivery." icon={<TruckIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Planning + safety stock" description="Cycle counts, ASN, reorder points, and safety stock enforcement." icon={<ClipboardDocumentListIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Supplier orchestration" description="Coordination with suppliers and compliance reporting." icon={<UsersIcon className="h-7 w-7" aria-hidden />} />
          </div>
        </Section>
        <Section title="Capabilities">
          <div className="text-center">
          <ul className="inline-block text-left list-disc pl-6 space-y-2 text-dasza-navy">
            <li>Vendor hubs and consolidation for international suppliers.</li>
            <li>Inventory ownership models: consignment, VMI, or transfer at dock.</li>
            <li>Forecast sharing, S&OP cadence, and exception dashboards.</li>
            <li>ASN and labeling compliance for receiving accuracy.</li>
          </ul>
          </div>
          {/* CTA removed to keep only one CTA at the bottom */}
        </Section>
        <Section title="Gallery">
          <Gallery images={[
            '/images/Factory Modern Image.jpg',
            '/images/Industrial Properties Mexico.jpg',
            '/images/Industrial Bliss Post.jpg',
          ]} />
        </Section>
      </main>
      <Footer />
    </div>
  );
}


