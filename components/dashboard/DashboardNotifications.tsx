"use client";

import {
  FaBell,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";

const notifications = [

  {
    icon: FaCheckCircle,
    color: "text-green-600",
    title: "Property Approved",
    message: "Luxury Duplex has been approved.",
    time: "5 mins ago",
  },

  {
    icon: FaClock,
    color: "text-orange-500",
    title: "Inspection Pending",
    message: "3 inspection requests awaiting confirmation.",
    time: "20 mins ago",
  },

  {
    icon: FaExclamationTriangle,
    color: "text-red-600",
    title: "Listing Expiring",
    message: "2 property listings expire this week.",
    time: "1 hour ago",
  },

];

export default function DashboardNotifications() {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="mb-6 flex items-center gap-3">

        <FaBell className="text-2xl text-blue-900" />

        <h2 className="text-2xl font-bold">
          Notifications
        </h2>

      </div>

      <div className="space-y-5">

        {notifications.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="flex gap-4 border-b pb-4"
            >

              <Icon className={`mt-1 text-xl ${item.color}`} />

              <div>

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {item.message}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {item.time}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}