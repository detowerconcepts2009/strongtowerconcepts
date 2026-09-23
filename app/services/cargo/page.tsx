import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CargoLogisticsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            CARGO & LOGISTICS
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Cargo & Logistics Services
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Logistics support for shipments between Nigeria and international
            destinations, including the UK, USA, Canada and Europe.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="rounded-xl bg-white px-7 py-3 font-semibold text-blue-950 transition hover:bg-blue-50"
            >
              Request Logistics Support
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
              Logistics Services
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                International Cargo Handling
              </li>
              <li className="rounded-xl border p-4">
                Shipment Coordination
              </li>
              <li className="rounded-xl border p-4">
                Freight & Delivery Support
              </li>
              <li className="rounded-xl border p-4">
                Cargo Documentation Assistance
              </li>
              <li className="rounded-xl border p-4">
                Destination & Delivery Coordination
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-blue-950">
              Shipment Information
            </h2>

            <ul className="mt-6 space-y-4 text-gray-700">
              <li className="rounded-xl border p-4">
                Origin and destination
              </li>
              <li className="rounded-xl border p-4">
                Description of items
              </li>
              <li className="rounded-xl border p-4">
                Estimated weight or quantity
              </li>
              <li className="rounded-xl border p-4">
                Preferred delivery timeline
              </li>
              <li className="rounded-xl border p-4">
                Sender and recipient information
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-blue-50 p-8">
          <h2 className="text-2xl font-bold text-blue-950">
            Planning a Shipment?
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-gray-600">
            Contact Strong Tower Concepts with your shipment details so we can
            discuss the appropriate logistics solution.
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