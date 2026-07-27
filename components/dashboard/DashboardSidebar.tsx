"use client";

import Link from "next/link";

import {
  FaHome,
  FaBuilding,
  FaCar,
  FaCouch,
  FaUsers,
  FaClipboardCheck,
  FaGift,
  FaCog,
} from "react-icons/fa";

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
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 overflow-y-auto bg-blue-950 text-white lg:block">

      <div className="border-b border-blue-800 p-6">

        <h1 className="text-2xl font-bold">
          Strong Tower
        </h1>

        <p className="mt-1 text-sm text-blue-200">
          Dealer Dashboard
        </p>

      </div>

      <nav className="p-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <Link
              key={menu.name}
              href={menu.href}
              className="mb-2 flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-blue-800"
            >
              <Icon className="text-lg" />

              <span>{menu.name}</span>
            </Link>
          );
        })}

      </nav>

    </aside>
  );
}