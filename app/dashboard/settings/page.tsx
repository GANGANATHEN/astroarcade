// app/dashboard/settings/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import SettingsLayout from "../components/settings/SettingsLayout";
import ProfileSection from "../components/settings/ProfileSection";
import AccountSection from "../components/settings/AccountSection";
import AppearanceSection from "../components/settings/AppearanceSection";
import NotificationsSection from "../components/settings/NotificationsSection";
import PrivacySection from "../components/settings/PrivacySection";
import SessionsSection from "../components/settings/SessionsSection";
import SocialSection from "../components/settings/SocialSection";
import LanguageSection from "../components/settings/LanguageSection";
import ActivitySection from "../components/settings/ActivitySection";

export default function SettingsPage() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "profile";
  const { user } = useAuthStore();

  const renderSection = () => {
    switch (tab) {
      case "profile":
        return <ProfileSection user={user} />;
      case "account":
        return <AccountSection />;
      case "appearance":
        return <AppearanceSection />;
      case "notifications":
        return <NotificationsSection />;
      case "privacy":
        return <PrivacySection />;
      case "sessions":
        return <SessionsSection />;
      case "social":
        return <SocialSection />;
      case "language":
        return <LanguageSection />;
      case "activity":
        return <ActivitySection />;
      default:
        return <ProfileSection user={user} />;
    }
  };

  return <SettingsLayout>{renderSection()}</SettingsLayout>;
}
