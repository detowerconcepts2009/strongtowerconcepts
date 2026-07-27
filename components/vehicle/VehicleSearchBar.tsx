"use client";

export default function VehicleSearchBar() {

  return (

    <section className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="grid gap-4 md:grid-cols-5">

        <input
          type="text"
          placeholder="Search vehicle..."
          className="rounded-xl border p-4"
        />

        <input
          type="text"
          placeholder="Manufacturer"
          className="rounded-xl border p-4"
        />

        <input
          type="text"
          placeholder="Model"
          className="rounded-xl border p-4"
        />

        <input
          type="number"
          placeholder="Year"
          className="rounded-xl border p-4"
        />

        <button
          className="rounded-xl bg-blue-900 p-4 font-semibold text-white hover:bg-blue-950"
        >
          Search Vehicles
        </button>

      </div>

    </section>

  );

}