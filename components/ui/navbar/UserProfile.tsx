// components/ui/navbar/UserProfile.tsx
"use client";

import Link from "next/link";

interface UserProfileProps {
  user: {
    username: string;
    displayName?: string;
    avatar?: string;
    totalScore: number;
  };
}

export default function UserProfile({ user }: UserProfileProps) {
  const displayName = user.displayName || user.username;
  const initial = user.username?.charAt(0).toUpperCase() || "?";

  const score = typeof user.totalScore === "number" ? user.totalScore : 0;

  const xpPercent = Math.min(score % 100, 100);

  const level = Math.floor(score / 100) + 1;


  return (
    <div className="flex items-center gap-3">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 px-4 py-2.5 rounded-2xl 
                   bg-linear-to-r from-white/5 to-transparent
                   hover:from-white/10 hover:to-white/5
                   border border-white/5 hover:border-cyan/20
                   transition-all duration-300 group"
      >
        {/* Avatar */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-cyan to-pink opacity-0 group-hover:opacity-100 blur-sm transition-opacity" />
          <div className="relative w-10 h-10 rounded-full bg-[#0a0a1a] flex items-center justify-center ring-2 ring-white/10 group-hover:ring-cyan/30 transition-all">
            {!user.avatar ? (
              <img
                src={user.avatar}
                className="w-full h-full rounded-full object-cover"
                alt=""
              />
            ) : (
              <span className="text-lg font-bold text-white">{initial}</span>
            )}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green border-2 border-[#0a0a1a]" />
        </div>

        {/* Info */}
        <div className="hidden md:flex flex-col">
          <span className="text-sm font-bold text-white group-hover:text-cyan transition-colors">
            {displayName}
          </span>

          {/* XP Bar*/}
          <div className="flex items-center gap-2 mt-0.5">
            <div className="w-16 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-cyan to-pink transition-all duration-500"
                style={{ width: `${xpPercent}20%` }}
              />
            </div>
            <span className="text-[10px] text-gray-400 font-medium">
              Lvl {level}
            </span>
          </div>

          {/* Score display */}
          <span className="text-[10px] text-gray-500">1{score} XP</span>
        </div>
      </Link>
    </div>
  );
}
