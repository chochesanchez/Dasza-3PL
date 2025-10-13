import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";
import { ArrowsRightLeftIcon, ShieldCheckIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function DoorToDoorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Door-to-Door for Manufacturing" subtitle="End-to-end logistics for plants and suppliers" image="/images/door-to-door.png" />
        <Section className="pt-6">
          <Breadcrumbs items={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '#', label: 'Door-to-Door' },
          ]} />
        </Section>
        <Section title="What you get" subtitle="End‑to‑end execution from vendor to plant">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="Plant‑to‑plant flow" description="Vendor pickups, consolidation, and line‑side delivery." icon={<ArrowsRightLeftIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Customs & compliance" description="IMMEX/OEA alignment and cross‑border management." icon={<ShieldCheckIcon className="h-7 w-7" aria-hidden />} />
            <FeatureCard title="Performance & KPIs" description="On‑time and damage‑free metrics with dashboards." icon={<ChartBarIcon className="h-7 w-7" aria-hidden />} />
          </div>
        </Section>
        <Section title="Scope">
          <div className="text-center">
          <ul className="inline-block text-left list-disc pl-6 space-y-2 text-dasza-navy">
            <li>Inbound/outbound, customs, and last‑mile to plant.</li>
            <li>Milk‑runs, dock appointments, and reverse logistics.</li>
            <li>Packaging, labeling, and documentation as required.</li>
          </ul>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}


