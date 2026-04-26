"use client";

import { useState } from "react";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { ArrowLeft, Book } from "lucide-react";

export default function ChatLayout({ initialConversationId }) {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const router = useRouter()
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex h-[85vh] border rounded-lg overflow-hidden">

      {/* Sidebar */}
      <div className="w-full md:w-1/3 border-r">
        {/* <ConversationList
          onSelect={setSelectedConversation}
          selectedId={selectedConversation?.id || initialConversationId}
        /> */}
        <ConversationList
          onSelect={(conv) => {
            // 📱 Mobile → redirect
            if (window.innerWidth < 768) {
              router.push(`/dashboard/${user.role === 'TUTOR' ? 'tutor' : 'student'}/chats/${conv.id}`);
            } else {
              setSelectedConversation(conv);
            }
          }}
          selectedId={selectedConversation?.id || initialConversationId}
        />
      </div>

      {/* Chat Area */}
      <div className="hidden md:flex md:w-2/3 flex-col">
        {(selectedConversation || initialConversationId) ? (
          <>
            {/* 🔵 Header */}
            <div className="flex items-center gap-1 px-3 py-3 border-b bg-white shrink-0">
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
            <MessageList
              conversationId={selectedConversation?.id || initialConversationId}
            />
            <MessageInput
              conversationId={selectedConversation?.id || initialConversationId}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat
          </div>
        )}
      </div>

    </div>
  );
}