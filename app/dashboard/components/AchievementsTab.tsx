// app/dashboard/components/AchievementsTab.tsx
"use client";

import { Award, Lock, Star } from "lucide-react";

const achievements = [
  { id: "1", title: "First Blood", desc: "Win your first game", icon: "🩸", unlocked: true, progress: 100 },
  { id: "2", title: "Sharpshooter", desc: "Score 5000+ in Space Shooter", icon: "🎯", unlocked: true, progress: 100 },
  { id: "3", title: "Speed Demon", desc: "Complete Neon Runner under 5min", icon: "⚡", unlocked: false, progress: 65 },
  { id: "4", title: "Grandmaster", desc: "Win 100 games", icon: "👑", unlocked: false, progress: 42 },
  { id: "5", title: "Social Butterfly", desc: "Chat with 50 players", icon: "💬", unlocked: false, progress: 20 },
  { id: "6", title: "Collector", desc: "Favorite 10 games", icon: "❤️", unlocked: false, progress: 30 },
];

export default function AchievementsTab() {
  const unlocked = achievements.filter(a => a.unlocked).length;
  const total = achievements.length;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Achievement Progress</h3>
          <span className="text-sm text-gray-400">{unlocked}/{total} Unlocked</span>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-linear-to-r from-cyan to-pink transition-all" style={{ width: `${(unlocked/total)*100}%` }} />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((ach) => (
          <div key={ach.id} className={`glass-card rounded-2xl p-5 transition-all ${
            ach.unlocked ? 'border-cyan/20' : 'opacity-60'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                ach.unlocked ? 'bg-cyan/20' : 'bg-white/5'
              }`}>
                {ach.unlocked ? ach.icon : <Lock className="w-5 h-5 text-gray-500" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white">{ach.title}</h4>
                  {ach.unlocked && <Star className="w-4 h-4 text-yellow fill-yellow" />}
                </div>
                <p className="text-xs text-gray-500 mt-1">{ach.desc}</p>
                
                {!ach.unlocked && (
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-cyan">{ach.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-cyan/50" style={{ width: `${ach.progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}