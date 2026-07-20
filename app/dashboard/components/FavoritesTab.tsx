// app/dashboard/components/FavoritesTab.tsx
"use client";

import { Heart, Gamepad2, ExternalLink } from "lucide-react";
import Link from "next/link";

const mockFavorites = [
  { id: "space-shooter", name: "Space Shooter 3D", icon: "🚀", category: "Action", rating: 4.8, plays: 12500 },
  { id: "chess-master", name: "Chess Master", icon: "♟️", category: "Strategy", rating: 4.9, plays: 8900 },
  { id: "neon-runner", name: "Neon Runner", icon: "🏃", category: "Arcade", rating: 4.5, plays: 15200 },
];

interface Props {
  user: any;
}

export default function FavoritesTab({ user }: Props) {
  const favorites = (user.favoriteGames || []).length > 0 ? mockFavorites : [];

  if (favorites.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center">
        <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-white mb-2">No Favorites Yet</h3>
        <p className="text-gray-500 text-sm mb-4">Start exploring and favorite your best games!</p>
        <Link href="/#games" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-cyan to-pink rounded-full text-black font-bold text-sm hover:opacity-90 transition-opacity">
          <Gamepad2 className="w-4 h-4" />
          Browse Games
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((game) => (
        <Link key={game.id} href={`/games/${game.id}`} className="glass-card rounded-2xl p-5 hover:bg-white/[0.04] transition-all group">
          <div className="flex items-start justify-between mb-4">
            <span className="text-4xl">{game.icon}</span>
            <ExternalLink className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h4 className="font-bold text-white mb-1">{game.name}</h4>
          <p className="text-xs text-gray-500 mb-3">{game.category}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-yellow flex items-center gap-1">⭐ {game.rating}</span>
            <span className="text-gray-500">{game.plays.toLocaleString()} plays</span>
          </div>
        </Link>
      ))}
    </div>
  );
}