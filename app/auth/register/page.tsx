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
  FileCheck,
} from "lucide-react";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  accountType: string;
  documentType: string;
  documentNumber: string;
  documentFile: File | null;
}

const initialForm: RegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  accountType: "",
  documentType: "",
  documentNumber: "",
  documentFile: null,
};

export default function RegisterPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

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

    setError("");
  };

  const handleDocumentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    setForm({
      ...form,
      documentFile: file,
    });

    setError("");
  };

  const nextStep = () => {
    setError("");

    if (step === 1) {
      if (
        !form.firstName.trim() ||
        !form.lastName.trim() ||
        !form.email.trim() ||
        !form.phone.trim() ||
        !form.password ||
        !form.confirmPassword
      ) {
        setError(
          "Please complete all required fields."
        );
        return;
      }

      if (form.password.length < 8) {
        setError(
          "Password must be at least 8 characters long."
        );
        return;
      }

      if (
        form.password !==
        form.confirmPassword
      ) {
        setError(
          "Passwords do not match. Please confirm your password."
        );
        return;
      }
    }

    if (step === 2) {
      if (!form.accountType) {
        setError(
          "Please select an account type."
        );
        return;
      }
    }

    if (step === 3) {
      if (!form.documentType) {
        setError(
          "Please select an identity document type."
        );
        return;
      }

      if (!form.documentFile) {
        setError(
          "Please upload your identity document."
        );
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf",
      ];

      if (
        !allowedTypes.includes(
          form.documentFile.type
        )
      ) {
        setError(
          "Please upload a JPG, PNG, or PDF document."
        );
        return;
      }

      const maxFileSize =
        5 * 1024 * 1024;

      if (
        form.documentFile.size >
        maxFileSize
      ) {
        setError(
          "Identity document must not exceed 5MB."
        );
        return;
      }
    }

    setStep(step + 1);
  };

  const previousStep = () => {
    setError("");

    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!form.accountType) {
      setError(
        "Account type is required."
      );
      setStep(2);
      return;
    }

    if (!form.documentType) {
      setError(
        "Identity document type is required."
      );
      setStep(3);
      return;
    }

    if (!form.documentFile) {
      setError(
        "Identity document is required."
      );
      setStep(3);
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      setStep(1);
      return;
    }

    setLoading(true);

    try {
      /*
       * Use FormData because we are sending
       * both normal registration fields AND
       * an actual document file.
       */
      const formData = new FormData();

      formData.append(
        "firstName",
        form.firstName.trim()
      );

      formData.append(
        "lastName",
        form.lastName.trim()
      );

      formData.append(
        "email",
        form.email
          .trim()
          .toLowerCase()
      );

      formData.append(
        "phone",
        form.phone.trim()
      );

      formData.append(
        "password",
        form.password
      );

      formData.append(
        "accountType",
        form.accountType
      );

      formData.append(
        "documentType",
        form.documentType
      );

      formData.append(
        "documentNumber",
        form.documentNumber.trim()
      );

      formData.append(
        "documentFile",
        form.documentFile
      );

      const response = await fetch(
        "/api/auth/register",
        {
          method: "POST",
          body: formData,
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        setLoading(false);

        setError(
          result.message ||
            "Registration failed."
        );

        return;
      }

      setLoading(false);

      setMessage(
        result.message ||
          "Registration submitted successfully."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch {
      setLoading(false);

      setError(
        "Unable to connect to the server."
      );
    }
  };

  return (
    <main className="flex min-h-screen bg-slate-100">
      {/* LEFT PANEL */}

      <section className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-[#071A35] via-[#0B2447] to-[#123A67] p-14 text-white lg:flex">
        <div>
          <Image
            src="/images/logo/stc-logo.png"
            alt="Strong Tower Concepts"
            width={120}
            height={120}
            priority
            />

          <div className="mt-4">
            <h1 className="text-5xl font-extrabold leading-tight">
              Strong Tower
              <br />
              Concepts
            </h1>

            <p className="mt-6 text-lg leading-8 text-blue-100">
              Join Nigeria&apos;s trusted
              digital marketplace for
              property, business services,
              professional solutions and
              secure online transactions.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Secure Registration
              </h3>

              <p className="text-sm text-blue-100">
                Your information is encrypted
                and protected.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <Building2 size={24} />
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Multiple Account Types
              </h3>

              <p className="text-sm text-blue-100">
                Customers, Realtors,
                Property Owners and more.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
              <BadgeCheck size={24} />
            </div>

            <div>
              <h3 className="text-lg font-semibold">
                Verified Marketplace
              </h3>

              <p className="text-sm text-blue-100">
                Every account goes through
                verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT PANEL */}

      <section className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md rounded-3xl bg-white p-10 shadow-2xl">

          {/* MOBILE LOGO */}

          <div className="mb-8 flex justify-center lg:hidden">
            <Image
              src="/images/logo/stc-logo.png"
              alt="Strong Tower Concepts"
              width={120}
              height={120}
              priority
            />
          </div>

          <h2 className="text-3xl font-bold text-slate-900">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
            Step {step} of 4
          </p>

          {/* PROGRESS */}

          <div className="mb-8 mt-4 h-2 w-full rounded-full bg-slate-200">
            <div
              className="h-2 rounded-full bg-blue-800 transition-all"
              style={{
                width: `${step * 25}%`,
              }}
            />
          </div>

          {/* ERROR */}

          {error && (
            <div className="mb-4 rounded-xl border border-red-300 bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* SUCCESS */}

          {message && (
            <div className="mb-4 rounded-xl border border-green-300 bg-green-100 p-3 text-sm text-green-700">
              {message}
            </div>
          )}

          {/* STEP 1 */}

          {step === 1 && (
            <div className="space-y-5">

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  autoComplete="given-name"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  autoComplete="family-name"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  autoComplete="email"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              {/* PASSWORD */}

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="new-password"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-12 outline-none focus:ring-2 focus:ring-blue-700"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-900"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  value={
                    form.confirmPassword
                  }
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  autoComplete="new-password"
                  className={`w-full rounded-xl border py-3 pl-11 pr-12 outline-none focus:ring-2 ${
                    form.confirmPassword &&
                    form.password !==
                      form.confirmPassword
                      ? "border-red-400 focus:ring-red-500"
                      : form.confirmPassword &&
                          form.password ===
                            form.confirmPassword
                        ? "border-green-400 focus:ring-green-500"
                        : "border-slate-300 focus:ring-blue-700"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-900"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

                {form.confirmPassword && (
                  <p
                    className={`mt-2 text-xs font-medium ${
                      form.password ===
                      form.confirmPassword
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {form.password ===
                    form.confirmPassword
                      ? "✓ Passwords match"
                      : "Passwords do not match"}
                  </p>
                )}
              </div>

              <p className="text-xs text-slate-500">
                Password must contain at least
                8 characters.
              </p>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Choose Account Type
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Select the account type that
                  best describes you.
                </p>
              </div>

              <select
                name="accountType"
                value={form.accountType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-blue-700"
              >
                <option value="">
                  Select Account Type
                </option>

                <option value="CUSTOMER">
                  Customer
                </option>

                <option value="PROPERTY_OWNER">
                  Property Owner
                </option>

                <option value="REALTOR">
                  Realtor
                </option>
              </select>
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <div className="space-y-5">

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-800">
                    <FileCheck size={22} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    Identity Verification
                  </h3>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  A valid identity document is
                  required before your registration
                  can be completed.
                </p>
              </div>

              {/* DOCUMENT TYPE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Identity Document *
                </label>

                <select
                  name="documentType"
                  value={form.documentType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-blue-700"
                >
                  <option value="">
                    Select Document Type
                  </option>

                  <option value="NIN">
                    NIN
                  </option>

                  <option value="DRIVERS_LICENSE">
                    Driver&apos;s License
                  </option>

                  <option value="INTERNATIONAL_PASSPORT">
                    International Passport
                  </option>

                  <option value="VOTERS_CARD">
                    Voter&apos;s Card
                  </option>
                </select>
              </div>

              {/* DOCUMENT NUMBER */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Document Number
                </label>

                <input
                  name="documentNumber"
                  value={
                    form.documentNumber
                  }
                  onChange={handleChange}
                  placeholder="Enter document number"
                  className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              {/* DOCUMENT FILE */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Upload Identity Document *
                </label>

                <input
                  type="file"
                  name="documentFile"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={
                    handleDocumentChange
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm"
                />

                <p className="mt-2 text-xs text-slate-500">
                  Accepted formats: JPG, PNG or
                  PDF. Maximum size: 5MB.
                </p>

                {form.documentFile && (
                  <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                    ✓ Selected:{" "}
                    {form.documentFile.name}
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-800">
                <strong>Required:</strong>{" "}
                Registration cannot proceed until
                an identity document has been
                selected.
              </div>
            </div>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Review Information
              </h3>

              <div className="space-y-3 rounded-xl border bg-slate-50 p-5 text-sm">

                <p>
                  <strong>First Name:</strong>{" "}
                  {form.firstName}
                </p>

                <p>
                  <strong>Last Name:</strong>{" "}
                  {form.lastName}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {form.email}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {form.phone}
                </p>

                <p>
                  <strong>Account Type:</strong>{" "}
                  {form.accountType}
                </p>

                <p>
                  <strong>Document Type:</strong>{" "}
                  {form.documentType}
                </p>

                {form.documentNumber && (
                  <p>
                    <strong>
                      Document Number:
                    </strong>{" "}
                    {form.documentNumber}
                  </p>
                )}

                {form.documentFile && (
                  <p>
                    <strong>
                      Identity File:
                    </strong>{" "}
                    {form.documentFile.name}
                  </p>
                )}

                <div className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                  ✓ Password confirmed
                </div>

                <div className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700">
                  ✓ Identity document selected
                </div>
              </div>
            </div>
          )}

          {/* NAVIGATION */}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={previousStep}
              disabled={
                step === 1 || loading
              }
              className="rounded-xl border border-slate-300 px-6 py-3 disabled:opacity-50"
            >
              Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={loading}
                className="rounded-xl bg-blue-800 px-6 py-3 text-white hover:bg-blue-900 disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="rounded-xl bg-green-700 px-6 py-3 text-white hover:bg-green-800 disabled:opacity-50"
              >
                {loading
                  ? "Creating..."
                  : "Create Account"}
              </button>
            )}
          </div>

          {/* LOGIN */}

          <div className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-blue-700 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}