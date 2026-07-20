import { games } from "@/lib/games";
import GameCanvas from "@/components/games/GameCanvas";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/Footer";
import AdBanner from "@/components/ui/AdBanner";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return games.map((game) => ({
    slug: game.id,
  }));
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find((g) => g.id === params.slug);

  if (!game) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Game Info */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl sm:text-4xl">{game.icon}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">{game.title}</h1>
                <p className="text-sm text-gray-500 capitalize">{game.category} • {game.difficulty}</p>
              </div>
            </div>
          </div>

          {/* Game Canvas */}
          <GameCanvas game={game} />

          {/* Game Details */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white mb-4">About This Game</h2>
              <p className="text-gray-400 leading-relaxed mb-6">{game.description}</p>

              <h3 className="text-lg font-bold text-white mb-3">How to Play</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                {game.id === "space-shooter" && (
                  <>
                    <li>• Use <strong className="text-white">Arrow Keys</strong> or <strong className="text-white">WASD</strong> to move your ship</li>
                    <li>• <strong className="text-white">Click</strong> or <strong className="text-white">Space</strong> to shoot</li>
                    <li>• Destroy asteroids to earn points</li>
                    <li>• Avoid colliding with asteroids!</li>
                  </>
                )}
                {game.id === "neon-runner" && (
                  <>
                    <li>• Use <strong className="text-white">Arrow Keys</strong> or <strong className="text-white">A/D</strong> to switch lanes</li>
                    <li>• <strong className="text-white">Up Arrow</strong> or <strong className="text-white">W</strong> to jump</li>
                    <li>• Dodge obstacles to survive</li>
                    <li>• Score increases the longer you survive</li>
                  </>
                )}
                {game.id === "cube-puzzle" && (
                  <>
                    <li>• <strong className="text-white">Click</strong> two cubes to swap their colors</li>
                    <li>• Match each cube to its target glow color</li>
                    <li>• Complete the puzzle before moves run out</li>
                    <li>• <strong className="text-white">Drag</strong> to rotate the view</li>
                  </>
                )}
                {game.id === "tank-battle" && (
                  <>
                    <li>• Use <strong className="text-white">WASD</strong> to move your tank</li>
                    <li>• <strong className="text-white">Mouse</strong> to aim, <strong className="text-white">Click</strong> to shoot</li>
                    <li>• Destroy enemy tanks to score</li>
                    <li>• Use cover and strategy to win!</li>
                  </>
                )}
                {game.id === "racing-neon" && (
                  <>
                    <li>• Use <strong className="text-white">Arrow Keys</strong> or <strong className="text-white">WASD</strong> to steer</li>
                    <li>• <strong className="text-white">Space</strong> for boost</li>
                    <li>• Drift around corners for speed boost</li>
                    <li>• Finish first to win!</li>
                  </>
                )}
                {game.id === "chess-master" && (
                  <>
                    <li>• <strong className="text-white">Click</strong> a piece to select it</li>
                    <li>• <strong className="text-white">Click</strong> destination to move</li>
                    <li>• Checkmate opponent&apos;s king to win</li>
                    <li>• Play against AI or friends online</li>
                  </>
                )}
              </ul>
            </div>

            <div className="space-y-6">
              <AdBanner position="vertical" />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
