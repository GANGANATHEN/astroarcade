"use client";

import { Suspense } from "react";
import { useLenis } from "@/hooks/useLenis";
import Footer from "@/components/ui/Footer";
import AdBanner from "@/components/ui/AdBanner";
import Hero3D from "@/components/arcade/hero/Hero3D";
import FeaturedBanner from "@/components/arcade/FeaturedBanner";
import GameGrid from "@/components/arcade/GameGrid";
import LeaderboardSection from "@/components/arcade/LeaderboardSection";
import Navbar from "@/components/ui/navbar/Navbar";

function LoadingFallback() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Home() {
  useLenis();

  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <Suspense fallback={<LoadingFallback />}>
        <Hero3D />
      </Suspense>

      {/* Ad Banner */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <AdBanner />
        </div>
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <FeaturedBanner />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <GameGrid />
      </Suspense>

      {/* Ad Banner */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <AdBanner />
        </div>
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <LeaderboardSection />
      </Suspense>

      <Footer />
    </main>
  );
}
