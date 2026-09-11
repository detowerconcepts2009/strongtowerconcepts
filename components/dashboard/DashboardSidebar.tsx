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
  FaBoxes,
  FaShoppingCart,
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
    name: "Catalogue",
    icon: FaBoxes,
    href: "/dashboard/catalogue",
  },
  {
    name: "Orders",
    icon: FaShoppingCart,
    href: "/dashboard/orders",
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
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error(
        "Logout error:",
        error
      );
    } finally {
      router.replace("/login");
      router.refresh();
    }
  }

  return (
    <>
      {/* MOBILE OVERLAY */}

      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/50 xl:hidden"
        />
      )}

      {/* SIDEBAR */}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-auto bg-blue-950 text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        } xl:translate-x-0`}
      >
        {/* MOBILE CLOSE BUTTON */}

        <div className="flex justify-end p-4 xl:hidden">
          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 hover:bg-blue-800"
            aria-label="Close sidebar"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* LOGO */}

        <div className="border-b border-blue-800 p-6">
          <Link
            href="/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo/stc-logo.png"
              alt="Strong Tower Concepts"
              className="h-14 w-14 object-contain"
            />

            <div>
              <h1 className="text-lg font-bold">
                Strong Tower
              </h1>

              <p className="text-sm text-blue-200">
                Dealer Dashboard
              </p>
            </div>
          </Link>
        </div>

        {/* MENU */}

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

        {/* LOGOUT */}

        <div className="border-t border-blue-800 p-4">
          <button
            type="button"
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