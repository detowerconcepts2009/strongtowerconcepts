import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">

      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-blue-900">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-6">
          Page Not Found
        </h2>

        <p className="mt-4 text-gray-600 max-w-md mx-auto">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-blue-900 text-white px-8 py-3 rounded-lg hover:bg-blue-800 transition"
        >
          Return Home
        </Link>

      </div>

    </main>
  );
}