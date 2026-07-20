// components/home/Scene.tsx
"use client";

import { Suspense } from "react";
import { Environment, Stars, ContactShadows } from "@react-three/drei";
import FloatingShapes from "./FloatingShapes";

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#00f0ff" />
      <pointLight position={[5, -3, 5]} intensity={0.8} color="#ff00aa" />
      <pointLight position={[0, 5, 0]} intensity={0.5} color="#8b5cf6" />
      
      <Stars radius={60} depth={60} count={2000} factor={5} saturation={0.5} fade speed={1.5} />
      
      <Suspense fallback={null}>
        <FloatingShapes />
        <ContactShadows position={[0, -4, 0]} opacity={0.3} scale={20} blur={2} far={4} />
      </Suspense>
      
      <Environment preset="city" />
      <fog attach="fog" args={["#000000", 10, 30]} />
    </>
  );
}