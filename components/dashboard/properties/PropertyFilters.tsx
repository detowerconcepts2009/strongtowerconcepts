"use client";

import { Search } from "lucide-react";

interface PropertyFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function PropertyFilters({
  search,
  onSearchChange,
}: PropertyFiltersProps) {

  return (

    <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">

      <div>

        <h2 className="text-2xl font-bold text-slate-900">
          Properties
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage all your listed properties.
        </p>

      </div>

      <div className="relative w-full md:w-96">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            onSearchChange(e.target.value)
          }
          placeholder="Search properties..."
          className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-800"
        />

      </div>

    </div>

  );

}