"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      setMessage("No payment reference was found.");
      return;
    }

    const paymentReference = reference;

    async function verifyPayment() {
      try {
        const response = await fetch(
          `/api/payments/verify?reference=${encodeURIComponent(
            paymentReference
          )}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          setStatus("error");
          setMessage(data.error || "Payment verification failed.");
          return;
        }

        localStorage.removeItem("strongtowerconcepts-cart");

        setStatus("success");
        setMessage("PAYMENT APPROVED");
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("error");
        setMessage(
          "We could not verify your payment. Please contact Strong Tower Concepts."
        );
      }
    }

    verifyPayment();
  }, [reference]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
        {status === "loading" && (
          <>
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

            <h1 className="text-2xl font-semibold text-gray-900">
              Verifying Payment
            </h1>

            <p className="mt-3 text-gray-600">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
              ✓
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              PAYMENT APPROVED
            </h1>

            <p className="mt-3 text-gray-600">
              Your payment has been successfully verified.
            </p>

            <Link
              href="/dashboard/my-orders"
              className="mt-6 inline-flex rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
            >
              View My Orders
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl text-red-700">
              !
            </div>

            <h1 className="text-2xl font-semibold text-gray-900">
              Payment Verification
            </h1>

            <p className="mt-3 text-gray-600">{message}</p>

            <Link
              href="/dashboard/my-orders"
              className="mt-6 inline-flex rounded-lg bg-black px-5 py-3 font-medium text-white hover:bg-gray-800"
            >
              View My Orders
            </Link>
          </>
        )}
      </div>
    </main>
  );
}