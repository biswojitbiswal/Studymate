"use client";

import { useState } from "react";
import { useInfiniteMessages } from "@/hooks/public/useChat";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversationId }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState(null);

  const { data, isLoading } = useInfiniteMessages(conversationId);

  // ✅ FIX: always array
  const conversation =
    data?.pages?.flatMap((page) => page?.data?.data?.conversation) || [];

  const conversationData = conversation[0]; // ✅ clean access

  if (!conversationId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Loading chat...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* 🔥 HEADER */}
      <ChatHeader
        conversation={conversationData}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        setReplyMessage={setReplyMessage}
        conversationId={conversationId}
      />

      {/* 🔥 MESSAGES */}
      <div className="flex-1 overflow-y-auto bg-blue-50">
        <MessageList
          conversationId={conversationId}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          selectedMessage={selectedMessage}
          setSelectedMessage={setSelectedMessage}
        />
      </div>

      {/* 🔥 INPUT */}
      <div className="bg-white border-t shrink-0">
        <MessageInput
          conversationId={conversationId}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          setSelectedMessage={setSelectedMessage}
        />
      </div>
    </div>
  );
}