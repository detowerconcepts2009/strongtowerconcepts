import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BusinessHero from "@/components/business/BusinessHero";
import ServiceGrid from "@/components/business/ServiceGrid";
import BusinessCTA from "@/components/business/BusinessCTA";

export default function BusinessServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="mx-auto max-w-7xl space-y-12 px-6 py-12">
        <BusinessHero />

        <section>
          <div className="mb-8">
            <p className="font-semibold uppercase tracking-widest text-yellow-600">
              OUR SERVICES
            </p>

            <h2 className="mt-2 text-4xl font-bold text-blue-950">
              Professional Services
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              Access practical business, documentation, technology,
              educational and security services through Strong Tower Concepts.
            </p>
          </div>

          <ServiceGrid />
        </section>

        <BusinessCTA />
      </div>

      <Footer />
    </main>
  );
}