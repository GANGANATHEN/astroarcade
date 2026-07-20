// components/home/FloatingShapes.tsx
"use client";

import { useRef } from "react";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function FloatingShape({
  geometry,
  color,
  position,
  floatSpeed = 2,
  distort = 0.4,
  scale = 1,
}: {
  geometry: React.ReactNode;
  color: string;
  position: [number, number, number];
  floatSpeed?: number;
  distort?: number;
  scale?: number;
}) {
  return (
    <Float speed={floatSpeed} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (groupRef.current) {
      // Smooth rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        state.clock.elapsedTime * 0.05 + mouseRef.current.x * 0.3,
        0.02
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.sin(state.clock.elapsedTime * 0.03) * 0.1 + mouseRef.current.y * 0.2,
        0.02
      );
    }
  });

  // Mouse tracking
  if (typeof window !== "undefined") {
    window.addEventListener("mousemove", (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    });
  }

  return (
    <group ref={groupRef}>
      <FloatingShape
        geometry={<icosahedronGeometry args={[1, 1]} />}
        color="#00f0ff"
        position={[-3, 1, -2]}
        floatSpeed={2}
        distort={0.4}
      />
      <FloatingShape
        geometry={<octahedronGeometry args={[0.8, 0]} />}
        color="#ff00aa"
        position={[3, -1, -1]}
        floatSpeed={1.5}
        distort={0.3}
      />
      <FloatingShape
        geometry={<torusGeometry args={[0.6, 0.2, 16, 32]} />}
        color="#8b5cf6"
        position={[0, 2, -3]}
        floatSpeed={2.5}
        distort={0.2}
      />
      <FloatingShape
        geometry={<dodecahedronGeometry args={[0.5, 0]} />}
        color="#fbbf24"
        position={[-2, -2, -1]}
        floatSpeed={1}
        distort={0.35}
      />
      <FloatingShape
        geometry={<sphereGeometry args={[0.7, 32, 32]} />}
        color="#22c55e"
        position={[2.5, 2, -2.5]}
        floatSpeed={1.8}
        distort={0.25}
        scale={0.8}
      />
      <FloatingShape
        geometry={<boxGeometry args={[0.6, 0.6, 0.6]} />}
        color="#ef4444"
        position={[-1, 2.5, -1.5]}
        floatSpeed={2.2}
        distort={0.3}
        scale={0.7}
      />
    </group>
  );
}