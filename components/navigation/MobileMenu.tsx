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
        onClick={() => setOpen(!open)}
        className="text-blue-900"
      >
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      {open && (
        <div className="absolute left-0 top-20 w-full bg-white shadow-xl border-t z-50">

          <div className="flex flex-col p-6 gap-3">

            {navigation.map((item) =>

              item.children ? (

                <div key={item.label}>

                  <p className="font-bold text-blue-900 mb-2">
                    {item.label}
                  </p>

                  <div className="ml-4 flex flex-col gap-2">

                    {item.children.map((child) => (

                      <Link
                        key={child.label}
                        href={child.href}
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
                  className="font-medium text-gray-700 hover:text-blue-900"
                >
                  {item.label}
                </Link>

              )

            )}

          </div>

        </div>
      )}

    </div>
  );
}