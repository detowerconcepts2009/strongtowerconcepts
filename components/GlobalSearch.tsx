"use client";

import { Search, Building2, Car, Briefcase } from "lucide-react";
import { useState } from "react";

export default function GlobalSearch() {
  const [category, setCategory] = useState("properties");

  return (
    <section className="relative -mt-16 z-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="rounded-3xl bg-white shadow-2xl border border-gray-100 p-8">

          <h2 className="text-3xl font-bold text-center text-blue-950">
            Search Everything
          </h2>

          <p className="text-center text-gray-500 mt-2">
            Find Properties, Vehicles or Professional Services.
          </p>

          {/* Tabs */}

          <div className="flex justify-center gap-4 mt-8 flex-wrap">

            <button
              onClick={() => setCategory("properties")}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 transition font-semibold ${
                category === "properties"
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Building2 size={18} />
              Properties
            </button>

            <button
              onClick={() => setCategory("vehicles")}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 transition font-semibold ${
                category === "vehicles"
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Car size={18} />
              Vehicles
            </button>

            <button
              onClick={() => setCategory("services")}
              className={`flex items-center gap-2 rounded-xl px-6 py-3 transition font-semibold ${
                category === "services"
                  ? "bg-blue-900 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <Briefcase size={18} />
              Professional Services
            </button>

          </div>

          {/* Search */}

          <div className="grid lg:grid-cols-4 gap-5 mt-10">

            <input
              className="border rounded-xl px-5 py-4 outline-none focus:border-blue-900"
              placeholder={
                category === "properties"
                  ? "Location..."
                  : category === "vehicles"
                  ? "Vehicle Brand..."
                  : "Service..."
              }
            />

            <input
              className="border rounded-xl px-5 py-4 outline-none focus:border-blue-900"
              placeholder="Keyword..."
            />

            <select className="border rounded-xl px-5 py-4 outline-none">

              <option>Any Price</option>

              <option>₦100,000</option>

              <option>₦500,000</option>

              <option>₦1,000,000</option>

            </select>

            <button className="rounded-xl bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold flex items-center justify-center gap-3">

              <Search size={20} />

              Search

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}