"use client";

import {
  Wallet,
  House,
  Building2,
  MessageSquare,
  List,
} from "lucide-react";

interface DashboardCardsProps {
  walletBalance: number | string;
  properties: number;
  businesses: number;
  listings: number;
  messages: number;
}

export default function DashboardCards({
  walletBalance,
  properties,
  businesses,
  listings,
  messages,
}: DashboardCardsProps) {
  const cards = [
    {
      title: "Wallet Balance",
      value: `₦${Number(walletBalance).toLocaleString()}`,
      icon: Wallet,
      bg: "bg-blue-100",
      color: "text-blue-700",
    },
    {
      title: "Properties",
      value: properties,
      icon: House,
      bg: "bg-green-100",
      color: "text-green-700",
    },
    {
      title: "Businesses",
      value: businesses,
      icon: Building2,
      bg: "bg-orange-100",
      color: "text-orange-700",
    },
    {
      title: "Listings",
      value: listings,
      icon: List,
      bg: "bg-yellow-100",
      color: "text-yellow-700",
    },
    {
      title: "Messages",
      value: messages,
      icon: MessageSquare,
      bg: "bg-purple-100",
      color: "text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.bg}`}
              >
                <Icon
                  size={28}
                  className={card.color}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}