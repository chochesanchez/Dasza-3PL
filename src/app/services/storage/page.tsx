import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function StoragePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Storage" subtitle="Bonded & general warehousing with serialized labeling and RF scanning." image="/images/Cargo Safety Temperature Control.jpg" />
        <Section className="pt-6">
          <Breadcrumbs items={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '#', label: 'Storage' },
          ]} />
        </Section>
        <section className="mx-auto max-w-7xl px-6 py-12 text-dasza-navy">
          <ul className="list-disc pl-6 space-y-2">
            <li>Cycle counts ≥99.8%, dock-to-stock ≤2h.</li>
            <li>Intermodal intake via Manzanillo, Altamira, Veracruz.</li>
            <li>Cross-dock to CEDIS and vendor-managed inventory.</li>
          </ul>
          <div className="mt-8">
            <a href="/quote" className="px-6 py-3 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">Get Quote</a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


