"use client";

export default function FurnitureFilters() {

  return (

    <aside className="space-y-5 rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-orange-700">

        Filter Furniture

      </h2>

      <select className="w-full rounded-xl border p-3">
        <option>Category</option>
        <option>Mattress</option>
        <option>Office Furniture</option>
        <option>Living Room</option>
        <option>Bedroom</option>
        <option>Dining</option>
      </select>

      <select className="w-full rounded-xl border p-3">
        <option>Brand</option>
        <option>Vitafoam</option>
        <option>Mouka</option>
        <option>Mouka Foams</option>
        <option>Royal</option>
      </select>

      <select className="w-full rounded-xl border p-3">
        <option>Condition</option>
        <option>Brand New</option>
        <option>Used</option>
      </select>

      <select className="w-full rounded-xl border p-3">
        <option>Price Range</option>
        <option>Below ₦100,000</option>
        <option>₦100,000 - ₦500,000</option>
        <option>₦500,000 - ₦1,000,000</option>
        <option>Above ₦1,000,000</option>
      </select>

      <button className="w-full rounded-xl bg-orange-600 py-3 font-semibold text-white">

        Apply Filters

      </button>

    </aside>

  );

}