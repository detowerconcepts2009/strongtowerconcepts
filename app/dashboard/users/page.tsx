"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

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

const roleOptions = [
  "ALL",
  "SUPER_ADMIN",
  "ADMIN",
  "STAFF",
  "CUSTOMER",
  "PROPERTY_OWNER",
  "REALTOR",
];

const statusOptions = [
  "ALL",
  "PENDING",
  "ACTIVE",
  "SUSPENDED",
  "BLOCKED",
];

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
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

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/users/admin", {
          cache: "no-store",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to load users");
        }

        setUsers(data.users || []);
      } catch (err) {
        console.error("Users page error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "ALL" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "ALL" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  function resetFilters() {
    setSearch("");
    setRoleFilter("ALL");
    setStatusFilter("ALL");
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6 xl:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Users
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage registered customers, staff and platform users.
            </p>
          </div>

          <div className="rounded-xl bg-white px-5 py-3 shadow-sm ring-1 ring-gray-100">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Total Users
            </p>

            <p className="mt-1 text-2xl font-bold text-blue-950">
              {users.length}
            </p>
          </div>
        </div>

        {/* FILTERS */}

        <section className="mb-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 md:p-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="xl:col-span-2">
              <label
                htmlFor="user-search"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Search
              </label>

              <input
                id="user-search"
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search name, email or phone..."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="role-filter"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Role
              </label>

              <select
                id="role-filter"
                value={roleFilter}
                onChange={(event) =>
                  setRoleFilter(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {role === "ALL"
                      ? "All Roles"
                      : formatRole(role)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="status-filter"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "ALL"
                      ? "All Statuses"
                      : status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-800">
                {filteredUsers.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800">
                {users.length}
              </span>{" "}
              users
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Reset Filters
            </button>
          </div>
        </section>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* TABLE */}

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-sm text-gray-500">
                Loading users...
              </p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No users found
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 font-semibold text-gray-700">
                      User
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Contact
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Role
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Status
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Verified
                    </th>

                    <th className="px-5 py-4 font-semibold text-gray-700">
                      Joined
                    </th>

                    <th className="px-5 py-4 text-right font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          {user.profileImageUrl ? (
                            <img
                              src={user.profileImageUrl}
                              alt={`${user.firstName} ${user.lastName}`}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-800">
                              {user.firstName
                                .charAt(0)
                                .toUpperCase()}
                              {user.lastName
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-gray-900">
                              {user.firstName} {user.lastName}
                            </p>

                            <p className="text-xs text-gray-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                        {user.phone}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span className="font-medium text-gray-700">
                          {formatRole(user.role)}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        {user.verified ? (
                          <span className="font-semibold text-green-700">
                            Yes
                          </span>
                        ) : (
                          <span className="text-gray-500">
                            No
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                        {formatDate(user.createdAt)}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <Link
                          href={`/dashboard/users/${user.id}`}
                          className="font-semibold text-blue-800 hover:text-blue-950"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}