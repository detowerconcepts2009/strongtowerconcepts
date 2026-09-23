import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CACRegistrationPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            PROFESSIONAL SERVICES
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            CAC Registration Services
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Get professional assistance with business registration and
            corporate documentation through the Corporate Affairs Commission
            process.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-blue-950 transition hover:bg-blue-50"
            >
              Get Started
            </Link>

            <Link
              href="/services"
              className="rounded-xl border border-white px-7 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-950">
              Services Available
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                Business Name Registration
              </li>
              <li className="rounded-xl border p-4">
                Company Incorporation
              </li>
              <li className="rounded-xl border p-4">
                NGO Registration
              </li>
              <li className="rounded-xl border p-4">
                Corporate Documentation Support
              </li>
              <li className="rounded-xl border p-4">
                Post-Registration Support
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-950">
              What You Need
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                Proposed business or company name
              </li>
              <li className="rounded-xl border p-4">
                Applicant or director information
              </li>
              <li className="rounded-xl border p-4">
                Valid identification documents where applicable
              </li>
              <li className="rounded-xl border p-4">
                Contact and business information
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Need Assistance?
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Contact Strong Tower Concepts to discuss your registration
            requirements and receive guidance on the appropriate process.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-blue-950 px-7 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            Contact Strong Tower Concepts
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}