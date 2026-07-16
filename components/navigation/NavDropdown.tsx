"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface DropdownItem {
  label: string;
  href: string;
}

interface NavDropdownProps {
  title: string;
  items: DropdownItem[];
}

export default function NavDropdown({
  title,
  items,
}: NavDropdownProps) {
  return (
    <div className="relative group">

      <button
        className="
          flex
          items-center
          gap-1
          px-3
          py-2
          font-medium
          text-gray-700
          hover:text-blue-900
          transition
        "
      >
        {title}

        <ChevronDown size={16} />
      </button>

      <div
        className="
          invisible
          absolute
          left-0
          mt-2
          w-64
          rounded-xl
          bg-white
          shadow-xl
          border
          border-gray-100
          opacity-0
          transition-all
          duration-300
          group-hover:visible
          group-hover:opacity-100
          z-50
        "
      >
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="
              block
              px-5
              py-3
              text-gray-700
              hover:bg-blue-50
              hover:text-blue-900
              transition
            "
          >
            {item.label}
          </Link>
        ))}
      </div>

    </div>
  );
}