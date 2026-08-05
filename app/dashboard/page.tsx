"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface DashboardStats {
  walletBalance: number;
  properties: number;
  businesses: number;
  messages: number;
}

export default function DashboardPage() {

  const [stats, setStats] =
    useState<DashboardStats>({
      walletBalance: 0,
      properties: 0,
      businesses: 0,
      messages: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadDashboard() {

      try {

        const response =
          await fetch("/api/dashboard/stats");

        const result =
          await response.json();

if (result.success) {

  setStats({

    walletBalance: Number(result.stats.walletBalance),

    properties: result.stats.properties,

    businesses: result.stats.businesses,

    messages: result.stats.messages,

  });

}

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    }

    loadDashboard();

  }, []);

  return (

    <DashboardLayout
      title="Dashboard"
    >

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Wallet */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500 text-sm">
            Wallet Balance
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {
              loading
                ? "Loading..."
                : `₦${stats.walletBalance.toLocaleString()}`
            }

          </h2>

        </div>

        {/* Properties */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500 text-sm">
            Properties
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {
              loading
                ? "Loading..."
                : stats.properties
            }

          </h2>

        </div>

        {/* Businesses */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500 text-sm">
            Businesses
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {
              loading
                ? "Loading..."
                : stats.businesses
            }

          </h2>

        </div>

        {/* Messages */}

        <div className="bg-white rounded-2xl shadow-sm p-6">

          <p className="text-slate-500 text-sm">
            Messages
          </p>

          <h2 className="mt-2 text-3xl font-bold">

            {
              loading
                ? "Loading..."
                : stats.messages
            }

          </h2>

        </div>

      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm p-8">

        <h2 className="text-2xl font-bold">

          Welcome to Strong Tower Concepts

        </h2>

        <p className="mt-4 text-slate-600">

          Your dashboard is now powered by live data from the backend.

        </p>

      </div>

    </DashboardLayout>

  );

}