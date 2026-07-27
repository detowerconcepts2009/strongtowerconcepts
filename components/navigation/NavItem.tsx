import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
}

export default function NavItem({
  href,
  label,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className="
        relative
        px-3
        py-2
        font-medium
        text-gray-700
        transition-all
        duration-300
        hover:text-blue-900
        after:absolute
        after:left-0
        after:-bottom-1
        after:h-[2px]
        after:w-0
        after:bg-yellow-500
        after:transition-all
        after:duration-300
        hover:after:w-full
      "
    >
      {label}
    </Link>
  );
}