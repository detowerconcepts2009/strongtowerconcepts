"use client";

import { useEffect, useState } from "react";

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

  const [user, setUser] = useState<DashboardUser>({
    firstName: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [
          statsResponse,
          userResponse,
        ] = await Promise.all([
          fetch("/api/dashboard/stats", {
            cache: "no-store",
          }),
          fetch("/api/user/me", {
            cache: "no-store",
          }),
        ]);

        const statsResult =
          await statsResponse.json();

        const userResult =
          await userResponse.json();

        if (statsResult.success) {
          setStats({
            walletBalance: Number(
              statsResult.stats.walletBalance
            ),
            properties:
              statsResult.stats.properties,
            businesses:
              statsResult.stats.businesses,
            listings:
              statsResult.stats.listings,
            messages:
              statsResult.stats.messages,
          });
        }

        if (
          userResult.success &&
          userResult.user
        ) {
          setUser({
            firstName:
              userResult.user.firstName,
            role:
              userResult.user.role,
          });
        }
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const isCustomer =
    user.role === "CUSTOMER";

  return (
    <DashboardLayout title="Dashboard">
      <WelcomeCard
        firstName={user.firstName}
      />

      {isCustomer ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Wallet Balance
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              ₦
              {loading
                ? "0"
                : stats.walletBalance.toLocaleString(
                    "en-NG"
                  )}
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

            <a
              href="/marketplace/interior"
              className="mt-4 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
            >
              Browse Catalogue
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6">
            <DashboardCards
              walletBalance={
                loading
                  ? 0
                  : stats.walletBalance
              }
              properties={
                loading
                  ? 0
                  : stats.properties
              }
              businesses={
                loading
                  ? 0
                  : stats.businesses
              }
              listings={
                loading
                  ? 0
                  : stats.listings
              }
              messages={
                loading
                  ? 0
                  : stats.messages
              }
            />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}