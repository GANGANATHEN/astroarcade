// app/dashboard/components/settings/SessionsSection.tsx
"use client";

import { useState } from "react";
import { Smartphone, Laptop, LogOut } from "lucide-react";

const initialSessions = [
  { id: "1", device: "Chrome on Windows", location: "Chennai, India", current: true, lastActive: "Now" },
  { id: "2", device: "Safari on iPhone", location: "Chennai, India", current: false, lastActive: "2h ago" },
  { id: "3", device: "Firefox on Mac", location: "Bangalore, India", current: false, lastActive: "3d ago" },
];

export default function SessionsSection() {
  const [sessions, setSessions] = useState(initialSessions);

  const handleLogoutDevice = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id));
  };

  const handleLogoutAll = () => {
    setSessions(sessions.filter(s => s.current));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Active Sessions</h3>
        <p className="text-sm text-gray-500">Manage your active devices</p>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div 
            key={session.id} 
            className={`glass-card rounded-2xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 ${
              session.current ? 'border-cyan/30' : ''
            }`}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
              {session.device.includes("iPhone") || session.device.includes("Android") ? (
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              ) : (
                <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-white truncate">{session.device}</span>
                {session.current && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan/20 text-cyan text-[10px] font-bold flex-shrink-0">CURRENT</span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-0.5">{session.location} • {session.lastActive}</div>
            </div>
            {!session.current && (
              <button
                onClick={() => handleLogoutDevice(session.id)}
                className="p-2 rounded-lg hover:bg-red/10 text-gray-400 hover:text-red-400 transition-colors flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

      {sessions.length > 1 && (
        <button
          onClick={handleLogoutAll}
          className="w-full p-3 sm:p-4 rounded-xl bg-red/10 text-red-400 text-sm font-medium hover:bg-red/20 transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Logout from All Other Devices
        </button>
      )}
    </div>
  );
}