import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { username, email, password, avatar } = await req.json();

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields required" },
        { status: 400 },
      );
    }
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json(
        { error: "Username must be 3-20 characters" },
        { status: 400 },
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 },
      );
    }

    // Create user
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashPassword(password),
      avatar: avatar || "👤",
      displayName: username,
    });

    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
    });

    return NextResponse.json({
      success: true,
      token,
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        displayName: user.displayName,
      },
    });
  } catch (error: any) {
    console.error("Register error:", error);

    // MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
