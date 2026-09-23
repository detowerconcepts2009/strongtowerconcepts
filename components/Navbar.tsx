"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import DesktopMenu from "./navigation/DesktopMenu";
import MobileMenu from "./navigation/MobileMenu";
import LoginButton from "./navigation/LoginButton";
import { useCart } from "@/components/cart/CartProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="flex min-h-20 items-center justify-between gap-2">
          <div className="min-w-0 shrink">
            <Logo />
          </div>

          <DesktopMenu />

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            {/* ACCOUNT / SIGN IN */}
            <div className="block">
              <LoginButton />
            </div>

            {/* CART */}
            <Link
              href="/cart"
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2"
              aria-label={`Shopping cart with ${itemCount} item${
                itemCount === 1 ? "" : "s"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835L5.61 6.75m0 0h13.878c.716 0 1.258.654 1.12 1.356l-1.125 5.625a1.125 1.125 0 01-1.102.894H8.25a1.125 1.125 0 01-1.102-.894L5.61 6.75zm2.64 9.75h10.5m-9 3.375a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm8.25 0a.75.75 0 11-1.5 0 .75.75 0 01-1.5 0z"
                />
              </svg>

              <span className="hidden sm:inline">Cart</span>

              {itemCount > 0 && (
                <span className="absolute right-0 top-0 flex h-5 min-w-5 -translate-y-1/4 translate-x-1/4 items-center justify-center rounded-full bg-black px-1 text-xs font-semibold text-white sm:right-1 sm:top-1">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}