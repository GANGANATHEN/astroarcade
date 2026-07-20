// app/dashboard/components/settings/AccountSection.tsx
"use client";

import { useState } from "react";
import { Key, AlertTriangle, Trash2, Save, Eye, EyeOff } from "lucide-react";

export default function AccountSection() {
  const [account, setAccount] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">Account Security</h3>
        <p className="text-sm text-gray-500">Manage password and security</p>
      </div>

      {/* Change Password */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Key className="w-4 h-4 text-cyan" />
          Change Password
        </h4>
        
        {[
          { key: "currentPassword", label: "Current Password", show: showPasswords.current, setShow: () => setShowPasswords({...showPasswords, current: !showPasswords.current}) },
          { key: "newPassword", label: "New Password", show: showPasswords.new, setShow: () => setShowPasswords({...showPasswords, new: !showPasswords.new}) },
          { key: "confirmPassword", label: "Confirm New Password", show: showPasswords.confirm, setShow: () => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm}) },
        ].map((field) => (
          <div key={field.key}>
            <label className="text-sm text-gray-400 mb-2 block">{field.label}</label>
            <div className="relative">
              <input 
                type={field.show ? "text" : "password"}
                value={account[field.key as keyof typeof account] as string}
                onChange={(e) => setAccount({...account, [field.key]: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white text-sm focus:outline-none focus:border-cyan/50 transition-colors"
              />
              <button 
                onClick={field.setShow}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                {field.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2FA */}
      <div className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
            <p className="text-xs text-gray-500 mt-1">Add extra security layer</p>
          </div>
          <button
            onClick={() => setAccount({...account, twoFactor: !account.twoFactor})}
            className={`w-12 h-6 rounded-full transition-all relative flex-shrink-0 ${
              account.twoFactor ? 'bg-cyan' : 'bg-white/10'
            }`}
          >
            <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
              account.twoFactor ? 'left-6' : 'left-0.5'
            }`} />
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card rounded-2xl p-4 sm:p-6 border-red/20">
        <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4" />
          Danger Zone
        </h4>
        <p className="text-xs text-gray-500 mb-4">Once deleted, account cannot be recovered</p>
        <button className="px-4 py-2 rounded-xl bg-red/10 text-red-400 text-sm font-medium hover:bg-red/20 transition-colors flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>
    </div>
  );
}