import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Chat from "@/models/Chat";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const room = searchParams.get("room") || "global";
    const limit = parseInt(searchParams.get("limit") || "50");

    const messages = await Chat.find({ room })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ messages: messages.reverse() });
  } catch (error) {
    console.error("Chat get error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { room, username, avatar, message } = await req.json();

    if (!username || !message) {
      return NextResponse.json({ error: "Username and message required" }, { status: 400 });
    }

    const chat = await Chat.create({
      room: room || "global",
      username,
      avatar: avatar || "👤",
      message,
    });

    return NextResponse.json({ chat });
  } catch (error) {
    console.error("Chat post error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
