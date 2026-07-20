"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface CubePuzzleProps {
  onScoreChange: (score: number) => void;
  onGameOver: (score: number) => void;
  isPlaying: boolean;
}

const COLORS = ["#00f0ff", "#ff00aa", "#8b5cf6", "#fbbf24", "#22c55e", "#ef4444"];

function PuzzleCube({ position, color, targetColor, isMatched, isSelected, onClick }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      const targetScale = isSelected ? 1.1 : hovered ? 1.05 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[0.85, 0.85, 0.85]} />
      <meshStandardMaterial
        color={isMatched ? targetColor : color}
        emissive={isMatched ? targetColor : "#000"}
        emissiveIntensity={isMatched ? 0.3 : 0}
        roughness={0.3}
        metalness={0.5}
        transparent
        opacity={isMatched ? 0.6 : 1}
      />
      {isSelected && (
        <mesh>
          <boxGeometry args={[0.95, 0.95, 0.95]} />
          <meshBasicMaterial color="#fff" wireframe transparent opacity={0.3} />
        </mesh>
      )}
    </mesh>
  );
}

function GameScene({ isPlaying, onScoreChange, onGameOver }: CubePuzzleProps) {
  const [cubes, setCubes] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(1);
  const score = useRef(0);

  const generateLevel = useCallback((lvl: number) => {
    const gridSize = Math.min(3 + Math.floor((lvl - 1) / 2), 5);
    const newCubes: any[] = [];
    const usedColors = COLORS.slice(0, Math.min(3 + lvl, COLORS.length));
    let id = 0;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          const targetColor = usedColors[Math.floor(Math.random() * usedColors.length)];
          const color = Math.random() > 0.3 ? targetColor : usedColors[Math.floor(Math.random() * usedColors.length)];
          newCubes.push({ id: id++, position: [x - gridSize / 2 + 0.5, y - gridSize / 2 + 0.5, z - gridSize / 2 + 0.5], color, targetColor, isMatched: color === targetColor });
        }
      }
    }
    setCubes(newCubes);
    setMoves(0);
  }, []);

  useEffect(() => { if (isPlaying) generateLevel(level); }, [isPlaying, level, generateLevel]);

  useEffect(() => {
    if (!isPlaying) return;
    const allMatched = cubes.length > 0 && cubes.every((c) => c.isMatched);
    const maxMoves = 15 + level * 5;
    if (allMatched) {
      score.current += level * 100 + (maxMoves - moves) * 10;
      onScoreChange(score.current);
      setTimeout(() => setLevel((l) => l + 1), 1000);
    }
    if (moves >= maxMoves && !allMatched) onGameOver(score.current);
  }, [cubes, moves, level, isPlaying, onScoreChange, onGameOver]);

  const handleCubeClick = (id: number) => {
    if (!isPlaying) return;
    if (selectedId === null) { setSelectedId(id); }
    else if (selectedId === id) { setSelectedId(null); }
    else {
      setCubes((prev) => {
        const newCubes = [...prev];
        const idx1 = newCubes.findIndex((c) => c.id === selectedId);
        const idx2 = newCubes.findIndex((c) => c.id === id);
        if (idx1 !== -1 && idx2 !== -1) {
          const temp = newCubes[idx1].color;
          newCubes[idx1].color = newCubes[idx2].color;
          newCubes[idx2].color = temp;
          newCubes[idx1].isMatched = newCubes[idx1].color === newCubes[idx1].targetColor;
          newCubes[idx2].isMatched = newCubes[idx2].color === newCubes[idx2].targetColor;
        }
        return newCubes;
      });
      setSelectedId(null);
      setMoves((m) => m + 1);
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
      <OrbitControls enablePan={false} enableZoom={true} maxDistance={15} minDistance={5} />
      {cubes.map((cube) => (
        <PuzzleCube key={cube.id} {...cube} isSelected={selectedId === cube.id} onClick={() => handleCubeClick(cube.id)} />
      ))}
    </>
  );
}

export default function CubePuzzle({ onScoreChange, onGameOver, isPlaying }: CubePuzzleProps) {
  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }} style={{ background: "#0a0a1a" }}>
        <GameScene onScoreChange={onScoreChange} onGameOver={onGameOver} isPlaying={isPlaying} />
      </Canvas>
      {isPlaying && (
        <div className="absolute top-16 left-4 z-10">
          <div className="glass-card rounded-xl px-4 py-2 text-xs text-gray-400">
            Click two cubes to swap colors. Match all cubes to their glow color!
          </div>
        </div>
      )}
    </div>
  );
}
