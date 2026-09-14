"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  verified: boolean;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatRole(role: string) {
  return role.replaceAll("_", " ");
}

function statusClass(status: string) {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-700";
    case "PENDING":
      return "bg-yellow-100 text-yellow-700";
    case "SUSPENDED":
      return "bg-orange-100 text-orange-700";
    case "BLOCKED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function UserDetailsPage() {
  const params = useParams();
  const userId = params.id as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/users/admin", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load user");
        }

        const foundUser = (data.users || []).find(
          (item: User) => item.id === userId
        );

        if (!foundUser) {
          throw new Error("User not found");
        }

        setUser(foundUser);
      } catch (err) {
        console.error("User details error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load user"
        );
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      loadUser();
    }
  }, [userId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <p className="text-sm text-gray-500">
          Loading user...
        </p>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/dashboard/users"
            className="font-semibold text-blue-800 hover:text-blue-950"
          >
            ← Back to Users
          </Link>

          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error || "User not found"}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 xl:p-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

        <div className="mb-6">
          <Link
            href="/dashboard/users"
            className="text-sm font-semibold text-blue-800 hover:text-blue-950"
          >
            ← Back to Users
          </Link>

          <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:flex-row md:items-center">
            {user.profileImageUrl ? (
              <img
                src={user.profileImageUrl}
                alt={`${user.firstName} ${user.lastName}`}
                className="h-20 w-20 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-800">
                {user.firstName.charAt(0).toUpperCase()}
                {user.lastName.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {user.email}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                  {formatRole(user.role)}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    user.verified
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.verified
                    ? "Verified"
                    : "Not Verified"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* USER INFORMATION */}

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Personal Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  First Name
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {user.firstName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Last Name
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {user.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Email Address
                </p>
                <p className="mt-1 break-all font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Phone
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {user.phone}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Account Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  User ID
                </p>
                <p className="mt-1 break-all font-mono text-sm text-gray-700">
                  {user.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Role
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {formatRole(user.role)}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Account Status
                </p>
                <p className="mt-1">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Verification
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {user.verified
                    ? "Verified"
                    : "Not Verified"}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* ACTIVITY */}

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-5 text-lg font-bold text-gray-900">
            Account Timeline
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Account Created
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {formatDate(user.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Last Updated
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}