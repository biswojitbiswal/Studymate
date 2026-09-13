"use client";

import { useParams } from "next/navigation";
import ChatLayout from "@/components/common/chat/ChatLayout";

export default function ChatConversationPage() {
  const { conversationId } = useParams();
  return <ChatLayout initialConversationId={conversationId} />;
}
