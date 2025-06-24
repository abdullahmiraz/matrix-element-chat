"use client";
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { RoomList } from "@/components/chat/RoomList";
import { ChatArea } from "@/components/chat/ChatArea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import {
  getClient,
  getDirectMessageRooms,
  createDirectMessage,
  logout,
} from "@/lib/matrixClient";
import type { Room, MatrixEvent } from "matrix-js-sdk";

type AuthMode = "login" | "register";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MatrixEvent[]>([]);

  // Fetch rooms after login
  useEffect(() => {
    if (loggedIn) {
      const client = getClient();
      if (client) {
        const dmRooms = getDirectMessageRooms();
        setRooms(dmRooms);
        if (dmRooms.length > 0) {
          setSelectedRoomId(dmRooms[0].roomId);
        }
      }
    }
  }, [loggedIn]);

  // Fetch messages when selectedRoomId changes
  useEffect(() => {
    if (!selectedRoomId) return;
    const client = getClient();
    if (!client) return;
    const room = client.getRoom(selectedRoomId);
    if (!room) return;
    // Get live timeline events
    const events = room.timeline.filter(
      (ev) => ev.getType() === "m.room.message"
    );
    setMessages(events);
  }, [selectedRoomId, rooms]);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  const handleRegisterSuccess = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setRooms([]);
    setSelectedRoomId(null);
    setMessages([]);
  };

  const handleStartNewChat = async (userId: string) => {
    try {
      const roomId = await createDirectMessage(userId);
      // Refresh room list
      const dmRooms = getDirectMessageRooms();
      setRooms(dmRooms);
      setSelectedRoomId(roomId);
    } catch (error) {
      console.error("Failed to create direct message:", error);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!selectedRoomId) return;
    const client = getClient();
    if (!client) return;

    await client.sendTextMessage(selectedRoomId, message);
    // Refresh messages
    const room = client.getRoom(selectedRoomId);
    if (room) {
      const events = room.timeline.filter(
        (ev) => ev.getType() === "m.room.message"
      );
      setMessages(events);
    }
  };

  const getSelectedRoomName = () => {
    if (!selectedRoomId) return "";
    const room = rooms.find((r) => r.roomId === selectedRoomId);
    return room?.name || room?.roomId || "";
  };

  if (!loggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        {authMode === "login" ? (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onSwitchToRegister={() => setAuthMode("register")}
          />
        ) : (
          <RegisterForm
            onRegisterSuccess={handleRegisterSuccess}
            onSwitchToLogin={() => setAuthMode("login")}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Card className="w-full max-w-6xl h-screen flex flex-col mx-auto">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold">Matrix Chat</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Chat Interface */}
        <div className="flex flex-1 overflow-hidden">
          <RoomList
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onRoomSelect={setSelectedRoomId}
            onStartNewChat={handleStartNewChat}
          />
          <ChatArea
            messages={messages}
            selectedRoomId={selectedRoomId}
            onSendMessage={handleSendMessage}
            roomName={getSelectedRoomName()}
          />
        </div>
      </Card>
    </div>
  );
}
