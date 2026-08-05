"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  House,
  BriefcaseBusiness,
  Wallet,
  MessageSquare,
  UserCircle,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import { useDashboard } from "./context/DashboardContext";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    href: "/dashboard/properties",
    icon: House,
  },
  {
    title: "Marketplace",
    href: "/dashboard/marketplace",
    icon: BriefcaseBusiness,
  },
  {
    title: "Wallet",
    href: "/dashboard/wallet",
    icon: Wallet,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: UserCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const {
    sidebarOpen,
    closeSidebar,
  } = useDashboard();

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-72
          bg-[#071A35]
          text-white
          flex
          flex-col
          transform
          transition-transform
          duration-300
          lg:translate-x-0
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Mobile Close Button */}

        <div className="absolute right-4 top-4 lg:hidden">
          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        {/* Logo */}

        <div className="border-b border-white/10 p-7">
          <Image
            src="/images/logo/stc-logo.png"
            alt="STC"
            width={70}
            height={70}
            priority
            className="h-auto w-auto"
          />

          <h2 className="mt-6 text-4xl font-bold leading-tight">
            Strong Tower
          </h2>

          <p className="text-blue-200">
            Concepts
          </p>
        </div>

        {/* Navigation */}

        <nav className="flex-1 space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-5
                  py-4
                  transition
                  ${
                    active
                      ? "bg-blue-700"
                      : "hover:bg-white/10"
                  }
                `}
              >
                <Icon size={22} />

                <span className="font-medium">
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}

        <div className="border-t border-white/10 p-4">
          <button
            className="
              flex
              w-full
              items-center
              gap-4
              rounded-xl
              px-5
              py-4
              transition
              hover:bg-red-600
            "
          >
            <LogOut size={22} />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
}