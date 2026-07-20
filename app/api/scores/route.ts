import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import Score from "@/models/Score";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const token = req.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { gameId, score, category } = await req.json();
    if (!gameId || score === undefined) {
      return NextResponse.json({ error: "Game ID and score required" }, { status: 400 });
    }

    const user = await User.findById(decoded.userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Save score
    const newScore = await Score.create({
      userId: decoded.userId,
      username: user.username,
      gameId,
      score,
      category: category || "general",
    });

    // Update user stats
    user.totalScore += score;
    user.gamesPlayed += 1;
    await user.save();

    return NextResponse.json({ score: newScore });
  } catch (error) {
    console.error("Save score error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get("gameId");
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "10");

    let query: any = {};
    if (gameId) query.gameId = gameId;
    if (userId) query.userId = userId;

    const scores = await Score.find(query)
      .sort({ score: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ scores });
  } catch (error) {
    console.error("Get scores error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
