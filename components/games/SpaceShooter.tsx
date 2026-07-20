"use client";

import { useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

interface SpaceShooterProps {
  onScoreChange: (score: number) => void;
  onGameOver: (score: number) => void;
  isPlaying: boolean;
}

function Ship({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.copy(position);
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 3) * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      <mesh>
        <coneGeometry args={[0.3, 1, 4]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[-0.3, -0.2, 0]} rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.3]} />
        <meshStandardMaterial color="#0088aa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.3, -0.2, 0]} rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.5, 0.05, 0.3]} />
        <meshStandardMaterial color="#0088aa" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#ff6600" emissive="#ff6600" emissiveIntensity={2} />
      </mesh>
      <pointLight position={[0, -0.8, 0]} color="#ff6600" intensity={2} distance={3} />
    </group>
  );
}

function GameScene({ isPlaying, onScoreChange, onGameOver }: SpaceShooterProps) {
  const { viewport } = useThree();
  const shipPos = useRef(new THREE.Vector3(0, -3, 0));
  const bullets = useRef<{ id: number; position: THREE.Vector3; velocity: THREE.Vector3 }[]>([]);
  const asteroids = useRef<{ id: number; position: THREE.Vector3; velocity: THREE.Vector3; size: number; rotation: THREE.Euler; rotSpeed: THREE.Vector3 }[]>([]);
  const particles = useRef<{ id: number; position: THREE.Vector3; velocity: THREE.Vector3; life: number; color: string }[]>([]);
  const score = useRef(0);
  const gameTime = useRef(0);
  const nextAsteroidTime = useRef(0);
  let bulletId = 0, asteroidId = 0, particleId = 0;
  const keys = useRef<Set<string>>(new Set());
  const lastShot = useRef(0);

  const spawnAsteroid = useCallback(() => {
    const size = 0.3 + Math.random() * 0.5;
    const x = (Math.random() - 0.5) * viewport.width * 0.8;
    asteroids.current.push({
      id: asteroidId++,
      position: new THREE.Vector3(x, viewport.height / 2 + 1, 0),
      velocity: new THREE.Vector3((Math.random() - 0.5) * 0.02, -(0.03 + Math.random() * 0.04), 0),
      size,
      rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
      rotSpeed: new THREE.Vector3((Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05, (Math.random() - 0.5) * 0.05),
    });
  }, [viewport]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current.add(e.key.toLowerCase()); if (e.key === " " || e.key === "ArrowUp") e.preventDefault(); };
    const handleKeyUp = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    const handleClick = () => {
      if (!isPlaying) return;
      const now = Date.now();
      if (now - lastShot.current > 200) {
        bullets.current.push({ id: bulletId++, position: shipPos.current.clone().add(new THREE.Vector3(0, 0.5, 0)), velocity: new THREE.Vector3(0, 0.3, 0) });
        lastShot.current = now;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("click", handleClick);
    return () => { window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("keyup", handleKeyUp); window.removeEventListener("click", handleClick); };
  }, [isPlaying]);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    gameTime.current += delta;
    const speed = 8 * delta;
    if (keys.current.has("arrowleft") || keys.current.has("a")) shipPos.current.x -= speed;
    if (keys.current.has("arrowright") || keys.current.has("d")) shipPos.current.x += speed;
    shipPos.current.x = THREE.MathUtils.clamp(shipPos.current.x, -viewport.width / 2 + 0.5, viewport.width / 2 - 0.5);

    const now = Date.now();
    if (now - lastShot.current > 250) {
      bullets.current.push({ id: bulletId++, position: shipPos.current.clone().add(new THREE.Vector3(0, 0.5, 0)), velocity: new THREE.Vector3(0, 0.3, 0) });
      lastShot.current = now;
    }

    nextAsteroidTime.current -= delta;
    if (nextAsteroidTime.current <= 0) { spawnAsteroid(); nextAsteroidTime.current = Math.max(0.5, 2 - gameTime.current * 0.01); }

    bullets.current = bullets.current.filter((b) => { b.position.add(b.velocity); return b.position.y < viewport.height / 2 + 2; });

    asteroids.current = asteroids.current.filter((a) => {
      a.position.add(a.velocity);
      a.rotation.x += a.rotSpeed.x; a.rotation.y += a.rotSpeed.y; a.rotation.z += a.rotSpeed.z;
      if (a.position.distanceTo(shipPos.current) < a.size + 0.3) { onGameOver(score.current); return false; }
      return a.position.y > -viewport.height / 2 - 2;
    });

    bullets.current = bullets.current.filter((b) => {
      let hit = false;
      asteroids.current = asteroids.current.filter((a) => {
        if (hit) return true;
        if (b.position.distanceTo(a.position) < a.size + 0.2) {
          hit = true; score.current += Math.floor(100 * (1 / a.size)); onScoreChange(score.current);
          for (let i = 0; i < 10; i++) particles.current.push({ id: particleId++, position: a.position.clone(), velocity: new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, 0), life: 1, color: "#ffaa00" });
          return false;
        }
        return true;
      });
      return !hit;
    });

    particles.current = particles.current.filter((p) => { p.position.add(p.velocity); p.life -= delta * 2; return p.life > 0; });
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#00f0ff" />
      <Stars radius={50} depth={30} count={500} factor={3} saturation={0} fade speed={0.5} />
      <Ship position={shipPos.current} />
      {bullets.current.map((b) => (
        <mesh key={b.id} position={b.position}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
        </mesh>
      ))}
      {asteroids.current.map((a) => (
        <mesh key={a.id} position={a.position} rotation={a.rotation}>
          <dodecahedronGeometry args={[a.size, 0]} />
          <meshStandardMaterial color="#666" roughness={0.9} metalness={0.3} />
        </mesh>
      ))}
      {particles.current.map((p) => (
        <mesh key={p.id} position={p.position} scale={p.life * 0.2}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={2} transparent opacity={p.life} />
        </mesh>
      ))}
    </>
  );
}

export default function SpaceShooter({ onScoreChange, onGameOver, isPlaying }: SpaceShooterProps) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }} style={{ background: "#000011" }}>
      <GameScene onScoreChange={onScoreChange} onGameOver={onGameOver} isPlaying={isPlaying} />
    </Canvas>
  );
}
