// app/dashboard/components/TabNavigation.tsx
"use client";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "history", label: "History" },
  { id: "achievements", label: "Achievements" },
  { id: "favorites", label: "Favorites" },
];

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
            activeTab === tab.id 
              ? "bg-gradient-to-r from-cyan to-pink text-black font-bold" 
              : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}