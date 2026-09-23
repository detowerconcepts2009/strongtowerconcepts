import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceGrid from "@/components/business/ServiceGrid";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            PROFESSIONAL SERVICES
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Practical Services. Trusted Solutions.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Strong Tower Concepts provides accessible business, identity,
            education, technology, branding and security services for
            individuals, entrepreneurs and organizations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-blue-950">
            Explore Our Services
          </h2>

          <p className="mt-3 max-w-3xl text-gray-600">
            Select a service below to learn more about the requirements,
            processing information and available support.
          </p>
        </div>

        <ServiceGrid />
      </section>

      <Footer />
    </main>
  );
}