// app/dashboard/components/ProfileHeader.tsx
"use client";

import Link from "next/link";
import { LogOut, Settings } from "lucide-react";

interface Props {
  user: any;
  onLogout: () => void;
}

export default function ProfileHeader({ user, onLogout }: Props) {
  const displayName = user.displayName || user.username;
  const initial = user.username?.charAt(0).toUpperCase() || "?";
  const level = Math.floor((user.totalScore || 0) / 100) + 1;
  const xpPercent = (user.totalScore || 0) % 100;

  return (
    <div className="glass-card rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative flex flex-col sm:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-cyan/20 to-pink/20 flex items-center justify-center text-5xl border border-white/10">
            {user.avatar || initial}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-linear-to-r from-cyan to-pink flex items-center justify-center text-sm font-bold text-black border-2 border-black">
            {level}
          </div>
        </div>

        {/* Info */}
        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {displayName}
          </h1>
          <p className="text-gray-500">@{user.username}</p>
          
          {/* XP Bar */}
          <div className="mt-3 max-w-xs mx-auto sm:mx-0">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Level {level}</span>
              <span>{xpPercent}/100 XP</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-linear-to-r from-cyan to-pink transition-all" style={{ width: `${xpPercent}%` }} />
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mt-2 line-clamp-2">
            {user.bio || "No bio yet. Go to settings to add one!"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {/* ✅ Settings link to separate page */}
          <Link 
            href="/dashboard/settings?tab=profile"
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <Settings className="w-5 h-5 text-gray-400 group-hover:text-cyan transition-colors" />
          </Link>
          <button 
            onClick={onLogout} 
            className="p-3 rounded-xl bg-white/5 hover:bg-red/10 transition-colors group"
          >
            <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}