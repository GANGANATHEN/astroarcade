"use client";

import { useState } from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/Footer";
import { Trophy, Crown, Medal, TrendingUp, TrendingDown, Minus, Filter } from "lucide-react";

const mockLeaderboard = [
  { rank: 1, name: "NeonKing", score: 98500, games: 45, wins: 32, avatar: "👑", trend: "up", category: "action" },
  { rank: 2, name: "PixelPro", score: 87200, games: 38, wins: 28, avatar: "🎮", trend: "same", category: "arcade" },
  { rank: 3, name: "CubeMaster", score: 76400, games: 52, wins: 41, avatar: "🧊", trend: "up", category: "puzzle" },
  { rank: 4, name: "ArcadeAce", score: 65100, games: 30, wins: 22, avatar: "🎯", trend: "down", category: "multiplayer" },
  { rank: 5, name: "RetroRider", score: 54300, games: 25, wins: 18, avatar: "🚀", trend: "up", category: "racing" },
  { rank: 6, name: "SpeedDemon", score: 48900, games: 22, wins: 15, avatar: "⚡", trend: "same", category: "racing" },
  { rank: 7, name: "PuzzleKing", score: 43200, games: 35, wins: 28, avatar: "🧩", trend: "up", category: "puzzle" },
  { rank: 8, name: "TankCommander", score: 38700, games: 18, wins: 14, avatar: "🎖️", trend: "down", category: "multiplayer" },
  { rank: 9, name: "StarBlazer", score: 32100, games: 20, wins: 12, avatar: "⭐", trend: "same", category: "action" },
  { rank: 10, name: "ChessMaster", score: 28400, games: 15, wins: 12, avatar: "♟️", trend: "up", category: "strategy" },
];

const categories = ["all", "action", "arcade", "puzzle", "multiplayer", "racing", "strategy"];

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [period, setPeriod] = useState("all");

  const filtered = activeCategory === "all" ? mockLeaderboard : mockLeaderboard.filter((p) => p.category === activeCategory);

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red" />;
    return <Minus className="w-4 h-4 text-gray-600" />;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "bg-yellow/10 border-yellow/30 text-yellow";
    if (rank === 2) return "bg-gray-400/10 border-gray-400/30 text-gray-300";
    if (rank === 3) return "bg-amber-700/10 border-amber-700/30 text-amber-600";
    return "bg-white/[0.02] border-white/5 text-gray-500";
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter mb-4">
              <span className="text-white">GLOBAL</span> <span className="text-gradient">LEADERBOARD</span>
            </h1>
            <p className="text-gray-500">Compete with players worldwide and climb the ranks</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all whitespace-nowrap ${
                    activeCategory === cat ? "bg-white text-black" : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {["all", "week", "month"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-2 rounded-full text-xs font-medium capitalize transition-all ${
                    period === p ? "bg-cyan text-black" : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {p === "all" ? "All Time" : p}
                </button>
              ))}
            </div>
          </div>

          {/* Top 3 Podium */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {filtered.slice(0, 3).map((player, i) => (
              <div key={player.rank} className={`glass-card rounded-2xl p-4 sm:p-6 text-center border ${getRankStyle(player.rank)} ${i === 0 ? "order-2" : i === 1 ? "order-1" : "order-3"}`}>
                <div className="text-3xl sm:text-4xl mb-2">{player.avatar}</div>
                <div className="font-bold text-white text-sm sm:text-base truncate">{player.name}</div>
                <div className="text-xs text-gray-500 mb-2">{player.games} games</div>
                <div className="text-xl sm:text-2xl font-bold">{player.score.toLocaleString()}</div>
                <div className="text-xs text-gray-600">pts</div>
              </div>
            ))}
          </div>

          {/* Full List */}
          <div className="space-y-2">
            {filtered.map((player) => (
              <div key={player.rank} className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:bg-white/[0.04] ${getRankStyle(player.rank)}`}>
                <div className="w-8 text-center font-bold">
                  {player.rank <= 3 ? (
                    player.rank === 1 ? <Crown className="w-5 h-5 text-yellow mx-auto" /> :
                    player.rank === 2 ? <Medal className="w-5 h-5 text-gray-300 mx-auto" /> :
                    <Medal className="w-5 h-5 text-amber-600 mx-auto" />
                  ) : (
                    <span className="text-sm text-gray-600">{player.rank}</span>
                  )}
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-lg">{player.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-sm sm:text-base truncate">{player.name}</div>
                  <div className="text-xs text-gray-500">{player.games} games • {player.wins} wins</div>
                </div>
                <div className="flex items-center gap-3">
                  {getTrendIcon(player.trend)}
                  <div className="text-right">
                    <div className="font-bold text-white text-sm sm:text-base">{player.score.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">pts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
