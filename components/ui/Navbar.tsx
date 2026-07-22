// components/ui/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Gamepad2,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Trophy,
  MessageSquare,
  Home,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Hlo", icon: Home },
    { href: "/#games", label: "Games", icon: Gamepad2 },
    { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { href: "/chat", label: "Chat", icon: MessageSquare },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-xl border-b border-white/5" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-cyan to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-display font-bold tracking-tight">
              <span className="text-white">ASTRO</span>
              <span className="text-cyan">ARCADE</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search games, players..."
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan/50 focus:bg-white/7 transition-all"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl 
             bg-linear-to-r from-white/5 to-transparent
             hover:from-white/10 hover:to-white/5
             border border-white/5 hover:border-cyan/20
             transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan to-pink opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
                    <div className="relative w-10 h-10 rounded-full bg-[#0a0a1a] flex items-center justify-center ring-2 ring-white/10">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          className="w-full h-full rounded-full object-cover"
                          alt=""
                        />
                      ) : (
                        <span className="text-lg">{user.avatar || "👤"}</span>
                      )}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green border-2 border-[#0a0a1a] flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white group-hover:text-cyan transition-colors">
                      {user.displayName || user.username}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-cyan to-pink"
                          style={{
                            width: `${Math.min(user.totalScore % 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-gray-500">
                        {user.totalScore} XP
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
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

          {/* Mobile Menu Button */}
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
      {menuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-4 py-6 space-y-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500"
            />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 text-gray-400 hover:text-white py-2"
              onClick={() => setMenuOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          ))}
          {isAuthenticated && user ? (
            <div className="pt-4 border-t border-white/5 space-y-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 text-gray-400 hover:text-white py-2"
                onClick={() => setMenuOpen(false)}
              >
                <User className="w-5 h-5" />
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 text-red-400 py-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-white/5 space-y-3">
              <Link
                href="/login"
                className="block text-center py-2 text-gray-400 hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="block text-center py-2 bg-linear-to-r from-cyan to-pink-500 rounded-full text-black font-bold"
                onClick={() => setMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}