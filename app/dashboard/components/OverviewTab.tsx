// app/dashboard/components/OverviewTab.tsx
"use client";

import { Gamepad2, Trophy, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

interface Props {
  user: any;
}

export default function OverviewTab({ user }: Props) {
  const recentGames = [
    { name: "Space Shooter 3D", icon: "🚀", score: 1500, result: "win", time: "2h ago" },
    { name: "Chess Master", icon: "♟️", score: 800, result: "loss", time: "5h ago" },
    { name: "Neon Runner", icon: "🏃", score: 2200, result: "win", time: "1d ago" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan" />
            Recent Activity
          </h3>
          <Link href="/dashboard?tab=history" className="text-xs text-cyan hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {recentGames.map((game, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
              <span className="text-2xl">{game.icon}</span>
              <div className="flex-1">
                <div className="text-sm text-white">{game.name}</div>
                <div className="text-xs text-gray-600">{game.time}</div>
              </div>
              <div className={`text-sm font-bold ${game.result === 'win' ? 'text-green' : 'text-red'}`}>
                {game.result === 'win' ? '+' : '-'}{game.score}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="glass-card rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-pink" />
          Performance
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Win Rate</span>
              <span className="text-white font-bold">68%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan to-pink" style={{ width: '68%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Accuracy</span>
              <span className="text-white font-bold">82%</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-green to-cyan" style={{ width: '82%' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Reaction Time</span>
              <span className="text-white font-bold">245ms</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-yellow to-orange" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Favorite Games */}
      <div className="glass-card rounded-2xl p-6 lg:col-span-2">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Gamepad2 className="w-5 h-5 text-pink" />
          Favorite Games
        </h3>
        {(user.favoriteGames || []).length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm mb-2">No favorite games yet</p>
            <Link href="/#games" className="text-cyan text-sm hover:underline">Explore games →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(user.favoriteGames || []).slice(0, 4).map((gameId: string) => (
              <Link key={gameId} href={`/games/${gameId}`} className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors text-center">
                <span className="text-3xl mb-2 block">🎮</span>
                <span className="text-sm text-white capitalize">{gameId.replace("-", " ")}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}