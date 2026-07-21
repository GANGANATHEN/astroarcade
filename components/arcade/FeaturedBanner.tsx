"use client";

import Link from "next/link";
import { Zap, ArrowRight, Users, Star } from "lucide-react";

export default function FeaturedBanner() {
  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden neon-glow-cyan">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow" />
                <span className="text-xs font-bold text-yellow uppercase tracking-widest">Featured Game</span>
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-4">
                Space Shooter <span className="text-cyan">3D</span>
              </h3>
              <p className="text-gray-400 max-w-xl mb-6 text-sm sm:text-base">
                Our most popular game with over 12,000 players. Blast through asteroid fields, 
                dodge enemy fire, and climb the global leaderboard. Now with multiplayer mode!
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>12,450 players</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Star className="w-4 h-4 text-yellow fill-yellow" />
                  <span>4.8 rating</span>
                </div>
                <span className="px-2 py-1 rounded-full bg-green/20 text-green text-xs font-medium">Multiplayer</span>
              </div>
              <Link 
                href="/games/space-shooter" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan text-black rounded-full font-bold hover:bg-cyan/90 transition-colors"
              >
                Play Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="w-full max-w-sm lg:max-w-md">
              <div className="aspect-video rounded-2xl bg-linear-to-br from-cyan/20 to-purple/20 flex items-center justify-center border border-white/10">
                <span className="text-8xl sm:text-9xl">🚀</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
