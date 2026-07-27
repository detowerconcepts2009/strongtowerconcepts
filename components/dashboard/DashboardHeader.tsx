"use client";

import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

interface DashboardHeaderProps {
  title: string;
}

export default function DashboardHeader({
  title,
}: DashboardHeaderProps) {

  return (

    <header className="sticky top-0 z-30 flex items-center justify-between border-b bg-white px-8 py-5 shadow-sm">

      <div>

        <h1 className="text-3xl font-bold text-blue-950">
          {title}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Welcome back to Strong Tower Concepts.
        </p>

      </div>

      <div className="flex items-center gap-6">

        <div className="relative">

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border px-12 py-3 outline-none focus:border-blue-900"
          />

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

        </div>

        <button className="relative">

          <FaBell className="text-2xl text-blue-950" />

          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            3
          </span>

        </button>

        <FaUserCircle className="text-4xl text-blue-950" />

      </div>

    </header>

  );

}