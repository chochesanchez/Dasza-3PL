import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";

export default function CustomsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader eyebrow="Dasza Services" title="Customs" subtitle="Main ports and borders in Mexico" image="/images/Highbay Osram.jpg" />
        <Section title="What you get" subtitle="Compliance, speed, and zero surprises">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="Brokerage + IMMEX" description="Import/export handling, IMMEX operations, and virtual transfers." />
            <FeatureCard title="Digital compliance" description="VUCEM, pedimentos, and Carta Porte validation workflows." />
            <FeatureCard title="Audit readiness" description="Documentation accuracy and traceability to pass audits." />
          </div>
          <a href="/quote" className="inline-block mt-8 px-6 py-3 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">Get Quote</a>
        </Section>
      </main>
      <Footer />
    </div>
  );
}


