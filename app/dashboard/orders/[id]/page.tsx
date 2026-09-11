"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

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
  deliveryAddress: string;
  deliveryCity: string;
  deliveryState: string;
  customerNotes: string | null;
  subtotal: number;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};

const ORDER_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "READY_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const PAYMENT_STATUSES = [
  "UNPAID",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
];

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadOrder() {
      try {
        const response = await fetch("/api/orders/admin");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Unable to load order.");
        }

        const foundOrder = data.orders.find(
          (item: Order) => item.id === orderId
        );

        if (!foundOrder) {
          throw new Error("Order not found.");
        }

        setOrder(foundOrder);
        setStatus(foundOrder.status);
        setPaymentStatus(foundOrder.paymentStatus);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load order."
        );
      } finally {
        setLoading(false);
      }
    }

    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  async function saveChanges() {
    if (!order) return;

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`/api/orders/admin/${order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          paymentStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update order.");
      }

      setOrder((current) =>
        current
          ? {
              ...current,
              status: data.order.status,
              paymentStatus: data.order.paymentStatus,
              updatedAt: data.order.updatedAt,
            }
          : current
      );

      setSuccess("Order updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update order."
      );
    } finally {
      setSaving(false);
    }
  }

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

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-8 text-center text-slate-500">
          Loading order...
        </div>
      </main>
    );
  }

  if (error && !order) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            ← Back to Orders
          </Link>

          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
            {error}
          </div>
        </div>
      </main>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <Link
            href="/dashboard/orders"
            className="text-sm font-medium text-blue-700 hover:underline"
          >
            ← Back to Orders
          </Link>
        </div>

        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {order.orderNumber}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Order placed {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="flex gap-2">
            <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              {displayStatus(order.status)}
            </span>

            <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
              {displayStatus(order.paymentStatus)}
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        <section className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-bold text-slate-900">
            Order Management
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="order-status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Order Status
              </label>

              <select
                id="order-status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                {ORDER_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {displayStatus(value)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="payment-status"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Payment Status
              </label>

              <select
                id="payment-status"
                value={paymentStatus}
                onChange={(event) => setPaymentStatus(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              >
                {PAYMENT_STATUSES.map((value) => (
                  <option key={value} value={value}>
                    {displayStatus(value)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={saveChanges}
            disabled={saving}
            className={`mt-6 rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 ${
              saving ? "cursor-wait opacity-60" : "cursor-pointer"
            }`}
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </section>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h2 className="mb-5 text-lg font-bold text-slate-900">
              Order Items
            </h2>

            <div className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between gap-3 py-5 sm:flex-row"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.productName}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.productType}
                      {item.model ? ` • ${item.model}` : ""}
                    </p>

                    <p className="mt-2 text-sm text-slate-600">
                      Quantity: {item.quantity} ×{" "}
                      {formatCurrency(item.unitPrice)}
                    </p>
                  </div>

                  <p className="font-semibold text-slate-900">
                    {formatCurrency(item.lineTotal)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-slate-200 pt-5">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>

              <div className="mt-3 flex justify-between text-lg font-bold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </section>

          <div className="space-y-6">
            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-5 text-lg font-bold text-slate-900">
                Customer
              </h2>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-400">Name</p>
                  <p className="font-medium text-slate-900">
                    {order.customerFirstName} {order.customerLastName}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Email</p>
                  <p className="font-medium text-slate-900">
                    {order.customerEmail}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Phone</p>
                  <p className="font-medium text-slate-900">
                    {order.customerPhone}
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6">
              <h2 className="mb-5 text-lg font-bold text-slate-900">
                Delivery
              </h2>

              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-slate-400">Address</p>
                  <p className="font-medium text-slate-900">
                    {order.deliveryAddress}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Location</p>
                  <p className="font-medium text-slate-900">
                    {order.deliveryCity}, {order.deliveryState}
                  </p>
                </div>

                {order.customerNotes && (
                  <div>
                    <p className="text-slate-400">Customer Notes</p>
                    <p className="font-medium text-slate-900">
                      {order.customerNotes}
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}