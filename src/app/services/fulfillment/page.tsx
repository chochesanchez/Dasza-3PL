import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function FulfillmentPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Fulfillment" subtitle="E-commerce and spare parts fulfillment; pick/pack; returns; multi-carrier." image="/images/Light Modern Warehouse Interior.jpg" />
        <section className="mx-auto max-w-7xl px-6 py-12 text-dasza-navy">
          <ul className="list-disc pl-6 space-y-2">
            <li>SLAs and carrier integrations.</li>
            <li>Serialized inventory and QA checks.</li>
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


