import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CargoPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-emerald-950 to-green-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            CARGO & LOGISTICS
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Moving Goods. Connecting Destinations.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-green-100">
            Logistics support connecting Nigeria with international
            destinations including the UK, USA, Canada and Europe.
          </p>

          <div className="mt-8">
            <Link
              href="/services/cargo"
              className="inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-green-950 transition hover:bg-green-50"
            >
              Explore Logistics Services
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-950">
              International Cargo
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Support for shipments between Nigeria and international
              destinations.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-950">
              Shipment Coordination
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Assistance with shipment planning, documentation and delivery
              coordination.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-950">
              Delivery Support
            </h2>
            <p className="mt-4 leading-7 text-gray-600">
              Support for coordinating cargo movement and delivery to the
              intended destination.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-blue-950 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">
            Planning a Shipment?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Contact us with your shipment details and let us discuss the
            appropriate logistics solution.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-blue-950 transition hover:bg-blue-50"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}