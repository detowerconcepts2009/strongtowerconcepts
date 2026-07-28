import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="
        inline-flex
        items-center
        justify-center
        rounded-full
        border-2
        border-yellow-500
        bg-transparent
        px-6
        py-2.5
        text-sm
        font-semibold
        text-blue-900
        transition-all
        duration-300
        hover:bg-yellow-500
        hover:text-white
        hover:shadow-lg
      "
    >
      Sign In
    </Link>
  );
}