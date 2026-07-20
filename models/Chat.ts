import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  room: { type: String, default: "global" },
  username: { type: String, required: true },
  avatar: { type: String, default: "👤" },
  message: { type: String, required: true, maxlength: 500 },
  createdAt: { type: Date, default: Date.now },
});

ChatSchema.index({ room: 1, createdAt: -1 });

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
