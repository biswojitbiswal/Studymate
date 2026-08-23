"use client";

import { useInfiniteMessages } from "@/hooks/public/useChat";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useRef, useEffect, useState } from "react";

export default function ChatWindow({ conversationId }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState(null);

  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const isAtBottomRef = useRef(true);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMessages(conversationId);

  const messages = (data?.pages?.flatMap((page) => page.messages) ?? [])
    .sort(
      (a, b) =>
        new Date(a.createdAt) - new Date(b.createdAt)
    );

  const conversation = data?.pages?.map((page) => page.conversation) ?? [];

  const conversationData = conversation[0];


  useEffect(() => {
    if (isAtBottomRef.current) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages]);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      isAtBottomRef.current =
        container.scrollHeight -
        container.scrollTop -
        container.clientHeight <
        50;

      if (
        container.scrollTop <= 50 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);


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
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto bg-blue-50"
      >
        <MessageList
          messages={messages}
          conversation={conversationData}
          conversationId={conversationId}
          replyMessage={replyMessage}
          setReplyMessage={setReplyMessage}
          selectedMessage={selectedMessage}
          setSelectedMessage={setSelectedMessage}
          bottomRef={bottomRef}
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