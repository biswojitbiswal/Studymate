"use client";

import { useParams } from "next/navigation";
import ChatLayout from "@/components/common/chat/ChatLayout";
import MessageList from "@/components/common/chat/MessageList";
import MessageInput from "@/components/common/chat/MessageInput";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

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

  return (
    <>
      {/* 🖥 Desktop → use ChatLayout (same as /chats) */}
      <div className="hidden md:block">
        <ChatLayout initialConversationId={conversationId} />
      </div>

      {/* 📱 Mobile → full chat screen */}
      <div className="flex flex-col h-[74dvh] bg-white md:hidden">

        {/* Header */}
        <div className="flex items-center gap-3 px-3 py-3 border-b bg-white shrink-0">
          <button
            onClick={() => router.back()}
            className="text-blue-600 font-bold"
          >
            ←
          </button>

          <p className="font-semibold text-gray-800">
            Chat
          </p>
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