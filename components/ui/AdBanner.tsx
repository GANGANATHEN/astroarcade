"use client";

export default function AdBanner({ position = "horizontal", className = "" }: { position?: "horizontal" | "vertical"; className?: string }) {
  return (
    <div className={`glass-card rounded-2xl flex items-center justify-center border border-dashed border-white/10 ${position === "horizontal" ? "w-full h-24 sm:h-32" : "w-full sm:w-64 h-64 sm:h-full"} ${className}`}>
      <div className="text-center px-4">
        <p className="text-xs text-gray-600 uppercase tracking-widest mb-1">Advertisement</p>
        <p className="text-sm text-gray-700">Google AdSense Ready</p>
      </div>
    </div>
  );
}