"use client";
import { useState, useEffect, useRef } from "react";
import { games, categories } from "@/lib/games";
import GameCard from "./GameCard";
import { cn } from "@/lib/utils";

export default function GameGrid() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredGames = games.filter((game) => {
    const matchesCategory = activeCategory === "all" || game.category === activeCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="games" className="relative z-10 py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black tracking-tighter mb-2">
              <span className="text-white">ALL</span> <span className="text-gradient">GAMES</span>
            </h2>
            <p className="text-gray-500">{filteredGames.length} games available</p>
          </div>
          <div className="relative max-w-xs w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search games..."
              className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-colors"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2",
                activeCategory === cat.id
                  ? "bg-white text-black"
                  : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
              )}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className="text-xs opacity-60">({cat.count})</span>
            </button>
          ))}
        </div>

        {/* Games Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No games found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
