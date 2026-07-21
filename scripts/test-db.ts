import { connectDB } from "../lib/db";
import User from "../models/User";
import Score from "../models/Score";

async function testDatabase() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ Connected to MongoDB!");

    // Test User creation
    const testUser = await User.create({
      username: "testplayer",
      email: "test@astroarcade.com",
      password: "hashedpassword123",
      avatar: "🚀",
      displayName: "Test Player",
    });
    console.log("✅ User created:", testUser.username);

    // Test Score creation
    const testScore = await Score.create({
      userId: testUser._id,
      username: testUser.username,
      gameId: "space-shooter",
      score: 1500,
      category: "action",
    });
    console.log("✅ Score created:", testScore.score);

    // Test Leaderboard query
    console.log("📊 Testing Leaderboard query...");
    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: "$userId",
          username: { $first: "$username" },
          totalScore: { $sum: "$score" },
          gamesPlayed: { $sum: 1 },
        },
      },
      { $sort: { totalScore: -1 } },
    ]);
    console.log("✅ Leaderboard:", leaderboard);

    // Cleanup
    console.log("🧹 Cleaning up test data...");
    await User.deleteOne({ _id: testUser._id });
    await Score.deleteOne({ _id: testScore._id });
    console.log("✅ Test data cleaned!");

    console.log("🎉 All tests passed! Database is working correctly.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test failed:", error);
    process.exit(1);
  }
}

testDatabase();
