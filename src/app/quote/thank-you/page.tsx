import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 grid place-items-center text-center px-6">
        <div>
          <h1 className="text-3xl font-bold text-dasza-navy">Thank you!</h1>
          <p className="text-dasza-navy/80 mt-2">We received your request and will get back to you shortly.</p>
          <Link href="/" className="inline-block mt-6 px-5 py-3 rounded-full bg-dasza-cyan text-white hover:bg-dasza-cyan600">Back to Home</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}


