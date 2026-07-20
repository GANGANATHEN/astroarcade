// app/dashboard/components/settings/NotificationsSection.tsx
"use client";

import { useState } from "react";

const notificationItems = [
  { key: "push", label: "Push Notifications", desc: "Receive push notifications in browser" },
  { key: "email", label: "Email Notifications", desc: "Receive updates via email" },
  { key: "gameInvites", label: "Game Invites", desc: "When someone invites you to a game" },
  { key: "chatMessages", label: "Chat Messages", desc: "When you receive a new message" },
  { key: "leaderboardUpdates", label: "Leaderboard Updates", desc: "When your rank changes" },
  { key: "soundEffects", label: "Sound Effects", desc: "Play sounds for notifications" },
];

export default function NotificationsSection() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    gameInvites: true,
    chatMessages: true,
    leaderboardUpdates: false,
    soundEffects: true,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Notifications</h3>
        <p className="text-sm text-gray-500">Choose what you want to be notified about</p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {notificationItems.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/[0.02]">
            <div className="pr-4">
              <div className="text-sm text-white font-medium">{item.label}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
            <button
              onClick={() => setNotifications({...notifications, [item.key]: !notifications[item.key as keyof typeof notifications]})}
              className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${
                notifications[item.key as keyof typeof notifications] ? 'bg-cyan' : 'bg-white/10'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                notifications[item.key as keyof typeof notifications] ? 'left-6' : 'left-0.5'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}