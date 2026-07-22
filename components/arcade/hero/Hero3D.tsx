// components/home/Hero3D.tsx
"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Scene from "./Scene";
import StatsBar from "./StatsBar";
import ScrollIndicator from "./ScrollIndicator";
import ParticleEffect from "./ParticleEffect";

export default function Hero3D() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-screen mt-15 w-full overflow-hidden bg-black">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* 2D Particles Overlay */}
      <ParticleEffect />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <div
          className={`transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-cyan animate-pulse" />
            <span className="text-xs sm:text-sm text-gray-400 uppercase tracking-wider">
              Free 3D Browser Games
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className={`transition-all duration-1000 delay-150 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block mb-1 sm:mb-2">
            <span className="bg-linear-to-r from-cyan via-blue-400 to-pink bg-clip-text text-transparent animate-gradient">
              ASTRO
            </span>
          </span>
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter block text-white">
            ARCADE
          </span>
        </h1>

        {/* Description */}
        <p className={`text-sm sm:text-base md:text-lg text-gray-400 max-w-xl sm:max-w-2xl mb-6 sm:mb-8 px-4 transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          Dive into immersive 3D browser games. Play solo or challenge friends
          in multiplayer battles. No downloads needed — just pure gaming fun.
        </p>

        {/* Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-500 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <Link
            href="/#games"
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-cyan to-pink-500 rounded-full font-bold text-black text-sm sm:text-base flex items-center justify-center gap-2 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300"
          >
            <Play className="w-4 h-4 sm:w-5 sm:h-5" />
            Start Playing
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/leaderboard"
            className="px-6 sm:px-8 py-3 sm:py-4 border border-white/20 rounded-full font-bold text-white text-sm sm:text-base hover:bg-white/5 hover:border-white/40 transition-all duration-300 backdrop-blur-sm"
          >
            View Leaderboard
          </Link>
        </div>

        {/* Stats */}
        <StatsBar loaded={loaded} />
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Side Glows */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-cyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-pink/10 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}