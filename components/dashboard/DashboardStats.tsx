"use client";

import {
  FaBuilding,
  FaCar,
  FaCouch,
  FaUsers,
} from "react-icons/fa";

const stats = [

  {
    title: "Properties",
    value: "146",
    icon: FaBuilding,
    color: "bg-blue-900",
  },

  {
    title: "Vehicles",
    value: "84",
    icon: FaCar,
    color: "bg-green-700",
  },

  {
    title: "Furniture",
    value: "57",
    icon: FaCouch,
    color: "bg-orange-600",
  },

  {
    title: "Customers",
    value: "1,426",
    icon: FaUsers,
    color: "bg-purple-700",
  },

];

export default function DashboardStats() {

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className="rounded-2xl bg-white p-6 shadow-lg"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold">
                  {item.value}
                </h2>

              </div>

              <div
                className={`rounded-2xl p-5 text-white ${item.color}`}
              >

                <Icon className="text-3xl" />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}