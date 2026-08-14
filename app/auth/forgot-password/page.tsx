import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Forgot Password
        </h1>

        <p className="mt-3 text-slate-600">
          Password recovery is not available yet. Please contact Strong
          Tower Concepts support for assistance.
        </p>

        <Link
          href="/login"
          className="mt-6 inline-block rounded-xl bg-blue-800 px-5 py-3 text-white font-semibold hover:bg-blue-900 transition"
        >
          Back to Login
        </Link>
      </section>
    </main>
  );
}