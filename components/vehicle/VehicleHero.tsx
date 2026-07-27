import Link from "next/link";

export default function VehicleHero() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-blue-950 to-blue-700 px-8 py-20 text-white">

      <div className="max-w-4xl">

        <h1 className="text-5xl font-bold leading-tight">
          Buy & Sell Verified Vehicles
        </h1>

        <p className="mt-6 text-xl text-blue-100">
          Find trusted cars from verified dealers. Every listing is
          designed to support VIN verification, inspection reports,
          ownership history and secure transactions.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <Link
            href="/marketplace/vehicles"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-900"
          >
            Browse Vehicles
          </Link>

          <Link
            href="/dashboard/vehicles/upload"
            className="rounded-xl border border-white px-8 py-4 font-semibold"
          >
            Sell Your Vehicle
          </Link>

        </div>

      </div>

    </section>
  );
}