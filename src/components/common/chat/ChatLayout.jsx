"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";
import useGlobalChatSocket from "./useGlobalChatSocket";

export default function ChatLayout({ initialConversationId }) {
  const router = useRouter();
  const role = useAuthStore((state) => state.user?.role);
  useGlobalChatSocket(initialConversationId);

  const selectConversation = (conversation) => {
    const dashboard = role === "TUTOR" ? "tutor" : "student";
    router.push(`/dashboard/${dashboard}/chats/${conversation.id}`);
  };

  return (
    <div className="m-0 flex h-[calc(100dvh-8rem)] min-h-[32rem] overflow-hidden border-y bg-white md:m-3 md:h-[calc(100dvh-7rem)] md:rounded-xl md:border">
      <div className={`${initialConversationId ? "hidden md:block" : "block"} h-full w-full border-r md:w-[38%] lg:w-[34%]`}>
        <ConversationList onSelect={selectConversation} selectedId={initialConversationId} />
      </div>

      <div className={`${initialConversationId ? "flex" : "hidden md:flex"} h-full min-w-0 flex-1 flex-col`}>
        {initialConversationId ? (
          <ChatWindow key={initialConversationId} conversationId={initialConversationId} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center bg-slate-50 p-6 text-center text-slate-400">
            <p className="font-medium text-slate-600">Select a conversation</p>
            <p className="mt-1 text-sm">Choose a student, tutor, or class group to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
}
