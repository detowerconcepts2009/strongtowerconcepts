"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type OrderItem = {
  id: string;
  productName: string;
  productType: string;
  model: string | null;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

type Order = {
  id: string;
  orderNumber: string;
  customerFirstName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryCity: string;
  deliveryState: string;
  subtotal: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
};

const ORDER_STATUSES = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "READY_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const PAYMENT_STATUSES = [
  "ALL",
  "UNPAID",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [orderStatus, setOrderStatus] = useState("ALL");
  const [paymentStatus, setPaymentStatus] = useState("ALL");

  useEffect(() => {
    async function loadOrders() {
      try {
        const response = await fetch("/api/orders/admin");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load orders.");
        }

        setOrders(data.orders || []);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load orders."
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  function formatCurrency(amount: number) {
    return `₦${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function displayStatus(value: string) {
    return value.replaceAll("_", " ");
  }

  const filteredOrders = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !searchTerm ||
        order.orderNumber.toLowerCase().includes(searchTerm) ||
        `${order.customerFirstName} ${order.customerLastName}`
          .toLowerCase()
          .includes(searchTerm) ||
        order.customerEmail.toLowerCase().includes(searchTerm) ||
        order.customerPhone.toLowerCase().includes(searchTerm);

      const matchesOrderStatus =
        orderStatus === "ALL" || order.status === orderStatus;

      const matchesPaymentStatus =
        paymentStatus === "ALL" ||
        order.paymentStatus === paymentStatus;

      return (
        matchesSearch &&
        matchesOrderStatus &&
        matchesPaymentStatus
      );
    });
  }, [orders, search, orderStatus, paymentStatus]);

  function resetFilters() {
    setSearch("");
    setOrderStatus("ALL");
    setPaymentStatus("ALL");
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Order Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View and manage marketplace customer orders.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex w-fit rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            ← Dashboard
          </Link>
        </div>

        {loading && (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
            Loading orders...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <label
                    htmlFor="order-search"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Search Orders
                  </label>

                  <input
                    id="order-search"
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Order number, customer, email or phone"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="order-status-filter"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Order Status
                  </label>

                  <select
                    id="order-status-filter"
                    value={orderStatus}
                    onChange={(event) =>
                      setOrderStatus(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    {ORDER_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status === "ALL"
                          ? "All Order Statuses"
                          : displayStatus(status)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="payment-status-filter"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Payment Status
                  </label>

                  <select
                    id="payment-status-filter"
                    value={paymentStatus}
                    onChange={(event) =>
                      setPaymentStatus(event.target.value)
                    }
                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  >
                    {PAYMENT_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status === "ALL"
                          ? "All Payment Statuses"
                          : displayStatus(status)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-semibold text-slate-900">
                    {filteredOrders.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-slate-900">
                    {orders.length}
                  </span>{" "}
                  orders
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              {filteredOrders.length === 0 ? (
                <div className="p-10 text-center text-slate-500">
                  No orders match your search or filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[950px] text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                      <tr>
                        <th className="px-6 py-4">Order</th>
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Items</th>
                        <th className="px-6 py-4">Amount</th>
                        <th className="px-6 py-4">Order Status</th>
                        <th className="px-6 py-4">Payment</th>
                        <th className="px-6 py-4">Date</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.map((order) => (
                        <tr
                          key={order.id}
                          className="hover:bg-slate-50"
                        >
                          <td className="px-6 py-4">
                            <Link
                              href={`/dashboard/orders/${order.id}`}
                              className="font-semibold text-blue-700 hover:text-blue-900 hover:underline"
                            >
                              {order.orderNumber}
                            </Link>

                            <p className="mt-1 text-xs text-slate-500">
                              View order details →
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <p className="font-medium text-slate-900">
                              {order.customerFirstName}{" "}
                              {order.customerLastName}
                            </p>

                            <p className="text-xs text-slate-500">
                              {order.customerEmail}
                            </p>

                            <p className="text-xs text-slate-500">
                              {order.customerPhone}
                            </p>
                          </td>

                          <td className="px-6 py-4">
                            <span className="font-medium text-slate-700">
                              {order.items.reduce(
                                (total, item) =>
                                  total + item.quantity,
                                0
                              )}
                            </span>
                          </td>

                          <td className="px-6 py-4 font-semibold text-slate-900">
                            {formatCurrency(order.totalAmount)}
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                              {displayStatus(order.status)}
                            </span>
                          </td>

                          <td className="px-6 py-4">
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                              {displayStatus(order.paymentStatus)}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-xs text-slate-500">
                            {formatDate(order.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}