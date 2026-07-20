import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  avatar: { type: String, default: "👤" },
  displayName: { type: String, default: "" },
  totalScore: { type: Number, default: 0 },
  gamesPlayed: { type: Number, default: 0 },
  gamesWon: { type: Number, default: 0 },
  favoriteGames: [{ type: String }],
  achievements: [
    {
      id: String,
      title: String,
      description: String,
      unlockedAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
});

// Index for faster queries
// UserSchema.index({ username: 1 });
// UserSchema.index({ email: 1 });

export default mongoose.models.User || mongoose.model("User", UserSchema);
