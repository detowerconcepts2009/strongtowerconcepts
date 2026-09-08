"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDimension(
  length?: number,
  width?: number,
  thickness?: number
): string | null {
  if (length == null || width == null) {
    return null;
  }

  const dimension = `${length} × ${width}`;

  if (thickness == null) {
    return dimension;
  }

  return `${dimension} × ${thickness}"`;
}

function formatFeet(length?: number, width?: number): string | null {
  if (length == null || width == null) {
    return null;
  }

  const convertToFeet = (inches: number) => {
    const feet = inches / 12;

    if (Number.isInteger(feet)) {
      return `${feet} ft`;
    }

    if (feet === 2.5) return "2½ ft";
    if (feet === 3.5) return "3½ ft";
    if (feet === 4.5) return "4½ ft";
    if (feet === 5.5) return "5½ ft";
    if (feet === 6.5) return "6½ ft";

    return `${Number(feet.toFixed(2))} ft`;
  };

  return `${convertToFeet(length)} × ${convertToFeet(width)}`;
}

export default function CartPage() {
  const {
    items,
    itemCount,
    subtotal,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-3xl">
              🛒
            </div>

            <h1 className="mt-6 text-3xl font-bold text-slate-900">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              You have not added any products to your cart yet. Browse our
              interior products and add what you need.
            </p>

            <Link
              href="/marketplace/interior"
              className="mt-8 inline-flex rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
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
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-900">
              Strong Tower Concepts
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
              Shopping Cart
            </h1>

            <p className="mt-2 text-slate-500">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-left text-sm font-semibold text-red-600 hover:text-red-700 sm:text-right"
          >
            Clear Cart
          </button>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            {items.map((item) => {
              const dimension = formatDimension(
                item.lengthInches,
                item.widthInches,
                item.thicknessInches
              );

              const feetDimension = formatFeet(
                item.lengthInches,
                item.widthInches
              );

              const itemTotal = item.unitPrice * item.quantity;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">
                    <div className="flex h-32 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 sm:w-32">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.productName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm text-slate-400">
                          Product Image
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-sm font-semibold text-blue-900">
                            {item.productType === "MATTRESS"
                              ? "Mattress"
                              : item.productType === "PILLOW"
                                ? "Pillow"
                                : "Interior"}
                          </p>

                          <h2 className="mt-1 text-xl font-bold text-slate-900">
                            {item.productName}
                          </h2>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-left text-sm font-semibold text-red-600 hover:text-red-700 sm:text-right"
                        >
                          Remove
                        </button>
                      </div>

                      {item.productType === "MATTRESS" && (
                        <div className="mt-4 space-y-1 text-sm text-slate-600">
                          {item.model && (
                            <p>
                              <span className="font-semibold text-slate-800">
                                Model:
                              </span>{" "}
                              {item.model}
                            </p>
                          )}

                          {dimension && (
                            <p>
                              <span className="font-semibold text-slate-800">
                                Size:
                              </span>{" "}
                              {dimension}
                            </p>
                          )}

                          {feetDimension && (
                            <p>
                              <span className="font-semibold text-slate-800">
                                Feet:
                              </span>{" "}
                              {feetDimension}
                            </p>
                          )}
                        </div>
                      )}

                      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                          <p className="text-sm text-slate-500">Unit Price</p>

                          <p className="mt-1 font-bold text-blue-900">
                            {formatCurrency(item.unitPrice)}
                          </p>
                        </div>

                        <div>
                          <p className="mb-2 text-sm text-slate-500">
                            Quantity
                          </p>

                          <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              −
                            </button>

                            <span className="flex h-10 min-w-12 items-center justify-center border-x border-slate-200 px-3 font-semibold text-slate-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex h-10 w-10 items-center justify-center text-lg font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-sm text-slate-500">Item Total</p>

                          <p className="mt-1 text-xl font-bold text-slate-900">
                            {formatCurrency(itemTotal)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between text-slate-600">
                <span>Items</span>
                <span>{itemCount}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
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

            <Link
              href="/checkout"
              className="mt-8 flex w-full items-center justify-center rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/marketplace/interior"
              className="mt-3 flex w-full items-center justify-center rounded-xl border-2 border-blue-900 px-6 py-3 font-semibold text-blue-900 transition hover:bg-blue-900 hover:text-white"
            >
              Continue Shopping
            </Link>

            <p className="mt-4 text-center text-xs text-slate-400">
              Payment will be enabled after checkout details are completed.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}