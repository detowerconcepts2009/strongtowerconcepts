"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  ClipboardCheck,
  Gift,
  MessageSquare,
  Package,
  ShoppingBag,
  UserRound,
  Wallet,
} from "lucide-react";

interface WelcomeCardProps {
  firstName?: string;
  role?: string;
}

interface Feature {
  title: string;
  description: string;
  icon: typeof ShoppingBag;
  href?: string;
}

export default function WelcomeCard({
  firstName,
  role,
}: WelcomeCardProps) {
  const isCustomer = role === "CUSTOMER";

  const features: Feature[] = isCustomer
    ? [
        {
          title: "Shop Products",
          description:
            "Browse mattresses, pillows and other interior products.",
          icon: ShoppingBag,
          href: "/marketplace/interior",
        },
        {
          title: "Track Orders",
          description:
            "View your marketplace orders and payment status.",
          icon: Package,
          href: "/dashboard/my-orders",
        },
        {
          title: "Wallet",
          description:
            "Monitor your available balance for eligible STC services.",
          icon: Wallet,
          href: "/dashboard/wallet",
        },
        {
          title: "Notifications",
          description:
            "Stay informed about your marketplace activities.",
          icon: MessageSquare,
          href: "/dashboard/notifications",
        },
        {
          title: "My Profile",
          description:
            "Manage your profile and account information.",
          icon: UserRound,
          href: "/dashboard/profile",
        },
      ]
    : [
        {
          title: "Properties",
          description:
            "Manage your properties and property-related activities.",
          icon: Building2,
          href: "/dashboard/properties",
        },
        {
          title: "Businesses",
          description:
            "Manage your businesses and related information.",
          icon: BriefcaseBusiness,
        },
        {
          title: "Wallet",
          description:
            "Monitor your available balance and eligible STC transactions.",
          icon: Wallet,
          href: "/dashboard/wallet",
        },
        {
          title: "Messages",
          description:
            "Manage messages, enquiries and marketplace communication.",
          icon: MessageSquare,
        },
        {
          title: "Inspections",
          description:
            "Access and manage relevant inspection activities.",
          icon: ClipboardCheck,
        },
      ];

  const displayRole = role
    ? role.replaceAll("_", " ")
    : isCustomer
      ? "CUSTOMER"
      : "ACCOUNT";

  return (
    <section className="relative mt-8 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.08),transparent_30%)]" />

      <div className="relative border-b border-blue-100 bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 px-6 py-7 text-white md:px-8 md:py-8">
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full border-[24px] border-white/5" />
        <div className="absolute -bottom-20 right-20 h-40 w-40 rounded-full border-[18px] border-white/5" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
              Strong Tower Concepts
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              Welcome{firstName ? `, ${firstName}` : ""}!
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100 md:text-base">
              Your STC dashboard gives you quick access to the tools,
              services and activities available to your account.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2 self-start rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              {displayRole}
            </span>
          </div>
        </div>
      </div>

      <div className="relative px-6 py-7 md:px-8 md:py-8">
        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-900 md:text-xl">
            Your Dashboard
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Here are some of the things you can access from your account.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            const content = (
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                  <Icon size={21} />
                </div>

                <div>
                  <h4 className="font-bold text-slate-900">
                    {feature.title}
                  </h4>

                  <p className="mt-1.5 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>

                  {feature.href && (
                    <p className="mt-2 text-xs font-semibold text-blue-700 opacity-0 transition-opacity group-hover:opacity-100">
                      Open →
                    </p>
                  )}
                </div>
              </div>
            );

            if (feature.href) {
              return (
                <Link
                  key={feature.title}
                  href={feature.href}
                  className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-sm"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-slate-50/80 p-5"
              >
                {content}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-700 text-white">
            <Gift size={18} />
          </div>

          <p className="text-sm font-medium leading-6 text-blue-900">
            Explore your available STC services and make the most of your
            account.
          </p>
        </div>
      </div>
    </section>
  );
}