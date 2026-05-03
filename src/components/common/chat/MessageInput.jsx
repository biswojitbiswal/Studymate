"use client";

import { useSendMessage } from "@/hooks/public/useChat";
import { SendHorizontal, X } from "lucide-react";
import { useState } from "react";

export default function MessageInput({ conversationId, replyMessage, setReplyMessage, setSelectedMessage }) {
  const [text, setText] = useState("");
  const { mutateAsync, isPending } = useSendMessage();

  const handleSend = async () => {
    if (!text.trim() || !conversationId) return;

    try {
      await mutateAsync({
        conversationId,
        content: text,
        replyToId: replyMessage?.id || null,
      });

      setText("");
      setReplyMessage(null); // ✅ clear reply
      setSelectedMessage?.(null); // ✅ clear selection (if passed)
    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  return (
    <div className="p-1 border-t flex flex-col gap-1">
      {replyMessage && (
        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md mb-2 border-l-4 border-blue-500">
          <div className="text-xs">
            <p className="font-semibold text-blue-600">Replying</p>
            <p className="truncate max-w-[200px]">
              {replyMessage.content}
            </p>
          </div>

          <button onClick={() => setReplyMessage(null)}><X size={20} /></button>
        </div>
      )}

      <div className="flex gap-1">
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

    </div>
  );
}