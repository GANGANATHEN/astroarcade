import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { comparePassword, signToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password required" },
        { status: 400 },
      );
    }

    // Find user (case-insensitive)
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user || !comparePassword(password, user.password)) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Update last active
    user.lastActive = new Date();
    await user.save();

    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        displayName: user.displayName,
        totalScore: user.totalScore || 0,
        gamesPlayed: user.gamesPlayed || 0,
        gamesWon: user.gamesWon || 0,
        favoriteGames: user.favoriteGames || [],
        achievements: user.achievements || [],
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
