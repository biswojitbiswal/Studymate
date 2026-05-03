"use client";

import { useState } from "react";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import useGlobalChatSocket from "./useGlobalChatSocket";

export default function ChatLayout({ initialConversationId }) {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  // ✅ Active conversation (single source)
  const activeConversationId =
    selectedConversation?.id || initialConversationId;

  // ✅ Global socket (IMPORTANT)
  useGlobalChatSocket(activeConversationId);

  return (
    <div className="flex h-[80vh] md:h-[89vh] border rounded-lg overflow-auto m-3">

      {/* 🟦 SIDEBAR */}
      <div className="w-full md:w-1/3 border-r">
        <ConversationList
          onSelect={(conv) => {
            // 📱 Mobile → go to dedicated page
            if (window.innerWidth < 768) {
              router.push(
                `/dashboard/${
                  user.role === "TUTOR" ? "tutor" : "student"
                }/chats/${conv.id}`
              );
            } else {
              // 🖥 Desktop → update state
              setSelectedConversation(conv);
            }
          }}
          selectedId={activeConversationId}
        />
      </div>

      {/* 🟩 CHAT AREA (DESKTOP ONLY) */}
      <div className="hidden md:flex md:w-2/3 flex-col">
        {activeConversationId ? (
          <ChatWindow conversationId={activeConversationId} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat
          </div>
        )}
      </div>
    </div>
  );
}