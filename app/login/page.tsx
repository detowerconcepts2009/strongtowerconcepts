"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  Building2,
  BadgeCheck,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 flex">

      {/* LEFT PANEL */}
      <section className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#071A35] via-[#0B2447] to-[#123A67] text-white p-14 flex-col justify-between">

        <div>

          <Image
            src="/images/logo/stc-logo.png"
            alt="Strong Tower Concepts"
            width={130}
            height={130}
            className="h-auto"
            priority
          />

          <div className="mt-4">

            <h1 className="text-5xl font-extrabold leading-tight">
              Strong Tower
              <br />
              Concepts
            </h1>

            <p className="mt-6 text-lg text-blue-100 leading-8">
              Nigeria's trusted digital marketplace for property,
              business services, professional solutions and secure
              online transactions.
            </p>

          </div>

        </div>

        <div className="space-y-6">
                      <div className="space-y-5">

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Secure Platform
                </h3>
                <p className="text-blue-100 text-sm">
                  Verified users and trusted transactions.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <Building2 size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Business Marketplace
                </h3>
                <p className="text-blue-100 text-sm">
                  Property, vehicles, furniture and professional services.
                </p>
              </div>

            </div>

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                <BadgeCheck size={24} />
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  Trusted Listings
                </h3>
                <p className="text-blue-100 text-sm">
                  Quality listings reviewed before publication.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* RIGHT PANEL */}

      <section className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

          <div className="lg:hidden flex justify-center mb-8">

            <Image
              src="/images/logo/stc-logo.png"
              alt="STC"
              width={120}
              height={120}
              className="h-auto"
              priority
            />

          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            Sign in to continue to your dashboard.
          </p>

          <form className="space-y-6">
                        <div>

              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>
                        <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 cursor-pointer">

                <input
                  type="checkbox"
                  className="rounded border-slate-300"
                />

                <span>Remember me</span>

              </label>

              <Link
                href="/forgot-password"
                className="text-blue-700 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 transition"
            >
              Sign In
            </button>

          </form>

          <div className="mt-8 text-center text-sm text-slate-600">

            Don't have an account?{" "}

            <Link
              href="/register"
              className="text-blue-700 font-semibold hover:underline"
            >
              Create one
            </Link>

          </div>

        </div>

      </section>
          </main>
  );
}