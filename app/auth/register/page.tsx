"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  User,
  ShieldCheck,
  Building2,
  BadgeCheck,
} from "lucide-react";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  accountType: string;
}

const initialForm: RegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  accountType: "",
};

export default function RegisterPage() {

  const router = useRouter();

  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [form, setForm] =
    useState<RegisterForm>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const nextStep = () => {

    setError("");

    if (
      step === 1 &&
      (
        !form.firstName ||
        !form.lastName ||
        !form.email ||
        !form.phone ||
        !form.password
      )
    ) {

      setError("Please complete all required fields.");

      return;

    }

    if (
      step === 2 &&
      !form.accountType
    ) {

      setError("Please select an account type.");

      return;

    }

    setStep(step + 1);

  };

  const previousStep = () => {

    setError("");

    setStep(step - 1);

  };

  const handleSubmit = async () => {

    setLoading(true);

    setError("");

    setMessage("");

    try {

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {

        setLoading(false);

        setError(result.message);

        return;

      }

      setLoading(false);

      setMessage(result.message);

      setTimeout(() => {

        router.push("/login");

      }, 2000);

    } catch {

      setLoading(false);

      setError("Unable to connect to the server.");

    }

  };

  return (

    <main className="min-h-screen bg-slate-100 flex">

      {/* LEFT PANEL */}

      <section className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#071A35] via-[#0B2447] to-[#123A67] text-white p-14 flex-col justify-between">
              <div>

          <Image
            src="/images/logo/stc-logo.png"
            alt="Strong Tower Concepts"
            width={130}
            height={130}
            className="h-auto"
            priority
          />

          <div className="mt-4">

            <h1 className="text-5xl font-extrabold leading-tight">
              Strong Tower
              <br />
              Concepts
            </h1>

            <p className="mt-6 text-lg text-blue-100 leading-8">
              Join Nigeria's trusted digital marketplace for
              property, business services, professional solutions
              and secure online transactions.
            </p>

          </div>

        </div>

        <div className="space-y-5">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldCheck size={24} />
            </div>

            <div>

              <h3 className="font-semibold text-lg">
                Secure Registration
              </h3>

              <p className="text-blue-100 text-sm">
                Your information is encrypted and protected.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Building2 size={24} />
            </div>

            <div>

              <h3 className="font-semibold text-lg">
                Multiple Account Types
              </h3>

              <p className="text-blue-100 text-sm">
                Customers, Realtors, Property Owners and more.
              </p>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <BadgeCheck size={24} />
            </div>

            <div>

              <h3 className="font-semibold text-lg">
                Verified Marketplace
              </h3>

              <p className="text-blue-100 text-sm">
                Every account goes through verification.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* RIGHT PANEL */}

      <section className="flex-1 flex items-center justify-center p-8">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

          <div className="lg:hidden flex justify-center mb-8">

            <Image
              src="/images/logo/stc-logo.png"
              alt="STC"
              width={120}
              height={120}
              className="h-auto"
              priority
            />

          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2">
            Step {step} of 4
          </p>

          <div className="w-full h-2 bg-slate-200 rounded-full mt-4 mb-8">

            <div
              className="h-2 rounded-full bg-blue-800 transition-all"
              style={{
                width: `${step * 25}%`,
              }}
            />

          </div>
                   {error && (
            <div className="mb-4 rounded-xl bg-red-100 border border-red-300 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 rounded-xl bg-green-100 border border-green-300 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">

              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-300 pl-11 pr-12 py-3 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">

              <select
                name="accountType"
                value={form.accountType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 focus:ring-2 focus:ring-blue-700 focus:outline-none"
              >
                <option value="">Select Account Type</option>
                <option value="CUSTOMER">Customer</option>
                <option value="PROPERTY_OWNER">Property Owner</option>
                <option value="REALTOR">Realtor</option>
              </select>

            </div>
          )} 
                    {step === 3 && (
            <div className="space-y-5">

              <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center">
                <p className="font-semibold text-slate-700">
                  Identity Verification
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Document upload will be connected in the next backend milestone.
                </p>
              </div>

            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">

              <h3 className="text-xl font-bold text-slate-900">
                Review Information
              </h3>

              <div className="rounded-xl bg-slate-50 border p-5 space-y-2 text-sm">

                <p><strong>First Name:</strong> {form.firstName}</p>

                <p><strong>Last Name:</strong> {form.lastName}</p>

                <p><strong>Email:</strong> {form.email}</p>

                <p><strong>Phone:</strong> {form.phone}</p>

                <p><strong>Account Type:</strong> {form.accountType}</p>

              </div>

            </div>
          )}

          <div className="flex justify-between mt-8">

            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1 || loading}
              className="rounded-xl border border-slate-300 px-6 py-3 disabled:opacity-50"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-xl bg-blue-800 hover:bg-blue-900 text-white px-6 py-3"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-xl bg-green-700 hover:bg-green-800 text-white px-6 py-3 disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            )}

          </div>

          <div className="mt-8 text-center text-sm text-slate-600">

            Already have an account?{" "}

            <Link
              href="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Sign In
            </Link>

          </div>

        </div>

      </section>

    </main>

  );

}