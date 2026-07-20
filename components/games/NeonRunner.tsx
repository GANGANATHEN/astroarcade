"use client";

import { useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface NeonRunnerProps {
  onScoreChange: (score: number) => void;
  onGameOver: (score: number) => void;
  isPlaying: boolean;
}

function Player({ position }: { position: THREE.Vector3 }) {
  const meshRef = useRef<THREE.Group>(null);
  useFrame(() => { if (meshRef.current) meshRef.current.position.copy(position); });
  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#ff00aa" emissive="#ff00aa" emissiveIntensity={1} />
      </mesh>
      <pointLight color="#ff00aa" intensity={1} distance={3} />
    </group>
  );
}

function GameScene({ isPlaying, onScoreChange, onGameOver }: NeonRunnerProps) {
  const { viewport } = useThree();
  const playerPos = useRef(new THREE.Vector3(0, -1.5, 0));
  const playerVel = useRef(new THREE.Vector3(0, 0, 0));
  const obstacles = useRef<{ id: number; position: THREE.Vector3; type: string }[]>([]);
  const score = useRef(0);
  const gameTime = useRef(0);
  let obstacleId = 0;
  const keys = useRef<Set<string>>(new Set());
  const isJumping = useRef(false);
  let nextObstacleTime = 0;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { keys.current.add(e.key.toLowerCase()); if (e.key === "ArrowUp" || e.key === "w" || e.key === " ") e.preventDefault(); };
    const handleKeyUp = (e: KeyboardEvent) => keys.current.delete(e.key.toLowerCase());
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => { window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("keyup", handleKeyUp); };
  }, []);

  useFrame((_, delta) => {
    if (!isPlaying) return;
    gameTime.current += delta;
    const speed = 5 + gameTime.current * 0.3;

    const targetX = keys.current.has("arrowleft") || keys.current.has("a") ? -1.5 : keys.current.has("arrowright") || keys.current.has("d") ? 1.5 : 0;
    playerPos.current.x += (targetX - playerPos.current.x) * 10 * delta;

    if ((keys.current.has("arrowup") || keys.current.has("w") || keys.current.has(" ")) && !isJumping.current) {
      playerVel.current.y = 0.15; isJumping.current = true;
    }
    playerVel.current.y -= 0.5 * delta;
    playerPos.current.y += playerVel.current.y;
    if (playerPos.current.y <= -1.5) { playerPos.current.y = -1.5; playerVel.current.y = 0; isJumping.current = false; }

    nextObstacleTime -= delta;
    if (nextObstacleTime <= 0) {
      const lanes = [-1.5, 0, 1.5];
      obstacles.current.push({ id: obstacleId++, position: new THREE.Vector3(lanes[Math.floor(Math.random() * lanes.length)], -1.5, -15), type: Math.random() > 0.5 ? "block" : "spike" });
      nextObstacleTime = Math.max(0.8, 2 - gameTime.current * 0.02);
    }

    obstacles.current = obstacles.current.filter((obs) => {
      obs.position.z += speed * delta;
      const dx = Math.abs(obs.position.x - playerPos.current.x);
      const dy = Math.abs(obs.position.y - playerPos.current.y);
      const dz = Math.abs(obs.position.z - playerPos.current.z);
      if (dx < 0.4 && dy < 0.4 && dz < 0.4) { onGameOver(score.current); return false; }
      if (obs.position.z > 2) { score.current += 10; onScoreChange(score.current); }
      return obs.position.z < 10;
    });
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#ff00aa" />
      <pointLight position={[0, -2, -5]} intensity={0.5} color="#8b5cf6" />
      <fog attach="fog" args={["#000", 10, 30]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 100]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      <Player position={playerPos.current} />
      {obstacles.current.map((obs) => (
        <mesh key={obs.id} position={obs.position} rotation={obs.type === "spike" ? [0, 0, Math.PI / 4] : [0, 0, 0]}>
          {obs.type === "block" ? <boxGeometry args={[0.6, 0.6, 0.6]} /> : <coneGeometry args={[0.3, 0.6, 4]} />}
          <meshStandardMaterial color="#ff4400" emissive="#ff4400" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </>
  );
}

export default function NeonRunner({ onScoreChange, onGameOver, isPlaying }: NeonRunnerProps) {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 60 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }} style={{ background: "#0a0014" }}>
      <GameScene onScoreChange={onScoreChange} onGameOver={onGameOver} isPlaying={isPlaying} />
    </Canvas>
  );
}
