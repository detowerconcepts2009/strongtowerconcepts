"use client";

import {
  FaBell,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaWallet,
  FaCreditCard,
  FaHome,
  FaShieldAlt,
  FaBullhorn,
} from "react-icons/fa";
import { useEffect, useState } from "react";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: string;
  readAt: string | null;
}

interface NotificationResponse {
  success: boolean;
  notifications?: NotificationItem[];
  unreadCount?: number;
  message?: string;
}

function getNotificationIcon(type: string) {
  switch (type) {
    case "WALLET":
      return FaWallet;

    case "PAYMENT":
      return FaCreditCard;

    case "PROPERTY":
      return FaHome;

    case "INSPECTION":
      return FaClock;

    case "VERIFICATION":
      return FaCheckCircle;

    case "SECURITY":
      return FaShieldAlt;

    case "PROMOTION":
      return FaBullhorn;

    case "SYSTEM":
    default:
      return FaBell;
  }
}

function getNotificationColor(type: string) {
  switch (type) {
    case "WALLET":
      return "text-blue-600";

    case "PAYMENT":
      return "text-green-600";

    case "PROPERTY":
      return "text-blue-700";

    case "INSPECTION":
      return "text-orange-500";

    case "VERIFICATION":
      return "text-green-600";

    case "SECURITY":
      return "text-red-600";

    case "PROMOTION":
      return "text-purple-600";

    case "SYSTEM":
    default:
      return "text-slate-600";
  }
}

function formatNotificationTime(
  createdAt: string
) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const now = new Date();
  const difference =
    now.getTime() - date.getTime();

  const minutes = Math.floor(
    difference / (1000 * 60)
  );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} ${
      minutes === 1 ? "minute" : "minutes"
    } ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ago`;
  }

  const days = Math.floor(hours / 24);

  if (days < 7) {
    return `${days} ${
      days === 1 ? "day" : "days"
    } ago`;
  }

  return date.toLocaleDateString();
}

export default function DashboardNotifications() {
  const [notifications, setNotifications] =
    useState<NotificationItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadNotifications() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/notifications",
          {
            cache: "no-store",
          }
        );

        const data: NotificationResponse =
          await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to load notifications."
          );
        }

        setNotifications(
          data.notifications || []
        );
      } catch (error) {
        console.error(
          "Notification loading error:",
          error
        );

        setError(
          "Unable to load notifications."
        );
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  return (
    <div className="max-h-[70vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <FaBell className="text-2xl text-blue-900" />

        <h2 className="text-2xl font-bold text-slate-900">
          Notifications
        </h2>
      </div>

      {loading && (
        <div className="py-8 text-center text-sm text-slate-500">
          Loading notifications...
        </div>
      )}

      {!loading && error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        notifications.length === 0 && (
          <div className="py-8 text-center">
            <FaBell className="mx-auto mb-3 text-3xl text-slate-300" />

            <p className="font-medium text-slate-600">
              No notifications yet.
            </p>

            <p className="mt-1 text-sm text-slate-400">
              New notifications will appear here.
            </p>
          </div>
        )}

      {!loading &&
        !error &&
        notifications.length > 0 && (
          <div className="space-y-5">
            {notifications.map(
              (notification) => {
                const Icon =
                  getNotificationIcon(
                    notification.type
                  );

                const iconColor =
                  getNotificationColor(
                    notification.type
                  );

                const content = (
                  <div
                    className={`flex gap-4 rounded-xl border-b pb-4 last:border-b-0 ${
                      !notification.isRead
                        ? "bg-blue-50/60 p-3"
                        : ""
                    }`}
                  >
                    <Icon
                      className={`mt-1 text-xl ${iconColor}`}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-slate-900">
                          {notification.title}
                        </h3>

                        {!notification.isRead && (
                          <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-600" />
                        )}
                      </div>

                      <p className="text-sm text-slate-600">
                        {notification.message}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {formatNotificationTime(
                          notification.createdAt
                        )}
                      </p>
                    </div>
                  </div>
                );

                if (notification.link) {
                  return (
                    <a
                      key={notification.id}
                      href={notification.link}
                      className="block rounded-xl transition hover:bg-slate-50"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <div key={notification.id}>
                    {content}
                  </div>
                );
              }
            )}
          </div>
        )}
    </div>
  );
}