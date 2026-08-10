"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  FaHome,
  FaBuilding,
  FaCar,
  FaCouch,
  FaUsers,
  FaClipboardCheck,
  FaGift,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

import { useDashboard } from "./context/DashboardContext";

const menus = [
  {
    name: "Dashboard",
    icon: FaHome,
    href: "/dashboard",
  },
  {
    name: "Properties",
    icon: FaBuilding,
    href: "/dashboard/properties",
  },
  {
    name: "Vehicles",
    icon: FaCar,
    href: "/dashboard/vehicles",
  },
  {
    name: "Furniture",
    icon: FaCouch,
    href: "/dashboard/furniture",
  },
  {
    name: "Users",
    icon: FaUsers,
    href: "/dashboard/users",
  },
  {
    name: "Inspections",
    icon: FaClipboardCheck,
    href: "/dashboard/inspections",
  },
  {
    name: "Vouchers",
    icon: FaGift,
    href: "/dashboard/vouchers",
  },
  {
    name: "Settings",
    icon: FaCog,
    href: "/dashboard/settings",
  },
];

export default function DashboardSidebar() {

  const router = useRouter();

  const {
    sidebarOpen,
    closeSidebar,
  } = useDashboard();

  async function handleLogout() {

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.replace("/login");

    router.refresh();

  }

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
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-auto bg-blue-950 text-white transition-transform duration-300

        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }

        lg:translate-x-0`}
      >

        {/* Mobile Close Button */}

        <div className="flex justify-end p-4 lg:hidden">

          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 hover:bg-blue-800"
          >

            <FaTimes size={20} />

          </button>

        </div>

        {/* Logo */}

        <div className="border-b border-blue-800 p-6">

          <h1 className="text-2xl font-bold">
            Strong Tower
          </h1>

          <p className="mt-1 text-sm text-blue-200">
            Dealer Dashboard
          </p>

        </div>

        {/* Menu */}

        <nav className="flex-1 p-4">

          {menus.map((menu) => {

            const Icon = menu.icon;

            return (

              <Link
                key={menu.name}
                href={menu.href}
                onClick={closeSidebar}
                className="mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-blue-800"
              >

                <Icon className="text-lg" />

                <span>{menu.name}</span>

              </Link>

            );

          })}

        </nav>

        {/* Logout */}

        <div className="border-t border-blue-800 p-4">

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-red-700"
          >

            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>

    </>
  );

}