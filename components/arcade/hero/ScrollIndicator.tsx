// components/home/ScrollIndicator.tsx
"use client";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce">
      <span className="text-[10px] text-gray-500 uppercase tracking-widest">Scroll</span>
      <ChevronDown className="w-5 h-5 text-gray-500" />
    </div>
  );
}