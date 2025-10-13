import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import Image from "next/image";

export default function ServicesPage() {
  const items = [
    { title: 'IMMEX AAA Industrial | Shelter', href: '/services/door-to-door', img: '/images/Factory Modern Image.jpg' },
    { title: 'IMMEX AAA Services | VMI', href: '/services/vmi', img: '/images/Industrial Properties Mexico.jpg' },
    { title: 'Warehousing', href: '/services/warehousing', img: '/images/Cargo Safety Temperature Control.jpg' },
    { title: 'Logistics', href: '/services/logistics', img: '/images/Temperature Logistics Steps.jpg' },
    { title: 'Distribution / Last Mile', href: '/services/last-mile', img: '/images/Dasza 3pl Home Page Image.png' },
    { title: 'Door-to-Door for Manufacturing', href: '/services/door-to-door', img: '/images/door-to-door.png' },
  ]
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <PageHeader title="Services" subtitle="End-to-end 3PL for manufacturing" image="/images/Industrial Properties Mexico.jpg" />
        <section className="mx-auto max-w-7xl px-6 pt-10 pb-8 md:pt-12 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((c) => (
              <a key={c.title} href={c.href} className="group rounded-xl overflow-hidden border border-dasza-gray/40">
                <div className="relative h-40">
                  <Image src={c.img} alt="" fill className="object-cover" />
                </div>
                <div className="p-4 text-dasza-navy font-medium group-hover:text-dasza-cyan">{c.title}</div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


