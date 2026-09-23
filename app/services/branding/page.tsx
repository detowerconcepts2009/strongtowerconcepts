import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BrandingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            CREATIVE & BRANDING SERVICES
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Branding & Graphics
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Build a strong visual identity for your business with professional
            branding, graphic design and promotional materials.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-blue-950 transition hover:bg-blue-50"
            >
              Start a Project
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
              Branding Services
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">Logo Design</li>
              <li className="rounded-xl border p-4">
                Business Identity Design
              </li>
              <li className="rounded-xl border p-4">
                Flyers & Promotional Designs
              </li>
              <li className="rounded-xl border p-4">
                Banners & Marketing Materials
              </li>
              <li className="rounded-xl border p-4">
                Business Cards & Print Designs
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-950">
              Project Information
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                Business or organization name
              </li>
              <li className="rounded-xl border p-4">
                Description of the design requirement
              </li>
              <li className="rounded-xl border p-4">
                Preferred style or branding direction
              </li>
              <li className="rounded-xl border p-4">
                Existing logo or brand materials where applicable
              </li>
              <li className="rounded-xl border p-4">
                Required file formats or print specifications
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Give Your Business a Strong Identity
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Contact Strong Tower Concepts to discuss your branding and graphic
            design requirements.
          </p>

          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-blue-950 px-7 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}