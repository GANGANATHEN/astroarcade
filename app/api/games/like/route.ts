import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";
import GameLike from "@/models/GameLike";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - No token" },
        { status: 401 },
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { gameId, type } = body;

    if (!gameId || !type) {
      return NextResponse.json(
        { error: "Game ID and type required" },
        { status: 400 },
      );
    }

    // ✅ Toggle logic
    const existing = await GameLike.findOne({
      userId: decoded.userId,
      gameId,
    });

    if (existing && existing.type === type) {
      await GameLike.deleteOne({ _id: existing._id });
    } else {
      await GameLike.findOneAndUpdate(
        { userId: decoded.userId, gameId },
        { userId: decoded.userId, gameId, type },
        { upsert: true, new: true },
      );
    }

    // Count
    const likes = await GameLike.countDocuments({ gameId, type: "like" });
    const dislikes = await GameLike.countDocuments({ gameId, type: "dislike" });
    const favorites = await GameLike.countDocuments({
      gameId,
      type: "favorite",
    });

    const userAction = await GameLike.findOne({
      userId: decoded.userId,
      gameId,
    });

    return NextResponse.json({
      likes,
      dislikes,
      favorites,
      userType: userAction?.type || null,
    });
  } catch (error: any) {
    console.error("🔴 Like error:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const gameId = searchParams.get("gameId");

    if (!gameId) {
      return NextResponse.json({ error: "Game ID required" }, { status: 400 });
    }

    const likes = await GameLike.countDocuments({ gameId, type: "like" });
    const dislikes = await GameLike.countDocuments({ gameId, type: "dislike" });
    const favorites = await GameLike.countDocuments({
      gameId,
      type: "favorite",
    });

    // Get user's action
    const authHeader =
      req.headers.get("authorization") || req.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "").trim();

    let userType = null;
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        const userAction = await GameLike.findOne({
          userId: decoded.userId,
          gameId,
        });
        userType = userAction?.type || null;
      }
    }

    return NextResponse.json({ likes, dislikes, favorites, userType });
  } catch (error: any) {
    console.error("🔴 Get likes error:", error);
    return NextResponse.json(
      { error: "Server error", message: error.message },
      { status: 500 },
    );
  }
}
