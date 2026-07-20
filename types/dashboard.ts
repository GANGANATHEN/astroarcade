// types/dashboard.ts
export interface GameHistory {
  id: string;
  gameName: string;
  gameIcon: string;
  score: number;
  result: 'win' | 'loss' | 'draw';
  playedAt: string;
  duration: number; // minutes
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number; // 0-100
}

export interface UserStats {
  totalScore: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  currentStreak: number;
  bestStreak: number;
  totalPlayTime: number; // minutes
  favoriteGame: string;
  rank: number;
}

export interface UserSettings {
  displayName: string;
  bio: string;
  avatar: string;
  theme: 'dark' | 'light' | 'neon';
  notifications: boolean;
  soundEnabled: boolean;
  language: string;
  privacy: 'public' | 'friends' | 'private';
}