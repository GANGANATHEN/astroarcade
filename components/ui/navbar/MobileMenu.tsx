// components/ui/navbar/MobileMenu.tsx
"use client";

import Link from "next/link";
import {
  Home,
  Gamepad2,
  Trophy,
  MessageSquare,
  User,
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  isAuthenticated: boolean;
  user: any;
  onClose: () => void;
}

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#games", label: "Games", icon: Gamepad2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/chat", label: "Chat", icon: MessageSquare },
];

export default function MobileMenu({
  isOpen,
  isAuthenticated,
  user,
  onClose,
}: MobileMenuProps) {
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 px-4 py-6 space-y-4">

      {/* Links */}
      {links.map((link) => (
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
            <Link
              href="/dashboard"
              className="flex items-center gap-3 text-gray-400 hover:text-white py-2"
              onClick={onClose}
            >
              <User className="w-5 h-5" />
              Profile ({user.username})
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <Link
              href="/login"
              className="block text-center py-2 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="block text-center py-2 bg-linear-to-r from-cyan to-pink-500 rounded-full text-black font-bold"
              onClick={onClose}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
