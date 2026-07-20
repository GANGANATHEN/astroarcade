// models/GameLike.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IGameLike extends Document {
  userId: string;
  gameId: string;
  type: "like" | "dislike" | "favorite";
  createdAt: Date;
}

const GameLikeSchema = new Schema<IGameLike>({
  userId: { type: String, required: true },
  gameId: { type: String, required: true },
  type: {
    type: String,
    enum: ["like", "dislike", "favorite"],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

// Prevent duplicate likes
GameLikeSchema.index({ userId: 1, gameId: 1 }, { unique: true });

const GameLike =
  mongoose.models.GameLike ||
  mongoose.model<IGameLike>("GameLike", GameLikeSchema);

export default GameLike;
