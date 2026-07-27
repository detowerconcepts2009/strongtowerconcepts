"use client";

import {
  FaPlus,
  FaBuilding,
  FaClipboardCheck,
  FaGift,
} from "react-icons/fa";

export default function DashboardQuickActions() {

  const actions = [
    {
      title: "Add Property",
      icon: FaPlus,
      color: "bg-blue-900",
    },
    {
      title: "Manage Listings",
      icon: FaBuilding,
      color: "bg-green-700",
    },
    {
      title: "Inspection Requests",
      icon: FaClipboardCheck,
      color: "bg-orange-600",
    },
    {
      title: "Voucher Centre",
      icon: FaGift,
      color: "bg-purple-700",
    },
  ];

  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {actions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              className={`${action.color} flex items-center gap-4 rounded-xl p-5 text-white transition hover:scale-[1.02]`}
            >

              <Icon className="text-2xl" />

              {action.title}

            </button>

          );

        })}

      </div>

    </div>

  );

}