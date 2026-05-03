"use client";

import { useEffect, useRef } from "react";
import { useInfiniteMessages } from "@/hooks/public/useChat";
import { useAuthStore } from "@/store/auth";
import { Check, CheckCheck, Reply } from "lucide-react";
import { getSocket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";

function formatMessageTime(date) {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessageList({
  conversationId,
  replyMessage,
  setReplyMessage,
  selectedMessage,
  setSelectedMessage,
}) {

  const user = useAuthStore((s) => s.user);

  const messageRefs = useRef({});
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const queryClient = useQueryClient();

  const { data, isLoading } = useInfiniteMessages(conversationId);

  const messages =
    data?.pages?.flatMap((p) => p?.data?.data?.messages) || [];

  const conversation =
    data?.pages?.flatMap((p) => p?.data?.data?.conversation) || [];

  const isGroup = conversation[0]?.type === "GROUP";


  // ============================
  // 🔥 TRACK SCROLL
  // ============================
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const isBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight < 50;

      isAtBottomRef.current = isBottom;
    };

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);


  // ============================
  // 🔥 EMIT SEEN (ONLY WHEN NEEDED)
  // ============================
  const emitSeen = () => {
    if (!conversationId) return;

    const socket = getSocket();

    if (document.hidden) return;

    if (!isAtBottomRef.current) return;

    socket.emit("messages_seen", { conversationId });
  };

  // 👉 When chat opens
  useEffect(() => {
    emitSeen();
  }, [conversationId]);

  // 👉 When new message arrives
  useEffect(() => {
    emitSeen();
  }, [messages.length]);

  // ============================
  // 🔥 RESET UNREAD
  // ============================
  useEffect(() => {
    if (!conversationId) return;

    queryClient.setQueryData(["conversations"], (old) => {
      if (!old) return old;

      const list = old.data || old;

      const updated = list.map((conv) => {
        if (conv.id !== conversationId) return conv;
        return { ...conv, unreadCount: 0 };
      });

      return old.data ? { ...old, data: updated } : updated;
    });
  }, [conversationId]);

  // ============================
  // 🔥 AUTO SCROLL
  // ============================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // if (isLoading) return <div>Loading...</div>;

  const pinnedId = conversation[0]?.pinnedMessageId;
  const isPinned = pinnedId === selectedMessage?.id;

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-2 bg-blue-50"
    >
      {messages.map((msg) => {
        const isOwn = msg.senderId === user.id;
        const isSelected = selectedMessage?.id === msg.id;

        return (
          <div
            key={msg.id}
            ref={(el) => (messageRefs.current[msg.id] = el)}
            onClick={() =>
              setSelectedMessage((prev) =>
                prev?.id === msg.id ? null : msg
              )
            }
            className={`group flex ${isOwn ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`relative max-w-xs px-3 py-2 rounded-xl text-sm shadow-sm transition ${isOwn
                ? "bg-blue-600 text-white rounded-br-none"
                : "bg-white text-gray-800 border rounded-bl-none"
                } ${isSelected ? "ring-2 ring-green-400 bg-blue-100" : ""}`}
            >
              {/* 🔵 GROUP SENDER NAME */}
              {isGroup && !isOwn && (
                <p className="text-xs font-semibold text-blue-600 mb-1">
                  {msg.sender?.name}
                </p>
              )}


              {/* 🔁 REPLY PREVIEW */}
              {msg.replyTo && (
                <div
                  onClick={() => {
                    const target = messageRefs.current[msg.replyTo?.id];
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth", block: "center" });
                      target.classList.add("bg-blue-200");

                      setTimeout(() => {
                        target.classList.remove("bg-blue-200");
                      }, 2000);
                    }
                  }}
                  className={`cursor-pointer text-xs border-l-2 pl-2 mb-1 ${isOwn
                    ? "border-blue-200 text-blue-100"
                    : "border-gray-300 text-gray-500"
                    }`}
                >
                  <p className="truncate max-w-[180px]">
                    {msg.replyTo?.isDeleted
                      ? "🚫 Message deleted"
                      : msg.replyTo?.content}
                  </p>
                </div>
              )}


              {/* 💬 MESSAGE CONTENT */}
              {msg.isDeleted ? (
                <p className="italic text-gray-400 text-sm">
                  🚫 This message was deleted
                </p>
              ) : (
                <p className="break-words">{msg.content}</p>
              )}


              {/* 🕒 TIME + TICKS */}
              <div className="flex justify-end items-center gap-1 text-[10px] mt-1">
                {msg.id === pinnedId && (
                  <span className="absolute -top-2 -right-2 text-yellow-500 bg-white rounded-full p-0.5 shadow">
                    📌
                  </span>
                )}
                <span
                  className={
                    isOwn ? "text-blue-100" : "text-gray-400"
                  }
                >
                  {formatMessageTime(msg.createdAt)}
                </span>

                {isOwn &&
                  (msg.seenAt ? (
                    <CheckCheck size={14} className="text-blue-200" />
                  ) : (
                    <Check size={14} className="text-blue-200" />
                  ))}
              </div>

              {/* ⚡ HOVER ACTIONS */}
              <div
                className="absolute top-0 right-0 hidden group-hover:flex gap-1 bg-white shadow-md px-1 py-1 rounded-md"
                onClick={(e) => e.stopPropagation()}
              >
                {!msg.isDeleted && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setReplyMessage(msg);
                      setSelectedMessage(null);
                    }}
                    className="p-1 hover:bg-gray-100 rounded text-blue-600"
                  >
                    <Reply size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}