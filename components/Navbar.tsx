"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import DesktopMenu from "./navigation/DesktopMenu";
import MobileMenu from "./navigation/MobileMenu";
import LoginButton from "./navigation/LoginButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopMenu />

          {/* Right Side */}
          <div className="flex items-center gap-4">

            <div className="hidden lg:block">
              <LoginButton />
            </div>

            <MobileMenu />

          </div>

        </div>

      </div>
    </header>
  );
}