"use client";

import { useEffect, useRef } from "react";
import { useInfiniteMessages } from "@/hooks/public/useChat";
import useChatSocket from "@/components/common/chat/useChatSocket";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useAuthStore } from "@/store/auth";

// 🕒 Time formatter
function formatMessageTime(date) {
  if (!date) return "";

  const d = new Date(date);

  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessageList({ conversationId }) {
  const user = useAuthStore((s) => s.user);
  const bottomRef = useRef();

  const { data, isLoading } = useInfiniteMessages(conversationId);

  useChatSocket(conversationId);

  const messages =
    data?.pages?.flatMap((page) => page?.data?.data?.messages) || [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    );
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1 overflow-y-auto p-2 lg:p-4 space-y-1 lg:space-y-2 bg-blue-50">

      {messages.length === 0 && (
        <p className="text-center text-gray-400">
          Start the conversation 👋
        </p>
      )}

      {messages.map((msg) => {
        const isOwn = msg.senderId === user.id;
        const isGroup = msg.conversation?.type === "GROUP";

        return (
          <div
            key={msg.id}
            className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-2 py-2 rounded-xl text-sm shadow-sm ${
                isOwn
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none border"
              }`}
            >

              {/* 👤 Sender Name (ONLY for group + others) */}
              {isGroup && !isOwn && (
                <p className="text-xs font-semibold text-blue-600 mb-0.5">
                  {msg.sender?.name}
                </p>
              )}

              {/* 🔁 Reply */}
              {msg.replyTo && (
                <div className="text-xs opacity-70 border-l-2 pl-2 mb-0.5">
                  {msg.replyTo.content}
                </div>
              )}

              {/* 💬 Message */}
              <p className="break-words">{msg.content}</p>

              {/* 🕒 Time */}
              <p
                className={`text-[10px] ps-4 ${
                  isOwn
                    ? "text-blue-100 text-right"
                    : "text-gray-400 text-right"
                }`}
              >
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}