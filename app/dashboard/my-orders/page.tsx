"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface OrderItem {
  id: string;
  productName: string;
  productType: string;
  model: string | null;
  quantity: number;
  unitPrice: number | string;
  lineTotal: number | string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  subtotal: number | string;
  totalAmount: number | string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
}

interface ApiResponse {
  success: boolean;
  orders?: Order[];
  message?: string;
}

function formatCurrency(value: number | string) {
  const amount =
    typeof value === "number"
      ? value
      : Number(value);

  if (!Number.isFinite(amount)) {
    return "₦0.00";
  }

  return `₦${amount.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function displayStatus(value: string) {
  return value.replaceAll("_", " ");
}

function displayPaymentStatus(value: string) {
  switch (value) {
    case "PAID":
      return "PAYMENT APPROVED";

    case "FAILED":
      return "PAYMENT FAILED";

    case "REFUNDED":
      return "PAYMENT REFUNDED";

    case "UNPAID":
      return "PAYMENT PENDING";

    default:
      return value.replaceAll("_", " ");
  }
}

function statusClass(status: string) {
  switch (status) {
    case "DELIVERED":
      return "bg-green-50 text-green-700";

    case "CANCELLED":
      return "bg-red-50 text-red-700";

    case "READY_FOR_DELIVERY":
      return "bg-purple-50 text-purple-700";

    case "PROCESSING":
      return "bg-blue-50 text-blue-700";

    case "CONFIRMED":
      return "bg-indigo-50 text-indigo-700";

    default:
      return "bg-amber-50 text-amber-700";
  }
}

function paymentClass(status: string) {
  switch (status) {
    case "PAID":
      return "bg-green-50 text-green-700";

    case "FAILED":
    case "REFUNDED":
      return "bg-red-50 text-red-700";

    default:
      return "bg-amber-50 text-amber-700";
  }
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/orders/my", {
          cache: "no-store",
        });

        const data: ApiResponse = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load your orders."
          );
        }

        if (mounted) {
          setOrders(data.orders || []);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load your orders."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <DashboardLayout title="My Orders">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              My Orders
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View your marketplace orders and payment status.
            </p>
          </div>

          <Link
            href="/marketplace/interior"
            className="inline-flex w-fit items-center rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Continue Shopping
          </Link>
        </div>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">
              Loading your orders...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          orders.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto max-w-md">
                <h3 className="text-xl font-bold text-slate-900">
                  No orders yet
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You have not placed any marketplace orders yet.
                  Browse our catalogue and find something you like.
                </p>

                <Link
                  href="/marketplace/interior"
                  className="mt-6 inline-flex rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Browse Catalogue
                </Link>
              </div>
            </div>
          )}

        {!loading &&
          !error &&
          orders.length > 0 && (
            <div className="space-y-5">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <div className="border-b border-slate-100 p-5">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Order Number
                        </p>

                        <h3 className="mt-1 text-lg font-bold text-blue-700">
                          {order.orderNumber}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass(
                            order.status
                          )}`}
                        >
                          {displayStatus(order.status)}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${paymentClass(
                            order.paymentStatus
                          )}`}
                        >
                          {displayPaymentStatus(order.paymentStatus)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col justify-between gap-2 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center"
                        >
                          <div>
                            <p className="font-semibold text-slate-900">
                              {item.productName}
                            </p>

                            {item.model && (
                              <p className="text-xs text-slate-500">
                                {item.model}
                              </p>
                            )}

                            <p className="mt-1 text-xs text-slate-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold text-slate-900">
                            {formatCurrency(item.lineTotal)}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400">
                          Subtotal
                        </p>

                        <p className="mt-1 font-semibold text-slate-800">
                          {formatCurrency(order.subtotal)}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase text-slate-400">
                          Total
                        </p>

                        <p className="mt-1 text-lg font-bold text-blue-700">
                          {formatCurrency(order.totalAmount)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-slate-100 p-4">
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        Delivery Address
                      </p>

                      <p className="mt-1 text-sm text-slate-700">
                        {order.deliveryAddress}
                      </p>

                      <p className="text-sm text-slate-500">
                        {order.deliveryCity},{" "}
                        {order.deliveryState}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </DashboardLayout>
  );
}