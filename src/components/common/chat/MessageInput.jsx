"use client";

import { useSendMessage } from "@/hooks/public/useChat";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export default function MessageInput({ conversationId }) {
  const [text, setText] = useState("");
  const { mutateAsync, isPending } = useSendMessage();

  const handleSend = async () => {
    if (!text.trim() || !conversationId) return;

    try {
      await mutateAsync({
        conversationId,
        content: text,
      });

      setText("");
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  return (
    <div className="p-1 border-t flex gap-2">

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border rounded-md px-3 py-2"
      />

      <button
        disabled={isPending}
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 rounded-md disabled:opacity-50 hover:cursor-pointer"
      >
        <SendHorizontal size={20} />
      </button>

    </div>
  );
}