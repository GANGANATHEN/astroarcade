// types/game.ts
export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isMultiplayer: boolean;
  difficulty: string;
  category: string;
  players: number;
  rating: number;
  likes: number;
  dislikes: number;
}

export interface GameActionResponse {
  likes: number;
  dislikes: number;
  favorites: number;
  userType: string | null;
}

export type ActionType = "like" | "dislike" | "favorite";