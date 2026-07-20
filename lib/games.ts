export interface Game {
  id: string;
  title: string;
  description: string;
  category: "action" | "puzzle" | "arcade" | "racing" | "multiplayer" | "strategy";
  difficulty: "easy" | "medium" | "hard";
  color: string;
  icon: string;
  players: number;
  rating: number;
  likes: number;
  dislikes: number;
  isMultiplayer: boolean;
}

export const games: Game[] = [
  {
    id: "space-shooter",
    title: "Space Shooter 3D",
    description: "Blast through asteroid fields and alien fleets in this neon-powered space combat game. Multiplayer mode available!",
    category: "action",
    difficulty: "medium",
    color: "#00f0ff",
    icon: "🚀",
    players: 12450,
    rating: 4.8,
    likes: 8920,
    dislikes: 120,
    isMultiplayer: true,
  },
  {
    id: "neon-runner",
    title: "Neon Runner",
    description: "Dash through a cyberpunk cityscape, dodge obstacles, and collect power-ups. Race against friends!",
    category: "arcade",
    difficulty: "easy",
    color: "#ff00aa",
    icon: "🏃",
    players: 8930,
    rating: 4.6,
    likes: 6540,
    dislikes: 89,
    isMultiplayer: true,
  },
  {
    id: "cube-puzzle",
    title: "Cube Puzzle 3D",
    description: "Rotate, match, and solve increasingly complex 3D cube puzzles. Challenge your brain!",
    category: "puzzle",
    difficulty: "easy",
    color: "#8b5cf6",
    icon: "🧊",
    players: 6720,
    rating: 4.7,
    likes: 5430,
    dislikes: 67,
    isMultiplayer: false,
  },
  {
    id: "tank-battle",
    title: "Tank Battle Arena",
    description: "Command your tank in explosive multiplayer battles. Destroy enemy tanks and claim victory!",
    category: "multiplayer",
    difficulty: "hard",
    color: "#22c55e",
    icon: "🎮",
    players: 15600,
    rating: 4.9,
    likes: 12300,
    dislikes: 210,
    isMultiplayer: true,
  },
  {
    id: "racing-neon",
    title: "Neon Racing",
    description: "High-speed racing through neon-lit tracks. Drift, boost, and win!",
    category: "racing",
    difficulty: "medium",
    color: "#fbbf24",
    icon: "🏎️",
    players: 9870,
    rating: 4.5,
    likes: 7650,
    dislikes: 145,
    isMultiplayer: true,
  },
  {
    id: "chess-master",
    title: "Chess Master 3D",
    description: "Classic chess with stunning 3D visuals. Play against AI or challenge friends online.",
    category: "strategy",
    difficulty: "hard",
    color: "#ef4444",
    icon: "♟️",
    players: 4320,
    rating: 4.8,
    likes: 3890,
    dislikes: 45,
    isMultiplayer: true,
  },
];

export const categories = [
  { id: "all", label: "All Games", icon: "🎮", count: games.length },
  { id: "action", label: "Action", icon: "⚡", count: games.filter(g => g.category === "action").length },
  { id: "arcade", label: "Arcade", icon: "🕹️", count: games.filter(g => g.category === "arcade").length },
  { id: "puzzle", label: "Puzzle", icon: "🧩", count: games.filter(g => g.category === "puzzle").length },
  { id: "multiplayer", label: "Multiplayer", icon: "👥", count: games.filter(g => g.category === "multiplayer").length },
  { id: "racing", label: "Racing", icon: "🏎️", count: games.filter(g => g.category === "racing").length },
  { id: "strategy", label: "Strategy", icon: "🧠", count: games.filter(g => g.category === "strategy").length },
];
