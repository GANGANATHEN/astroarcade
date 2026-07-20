"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/ui/navbar/Navbar";
import Footer from "@/components/ui/Footer";
import { Send, Users, Hash, Globe, Gamepad2 } from "lucide-react";

interface Message {
  id: string;
  username: string;
  avatar: string;
  message: string;
  timestamp: string;
  room: string;
}

const rooms = [
  { id: "global", name: "Global Chat", icon: Globe, users: 234 },
  { id: "general", name: "General", icon: Hash, users: 156 },
  { id: "games", name: "Game Discussion", icon: Gamepad2, users: 89 },
];

const mockMessages: Message[] = [
  { id: "1", username: "NeonKing", avatar: "👑", message: "Anyone up for a Space Shooter match?", timestamp: "2 min ago", room: "global" },
  { id: "2", username: "PixelPro", avatar: "🎮", message: "Just beat my high score in Neon Runner! 🎉", timestamp: "5 min ago", room: "global" },
  { id: "3", username: "CubeMaster", avatar: "🧊", message: "Level 10 in Cube Puzzle is impossible 😅", timestamp: "8 min ago", room: "global" },
  { id: "4", username: "ArcadeAce", avatar: "🎯", message: "Tank Battle tournament starting in 10 mins!", timestamp: "12 min ago", room: "global" },
  { id: "5", username: "RetroRider", avatar: "🚀", message: "GG @NeonKing, that was a close match!", timestamp: "15 min ago", room: "global" },
];

export default function ChatPage() {
  const [activeRoom, setActiveRoom] = useState("global");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("Guest");
  const [avatar, setAvatar] = useState("👤");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      username,
      avatar,
      message: inputMessage,
      timestamp: "Just now",
      room: activeRoom,
    };
    setMessages([...messages, newMessage]);
    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <div className="flex-1 pt-20 flex flex-col sm:flex-row">
        {/* Sidebar */}
        <div className="w-full sm:w-64 border-r border-white/5 bg-black/50 backdrop-blur-sm">
          <div className="p-4">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Rooms</h2>
            <div className="space-y-1">
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                    activeRoom === room.id ? "bg-white/10 text-white" : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <room.icon className="w-4 h-4" />
                  <span className="text-sm flex-1">{room.name}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Users className="w-3 h-3" />
                    {room.users}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-h-[calc(100vh-80px)]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.filter((m) => m.room === activeRoom).map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{msg.username}</span>
                    <span className="text-xs text-gray-600">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-300 break-words">{msg.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-cyan/50 transition-colors"
              />
              <button
                onClick={handleSend}
                className="px-4 py-3 bg-cyan text-black rounded-xl font-bold hover:bg-cyan/90 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
