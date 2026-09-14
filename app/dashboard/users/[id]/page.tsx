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

const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "STAFF",
  "CUSTOMER",
  "PROPERTY_OWNER",
  "REALTOR",
];

const STATUSES = [
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

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("en-NG", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function labelize(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
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

function roleClass(role: string) {
  switch (role) {
    case "SUPER_ADMIN":
      return "bg-purple-100 text-purple-700";
    case "ADMIN":
      return "bg-blue-100 text-blue-700";
    case "STAFF":
      return "bg-indigo-100 text-indigo-700";
    case "PROPERTY_OWNER":
      return "bg-emerald-100 text-emerald-700";
    case "REALTOR":
      return "bg-cyan-100 text-cyan-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

export default function UserDetailsPage() {
  const params = useParams();

  const userId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [selectedRole, setSelectedRole] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  async function loadUser() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/users/admin", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to load users."
        );
      }

      const foundUser = data.users?.find(
        (item: User) => item.id === userId
      );

      if (!foundUser) {
        throw new Error("User not found.");
      }

      setUser(foundUser);
      setSelectedRole(foundUser.role);
      setSelectedStatus(foundUser.status);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load user."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId]);

  async function handleSave() {
    if (!user) return;

    setMessage("");
    setError("");

    if (
      selectedRole === user.role &&
      selectedStatus === user.status
    ) {
      setMessage("No changes were made.");
      return;
    }

    try {
      setSaving(true);

      const body: {
        role?: string;
        status?: string;
      } = {};

      if (selectedRole !== user.role) {
        body.role = selectedRole;
      }

      if (selectedStatus !== user.status) {
        body.status = selectedStatus;
      }

      const response = await fetch(
        `/api/users/admin/${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to update user account."
        );
      }

      setUser(data.user);
      setSelectedRole(data.user.role);
      setSelectedStatus(data.user.status);

      setMessage(
        data.message ||
          "User account updated successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to update user account."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-gray-500">
            Loading user account...
          </p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load user
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <div className="mt-5 flex gap-3">
            <button
              onClick={loadUser}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Try Again
            </button>

            <Link
              href="/dashboard/users"
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Users
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/dashboard/users"
              className="text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              ← Back to Users
            </Link>

            <h1 className="mt-2 text-2xl font-bold text-gray-900">
              User Account
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              View and manage this user's account.
            </p>
          </div>
        </div>

        {message && (
          <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {error && user && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 text-2xl font-bold text-white">
                  {getInitials(
                    user.firstName,
                    user.lastName
                  )}
                </div>
              )}

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>

              <p className="mt-1 break-all text-sm text-gray-500">
                {user.email}
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${roleClass(
                    user.role
                  )}`}
                >
                  {labelize(user.role)}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                    user.status
                  )}`}
                >
                  {labelize(user.status)}
                </span>
              </div>

              <div className="mt-5 w-full border-t pt-5 text-left">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">
                    Verification
                  </span>

                  <span
                    className={`text-sm font-semibold ${
                      user.verified
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {user.verified
                      ? "Verified"
                      : "Not Verified"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-500">
                    Joined
                  </span>

                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Personal Information
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Full Name
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Email Address
                </p>
                <p className="mt-1 break-all text-sm font-medium text-gray-900">
                  {user.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  Phone Number
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900">
                  {user.phone}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  User ID
                </p>
                <p className="mt-1 break-all font-mono text-xs text-gray-600">
                  {user.id}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Account Management
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Change the user's role or account status.
            </p>

            <div className="mt-5 space-y-5">
              <div>
                <label
                  htmlFor="role"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  User Role
                </label>

                <select
                  id="role"
                  value={selectedRole}
                  onChange={(event) =>
                    setSelectedRole(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                >
                  {ROLES.map((role) => (
                    <option key={role} value={role}>
                      {labelize(role)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="status"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Account Status
                </label>

                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(event) =>
                    setSelectedStatus(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {labelize(status)}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving
                  ? "Saving Changes..."
                  : "Save Changes"}
              </button>
            </div>

            <div className="mt-5 rounded-lg bg-gray-50 p-3">
              <p className="text-xs leading-5 text-gray-500">
                Role changes affect the user's access level.
                Account status controls whether the account is
                active, pending, suspended, or blocked.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Account Timeline
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Account Created
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {formatDateTime(user.createdAt)}
              </p>
            </div>

            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Last Account Update
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {formatDateTime(user.updatedAt)}
              </p>
            </div>

            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Verification Status
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {user.verified
                  ? "Verified"
                  : "Not Verified"}
              </p>
            </div>

            <div className="rounded-lg border bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Current Access
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-900">
                {labelize(user.role)} /{" "}
                {labelize(user.status)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}