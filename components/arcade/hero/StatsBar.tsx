// components/home/StatsBar.tsx
"use client";
import { Gamepad2, Users, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
  loaded: boolean;
}

function StatItem({ icon, value, label, delay, loaded }: StatItemProps) {
  const [count, setCount] = useState(0);
  const target = parseInt(value.replace(/\D/g, ""));

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev >= target) {
            clearInterval(interval);
            return target;
          }
          return prev + Math.ceil(target / 30);
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [loaded, target, delay]);

  return (
    <div className={`text-center transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="flex items-center justify-center gap-2 mb-1">
        {icon}
        <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
          {value.includes("K") ? `${count}K+` : value.includes("%") ? `${count}%` : `${count}+`}
        </span>
      </div>
      <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

interface Props {
  loaded: boolean;
}

export default function StatsBar({ loaded }: Props) {

  const stats = [
    { icon: <Gamepad2 className="w-4 h-4 text-cyan" />, value: "6", label: "Games", delay: 300 },
    { icon: <Users className="w-4 h-4 text-pink" />, value: "28", label: "Players", delay: 450 },
    { icon: <Trophy className="w-4 h-4 text-yellow" />, value: "100", label: "Free", delay: 600 },
    { icon: <Zap className="w-4 h-4 text-green" />, value: "50", label: "Countries", delay: 750 },
  ];

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14">
      {stats.map((stat) => (
        <StatItem key={stat.label} {...stat} loaded={loaded} />
      ))}
    </div>
  );
}