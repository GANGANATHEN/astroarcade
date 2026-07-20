import mongoose from "mongoose";

const MONGODB_URI =
  `mongodb+srv://Arcade:sha2@cluster0.xdsfkyt.mongodb.net/?appName=Cluster0`;

async function testConnection() {
  try {
    console.log("🔌 Connecting...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB Atlas Connected!");
    await mongoose.disconnect();
    console.log("✅ Disconnected");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed:", error);
    process.exit(1);
  }
}

testConnection();
