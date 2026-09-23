import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NINServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            IDENTITY SERVICES
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            NIN Services
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Get assistance with NIN-related services, documentation,
            modification, printing and verification support.
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
              className="rounded-xl border border-white px-7 py-3 font-semibold transition hover:bg-white/10"
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
              NIN Services Available
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">NIN Enrolment Assistance</li>
              <li className="rounded-xl border p-4">NIN Modification Support</li>
              <li className="rounded-xl border p-4">NIN Slip Printing</li>
              <li className="rounded-xl border p-4">NIN Verification Support</li>
              <li className="rounded-xl border p-4">
                NIN Documentation Assistance
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-950">
              Information Required
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                Applicant personal information
              </li>
              <li className="rounded-xl border p-4">
                Existing NIN details where applicable
              </li>
              <li className="rounded-xl border p-4">
                Valid identification documents where required
              </li>
              <li className="rounded-xl border p-4">
                Supporting documents for modification requests
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Need NIN Assistance?
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Contact Strong Tower Concepts to discuss your NIN service
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