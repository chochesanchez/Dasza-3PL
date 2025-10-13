"use client"
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname()
  const hideCta = pathname === "/" || pathname?.startsWith("/contact") || pathname?.startsWith("/quote") || pathname?.startsWith("/about")
  return (
    <footer className="mt-16 border-t border-dasza-gray/40 bg-white">
      {!hideCta && (
        <div className="bg-dasza-cyan text-white">
          <div className="mx-auto max-w-7xl px-6 py-16 flex flex-col items-center text-center gap-4">
            <div className="text-2xl md:text-3xl font-extrabold">Ready to talk logistics?</div>
            <div className="text-white/90 max-w-2xl">Tell us about your needs and we’ll propose the best fit.</div>
            <Link href="/contact" className="px-8 py-3 rounded-full bg-white text-dasza-cyan font-semibold shadow-md hover:shadow-lg transition">Contact us</Link>
          </div>
        </div>
      )}
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-dasza-navy">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Image src="/images/Dasza Logistics Logo 2.png" alt="Dasza 3PL" width={32} height={32} />
            <h4 className="font-semibold text-dasza-navy">Dasza <span className="font-extrabold text-dasza-cyan">3PL</span></h4>
          </div>
          <p className="text-dasza-navy/80">Supply Chain solutions for your manufacturing company.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-dasza-cyan">About us</Link></li>
            <li><Link href="/services" className="hover:text-dasza-cyan">Services</Link></li>
            <li><Link href="/quote" className="hover:text-dasza-cyan">Get Quote</Link></li>
            <li><Link href="/contact" className="hover:text-dasza-cyan">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Services</h4>
          <ul className="space-y-2">
            <li><Link href="/services/warehousing" className="hover:text-dasza-cyan">Warehousing</Link></li>
            <li><Link href="/services/vmi" className="hover:text-dasza-cyan">VMI</Link></li>
            <li><Link href="/services/logistics" className="hover:text-dasza-cyan">Logistics</Link></li>
            <li><Link href="/services/customs" className="hover:text-dasza-cyan">Customs</Link></li>
            <li><Link href="/services/sorting" className="hover:text-dasza-cyan">Sorting</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li>Phone: <a href="tel:+528119161086" className="hover:text-dasza-cyan">+52 811916 1086</a></li>
            <li>Email: <a href="mailto:jmsanchez@dasza.com" className="hover:text-dasza-cyan">jmsanchez@dasza.com</a></li>
            <li>WhatsApp: <a href="https://wa.link/7av06w" target="_blank" className="hover:text-dasza-cyan">Chat with us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-dasza-gray/30 py-6 text-center text-xs text-dasza-navy/70">
        © {new Date().getFullYear()} Dasza 3PL. All rights reserved.
      </div>
    </footer>
  );
}


