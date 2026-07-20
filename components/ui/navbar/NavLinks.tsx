// components/ui/navbar/NavLinks.tsx
"use client";

import Link from "next/link";
import { Home, Gamepad2, Trophy, MessageSquare } from "lucide-react";

interface NavLinksProps {
  isAuthenticated: boolean;
}

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#games", label: "Games", icon: Gamepad2 },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/chat", label: "Chat", icon: MessageSquare },
];

export default function NavLinks({ isAuthenticated }: NavLinksProps) {

  return (
    <div className="hidden md:flex items-center gap-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}