"use client";

import { Search } from "lucide-react";

export default function MarketplaceSearch() {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold text-blue-950">
        Search the Marketplace
      </h2>

      <div className="grid gap-4 lg:grid-cols-5">

        <div className="relative lg:col-span-2">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search properties, vehicles, furniture..."
            className="w-full rounded-xl border py-4 pl-12 pr-4"
          />

        </div>

        <select className="rounded-xl border p-4">
          <option>All Categories</option>
          <option>Properties</option>
          <option>Vehicles</option>
          <option>Furniture & Mattresses</option>
          <option>Electronics</option>
          <option>Professional Services</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          className="rounded-xl border p-4"
        />

        <button className="rounded-xl bg-blue-900 font-semibold text-white hover:bg-blue-950">
          Search
        </button>

      </div>

    </section>
  );
}