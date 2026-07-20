// hooks/useGameActions.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchGameStats, postGameAction } from "@/lib/api/gameApi";
import { useAuthStore } from "@/store/authStore";
import { GameActionResponse, ActionType } from "@/types/game";

interface UseGameActionsReturn {
  likes: number;
  dislikes: number;
  favorites: number;
  userAction: string | null;
  loading: boolean;
  error: string | null;
  handleAction: (type: ActionType) => Promise<void>;
}

export function useGameActions(
  gameId: string, 
  initialLikes: number, 
  initialDislikes: number
): UseGameActionsReturn {
  const { user, token } = useAuthStore();
  const [stats, setStats] = useState<GameActionResponse>({
    likes: initialLikes,
    dislikes: initialDislikes,
    favorites: 0,
    userType: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch stats (with auth to get userType)
  useEffect(() => {
    fetchGameStats(gameId, token || undefined)
      .then(setStats)
      .catch(() => {
        setStats({
          likes: initialLikes,
          dislikes: initialDislikes,
          favorites: 0,
          userType: null,
        });
      });
  }, [gameId, initialLikes, initialDislikes, token]);

  const handleAction = useCallback(async (type: ActionType) => {
    if (!user || !token) {
      alert("Please login to interact!");
      return;
    }
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const result = await postGameAction(gameId, type, token);
      setStats(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("Action failed:", err);
    } finally {
      setLoading(false);
    }
  }, [gameId, token, user, loading]);

  return {
    likes: stats.likes,
    dislikes: stats.dislikes,
    favorites: stats.favorites,
    userAction: stats.userType,
    loading,
    error,
    handleAction,
  };
}