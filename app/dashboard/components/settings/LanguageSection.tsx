// app/dashboard/components/settings/LanguageSection.tsx
"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const languages = [
  { id: "en", label: "English", flag: "🇺🇸", region: "United States" },
  { id: "ta", label: "Tamil", flag: "🇮🇳", region: "India" },
  { id: "hi", label: "Hindi", flag: "🇮🇳", region: "India" },
  { id: "es", label: "Spanish", flag: "🇪🇸", region: "Spain" },
  { id: "fr", label: "French", flag: "🇫🇷", region: "France" },
  { id: "de", label: "German", flag: "🇩🇪", region: "Germany" },
  { id: "ja", label: "Japanese", flag: "🇯🇵", region: "Japan" },
  { id: "ko", label: "Korean", flag: "🇰🇷", region: "South Korea" },
  { id: "zh", label: "Chinese", flag: "🇨🇳", region: "China" },
  { id: "ar", label: "Arabic", flag: "🇸🇦", region: "Saudi Arabia" },
];

export default function LanguageSection() {
  const [selected, setSelected] = useState("en");

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Language & Region</h3>
        <p className="text-sm text-gray-500">Choose your preferred language</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setSelected(lang.id)}
            className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all text-left ${
              selected === lang.id ? 'border-cyan bg-cyan/5' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'
            }`}
          >
            <span className="text-xl sm:text-2xl flex-shrink-0">{lang.flag}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-white font-medium">{lang.label}</div>
              <div className="text-xs text-gray-500">{lang.region}</div>
            </div>
            {selected === lang.id && <Check className="w-4 h-4 text-cyan flex-shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}