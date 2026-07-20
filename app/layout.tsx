import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astro Arcade | Play Free 3D Multiplayer Games",
  description: "The ultimate gaming platform. Play free 3D browser games, chat with players, compete on leaderboards, and challenge friends in multiplayer battles.",
  keywords: ["free games", "3D games", "multiplayer games", "browser games", "online gaming", "arcade"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
