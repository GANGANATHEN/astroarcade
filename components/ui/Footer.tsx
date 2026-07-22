"use client";

import { Gamepad2, Heart, Github, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-linear-to-br from-cyan to-pink-500 flex items-center justify-center">
                <Gamepad2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-display font-bold">
                <span className="text-white">ASTRO</span>
                <span className="text-cyan">ARCADE</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              The ultimate destination for free 3D browser games. Play, compete,
              and connect with gamers worldwide.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Games */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Games
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/games/space-shooter"
                  className="text-sm text-gray-500 hover:text-cyan transition-colors"
                >
                  Space Shooter
                </Link>
              </li>
              <li>
                <Link
                  href="/games/neon-runner"
                  className="text-sm text-gray-500 hover:text-pink transition-colors"
                >
                  Neon Runner
                </Link>
              </li>
              <li>
                <Link
                  href="/games/cube-puzzle"
                  className="text-sm text-gray-500 hover:text-purple transition-colors"
                >
                  Cube Puzzle
                </Link>
              </li>
              <li>
                <Link
                  href="/games/tank-battle"
                  className="text-sm text-gray-500 hover:text-green transition-colors"
                >
                  Tank Battle
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Community
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/leaderboard"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Global Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-500 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">
                  Tournaments
                </span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">
                  Cookie Policy
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-500 hover:text-white cursor-pointer transition-colors">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © 2026 Astro Arcade. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 flex items-center gap-1">
            Crafted with <Heart className="w-3 h-3 text-pink fill-pink" /> for
            gamers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
