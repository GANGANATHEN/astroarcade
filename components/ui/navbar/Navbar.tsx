// components/ui/navbar/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Gamepad2, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import NavLinks from "./NavLinks";
import UserProfile from "./UserProfile";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-cyan to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight">
              <span className="text-white">ASTRO</span>
              <span className="text-cyan">ARCADE</span>
            </span>
          </Link>

          {/* Nav Links - Desktop */}
          <NavLinks isAuthenticated={isAuthenticated} />

          {/* Auth - Desktop */}
          <div className="hidden md:flex items-center">
            {isAuthenticated && user ? (
              <UserProfile user={user} />
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-bold bg-linear-to-r from-cyan to-pink-500 rounded-full text-black hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={menuOpen}
        isAuthenticated={isAuthenticated}
        user={user}
        onClose={() => setMenuOpen(false)}
      />
    </nav>
  );
}
