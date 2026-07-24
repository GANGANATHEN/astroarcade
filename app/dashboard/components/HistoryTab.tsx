// app/dashboard/components/HistoryTab.tsx
"use client";

import { Gamepad2, Clock, Trophy, Filter } from "lucide-react";
import { useState } from "react";

const mockHistory = [
  {
    id: "1",
    game: "Space Shooter 3D",
    icon: "🚀",
    score: 2500,
    result: "win",
    date: "2026-07-20",
    duration: 15,
  },
  {
    id: "2",
    game: "Chess Master",
    icon: "♟️",
    score: 800,
    result: "loss",
    date: "2026-07-19",
    duration: 45,
  },
  {
    id: "3",
    game: "Neon Runner",
    icon: "🏃",
    score: 3200,
    result: "win",
    date: "2026-07-19",
    duration: 8,
  },
  {
    id: "4",
    game: "Tank Battle",
    icon: "🎯",
    score: 1500,
    result: "draw",
    date: "2026-07-18",
    duration: 20,
  },
];

export default function HistoryTab() {
  const [filter, setFilter] = useState<"all" | "win" | "loss" | "draw">("all");

  const filtered =
    filter === "all"
      ? mockHistory
      : mockHistory.filter((h) => h.result === filter);

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan" />
          Game History
        </h3>
        <div className="flex gap-2">
          {(["all", "win", "loss", "draw"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                filter === f
                  ? "bg-white text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((game) => (
          <div
            key={game.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/2
           hover:bg-white/4 transition-colors"
          >
            <span className="text-3xl">{game.icon}</span>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">{game.game}</div>
              <div className="text-xs text-gray-500 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {game.duration} min • {game.date}
              </div>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                game.result === "win"
                  ? "bg-green/20 text-green"
                  : game.result === "loss"
                    ? "bg-red/20 text-red"
                    : "bg-yellow/20 text-yellow"
              }`}
            >
              {game.result}
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-white">{game.score}</div>
              <div className="text-xs text-gray-500">pts</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
