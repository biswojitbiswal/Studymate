"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useConversations } from "@/hooks/public/useChat";

const formatConversationTime = (date) => {
  if (!date) return "";
  const value = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  if (value.toDateString() === today.toDateString()) {
    return value.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  }
  if (value.toDateString() === yesterday.toDateString()) return "Yesterday";
  return value.toLocaleDateString(undefined, { day: "2-digit", month: "short" });
};

export default function ConversationList({ onSelect, selectedId }) {
  const [search, setSearch] = useState("");
  const { data, isLoading, isError, refetch } = useConversations();

  const conversations = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data?.data || [];
    return (data?.data || []).filter((conversation) => {
      const participant = conversation.participants?.[0]?.user;
      const name = conversation.type === "GROUP" ? conversation.classTitle : participant?.name;
      return name?.toLowerCase().includes(query) ||
        conversation.lastMessage?.content?.toLowerCase().includes(query);
    });
  }, [data, search]);

  return (
    <aside className="flex h-full min-h-0 flex-col bg-white">
      <div className="border-b p-3">
        <h1 className="mb-3 text-lg font-semibold text-slate-900">Messages</h1>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
          <Search size={17} className="text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search conversations"
            className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading && <ConversationSkeleton />}
        {isError && (
          <div className="p-6 text-center text-sm text-slate-500">
            <p>Conversations could not be loaded.</p>
            <button type="button" onClick={() => refetch()} className="mt-2 font-semibold text-blue-600">
              Try again
            </button>
          </div>
        )}
        {!isLoading && !isError && conversations.length === 0 && (
          <div className="p-8 text-center text-sm text-slate-500">
            {search ? "No conversations match your search." : "No conversations yet."}
          </div>
        )}

        {conversations.map((conversation) => {
          const participant = conversation.participants?.[0]?.user;
          const name = conversation.type === "GROUP" ? conversation.classTitle : participant?.name;
          const image = conversation.type === "GROUP" ? conversation.groupImage : participant?.avatar;

          return (
            <button
              type="button"
              key={conversation.id}
              onClick={() => onSelect(conversation)}
              className={`flex w-full gap-3 border-b p-3 text-left transition hover:bg-blue-50 ${
                selectedId === conversation.id ? "bg-blue-50" : "bg-white"
              }`}
            >
              <Avatar image={image} name={name} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate font-medium text-slate-900">{name || "Conversation"}</span>
                  <span className="shrink-0 text-[11px] text-slate-400">
                    {formatConversationTime(conversation.lastMessage?.createdAt)}
                  </span>
                </span>
                <span className="mt-1 flex items-center justify-between gap-2">
                  <span className="truncate text-sm text-slate-500">
                    {conversation.lastMessage?.isDeleted
                      ? "Message deleted"
                      : conversation.lastMessage?.content || "Start the conversation"}
                  </span>
                  {conversation.unreadCount > 0 && (
                    <span className="min-w-5 shrink-0 rounded-full bg-blue-600 px-1.5 py-0.5 text-center text-[11px] font-semibold text-white">
                      {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
                    </span>
                  )}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}

function Avatar({ image, name }) {
  const [failed, setFailed] = useState(false);
  if (!image || failed) {
    return (
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
        {name?.charAt(0)?.toUpperCase() || "?"}
      </span>
    );
  }
  return (
    // The backend controls these user-uploaded URLs, so a graceful native-image fallback is preferable here.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt=""
      onError={() => setFailed(true)}
      className="h-11 w-11 shrink-0 rounded-full bg-slate-100 object-cover"
    />
  );
}

function ConversationSkeleton() {
  return Array.from({ length: 6 }, (_, index) => (
    <div key={index} className="flex animate-pulse gap-3 border-b p-3">
      <div className="h-11 w-11 rounded-full bg-slate-200" />
      <div className="flex-1 space-y-2 py-1">
        <div className="h-3 w-2/3 rounded bg-slate-200" />
        <div className="h-3 w-full rounded bg-slate-100" />
      </div>
    </div>
  ));
}
