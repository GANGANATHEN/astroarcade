// lib/auth.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "astro-arcade-secret-key-2026";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 12); // 12 rounds for security
}

export function comparePassword(password: string, hashed: string): boolean {
  return bcrypt.compareSync(password, hashed);
}

export function signToken(payload: {
  userId: string;
  username: string;
}): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(
  token: string,
): { userId: string; username: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as {
      userId: string;
      username: string;
    };
  } catch {
    return null;
  }
}
