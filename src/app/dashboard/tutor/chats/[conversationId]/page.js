"use client";

import { useParams } from "next/navigation";
import ChatLayout from "@/components/common/chat/ChatLayout";
import ChatWindow from "@/components/common/chat/ChatWindow";

export default function ChatConversationPage() {
  const params = useParams();
  const conversationId = params?.conversationId;

  if (!conversationId) {
    return (
      <div className="flex items-center justify-center h-[85dvh] text-gray-400">
        Invalid conversation
      </div>
    );
  }

  return (
    <>
      {/* 🖥 Desktop (split layout) */}
      <div className="hidden md:block h-[85dvh]">
        <ChatLayout initialConversationId={conversationId} />
      </div>

      {/* 📱 Mobile (full chat screen) */}
      <div className="md:hidden h-[83dvh]">
        <ChatWindow conversationId={conversationId} />
      </div>
    </>
  );
}