"use client";

export default function VehicleFilters() {

  return (

    <aside className="space-y-6 rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-blue-950">

        Filter Vehicles

      </h2>

      <select className="w-full rounded-xl border p-3">
        <option>Manufacturer</option>
        <option>Toyota</option>
        <option>Lexus</option>
        <option>Mercedes-Benz</option>
        <option>Honda</option>
        <option>BMW</option>
      </select>

      <select className="w-full rounded-xl border p-3">
        <option>Transmission</option>
        <option>Automatic</option>
        <option>Manual</option>
      </select>

      <select className="w-full rounded-xl border p-3">
        <option>Fuel Type</option>
        <option>Petrol</option>
        <option>Diesel</option>
        <option>Hybrid</option>
        <option>Electric</option>
      </select>

      <select className="w-full rounded-xl border p-3">
        <option>Condition</option>
        <option>Brand New</option>
        <option>Foreign Used</option>
        <option>Nigerian Used</option>
      </select>

      <select className="w-full rounded-xl border p-3">
        <option>Price Range</option>
        <option>Below ₦5M</option>
        <option>₦5M - ₦10M</option>
        <option>₦10M - ₦20M</option>
        <option>₦20M - ₦50M</option>
        <option>Above ₦50M</option>
      </select>

      <label className="flex items-center gap-3">

        <input type="checkbox" />

        <span>VIN Verified Only</span>

      </label>

      <button className="w-full rounded-xl bg-blue-900 py-3 font-semibold text-white">

        Apply Filters

      </button>

    </aside>

  );

}