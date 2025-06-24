"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Send } from "lucide-react";
import type { MatrixEvent } from "matrix-js-sdk";
import { format } from "date-fns";

interface ChatAreaProps {
  messages: MatrixEvent[];
  selectedRoomId: string | null;
  onSendMessage: (message: string) => Promise<void>;
  roomName?: string;
}

export function ChatArea({
  messages,
  selectedRoomId,
  onSendMessage,
  roomName,
}: ChatAreaProps) {
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || sending) return;

    setSending(true);
    try {
      await onSendMessage(messageInput);
      setMessageInput("");
    } finally {
      setSending(false);
    }
  };

  const formatMessageTime = (event: MatrixEvent) => {
    const timestamp = event.getTs();
    if (!timestamp) return "";
    return format(new Date(timestamp), "HH:mm");
  };

  if (!selectedRoomId) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
          <p className="text-sm">Choose a direct message to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b">
        <h2 className="font-semibold">{roomName || "Direct Message"}</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground text-sm mt-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((event) => {
            const sender = event.getSender();
            const content = event.getContent();
            const isOwnMessage = sender?.includes(
              process.env.NEXT_PUBLIC_MATRIX_HOMESERVER_URL || "matrix.org"
            );

            return (
              <div
                key={event.getId()}
                className={`flex ${
                  isOwnMessage ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    isOwnMessage
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {sender?.split(":")[0]?.substring(1) || sender}
                  </div>
                  <div className="text-sm">{content.body}</div>
                  <div
                    className={`text-xs mt-1 ${
                      isOwnMessage
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatMessageTime(event)}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <Separator />
      <form onSubmit={handleSendMessage} className="flex gap-2 p-4">
        <Input
          placeholder="Type a message..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          disabled={sending}
          className="flex-1"
        />
        <Button type="submit" disabled={sending || !messageInput.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
