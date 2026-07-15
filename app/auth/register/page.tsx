"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join Strong Tower Concepts"
    >
      <div className="space-y-6">

        {/* Progress */}
        <div>
          <div className="flex justify-between mb-2 text-sm">
            <span className="font-semibold text-blue-900">
              Step {step} of 4
            </span>

            <span>{step * 25}%</span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-900 h-2 rounded-full transition-all"
              style={{ width: `${step * 25}%` }}
            />
          </div>
        </div>

        {/* STEP 1 */}

        {step === 1 && (
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Create Password"
              className="w-full border rounded-lg p-3"
            />

          </div>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <div className="space-y-4">

            <select className="w-full border rounded-lg p-3">
              <option>Select Account Type</option>
              <option>Customer</option>
              <option>Property Agent</option>
              <option>Realtor</option>
              <option>Property Developer</option>
              <option>Interior Vendor</option>
              <option>ICT Client</option>
              <option>Business Partner</option>
            </select>

          </div>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <div className="space-y-4">

            <input
              type="file"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="file"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="file"
              className="w-full border rounded-lg p-3"
            />

          </div>
        )}

        {/* STEP 4 */}

        {step === 4 && (
          <div className="text-center">

            <h2 className="text-2xl font-bold text-blue-900">
              Review & Submit
            </h2>

            <p className="mt-4 text-gray-600">
              Review your information before creating your account.
            </p>

          </div>
        )}

        {/* Buttons */}

        <div className="flex justify-between">

          <button
            disabled={step === 1}
            onClick={() => setStep(step - 1)}
            className="bg-gray-300 px-5 py-2 rounded disabled:opacity-50"
          >
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-blue-900 text-white px-6 py-2 rounded"
            >
              Continue
            </button>
          ) : (
            <button
              className="bg-green-700 text-white px-6 py-2 rounded"
            >
              Create Account
            </button>
          )}

        </div>

      </div>
    </AuthLayout>
  );
}