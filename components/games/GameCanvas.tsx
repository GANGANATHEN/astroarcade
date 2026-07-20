"use client";

import { Suspense, lazy, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Maximize2, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Game } from "@/lib/games";

const SpaceShooter = lazy(() => import("./SpaceShooter"));
const NeonRunner = lazy(() => import("./NeonRunner"));
const CubePuzzle = lazy(() => import("./CubePuzzle"));

interface GameCanvasProps {
  game: Game;
}

export default function GameCanvas({ game }: GameCanvasProps) {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setGameOver(true);
    setGameStarted(false);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
  };

  const renderGame = () => {
    switch (game.id) {
      case "space-shooter":
        return <SpaceShooter onScoreChange={setScore} onGameOver={handleGameOver} isPlaying={gameStarted} />;
      case "neon-runner":
        return <NeonRunner onScoreChange={setScore} onGameOver={handleGameOver} isPlaying={gameStarted} />;
      case "cube-puzzle":
        return <CubePuzzle onScoreChange={setScore} onGameOver={handleGameOver} isPlaying={gameStarted} />;
      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl mb-4 block">{game.icon}</span>
              <p className="text-gray-400">Game coming soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`relative bg-black ${isFullscreen ? "fixed inset-0 z-[100]" : "rounded-3xl overflow-hidden"}`}>
      {/* Game Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h2 className="text-sm font-bold text-white">{game.title}</h2>
            <p className="text-xs text-gray-500">Score: {score.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            <Maximize2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Game Area */}
      <div className={`relative ${isFullscreen ? "h-screen" : "aspect-[16/9] max-h-[70vh]"}`}>
        <Suspense
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          {renderGame()}
        </Suspense>

        {/* Start Screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm">
            <span className="text-6xl sm:text-8xl mb-6">{game.icon}</span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">{game.title}</h3>
            <p className="text-gray-400 mb-8 text-center max-w-md px-4">{game.description}</p>
            <button
              onClick={() => setGameStarted(true)}
              className="px-8 py-4 bg-gradient-to-r from-cyan to-pink-500 rounded-full font-bold text-black text-lg hover:scale-105 transition-transform"
            >
              Start Game
            </button>
            <div className="mt-6 flex gap-6 text-xs text-gray-500">
              <span>⌨️ Keyboard Supported</span>
              <span>🖱️ Mouse Supported</span>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
            <h3 className="text-4xl sm:text-5xl font-display font-bold text-white mb-2">GAME OVER</h3>
            <p className="text-2xl text-cyan font-bold mb-2">{score.toLocaleString()} pts</p>
            <p className="text-gray-500 mb-8">High Score: {Math.max(score, 0).toLocaleString()}</p>
            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3 bg-cyan text-black rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
              <button
                onClick={() => router.push("/")}
                className="px-6 py-3 border border-white/20 rounded-full font-bold text-white hover:bg-white/5 transition-colors"
              >
                More Games
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
