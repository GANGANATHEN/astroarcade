// app/dashboard/components/settings/SocialSection.tsx
"use client";

import { Users, UserX, UserPlus } from "lucide-react";

export default function SocialSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Social Settings</h3>
        <p className="text-sm text-gray-500">Manage your social connections</p>
      </div>

      {/* Blocked Users */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserX className="w-5 h-5 text-red" />
          <h4 className="text-sm font-bold text-white">Blocked Users</h4>
        </div>
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">You have no blocked users</p>
        </div>
      </div>

      {/* Friend Requests */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-cyan" />
          <h4 className="text-sm font-bold text-white">Friend Requests</h4>
        </div>
        <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/2">
          <div>
            <div className="text-sm text-white">Auto-accept Friends</div>
            <div className="text-xs text-gray-500">
              Automatically accept friend requests
            </div>
          </div>
          <button className="w-12 h-6 rounded-full bg-white/10 relative shrink-0">
            <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
