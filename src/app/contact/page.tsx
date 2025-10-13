import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/ui/PageHeader";
import MapComponent from "@/components/ui/MapComponent";
import ContactForm from "@/components/ui/ContactForm";
import GoogleMapsScript from "@/components/shared/GoogleMapsScript";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <GoogleMapsScript />
        <PageHeader title="Contact" subtitle="Let’s discuss your logistics needs" image="/images/Industrial Bliss Post.jpg" />
        {/* Single form section replicating DLT layout (form + info sidebar comes from ContactForm) */}
        <section className="mx-auto max-w-5xl px-6 pb-16 text-dasza-navy">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center mt-6">Contact Us</h3>
          <ContactForm />
        </section>
        {/* Floating WhatsApp widget removed per request */}
      </main>
      <Footer />
    </div>
  );
}


