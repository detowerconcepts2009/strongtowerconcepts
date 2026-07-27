"use client";

import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  title: string;
  children: ReactNode;
}

export default function DashboardLayout({
  title,
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">

      <DashboardSidebar />

      <div className="lg:ml-72">

        <DashboardHeader
          title={title}
        />

        <main className="p-6">

          {children}

        </main>

      </div>

    </div>
  );
}