// app/dashboard/components/settings/PrivacySection.tsx
"use client";

import { useState } from "react";

const visibilityOptions = [
  { id: "public", label: "Public", desc: "Everyone can see your profile and activity" },
  { id: "friends", label: "Friends Only", desc: "Only friends can see your profile" },
  { id: "private", label: "Private", desc: "Only you can see your profile" },
];

const privacyToggles = [
  { key: "showOnlineStatus", label: "Show Online Status", desc: "Let others see when you're online" },
  { key: "showGameActivity", label: "Show Game Activity", desc: "Share what game you're playing" },
  { key: "allowFriendRequests", label: "Allow Friend Requests", desc: "Let others send you friend requests" },
  { key: "allowGameInvites", label: "Allow Game Invites", desc: "Let others invite you to games" },
];

export default function PrivacySection() {
  const [privacy, setPrivacy] = useState({
    profileVisible: "public",
    showOnlineStatus: true,
    showGameActivity: true,
    allowFriendRequests: true,
    allowGameInvites: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Privacy</h3>
        <p className="text-sm text-gray-500">Control who can see your activity</p>
      </div>

      {/* Visibility */}
      <div>
        <label className="text-sm text-gray-400 mb-3 block">Profile Visibility</label>
        <div className="space-y-2">
          {visibilityOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setPrivacy({...privacy, profileVisible: option.id})}
              className={`w-full text-left p-3 sm:p-4 rounded-xl border transition-all ${
                privacy.profileVisible === option.id ? 'border-cyan bg-cyan/5' : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="text-sm text-white font-medium">{option.label}</div>
              <div className="text-xs text-gray-500">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2 sm:space-y-3">
        {privacyToggles.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/2">
            <div className="pr-4">
              <div className="text-sm text-white font-medium">{item.label}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
            <button
              onClick={() => setPrivacy({...privacy, [item.key]: !privacy[item.key as keyof typeof privacy]})}
              className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${
                privacy[item.key as keyof typeof privacy] ? 'bg-cyan' : 'bg-white/10'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                privacy[item.key as keyof typeof privacy] ? 'left-6' : 'left-0.5'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}