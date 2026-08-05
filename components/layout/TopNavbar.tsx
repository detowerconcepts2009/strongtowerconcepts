"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";

interface TopNavbarProps {
  title?: string;
  onMenuClick?: () => void;
}

export default function TopNavbar({
  title = "Dashboard",
  onMenuClick,
}: TopNavbarProps) {
  const [notifications] = useState(2);
    return (
    <header className="h-20 bg-white border-b border-slate-200 px-6 flex items-center justify-between">

      <div className="flex items-center gap-4">

        <button
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu size={26} />
        </button>

        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <Image
            src="/images/logo/stc-logo.png"
            alt="Strong Tower Concepts"
            width={48}
            height={48}
            className="h-12 w-auto"
            priority
          />

          <div className="hidden md:block">

            <h1 className="text-lg font-bold text-slate-900">
              {title}
            </h1>

            <p className="text-xs text-slate-500">
              Strong Tower Concepts
            </p>

          </div>

        </Link>

      </div>

      <div className="hidden lg:flex items-center w-full max-w-xl mx-10">

        <div className="relative w-full">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search properties, businesses, vehicles..."
            className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
          />

        </div>

      </div>
            <div className="flex items-center gap-6">

        <button className="relative">

          <Bell
            size={22}
            className="text-slate-700"
          />

          {notifications > 0 && (

            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-[11px] flex items-center justify-center">

              {notifications}

            </span>

          )}

        </button>

        <div className="relative group">

          <button className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold">

              ST

            </div>

            <div className="hidden md:block text-left">

              <div className="font-semibold text-slate-900">
                Strong Tower User
              </div>

              <div className="text-xs text-slate-500">
                Customer Account
              </div>

            </div>

          </button>

          <div className="absolute right-0 mt-4 w-56 rounded-2xl bg-white shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

            <Link
              href="/dashboard/profile"
              className="block px-5 py-3 hover:bg-slate-50"
            >
              My Profile
            </Link>

            <Link
              href="/dashboard/settings"
              className="block px-5 py-3 hover:bg-slate-50"
            >
              Settings
            </Link>

            <hr />

            <button
              className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>

          </div>

        </div>

      </div>
          </header>
  );
}