// components/ui/navbar/MobileMenu.tsx
"use client";

import Link from "next/link";
import { Home, Gamepad2, Trophy, MessageSquare, LayoutDashboard, User, LogOut, Search } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  user: any;
  onClose: () => void;
  onLogout: () => void;
}

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#games", label: "Games", icon: Gamepad2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/chat", label: "Chat", icon: MessageSquare },
];

export default function MobileMenu({ isOpen, isAuthenticated, user, onClose, onLogout }: MobileMenuProps) {
  if (!isOpen) return null;

  const allLinks = isAuthenticated 
    ? [...links, { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard }]
    : links;

  return (
    <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-4 py-6 space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500"
        />
      </div>

      {/* Links */}
      {allLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex items-center gap-3 text-gray-400 hover:text-white py-2"
          onClick={onClose}
        >
          <link.icon className="w-5 h-5" />
          {link.label}
        </Link>
      ))}

      {/* Auth Section */}
      <div className="pt-4 border-t border-white/5">
        {isAuthenticated && user ? (
          <div className="space-y-3">
            <Link href="/dashboard" className="flex items-center gap-3 text-gray-400 hover:text-white py-2" onClick={onClose}>
              <User className="w-5 h-5" />
              Profile ({user.username})
            </Link>
            <button onClick={() => { onLogout(); onClose(); }} className="flex items-center gap-3 text-red-400 py-2 w-full">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <Link href="/login" className="block text-center py-2 text-gray-400 hover:text-white" onClick={onClose}>Sign In</Link>
            <Link href="/register" className="block text-center py-2 bg-linear-to-r from-cyan to-pink-500 rounded-full text-black font-bold" onClick={onClose}>Get Started</Link>
          </div>
        )}
      </div>
    </div>
  );
}