"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trophy, Medal, Crown, ArrowRight, TrendingUp } from "lucide-react";

const mockLeaderboard = [
  { rank: 1, name: "NeonKing", score: 98500, games: 45, avatar: "👑", trend: "up" },
  { rank: 2, name: "PixelPro", score: 87200, games: 38, avatar: "🎮", trend: "same" },
  { rank: 3, name: "CubeMaster", score: 76400, games: 52, avatar: "🧊", trend: "up" },
  { rank: 4, name: "ArcadeAce", score: 65100, games: 30, avatar: "🎯", trend: "down" },
  { rank: 5, name: "RetroRider", score: 54300, games: 25, avatar: "🚀", trend: "up" },
];

export default function LeaderboardSection() {
  const [period, setPeriod] = useState("all");

  return (
    <section id="leaderboard" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-yellow" />
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter">
                <span className="text-white">TOP</span> <span className="text-gradient">PLAYERS</span>
              </h2>
            </div>
          </div>
          <div className="flex gap-2">
            {["all", "week", "month"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                  period === p
                    ? "bg-white text-black"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                }`}
              >
                {p === "all" ? "All Time" : p}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {mockLeaderboard.map((player) => (
            <div
              key={player.rank}
              className={`flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all hover:bg-white/4 ${
                player.rank === 1 ? "bg-yellow/5 border-yellow/20" :
                player.rank === 2 ? "bg-gray-500/5 border-gray-500/20" :
                player.rank === 3 ? "bg-amber-600/5 border-amber-600/20" :
                "bg-white/2 border-white/5"
              }`}
            >
              <div className="flex items-center justify-center w-8">
                {player.rank === 1 ? <Crown className="w-5 h-5 text-yellow" /> :
                 player.rank === 2 ? <Medal className="w-5 h-5 text-gray-300" /> :
                 player.rank === 3 ? <Medal className="w-5 h-5 text-amber-600" /> :
                 <span className="text-sm font-bold text-gray-600 w-5 text-center">{player.rank}</span>}
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">{player.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm sm:text-base truncate">{player.name}</div>
                <div className="text-xs text-gray-500">{player.games} games played</div>
              </div>
              <div className="flex items-center gap-3">
                {player.trend === "up" && <TrendingUp className="w-4 h-4 text-green" />}
                <div className="text-right">
                  <div className="font-bold text-cyan text-sm sm:text-base">{player.score.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">pts</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/leaderboard" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/5 transition-colors">
            View Full Leaderboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
