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
    "inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-blue-900 text-white border-2 border-blue-900 hover:bg-blue-800 hover:border-blue-800",

    secondary:
      "bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 hover:border-green-700",

    outline:
      "border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-950",
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