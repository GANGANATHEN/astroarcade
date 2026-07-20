import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  gameId: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

ScoreSchema.index({ gameId: 1, score: -1 });
ScoreSchema.index({ category: 1, score: -1 });
ScoreSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Score || mongoose.model("Score", ScoreSchema);
