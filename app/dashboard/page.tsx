"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardCards from "@/components/dashboard/DashboardCards";
import WelcomeCard from "@/components/dashboard/WelcomeCard";

interface DashboardStats {
  walletBalance: number;
  properties: number;
  businesses: number;
  listings: number;
  messages: number;
}

interface DashboardUser {
  firstName: string;
  role: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    walletBalance: 0,
    properties: 0,
    businesses: 0,
    listings: 0,
    messages: 0,
  });

  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const [statsResponse, userResponse] = await Promise.all([
          fetch("/api/dashboard/stats", {
            cache: "no-store",
          }),
          fetch("/api/user/me", {
            cache: "no-store",
          }),
        ]);

        const statsResult = await statsResponse.json();
        const userResult = await userResponse.json();

        if (!mounted) return;

        if (statsResult.success) {
          setStats({
            walletBalance: Number(
              statsResult.stats?.walletBalance ?? 0
            ),
            properties: Number(
              statsResult.stats?.properties ?? 0
            ),
            businesses: Number(
              statsResult.stats?.businesses ?? 0
            ),
            listings: Number(
              statsResult.stats?.listings ?? 0
            ),
            messages: Number(
              statsResult.stats?.messages ?? 0
            ),
          });
        }

        if (userResult.success && userResult.user) {
          setUser({
            firstName: userResult.user.firstName || "",
            role: userResult.user.role || "",
          });
        }
      } catch (error) {
        console.error("Dashboard loading error:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading || !user) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="mt-8 rounded-3xl border border-blue-100 bg-white p-8 shadow-sm">
          <div className="animate-pulse">
            <div className="h-8 w-48 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-72 max-w-full rounded bg-slate-100" />

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="h-28 rounded-2xl bg-slate-100" />
              <div className="h-28 rounded-2xl bg-slate-100" />
              <div className="h-28 rounded-2xl bg-slate-100" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const isCustomer = user.role === "CUSTOMER";

  return (
    <DashboardLayout title="Dashboard">
      <WelcomeCard
        firstName={user.firstName}
        role={user.role}
      />

      {isCustomer ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Wallet Balance
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              ₦{stats.walletBalance.toLocaleString("en-NG")}
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Available balance for eligible STC
              services and transactions.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Marketplace
            </p>

            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Shop Interior Products
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Browse mattresses, pillows and other
              interior products.
            </p>

            <Link
              href="/marketplace/interior"
              className="mt-4 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Browse Catalogue
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <DashboardCards
            walletBalance={stats.walletBalance}
            properties={stats.properties}
            businesses={stats.businesses}
            listings={stats.listings}
            messages={stats.messages}
          />
        </div>
      )}
    </DashboardLayout>
  );
}