import { connectDB } from "../lib/db";
import User from "../models/User";
import Score from "../models/Score";
import { hashPassword } from "../lib/auth";

async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Score.deleteMany({});

    // Create demo users
    const users = await User.create([
      {
        username: "NeonKing",
        email: "neon@astroarcade.com",
        password: hashPassword("password123"),
        avatar: "👑",
        displayName: "Neon King",
        totalScore: 98500,
        gamesPlayed: 45,
        gamesWon: 32,
      },
      {
        username: "PixelPro",
        email: "pixel@astroarcade.com",
        password: hashPassword("password123"),
        avatar: "🎮",
        displayName: "Pixel Pro",
        totalScore: 87200,
        gamesPlayed: 38,
        gamesWon: 28,
      },
      {
        username: "CubeMaster",
        email: "cube@astroarcade.com",
        password: hashPassword("password123"),
        avatar: "🧊",
        displayName: "Cube Master",
        totalScore: 76400,
        gamesPlayed: 52,
        gamesWon: 41,
      },
      {
        username: "ArcadeAce",
        email: "ace@astroarcade.com",
        password: hashPassword("password123"),
        avatar: "🎯",
        displayName: "Arcade Ace",
        totalScore: 65100,
        gamesPlayed: 30,
        gamesWon: 22,
      },
      {
        username: "RetroRider",
        email: "retro@astroarcade.com",
        password: hashPassword("password123"),
        avatar: "🚀",
        displayName: "Retro Rider",
        totalScore: 54300,
        gamesPlayed: 25,
        gamesWon: 18,
      },
    ]);

    console.log(`✅ Created ${users.length} users`);

    // Create scores
    const scoresData = [
      { userId: users[0]._id, username: users[0].username, gameId: "space-shooter", score: 15000, category: "action" },
      { userId: users[0]._id, username: users[0].username, gameId: "neon-runner", score: 12000, category: "arcade" },
      { userId: users[0]._id, username: users[0].username, gameId: "cube-puzzle", score: 8000, category: "puzzle" },
      { userId: users[1]._id, username: users[1].username, gameId: "space-shooter", score: 14000, category: "action" },
      { userId: users[1]._id, username: users[1].username, gameId: "neon-runner", score: 11000, category: "arcade" },
      { userId: users[2]._id, username: users[2].username, gameId: "cube-puzzle", score: 20000, category: "puzzle" },
      { userId: users[2]._id, username: users[2].username, gameId: "space-shooter", score: 9000, category: "action" },
      { userId: users[3]._id, username: users[3].username, gameId: "tank-battle", score: 18000, category: "multiplayer" },
      { userId: users[3]._id, username: users[3].username, gameId: "space-shooter", score: 12000, category: "action" },
      { userId: users[4]._id, username: users[4].username, gameId: "neon-runner", score: 16000, category: "arcade" },
    ];

    await Score.create(scoresData);
    console.log(`✅ Created ${scoresData.length} scores`);

    console.log("
🎉 Database seeded successfully!");
    console.log("
Demo Accounts:");
    console.log("  Username: NeonKing, Password: password123");
    console.log("  Username: PixelPro, Password: password123");
    console.log("  Username: CubeMaster, Password: password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
