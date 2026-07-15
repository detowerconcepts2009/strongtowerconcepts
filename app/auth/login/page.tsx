import AuthLayout from "@/components/AuthLayout";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to your Strong Tower Concepts account"
    >
      <form className="space-y-4">

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg p-3"
        />

        <button
          className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800"
        >
          Login
        </button>

        <div className="text-center">

          <a
            href="/auth/forgot-password"
            className="text-blue-900 text-sm hover:underline"
          >
            Forgot Password?
          </a>

        </div>

        <div className="text-center text-sm">

          Don't have an account?{" "}

          <a
            href="/auth/register"
            className="text-blue-900 font-semibold hover:underline"
          >
            Register
          </a>

        </div>

      </form>
    </AuthLayout>
  );
}