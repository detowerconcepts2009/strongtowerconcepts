"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Wallet,
  Building2,
  UserCircle2,
  LayoutDashboard,
  House,
  BriefcaseBusiness,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";

export default function DashboardPage() {

  return (

    <main className="min-h-screen bg-slate-100 flex">
             {/* SIDEBAR */}

      <aside className="hidden lg:flex w-72 bg-[#071A35] text-white flex-col">

        <div className="p-8 border-b border-white/10">

          <Image
            src="/images/logo/stc-logo.png"
            alt="STC"
            width={70}
            height={70}
            className="h-auto w-auto"
            priority
          />

          <h2 className="mt-4 text-2xl font-bold">
            Strong Tower
          </h2>

          <p className="text-blue-200 text-sm">
            Concepts
          </p>

        </div>

        <nav className="flex-1 p-5 space-y-2">

          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-xl bg-blue-700 px-4 py-3"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/properties"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition"
          >
            <House size={20} />
            Properties
          </Link>

          <Link
            href="/marketplace"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition"
          >
            <BriefcaseBusiness size={20} />
            Marketplace
          </Link>

          <Link
            href="/wallet"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition"
          >
            <Wallet size={20} />
            Wallet
          </Link>

          <Link
            href="/messages"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition"
          >
            <MessageSquare size={20} />
            Messages
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition"
          >
            <UserCircle2 size={20} />
            Profile
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/10 transition"
          >
            <Settings size={20} />
            Settings
          </Link>

        </nav>

        <div className="p-5 border-t border-white/10">

          <button className="w-full flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-red-600 transition">
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>

      {/* MAIN CONTENT */}

      <section className="flex-1">
              {/* TOP BAR */}

      <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <button className="lg:hidden">
            <Menu size={24} />
          </button>

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Dashboard
            </h1>

            <p className="text-slate-500 text-sm">
              Welcome back to Strong Tower Concepts.
            </p>

          </div>

        </div>

        <div className="flex items-center gap-6">

          <button className="relative">

            <Bell
              size={24}
              className="text-slate-700"
            />

            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-600"></span>

          </button>

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-full bg-blue-800 text-white flex items-center justify-center font-bold">
              ST
            </div>

            <div>

              <h3 className="font-semibold">
                Strong Tower User
              </h3>

              <p className="text-xs text-slate-500">
                Customer Account
              </p>

            </div>

          </div>

        </div>

      </header>

      <div className="p-8">
               {/* DASHBOARD CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Wallet Balance
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  ₦0.00
                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

                <Wallet
                  size={28}
                  className="text-blue-700"
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Properties
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  0
                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">

                <House
                  size={28}
                  className="text-green-700"
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Businesses
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  0
                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center">

                <Building2
                  size={28}
                  className="text-orange-700"
                />

              </div>

            </div>

          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-slate-500 text-sm">
                  Messages
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  0
                </h2>

              </div>

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

                <MessageSquare
                  size={28}
                  className="text-purple-700"
                />

              </div>

            </div>

          </div>

        </div> 
                <div className="mt-8 bg-white rounded-2xl shadow-sm p-8">

          <h2 className="text-2xl font-bold text-slate-900">
            Welcome to Strong Tower Concepts
          </h2>

          <p className="mt-4 text-slate-600 leading-8">
            Your dashboard is now ready.
            From here you'll be able to manage your wallet,
            properties, marketplace listings, messages,
            transactions and every other activity on the STC platform.
          </p>

        </div>

      </div>

      </section>

    </main>

  );

}
