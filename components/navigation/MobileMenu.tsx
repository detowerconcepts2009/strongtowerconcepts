"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-blue-900"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute left-0 top-20 z-50 w-full border-t bg-white shadow-xl">
          <div className="flex flex-col gap-3 p-6">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <p className="mb-2 font-bold text-blue-900">
                    {item.label}
                  </p>

                  <div className="ml-4 flex flex-col gap-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="text-gray-700 hover:text-blue-900"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="font-medium text-gray-700 hover:text-blue-900"
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="mt-3 border-t pt-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-full border-2 border-yellow-500 bg-transparent px-6 py-2.5 text-sm font-semibold text-blue-900 transition-all duration-300 hover:bg-yellow-500 hover:text-white hover:shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}