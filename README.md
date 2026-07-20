# 🚀 Astro Arcade

A full-featured 3D multiplayer gaming platform built with Next.js, MongoDB, and Socket.io.

## ✨ Features

- **6 Interactive Games** — Space Shooter, Neon Runner, Cube Puzzle, Tank Battle, Neon Racing, Chess Master
- **User Authentication** — JWT-based auth with MongoDB
- **Real-time Chat** — Global chat rooms
- **Leaderboards** — Overall + category-wise rankings
- **User Dashboard** — Stats, achievements, favorites
- **Like/Dislike/Favorite** — Game rating system
- **Responsive Design** — Mobile-first
- **3D Graphics** — React Three Fiber

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 15 | Framework |
| React 19 | UI |
| TypeScript | Types |
| Tailwind CSS v4 | Styling |
| MongoDB + Mongoose | Database |
| JWT + bcrypt | Auth |
| React Three Fiber | 3D |
| Socket.io | Real-time |
| Zustand | State |
| GSAP | Animations |

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up MongoDB
# - Create MongoDB Atlas account
# - Update .env.local with your connection string

# 3. Run development server
npm run dev

# 4. Seed database (optional)
npm run seed-db
```

## 🎮 Games

| Game | Category | Multiplayer |
|------|----------|-------------|
| Space Shooter 3D | Action | ✅ |
| Neon Runner | Arcade | ✅ |
| Cube Puzzle 3D | Puzzle | ❌ |
| Tank Battle Arena | Multiplayer | ✅ |
| Neon Racing | Racing | ✅ |
| Chess Master 3D | Strategy | ✅ |

## 📁 Project Structure

```
astro-arcade/
├── app/                  # Next.js pages
│   ├── api/             # API routes
│   ├── games/[slug]/    # Game pages
│   ├── dashboard/       # User dashboard
│   ├── leaderboard/     # Global leaderboard
│   ├── chat/           # Chat room
│   ├── login/          # Auth pages
│   └── register/
├── components/
│   ├── arcade/         # Home sections
│   ├── games/          # Game components
│   ├── ui/            # Shared UI
│   └── chat/          # Chat components
├── models/            # MongoDB schemas
├── lib/               # Utilities
├── hooks/             # Custom hooks
└── types/             # TypeScript types
```

## 💰 Monetization Ready

- AdSense slots integrated
- Premium subscription ready
- In-game purchases framework

## 📄 License

MIT © 2026 Astro Arcade
