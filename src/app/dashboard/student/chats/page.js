"use client";

import { useParams } from "next/navigation";
import ChatLayout from "../../../../components/common/chat/ChatLayout";


export default function ChatPage() {
  const { conversationId } = useParams();
  return <ChatLayout initialConversationId={conversationId}/>;
}