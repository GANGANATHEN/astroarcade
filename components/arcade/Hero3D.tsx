"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment, Stars } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Users, Trophy, Gamepad2 } from "lucide-react";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={[-3, 1, -2]}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial color="#00f0ff" distort={0.4} speed={2} roughness={0.1} metalness={0.8} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[3, -1, -1]}>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshDistortMaterial color="#ff00aa" distort={0.3} speed={1.5} roughness={0.1} metalness={0.8} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5}>
        <mesh position={[0, 2, -3]}>
          <torusGeometry args={[0.6, 0.2, 16, 32]} />
          <MeshDistortMaterial color="#8b5cf6" distort={0.2} speed={2} roughness={0.1} metalness={0.8} transparent opacity={0.8} />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-2, -2, -1]}>
          <dodecahedronGeometry args={[0.5, 0]} />
          <MeshDistortMaterial color="#fbbf24" distort={0.35} speed={1.5} roughness={0.1} metalness={0.8} transparent opacity={0.8} />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#00f0ff" />
      <pointLight position={[5, -3, 5]} intensity={0.8} color="#ff00aa" />
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      <FloatingShapes />
      <Environment preset="city" />
    </>
  );
}

export default function Hero3D() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-dvh mt-30 w-full overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Gamepad2 className="w-4 h-4 text-cyan" />
            <span className="text-xs text-gray-400 uppercase tracking-wider">Free 3D Browser Games</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter mb-4">
            <span className="text-gradient">ASTRO</span>
            <br />
            <span className="text-white">ARCADE</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mb-8 px-4">
            Dive into immersive 3D browser games. Play solo or challenge friends in multiplayer battles. No downloads needed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#games" className="group px-8 py-4 bg-gradient-to-r from-cyan to-pink-500 rounded-full font-bold text-black flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              <Play className="w-5 h-5" />
              Start Playing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/leaderboard" className="px-8 py-4 border border-white/20 rounded-full font-bold text-white hover:bg-white/5 transition-colors">
              View Leaderboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className={`mt-12 sm:mt-16 flex flex-wrap justify-center gap-6 sm:gap-10 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Gamepad2 className="w-4 h-4 text-cyan" />
              <span className="text-2xl sm:text-3xl font-bold text-white">6+</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Games</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="w-4 h-4 text-pink" />
              <span className="text-2xl sm:text-3xl font-bold text-white">28K+</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Players</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow" />
              <span className="text-2xl sm:text-3xl font-bold text-white">100%</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Free</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />
    </section>
  );
}
