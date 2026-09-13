"use client";

import { useSendMessage } from "@/hooks/public/useChat";
import { Loader2, SendHorizontal, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MessageInput({
  conversationId,
  replyMessage,
  setReplyMessage,
  setSelectedMessage,
}) {
  const [text, setText] = useState("");
  const sendMessage = useSendMessage();

  const handleSend = async () => {
    const content = text.trim();
    if (!content || !conversationId || sendMessage.isPending) return;

    try {
      await sendMessage.mutateAsync({
        conversationId,
        content,
        replyToId: replyMessage?.id || undefined,
      });
      setText("");
      setReplyMessage?.(null);
      setSelectedMessage?.(null);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Message could not be sent");
    }
  };

  return (
    <div className="space-y-2 bg-white p-2 sm:p-3">
      {replyMessage && (
        <div className="flex items-center justify-between rounded-lg border-l-4 border-blue-500 bg-blue-50 px-3 py-2">
          <div className="min-w-0 text-xs">
            <p className="font-semibold text-blue-700">Replying to {replyMessage.sender?.name || "message"}</p>
            <p className="truncate text-gray-600">{replyMessage.content}</p>
          </div>
          <button
            type="button"
            onClick={() => setReplyMessage?.(null)}
            className="rounded-full p-1 hover:bg-blue-100"
            aria-label="Cancel reply"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSend();
            }
          }}
          maxLength={2000}
          rows={1}
          placeholder="Type a message…"
          className="max-h-32 min-h-11 flex-1 resize-none rounded-xl border border-gray-300 px-3 py-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          aria-label="Message"
        />
        <button
          type="button"
          disabled={sendMessage.isPending || !text.trim()}
          onClick={handleSend}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          {sendMessage.isPending ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <SendHorizontal size={20} />
          )}
        </button>
      </div>
      {text.length > 1800 && (
        <p className="text-right text-xs text-gray-400">{text.length}/2000</p>
      )}
    </div>
  );
}
