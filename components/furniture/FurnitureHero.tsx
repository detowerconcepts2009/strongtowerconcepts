import Link from "next/link";

export default function FurnitureHero() {
  return (
    <section className="rounded-3xl bg-gradient-to-r from-amber-700 to-orange-500 px-8 py-20 text-white">

      <div className="max-w-4xl">

        <h1 className="text-5xl font-bold">
          Furniture & Mattress Marketplace
        </h1>

        <p className="mt-6 text-xl text-orange-100">
          Buy premium mattresses, office furniture, home furniture,
          hotel furniture, interior décor and more from verified
          sellers across Nigeria.
        </p>

        <div className="mt-10 flex gap-4">

          <Link
            href="/dashboard/furniture/upload"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-orange-700"
          >
            Sell Furniture
          </Link>

          <Link
            href="/marketplace/furniture"
            className="rounded-xl border border-white px-8 py-4 font-semibold"
          >
            Browse Furniture
          </Link>

        </div>

      </div>

    </section>
  );
}