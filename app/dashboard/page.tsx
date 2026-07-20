// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import ProfileHeader from "./components/ProfileHeader";
import StatsGrid from "./components/StatsGrid";
import TabNavigation from "./components/TabNavigation";
import OverviewTab from "./components/OverviewTab";
import HistoryTab from "./components/HistoryTab";
import AchievementsTab from "./components/AchievementsTab";
import FavoritesTab from "./components/FavoritesTab";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  if (!user) return null;

  return (
    <>
      <ProfileHeader user={user} onLogout={logout} />
      <StatsGrid user={user} />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" && <OverviewTab user={user} />}
      {activeTab === "history" && <HistoryTab />}
      {activeTab === "achievements" && <AchievementsTab />}
      {activeTab === "favorites" && <FavoritesTab user={user} />}
    </>
  );
}
