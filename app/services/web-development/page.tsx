import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WebDevelopmentPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            ICT & DIGITAL SERVICES
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Website Development
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Build a professional online presence with modern websites,
            business portals, e-commerce platforms and custom web applications.
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
              Our Web Solutions
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                Business Websites
              </li>
              <li className="rounded-xl border p-4">
                E-commerce Websites
              </li>
              <li className="rounded-xl border p-4">
                Business Portals
              </li>
              <li className="rounded-xl border p-4">
                Custom Web Applications
              </li>
              <li className="rounded-xl border p-4">
                Website Redesign & Maintenance
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-950">
              Project Information
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                Business or project description
              </li>
              <li className="rounded-xl border p-4">
                Required website features
              </li>
              <li className="rounded-xl border p-4">
                Branding materials where available
              </li>
              <li className="rounded-xl border p-4">
                Domain name where applicable
              </li>
              <li className="rounded-xl border p-4">
                Preferred project timeline
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Build Your Online Presence
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Tell us what you need and our team will help define the right web
            solution for your business or organization.
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