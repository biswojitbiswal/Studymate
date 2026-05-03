"use client";

import { useParams } from "next/navigation";
import ChatLayout from "@/components/common/chat/ChatLayout";
import MessageList from "@/components/common/chat/MessageList";
import MessageInput from "@/components/common/chat/MessageInput";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useInfiniteMessages } from "@/hooks/public/useChat";

export default function ChatConversationPage() {
  const { conversationId } = useParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        Invalid conversation
      </div>
    );
  }

  const { data, isLoading } = useInfiniteMessages(conversationId);
  const conversation = data?.pages?.flatMap((page) => page?.data?.data?.conversation) || {};

  return (
    <>
      {/* 🖥 Desktop → use ChatLayout (same as /chats) */}
      <div className="hidden md:block">
        <ChatLayout initialConversationId={conversationId} />
      </div>

      {/* 📱 Mobile → full chat screen */}
      <div className="flex flex-col h-[74dvh] bg-white md:hidden">

        {/* Header */}
        <div className="flex items-center gap-2 px-3 py-3 border-b bg-white shrink-0">

          <button
            onClick={() => router.back()}
            className="text-blue-600 font-bold z-10"
          >
            ←
          </button>

          {/* 👤 Avatar */}
          {conversation[0]?.displayImage ? (
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border-2 border-blue-600">
              <Image
                src={conversation[0].displayImage}
                alt="avatar"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
              {conversation[0]?.displayName?.charAt(0)?.toUpperCase()}
            </div>
          )}
          {/* 📛 Name + Status */}
          <div className="flex flex-col leading-tight">
            <p className="font-semibold text-gray-800 text-md">
              {conversation[0]?.displayName || "Chat"}
            </p>

            {/* 🔵 Future: online / last seen */}
            {/* {conversation?.status && (
                    <p className="text-[11px] text-gray-400">
                    {conversation[0].status.isOnline
                    ? "Online"
                    : formatLastSeen(conversation[0].status.lastSeenAt)}
                    </p>
                  )} */}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-blue-50">
          <MessageList conversationId={conversationId} />
        </div>

        {/* Input */}
        <div className="bg-white border-t shrink-0">
          <MessageInput conversationId={conversationId} />
        </div>

      </div>
    </>
  );
}