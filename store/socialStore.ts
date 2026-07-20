// store/socialStore.ts
"use client";

import { create } from "zustand";

interface SocialState {
  // Global counts (for leaderboard/stats)
  totalLikes: Record<string, number>;
  totalDislikes: Record<string, number>;
  totalFavorites: Record<string, number>;

  // Actions
  setGameStats: (
    gameId: string,
    likes: number,
    dislikes: number,
    favorites: number,
  ) => void;
}

export const useSocialStore = create<SocialState>((set) => ({
  totalLikes: {},
  totalDislikes: {},
  totalFavorites: {},

  setGameStats: (gameId, likes, dislikes, favorites) =>
    set((state) => ({
      totalLikes: { ...state.totalLikes, [gameId]: likes },
      totalDislikes: { ...state.totalDislikes, [gameId]: dislikes },
      totalFavorites: { ...state.totalFavorites, [gameId]: favorites },
    })),
}));
