// app/dashboard/components/settings/AppearanceSection.tsx
"use client";

import { useState } from "react";

const themes = [
  { id: "dark", label: "Dark", bg: "bg-black", border: "border-white/20" },
  { id: "light", label: "Light", bg: "bg-gray-100", border: "border-gray-300" },
  { id: "neon", label: "Neon", bg: "bg-gradient-to-br from-cyan/20 to-pink/20", border: "border-cyan" },
];

const accentColors = [
  { id: "cyan", color: "bg-cyan" },
  { id: "pink", color: "bg-pink" },
  { id: "green", color: "bg-green" },
  { id: "purple", color: "bg-purple" },
  { id: "orange", color: "bg-orange" },
  { id: "yellow", color: "bg-yellow" },
];

export default function AppearanceSection() {
  const [appearance, setAppearance] = useState({
    theme: "dark",
    accentColor: "cyan",
    animations: true,
    compactMode: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Appearance</h3>
        <p className="text-sm text-gray-500">Customize how Astro Arcade looks</p>
      </div>

      {/* Theme */}
      <div>
        <label className="text-sm text-gray-400 mb-3 block">Theme</label>
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setAppearance({...appearance, theme: theme.id})}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all ${
                appearance.theme === theme.id ? theme.border : 'border-white/10'
              }`}
            >
              <div className={`w-full h-12 sm:h-16 rounded-lg sm:rounded-xl ${theme.bg} mb-2 sm:mb-3`} />
              <span className="text-xs sm:text-sm text-white font-medium">{theme.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div>
        <label className="text-sm text-gray-400 mb-3 block">Accent Color</label>
        <div className="flex flex-wrap gap-3">
          {accentColors.map((c) => (
            <button
              key={c.id}
              onClick={() => setAppearance({...appearance, accentColor: c.id})}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${c.color} transition-all ${
                appearance.accentColor === c.id ? 'ring-2 sm:ring-[3px] ring-white scale-110' : 'opacity-60 hover:opacity-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-3">
        {[
          { key: "animations", label: "Animations", desc: "Enable UI animations" },
          { key: "compactMode", label: "Compact Mode", desc: "Reduce spacing for more content" },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/2">
            <div>
              <div className="text-sm text-white font-medium">{item.label}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
            <button
              onClick={() => setAppearance({...appearance, [item.key]: !appearance[item.key as keyof typeof appearance]})}
              className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${
                appearance[item.key as keyof typeof appearance] ? 'bg-cyan' : 'bg-white/10'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                appearance[item.key as keyof typeof appearance] ? 'left-6' : 'left-0.5'
              }`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}