import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            CONTACT US
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Let&apos;s Work Together
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Whether you need business registration, technology services,
            marketplace support, logistics or other professional solutions,
            Strong Tower Concepts is ready to assist.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-blue-950">
              Business Enquiries
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Contact us for information about our services, partnerships,
              marketplace and business solutions.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-blue-950">
              Service Support
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Our team can guide you through the requirements and processing
              steps for the service you need.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-blue-950">
              Become a Partner
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Professionals and service providers can join our growing
              business solutions network.
            </p>

            <Link
              href="/partner"
              className="mt-6 inline-flex rounded-xl bg-blue-950 px-6 py-3 font-semibold text-white transition hover:bg-blue-900"
            >
              Become a Partner
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-blue-950">
            Send an Enquiry
          </h2>

          <p className="mt-3 text-gray-600">
            Please contact Strong Tower Concepts through your preferred
            communication channel.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Website
              </p>
              <p className="mt-2 font-semibold text-blue-950">
                strongtowerconcepts.com.ng
              </p>
            </div>

            <div className="rounded-xl border border-gray-200 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                Service Portal
              </p>
              <Link
                href="/services"
                className="mt-2 inline-block font-semibold text-blue-700 hover:underline"
              >
                Explore Professional Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}