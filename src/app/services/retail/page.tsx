import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function RetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Retail" subtitle="Store/DC deliveries, compliance labeling, ASN/EDI to carriers." image="/images/Industrial Warehouse AI Image.jpg" />
        <Section className="pt-6">
          <Breadcrumbs items={[
            { href: '/', label: 'Home' },
            { href: '/services', label: 'Services' },
            { href: '#', label: 'Retail' },
          ]} />
        </Section>
        <section className="mx-auto max-w-7xl px-6 py-12 text-dasza-navy">
          <ul className="list-disc pl-6 space-y-2">
            <li>Retail compliance and labeling.</li>
            <li>Reverse logistics for returns.</li>
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


