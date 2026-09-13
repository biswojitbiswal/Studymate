"use client";

import React, { useEffect, useRef } from "react";
import { format, isToday, isYesterday } from "date-fns";
import { Check, Pin, Reply } from "lucide-react";
import { useAuthStore } from "@/store/auth";

const messageTime = (date) =>
  new Date(date).toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

const fullTimestamp = (date) =>
  new Date(date).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

const dateLabel = (date) => {
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "dd MMM yyyy");
};

export default function MessageList({
  messages,
  conversation,
  selectedMessage,
  setSelectedMessage,
  setReplyMessage,
  bottomRef,
  navigateToMessageId,
  onNavigateToMessage,
  onNavigationComplete,
}) {
  const userId = useAuthStore((state) => state.user?.id);
  const messageRefs = useRef({});
  const isGroup = conversation?.type === "GROUP";

  const firstUnreadId = (() => {
    if (!messages.length) return null;
    const lastReadId = conversation?.lastSeenMessageId;
    if (!lastReadId) {
      return messages.find((message) => message.senderId !== userId)?.id || null;
    }
    const lastReadIndex = messages.findIndex((message) => message.id === lastReadId);
    if (lastReadIndex < 0 && conversation?.lastReadAt) {
      const lastReadAt = new Date(conversation.lastReadAt).getTime();
      return messages.find(
        (message) =>
          message.senderId !== userId &&
          new Date(message.createdAt).getTime() > lastReadAt,
      )?.id || null;
    }
    if (lastReadIndex < 0) return null;
    return messages
      .slice(lastReadIndex + 1)
      .find((message) => message.senderId !== userId)?.id || null;
  })();

  useEffect(() => {
    if (!navigateToMessageId) return;
    const target = messageRefs.current[navigateToMessageId];
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("ring-2", "ring-amber-400");
    const timer = window.setTimeout(() => {
      target.classList.remove("ring-2", "ring-amber-400");
      onNavigationComplete?.();
    }, 1600);
    return () => window.clearTimeout(timer);
  }, [messages, navigateToMessageId, onNavigationComplete]);

  if (!messages.length) {
    return (
      <div className="flex min-h-full items-center justify-center p-6 text-center text-sm text-gray-500">
        No messages yet. Start the conversation.
        <div ref={bottomRef} />
      </div>
    );
  }

  return (
    <div className="min-h-full space-y-1 bg-slate-50 px-3 py-4 sm:px-5">
      {messages.map((message, index) => {
        const own = message.senderId === userId;
        const selected = selectedMessage?.id === message.id;
        const previous = messages[index - 1];
        const showDate =
          !previous ||
          new Date(previous.createdAt).toDateString() !==
            new Date(message.createdAt).toDateString();
        const showUnread = message.id === firstUnreadId;

        return (
          <React.Fragment key={message.id}>
            {showDate && (
              <div className="sticky top-2 z-10 flex justify-center py-3 pointer-events-none">
                <span className="rounded-full border border-slate-200 bg-white/95 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm backdrop-blur">
                  {dateLabel(new Date(message.createdAt))}
                </span>
              </div>
            )}

            {showUnread && (
              <div className="flex items-center gap-3 py-3" aria-label="Unread messages">
                <div className="h-px flex-1 bg-blue-200" />
                <span className="text-xs font-semibold text-blue-600">New messages</span>
                <div className="h-px flex-1 bg-blue-200" />
              </div>
            )}

            <div
              ref={(element) => {
                if (element) messageRefs.current[message.id] = element;
                else delete messageRefs.current[message.id];
              }}
              className={`group flex scroll-mt-24 items-start gap-1 transition ${own ? "justify-end" : "justify-start"}`}
            >
              {own && !message.isDeleted && (
                <ReplyButton
                  onClick={() => {
                    setReplyMessage(message);
                    setSelectedMessage(null);
                  }}
                />
              )}

              <button
                type="button"
                onClick={() =>
                  setSelectedMessage((current) =>
                    current?.id === message.id ? null : message,
                  )
                }
                className={`relative max-w-[82%] rounded-2xl px-3 py-2 text-left text-sm shadow-sm sm:max-w-md ${
                  own
                    ? "rounded-br-md bg-blue-600 text-white"
                    : "rounded-bl-md border border-slate-200 bg-white text-slate-800"
                } ${selected ? "ring-2 ring-emerald-400" : ""}`}
                aria-label={`Message from ${own ? "you" : message.sender?.name || "participant"}`}
              >
                {isGroup && !own && (
                  <span className="mb-1 block text-xs font-semibold text-blue-600">
                    {message.sender?.name || "Participant"}
                  </span>
                )}

                {message.replyTo && (
                  <span
                    role="button"
                    tabIndex={0}
                    onClick={(event) => {
                      event.stopPropagation();
                      onNavigateToMessage?.(message.replyTo.id);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") onNavigateToMessage?.(message.replyTo.id);
                    }}
                    className={`mb-1 block cursor-pointer rounded border-l-2 px-2 py-1 text-xs ${
                      own
                        ? "border-blue-200 bg-blue-700/40 text-blue-50"
                        : "border-blue-400 bg-slate-50 text-slate-500"
                    }`}
                  >
                    <span className="block truncate">
                      {message.replyTo.isDeleted
                        ? "Message deleted"
                        : message.replyTo.content}
                    </span>
                  </span>
                )}

                {message.isDeleted ? (
                  <span className={`italic ${own ? "text-blue-100" : "text-slate-400"}`}>
                    This message was deleted
                  </span>
                ) : (
                  <span className="block whitespace-pre-wrap break-words">{message.content}</span>
                )}

                <span className="mt-1 flex items-center justify-end gap-1 text-[10px]">
                  {message.id === conversation?.pinnedMessageId && (
                    <Pin size={11} aria-label="Pinned" />
                  )}
                  <time
                    dateTime={message.createdAt}
                    title={fullTimestamp(message.createdAt)}
                    className={own ? "text-blue-100" : "text-slate-400"}
                  >
                    {messageTime(message.createdAt)}
                  </time>
                  {own && !message.isDeleted && (
                    <Check size={13} className="text-blue-100" aria-label="Delivered" />
                  )}
                </span>

              </button>

              {!own && !message.isDeleted && (
                <ReplyButton
                  onClick={() => {
                    setReplyMessage(message);
                    setSelectedMessage(null);
                  }}
                />
              )}
            </div>
          </React.Fragment>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}

function ReplyButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-1 rounded-full bg-white p-1.5 text-blue-600 opacity-0 shadow transition hover:bg-blue-50 focus:opacity-100 group-hover:opacity-100"
      aria-label="Reply to message"
      title="Reply"
    >
      <Reply size={14} />
    </button>
  );
}
