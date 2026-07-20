// lib/api/gameApi.ts
import { GameActionResponse, ActionType } from "@/types/game";

const API_BASE = "/api/games";

// Get game stats + user's action
export async function fetchGameStats(gameId: string, token?: string): Promise<GameActionResponse> {
  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;
  
  const res = await fetch(`${API_BASE}/like?gameId=${gameId}`, { headers });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

// Post action
export async function postGameAction(
  gameId: string,
  type: ActionType,
  token: string
): Promise<GameActionResponse> {
  const res = await fetch(`${API_BASE}/like`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ gameId, type }),
  });
  
  if (!res.ok) throw new Error("Action failed");
  return res.json();
}