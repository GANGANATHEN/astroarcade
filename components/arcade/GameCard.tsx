"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Star,
  Users,
  ThumbsUp,
  ThumbsDown,
  Heart,
  ArrowUpRight,
} from "lucide-react";
import { Game } from "@/lib/games";
import { useAuthStore } from "@/store/authStore";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const { user, token } = useAuthStore();

  // DB state
  const [likes, setLikes] = useState(game.likes);
  const [dislikes, setDislikes] = useState(game.dislikes);
  const [favorites, setFavorites] = useState(0);
  const [userAction, setUserAction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch initial counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await fetch(`/api/games/like?gameId=${game.id}`, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        });

        const data = await res.json();

        setLikes(data.likes ?? game.likes);
        setDislikes(data.dislikes ?? game.dislikes);
        setFavorites(data.favorites ?? 0);
        setUserAction(data.userType ?? null);
      } catch (err) {
        console.error(err);
        setLikes(game.likes);
        setDislikes(game.dislikes);
      }
    };

    fetchCounts();
  }, [game.id, token]);

  const handleAction = async (type: "like" | "dislike" | "favorite") => {
    if (!user || !token) {
      alert("Please login to interact!");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/games/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameId: game.id, type }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.log(text);
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setLikes(data.likes);
        setDislikes(data.dislikes);
        setFavorites(data.favorites);
        setUserAction(data.userType);
      }
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(1000px) rotateX(${-y * 12}deg) rotateY(${x * 12}deg) scale3d(1.02, 1.02, 1.02)`,
    );
  };

  const handleMouseLeave = () => {
    setTransform(
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
    );
  };

  const getGlowClass = () => {
    if (game.color === "#00f0ff") return "neon-glow-cyan";
    if (game.color === "#ff00aa") return "neon-glow-pink";
    if (game.color === "#8b5cf6") return "neon-glow-purple";
    if (game.color === "#22c55e") return "neon-glow-green";
    return "neon-glow-cyan";
  };

  return (
    <div className="group">
      <Link href={`/games/${game.id}`}>
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={`relative glass-card rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 cursor-pointer ${getGlowClass()}`}
          style={{ transform, transition: "transform 0.15s ease-out" }}
        >
          {/* Game Preview */}
          <div
            className="aspect-16/10 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${game.color}15, transparent)`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl sm:text-7xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-500">
                {game.icon}
              </span>
            </div>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ boxShadow: `inset 0 0 60px ${game.color}20` }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <ArrowUpRight className="w-6 h-6 text-white" />
              </div>
            </div>
            {game.isMultiplayer && (
              <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-green/20 border border-green/30 text-xs font-medium text-green flex items-center gap-1">
                <Users className="w-3 h-3" />
                MP
              </div>
            )}
          </div>

          {/* Game Info */}
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-white transition-colors">
                {game.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-400 border border-white/5 capitalize`}
              >
                {game.difficulty}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
              {game.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-gray-600" />
                  <span className="text-xs text-gray-500">
                    {game.players.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow fill-yellow" />
                  <span className="text-xs text-gray-500">{game.rating}</span>
                </div>
              </div>
              <span className="text-xs text-gray-600 uppercase tracking-wider">
                {game.category}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Like/Dislike/Favorite Buttons - DB Connected */}
      <div className="flex items-center gap-2 mt-3 px-2">
        <button
          onClick={() => handleAction("like")}
          disabled={loading}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            userAction === "like"
              ? "bg-cyan/20 text-cyan border border-cyan/30"
              : "bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10"
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5" />
          {likes.toLocaleString()}
        </button>

        <button
          onClick={() => handleAction("dislike")}
          disabled={loading}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            userAction === "dislike"
              ? "bg-red/20 text-red border border-red/30"
              : "bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10"
          }`}
        >
          <ThumbsDown className="w-3.5 h-3.5" />
          {dislikes.toLocaleString()}
        </button>

        <button
          onClick={() => handleAction("favorite")}
          disabled={loading}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ml-auto ${
            userAction === "favorite"
              ? "bg-pink/20 text-pink border border-pink/30"
              : "bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10"
          }`}
        >
          <Heart
            className={`w-3.5 h-3.5 ${userAction === "favorite" ? "fill-pink" : ""}`}
          />
          {favorites.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
