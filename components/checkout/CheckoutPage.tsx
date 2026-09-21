"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
}

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  notes: string;
}

const initialForm: CheckoutForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  notes: "",
};

export default function CheckoutPage() {
  const { items, itemCount, subtotal } = useCart();

  const [form, setForm] = useState<CheckoutForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const requiredFields = [
      form.firstName,
      form.lastName,
      form.email,
      form.phone,
      form.address,
      form.city,
      form.state,
    ];

    if (requiredFields.some((field) => !field.trim())) {
      setError(
        "Please complete all required customer and delivery information."
      );
      return;
    }

    try {
      setLoading(true);

      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerFirstName: form.firstName.trim(),
          customerLastName: form.lastName.trim(),
          customerEmail: form.email.trim(),
          customerPhone: form.phone.trim(),
          deliveryAddress: form.address.trim(),
          deliveryCity: form.city.trim(),
          deliveryState: form.state.trim(),
          customerNotes: form.notes.trim() || null,
          items: items.map((item) => ({
            productId: item.productId,
            productName: item.productName,
            productType: item.productType,
            model: item.model,
            lengthInches: item.lengthInches,
            widthInches: item.widthInches,
            thicknessInches: item.thicknessInches,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
          })),
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok || !orderResult.success) {
        throw new Error(
          orderResult.error ||
            orderResult.message ||
            "Unable to create your order."
        );
      }

      const createdOrderNumber = orderResult.order?.orderNumber;

      if (!createdOrderNumber) {
        throw new Error(
          "Your order was created, but no order number was returned."
        );
      }

      setOrderNumber(createdOrderNumber);

      const paymentResponse = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderNumber: createdOrderNumber,
        }),
      });

      const paymentResult = await paymentResponse.json();

      if (!paymentResponse.ok || !paymentResult.success) {
        throw new Error(
          paymentResult.error ||
            "Your order was created, but payment could not be initialized."
        );
      }

      if (!paymentResult.authorizationUrl) {
        throw new Error(
          "Paystack did not return a payment authorization URL."
        );
      }

      window.location.href = paymentResult.authorizationUrl;
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to process your order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0 && !orderNumber) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <ShoppingBag className="mx-auto h-16 w-16 text-slate-400" />

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Your Cart is Empty
            </h1>

            <p className="mt-3 text-slate-500">
              Add products to your cart before proceeding to checkout.
            </p>

            <Link
              href="/marketplace/interior"
              className="mt-8 inline-flex rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
            >
              Browse Interior Products
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Link
            href="/cart"
            className="text-sm font-semibold text-blue-900 hover:underline"
          >
            ← Back to Cart
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Checkout
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your information to place your order and proceed to
            secure payment.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-[1fr_380px]"
        >
          <div className="space-y-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Customer Information
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name *"
                  autoComplete="given-name"
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                />

                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name *"
                  autoComplete="family-name"
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address *"
                  autoComplete="email"
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                />

                <input
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number *"
                  autoComplete="tel"
                  className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">
                Delivery Information
              </h2>

              <div className="mt-6 space-y-5">
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Delivery Address *"
                  rows={3}
                  autoComplete="street-address"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City *"
                    autoComplete="address-level2"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                  />

                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State *"
                    autoComplete="address-level1"
                    className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                  />
                </div>

                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Additional delivery notes (optional)"
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-4 border-b border-slate-100 pb-4"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {item.productName}
                    </p>

                    {item.model && (
                      <p className="text-sm text-slate-500">{item.model}</p>
                    )}

                    {item.lengthInches &&
                      item.widthInches &&
                      item.thicknessInches && (
                        <p className="text-sm text-slate-500">
                          {item.lengthInches} × {item.widthInches} ×{" "}
                          {item.thicknessInches}"
                        </p>
                      )}

                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="whitespace-nowrap font-semibold text-slate-900">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </p>
                </div>
              ))}

              <div className="flex justify-between text-slate-600">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-blue-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 active:scale-[0.99] ${
                loading
                  ? "cursor-wait opacity-60"
                  : "cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  {orderNumber
                    ? "Redirecting to Payment..."
                    : "Creating Order..."}
                </>
              ) : (
                "Proceed to Payment"
              )}
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              You will be redirected to Paystack's secure payment page.
            </p>
          </aside>
        </form>
      </section>
    </main>
  );
}