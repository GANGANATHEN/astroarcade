// app/dashboard/components/settings/ActivitySection.tsx
"use client";

const activities = [
  { action: "Password changed", time: "2 days ago", type: "security" },
  { action: "Logged in from Chrome on Windows", time: "3 days ago", type: "login" },
  { action: "Updated profile picture", time: "1 week ago", type: "profile" },
  { action: "Played Space Shooter 3D", time: "1 week ago", type: "game" },
  { action: "Added Neon Runner to favorites", time: "2 weeks ago", type: "social" },
  { action: "Changed privacy settings", time: "3 weeks ago", type: "privacy" },
];

const typeColors: Record<string, string> = {
  security: "bg-red",
  login: "bg-cyan",
  profile: "bg-pink",
  game: "bg-green",
  social: "bg-yellow",
  privacy: "bg-purple",
};

export default function ActivitySection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Activity Log</h3>
        <p className="text-sm text-gray-500">Recent activity on your account</p>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {activities.map((activity, i) => (
          <div key={i} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-white/[0.02]">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${typeColors[activity.type] || 'bg-gray'}`} />
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white truncate">{activity.action}</div>
              <div className="text-xs text-gray-500">{activity.time}</div>
            </div>
            <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full bg-white/5 text-gray-400 flex-shrink-0 hidden sm:block`}>
              {activity.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}