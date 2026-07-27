import Link from "next/link";

interface ButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function Button({
  text,
  href = "#",
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-blue-900 text-white hover:bg-blue-800",

    secondary:
      "bg-green-600 text-white hover:bg-green-700",

    outline:
      "border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white",
  };

  return (
    <Link
      href={href}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {text}
    </Link>
  );
}