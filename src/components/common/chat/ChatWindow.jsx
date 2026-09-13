"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useInfiniteMessages, useMarkConversationRead } from "@/hooks/public/useChat";
import { useAuthStore } from "@/store/auth";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

export default function ChatWindow({ conversationId }) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyMessage, setReplyMessage] = useState(null);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [navigateToMessageId, setNavigateToMessageId] = useState(null);
  const containerRef = useRef(null);
  const bottomRef = useRef(null);
  const atBottomRef = useRef(true);
  const initializedConversationRef = useRef(null);
  const latestMessageIdRef = useRef(null);
  const lastMarkedReadIdRef = useRef(null);
  const userId = useAuthStore((state) => state.user?.id);
  const { mutate: markRead } = useMarkConversationRead();

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteMessages(conversationId);

  const messages = useMemo(() => {
    const byId = new Map();
    for (const page of data?.pages || []) {
      for (const message of page.messages || []) byId.set(message.id, message);
    }
    return [...byId.values()].sort((a, b) => {
      const timeDifference = new Date(a.createdAt) - new Date(b.createdAt);
      return timeDifference || a.id.localeCompare(b.id);
    });
  }, [data]);

  const conversation = data?.pages?.[0]?.conversation;
  const pinnedMessage =
    messages.find((message) => message.id === conversation?.pinnedMessageId) ||
    conversation?.pinnedMessage ||
    null;
  const latestVisibleMessageId = messages[messages.length - 1]?.id || null;

  const markVisibleMessagesRead = useCallback(() => {
    if (
      !conversationId ||
      !latestVisibleMessageId ||
      document.hidden ||
      !atBottomRef.current ||
      lastMarkedReadIdRef.current === latestVisibleMessageId
    ) return;
    lastMarkedReadIdRef.current = latestVisibleMessageId;
    markRead(
      { conversationId },
      {
        onError: () => {
          if (lastMarkedReadIdRef.current === latestVisibleMessageId) {
            lastMarkedReadIdRef.current = null;
          }
        },
      },
    );
  }, [conversationId, latestVisibleMessageId, markRead]);

  useLayoutEffect(() => {
    if (!data || initializedConversationRef.current === conversationId) return;
    initializedConversationRef.current = conversationId;
    atBottomRef.current = true;
    bottomRef.current?.scrollIntoView({ block: "end" });
    markVisibleMessagesRead();
  }, [conversationId, data, markVisibleMessagesRead]);

  useEffect(() => {
    const latest = messages[messages.length - 1];
    if (!latest) return;
    const previousLatestId = latestMessageIdRef.current;
    latestMessageIdRef.current = latest.id;
    if (!previousLatestId || previousLatestId === latest.id) return;

    if (atBottomRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      markVisibleMessagesRead();
    } else if (latest.senderId !== userId) {
      // This state follows an external cache event (a newly received socket message).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNewMessageCount((count) => count + 1);
    }
  }, [markVisibleMessagesRead, messages, userId]);

  const loadOlderMessages = useCallback(async () => {
    const container = containerRef.current;
    if (!container || !hasNextPage || isFetchingNextPage) return null;
    const previousHeight = container.scrollHeight;
    const previousTop = container.scrollTop;
    const result = await fetchNextPage();
    window.requestAnimationFrame(() => {
      container.scrollTop = container.scrollHeight - previousHeight + previousTop;
    });
    return result;
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight < 64;
      atBottomRef.current = isAtBottom;
      if (isAtBottom) {
        setNewMessageCount(0);
        markVisibleMessagesRead();
      }
      if (container.scrollTop <= 80) void loadOlderMessages();
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loadOlderMessages, markVisibleMessagesRead]);

  const navigateToMessage = useCallback((messageId) => {
    if (!messageId) return;
    setNavigateToMessageId(messageId);
  }, []);

  useEffect(() => {
    if (!navigateToMessageId) return;
    if (messages.some((message) => message.id === navigateToMessageId)) return;
    if (hasNextPage && !isFetchingNextPage) {
      void loadOlderMessages();
      return;
    }
    if (!hasNextPage) {
      // This closes a user-requested navigation after pagination confirms absence.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNavigateToMessageId(null);
      toast.info("The original message is unavailable");
    }
  }, [hasNextPage, isFetchingNextPage, loadOlderMessages, messages, navigateToMessageId]);

  if (!conversationId) {
    return <div className="flex h-full items-center justify-center text-gray-400">Select a chat</div>;
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-gray-500">
        <Loader2 className="animate-spin" size={20} /> Loading chat…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-center text-sm text-red-600">
        {error?.response?.data?.message || "This conversation could not be loaded."}
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col bg-white">
      <ChatHeader
        conversation={conversation}
        pinnedMessage={pinnedMessage}
        selectedMessage={selectedMessage}
        setSelectedMessage={setSelectedMessage}
        setReplyMessage={setReplyMessage}
        onNavigateToMessage={navigateToMessage}
      />

      <div className="relative min-h-0 flex-1 bg-slate-50">
        <div ref={containerRef} className="h-full overflow-y-auto">
          {isFetchingNextPage && (
            <div className="sticky top-2 z-20 flex justify-center py-2 pointer-events-none">
              <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs text-gray-500 shadow">
                <Loader2 size={13} className="animate-spin" /> Loading older messages…
              </span>
            </div>
          )}
          <MessageList
            messages={messages}
            conversation={conversation}
            selectedMessage={selectedMessage}
            setSelectedMessage={setSelectedMessage}
            setReplyMessage={setReplyMessage}
            bottomRef={bottomRef}
            navigateToMessageId={navigateToMessageId}
            onNavigateToMessage={navigateToMessage}
            onNavigationComplete={() => setNavigateToMessageId(null)}
          />
        </div>

        {newMessageCount > 0 && (
          <button
            type="button"
            onClick={() => {
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
              setNewMessageCount(0);
            }}
            className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-blue-700"
          >
            <ArrowDown size={15} /> {newMessageCount} new
          </button>
        )}
      </div>

      <MessageInput
        conversationId={conversationId}
        replyMessage={replyMessage}
        setReplyMessage={setReplyMessage}
        setSelectedMessage={setSelectedMessage}
      />
    </div>
  );
}
