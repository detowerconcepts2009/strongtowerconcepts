"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/navigation";

interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profileImageUrl: string | null;
}

interface UserResponse {
  success: boolean;
  user?: CurrentUser;
}

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [loadingUser, setLoadingUser] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCurrentUser() {
      try {
        const response = await fetch(
          "/api/user/me",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (mounted) {
            setUser(null);
          }

          return;
        }

        const data: UserResponse =
          await response.json();

        if (
          mounted &&
          data.success &&
          data.user
        ) {
          setUser(data.user);
        } else if (mounted) {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Unable to load current user:",
          error
        );

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setLoadingUser(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      mounted = false;
    };
  }, []);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      {/* MENU BUTTON */}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="text-blue-900"
        aria-label={
          open ? "Close menu" : "Open menu"
        }
        aria-expanded={open}
      >
        {open ? (
          <X size={28} />
        ) : (
          <Menu size={28} />
        )}
      </button>

      {/* MOBILE MENU */}

      {open && (
        <div className="absolute left-0 top-20 z-50 w-full border-t bg-white shadow-xl">
          <div className="flex flex-col gap-3 p-6">
            {/* NAVIGATION */}

            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="mb-2 font-bold text-blue-900">
                    {item.label}
                  </p>

                  <div className="ml-4 flex flex-col gap-2">
                    {item.children.map(
                      (child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={closeMenu}
                          className="text-gray-700 transition hover:text-blue-900"
                        >
                          {child.label}
                        </Link>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={closeMenu}
                  className="font-medium text-gray-700 transition hover:text-blue-900"
                >
                  {item.label}
                </Link>
              )
            )}

            {/* ACCOUNT AREA */}

            <div className="mt-3 border-t pt-4">
              {loadingUser ? (
                <div className="flex w-full items-center justify-center rounded-full border-2 border-yellow-500 px-6 py-2.5">
                  <span className="text-sm font-semibold text-blue-900">
                    Loading...
                  </span>
                </div>
              ) : user ? (
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 border-yellow-500 px-4 py-3 text-blue-900 transition-all duration-300 hover:bg-yellow-500 hover:text-white"
                >
                  {user.profileImageUrl ? (
                    <img
                      src={user.profileImageUrl}
                      alt={user.fullName}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                      {user.firstName
                        .charAt(0)
                        .toUpperCase()}
                      {user.lastName
                        .charAt(0)
                        .toUpperCase()}
                    </span>
                  )}

                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {user.firstName}
                    </span>

                    <span className="block text-xs opacity-80">
                      Open Dashboard
                    </span>
                  </span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="inline-flex w-full items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent px-6 py-2.5 text-sm font-semibold text-blue-900 transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:shadow-lg"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}