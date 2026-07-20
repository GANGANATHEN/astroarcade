// app/dashboard/components/settings/SettingsLayout.tsx
"use client";

import SettingsSidebar from "./SettingsSidebar";

interface Props {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: Props) {
  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
      <SettingsSidebar />
      <div className="flex-1 min-w-0">
        <div className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}