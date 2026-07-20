export interface User {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  displayName: string;
  bio: string;
  totalScore: number;
  gamesPlayed: number;
  gamesWon: number;
  favoriteGames: string[];
  achievements: Achievement[];
  createdAt: string;
  lastActive: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
}

export interface Score {
  _id: string;
  userId: string;
  username: string;
  gameId: string;
  score: number;
  category: string;
  createdAt: string;
}

export interface ChatMessage {
  _id: string;
  room: string;
  username: string;
  avatar: string;
  message: string;
  createdAt: string;
}

export interface LeaderboardEntry {
  username: string;
  avatar: string;
  totalScore: number;
  gamesPlayed: number;
  category?: string;
}
