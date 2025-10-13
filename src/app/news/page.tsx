import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";

export default function NewsPage() {
  const items = [
    { title: 'USMCA Automotive Rules Update', href: 'https://ustr.gov/', source: 'USTR' },
    { title: 'SAT Customs Bulletin', href: 'https://www.sat.gob.mx/', source: 'SAT' },
    { title: 'CBP Cargo Systems Message Service', href: 'https://www.cbp.gov/', source: 'CBP' },
  ]
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="International Trade News" subtitle="Curated links to official sources" image="/images/Industrial Bliss Post.jpg" />
        <section className="mx-auto max-w-5xl px-6 py-12 text-dasza-navy">
          <ul className="space-y-4">
            {items.map((i) => (
              <li key={i.title} className="border rounded-xl p-4">
                <a href={i.href} target="_blank" rel="noopener" className="text-dasza-cyan hover:text-dasza-cyan600 font-medium">{i.title}</a>
                <div className="text-sm text-dasza-navy/70">Source: {i.source}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}


