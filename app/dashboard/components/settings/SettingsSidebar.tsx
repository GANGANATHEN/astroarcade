// app/dashboard/components/settings/SettingsSidebar.tsx
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  User,
  Bell,
  Palette,
  Globe,
  Shield,
  Monitor,
  Key,
  Users,
  Clock,
  ChevronRight,
} from "lucide-react";

const sections = [
  { id: "profile", label: "Profile", icon: User, desc: "Edit your profile" },
  { id: "account", label: "Account", icon: Key, desc: "Security & password" },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    desc: "Theme & colors",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    desc: "Alerts & sounds",
  },
  { id: "privacy", label: "Privacy", icon: Shield, desc: "Visibility control" },
  { id: "sessions", label: "Sessions", icon: Monitor, desc: "Active devices" },
  { id: "social", label: "Social", icon: Users, desc: "Friends & blocking" },
  { id: "language", label: "Language", icon: Globe, desc: "App language" },
  { id: "activity", label: "Activity", icon: Clock, desc: "Account logs" },
];

export default function SettingsSidebar() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "profile";

  return (
    <div className="w-full lg:w-72 shrink-0">
      <div className="glass-card rounded-2xl p-3 lg:p-4 sticky top-24 lg:top-28">
        <h2 className="text-base lg:text-lg font-bold text-white mb-0.5 px-2 lg:px-3">
          Settings
        </h2>
        <p className="text-[10px] lg:text-xs text-gray-500 mb-3 lg:mb-4 px-2 lg:px-3">
          Manage your account
        </p>

        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
          {sections.map((section) => {
            const isActive = currentTab === section.id;
            return (
              <Link
                key={section.id}
                href={`/dashboard/settings?tab=${section.id}`}
                className={`flex items-center gap-2 lg:gap-3 px-2 lg:px-3 py-2 lg:py-2.5 rounded-xl transition-all group whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <section.icon
                  className={`w-4 h-4 ${isActive ? "text-cyan" : ""}`}
                />
                <div className="hidden lg:block flex-1 min-w-0">
                  <div className="text-sm font-medium">{section.label}</div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {section.desc}
                  </div>
                </div>
                <span className="lg:hidden text-xs">{section.label}</span>
                <ChevronRight
                  className={`w-4 h-4 hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? "opacity-100 text-cyan" : ""}`}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
