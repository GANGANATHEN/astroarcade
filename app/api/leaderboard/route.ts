import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Score from "@/models/Score";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const gameId = searchParams.get("gameId");
    const period = searchParams.get("period") || "all"; // all, week, month

    let matchStage: any = {};

    if (category && category !== "all") {
      matchStage.category = category;
    }
    if (gameId && gameId !== "all") {
      matchStage.gameId = gameId;
    }
    if (period === "week") {
      matchStage.createdAt = { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) };
    } else if (period === "month") {
      matchStage.createdAt = { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) };
    }

    // Aggregate scores by user
    const leaderboard = await Score.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: "$userId",
          username: { $first: "$username" },
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 },
          bestScore: { $max: "$score" },
        },
      },
      { $sort: { totalScore: -1 } },
      { $limit: 50 },
    ]);

    // Get avatars
    const userIds = leaderboard.map((entry: any) => entry._id);
    const users = await User.find({ _id: { $in: userIds } }).select("avatar").lean();
    const avatarMap = new Map(users.map((u: any) => [u._id.toString(), u.avatar]));

    const result = leaderboard.map((entry: any, index: number) => ({
      rank: index + 1,
      username: entry.username,
      avatar: avatarMap.get(entry._id.toString()) || "👤",
      totalScore: entry.totalScore,
      gamesPlayed: entry.gamesPlayed,
      bestScore: entry.bestScore,
    }));

    return NextResponse.json({ leaderboard: result });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
