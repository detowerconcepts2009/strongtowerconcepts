"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Menu,
  Search,
  UserCircle2,
  X,
} from "lucide-react";

import { useDashboard } from "./context/DashboardContext";
import DashboardNotifications from "./DashboardNotifications";

interface DashboardHeaderProps {
  title: string;
}

interface UserProfile {
  fullName: string;
  role: string;
  profileImageUrl: string | null;
}

export default function DashboardHeader({
  title,
}: DashboardHeaderProps) {
  const { openSidebar } =
    useDashboard();

  const [user, setUser] =
    useState<UserProfile>({
      fullName: "Loading...",
      role: "",
      profileImageUrl: null,
    });

  const [
    notificationsOpen,
    setNotificationsOpen,
  ] = useState(false);

  useEffect(() => {
    async function loadUser() {
      try {
        const response =
          await fetch("/api/user/me");

        const data =
          await response.json();

        if (data.success) {
          setUser({
            fullName:
              data.user.fullName,
            role: data.user.role,
            profileImageUrl:
              data.user
                .profileImageUrl ||
              null,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadUser();
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b bg-white px-4 py-4 shadow-sm md:px-8">
      <div className="flex items-center justify-between gap-4">

        {/* LEFT SIDE */}

        <div className="flex min-w-0 items-center gap-4">
          <button
            type="button"
            onClick={openSidebar}
            className="rounded-lg p-2 hover:bg-slate-100 xl:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              {title}
            </h1>

            <p className="hidden text-sm text-slate-500 md:block">
              Welcome back to Strong Tower Concepts.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center gap-3 md:gap-6">

          {/* SEARCH */}

          <div className="relative hidden 2xl:block">
            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-72 rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-blue-700"
            />
          </div>

          {/* NOTIFICATIONS */}

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setNotificationsOpen(
                  (current) => !current
                )
              }
              className="relative rounded-lg p-2 hover:bg-slate-100"
              aria-label="Notifications"
              aria-expanded={
                notificationsOpen
              }
            >
              {notificationsOpen ? (
                <X size={26} />
              ) : (
                <Bell size={26} />
              )}

              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600" />
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 top-14 z-50 w-[360px] max-w-[calc(100vw-2rem)]">
                <DashboardNotifications />
              </div>
            )}
          </div>

          {/* USER */}

          <div className="flex items-center gap-3">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={user.fullName}
                className="h-[42px] w-[42px] rounded-full object-cover"
              />
            ) : (
              <UserCircle2
                size={42}
                className="text-blue-900"
              />
            )}

            <div className="hidden xl:block">
              <p className="font-semibold">
                {user.fullName}
              </p>

              <p className="text-xs uppercase text-slate-500">
                {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}