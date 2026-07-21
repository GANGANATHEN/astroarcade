// app/dashboard/components/StatsGrid.tsx
"use client";

import { Trophy, Gamepad2, Star, TrendingUp, Clock, Target, Flame, Crown } from "lucide-react";

interface Props {
  user: any;
}

export default function StatsGrid({ user }: Props) {
  const stats = [
    { label: "Total Score", value: user.totalScore || 0, icon: Trophy, color: "from-yellow/20 to-yellow/5", iconColor: "text-yellow" },
    { label: "Games Played", value: user.gamesPlayed || 0, icon: Gamepad2, color: "from-cyan/20 to-cyan/5", iconColor: "text-cyan" },
    { label: "Games Won", value: user.gamesWon || 0, icon: Star, color: "from-pink/20 to-pink/5", iconColor: "text-pink" },
    { label: "Win Rate", value: user.gamesPlayed ? Math.round((user.gamesWon / user.gamesPlayed) * 100) : 0, suffix: "%", icon: Target, color: "from-green/20 to-green/5", iconColor: "text-green" },
    { label: "Current Streak", value: user.currentStreak || 0, icon: Flame, color: "from-orange/20 to-orange/5", iconColor: "text-orange" },
    { label: "Best Streak", value: user.bestStreak || 0, icon: TrendingUp, color: "from-purple/20 to-purple/5", iconColor: "text-purple" },
    { label: "Play Time", value: Math.floor((user.totalPlayTime || 0) / 60), suffix: "h", icon: Clock, color: "from-blue/20 to-blue/5", iconColor: "text-blue" },
    { label: "Global Rank", value: user.rank ? `#${user.rank}` : "Unranked", icon: Crown, color: "from-amber/20 to-amber/5", iconColor: "text-amber" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card rounded-2xl p-5 hover:bg-white/0.04 transition-all group">
          <div className={`w-10 h-10 rounded-xl bg-linear-to-br ${stat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
            <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
          </div>
          <div className="text-2xl font-bold text-white">{stat.value}{stat.suffix || ""}</div>
          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}