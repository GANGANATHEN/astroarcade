// app/dashboard/components/settings/ProfileSection.tsx
"use client";

import { useState } from "react";
import { Save, Camera } from "lucide-react";

interface Props {
  user: any;
}

const avatars = ["👤", "🎮", "🚀", "👑", "⚡", "🔥", "💀", "🤖", "👽", "🐱", "🦊", "🐼"];

export default function ProfileSection({ user }: Props) {
  const [profile, setProfile] = useState({
    displayName: user?.displayName || "",
    username: user?.username || "",
    bio: user?.bio || "",
    email: user?.email || "",
    avatar: user?.avatar || "👤",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Profile Information</h3>
        <p className="text-sm text-gray-500">Update your public profile details</p>
      </div>

      {/* Avatar */}
      <div>
        <label className="text-sm text-gray-400 mb-3 block">Avatar</label>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {avatars.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setProfile({...profile, avatar: emoji})}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl text-2xl sm:text-3xl flex items-center justify-center transition-all border-2 ${
                profile.avatar === emoji ? 'border-cyan bg-cyan/20' : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Display Name</label>
          <input 
            type="text" 
            value={profile.displayName}
            onChange={(e) => setProfile({...profile, displayName: e.target.value})}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">Username</label>
          <input 
            type="text" 
            value={profile.username}
            disabled
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-500 text-sm cursor-not-allowed"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Bio</label>
        <textarea 
          value={profile.bio}
          onChange={(e) => setProfile({...profile, bio: e.target.value})}
          rows={4}
          placeholder="Tell us about yourself..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan/50 resize-none transition-colors"
        />
      </div>

      <div>
        <label className="text-sm text-gray-400 mb-2 block">Email</label>
        <input 
          type="email" 
          value={profile.email}
          onChange={(e) => setProfile({...profile, email: e.target.value})}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan/50 transition-colors"
        />
      </div>

      {/* Save */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        {saved && <span className="text-sm text-green">✓ Saved!</span>}
        <button 
          onClick={handleSave}
          className="ml-auto flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan to-pink rounded-xl text-black font-bold text-sm hover:opacity-90 transition-opacity"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>
    </div>
  );
}