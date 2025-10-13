import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Section from "@/components/ui/Section";
import FeatureCard from "@/components/ui/FeatureCard";

export default function SortingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader eyebrow="Dasza Services" title="Quality Control" subtitle="Inspection, rework, and containment" image="/images/Industrial Bliss Post.jpg" />
        <Section title="What you get" subtitle="Consistent quality and ready‑to‑ship product">
          <div className="grid md:grid-cols-3 gap-4">
            <FeatureCard title="Inspection & rework" description="Containment, inspection, rework, and disposition workflows." />
            <FeatureCard title="Kitting & repack" description="Light assembly, re‑labeling, and compliance packaging." />
            <FeatureCard title="On‑site teams" description="Dedicated teams with SLAs and hourly reporting." />
          </div>
        </Section>
        <Section>
          <a href="/quote" className="inline-block mt-2 px-6 py-3 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">Get Quote</a>
        </Section>
      </main>
      <Footer />
    </div>
  );
}


