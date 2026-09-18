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
      value: `₦${Number(walletBalance).toLocaleString("en-NG")}`,
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
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