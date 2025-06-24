"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, MessageCircle } from "lucide-react";
import type { Room } from "matrix-js-sdk";

interface RoomListProps {
  rooms: Room[];
  selectedRoomId: string | null;
  onRoomSelect: (roomId: string) => void;
  onStartNewChat: (userId: string) => void;
}

export function RoomList({
  rooms,
  selectedRoomId,
  onRoomSelect,
  onStartNewChat,
}: RoomListProps) {
  const [showNewChat, setShowNewChat] = useState(false);
  const [newChatUserId, setNewChatUserId] = useState("");

  const handleStartNewChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (newChatUserId.trim()) {
      onStartNewChat(newChatUserId.trim());
      setNewChatUserId("");
      setShowNewChat(false);
    }
  };

  const getRoomDisplayName = (room: Room) => {
    return room.name || room.roomId;
  };

  return (
    <div className="w-64 border-r h-full flex flex-col bg-muted/20">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Direct Messages</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNewChat(!showNewChat)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {showNewChat && (
          <form onSubmit={handleStartNewChat} className="mt-3 flex gap-2">
            <Input
              placeholder="@user:domain.com"
              value={newChatUserId}
              onChange={(e) => setNewChatUserId(e.target.value)}
              className="text-sm"
            />
            <Button type="submit" size="sm" disabled={!newChatUserId.trim()}>
              Start
            </Button>
          </form>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {rooms.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
            No conversations yet
          </div>
        ) : (
          rooms.map((room) => (
            <div
              key={room.roomId}
              className={`p-3 cursor-pointer hover:bg-accent transition-colors ${
                selectedRoomId === room.roomId ? "bg-accent" : ""
              }`}
              onClick={() => onRoomSelect(room.roomId)}
            >
              <div className="font-medium text-sm truncate">
                {getRoomDisplayName(room)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
