import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "dist",
  images: { unoptimized: true },
  // env: {
  //   MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/astro-arcade",
  //   JWT_SECRET: process.env.JWT_SECRET || "astro-arcade-secret-key-2026",
  // },
};

export default nextConfig;
