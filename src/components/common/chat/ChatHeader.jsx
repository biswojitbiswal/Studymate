"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, BellOff, EyeOff, Pin, PinOff, Reply, Trash2, X } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import {
  useDeleteForEveryone,
  useDeleteForMe,
  useToggleMute,
  useTogglePin,
} from "@/hooks/public/useChat";

export default function ChatHeader({
  conversation,
  selectedMessage,
  setSelectedMessage,
  setReplyMessage,
  conversationId,
}) {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const { mutate: deleteForMe } = useDeleteForMe();
  const { mutate: deleteForEveryone } = useDeleteForEveryone();
  const { mutate: togglePin } = useTogglePin();
  const { mutate: toggleMute } = useToggleMute();

  const isMuted = conversation?.isMuted;
  const pinnedId = conversation?.pinnedMessageId;
  const isPinned = pinnedId === selectedMessage?.id;

  return (
    <div className="flex items-center justify-between px-3 py-3 border-b bg-white">

      {/* 🟢 NORMAL MODE */}
      {!selectedMessage ? (
        <div className="flex items-center w-full justify-between gap-2">

          {/* LEFT */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.back()}
              className="text-blue-600 font-bold"
            >
              ←
            </button>

            {/* Avatar */}
            {conversation?.displayImage ? (
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-blue-600">
                <Image src={conversation.displayImage} alt="avatar" fill />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                {conversation?.displayName?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <p className="font-semibold text-gray-800">
              {conversation?.displayName}
            </p>
          </div>

          {/* RIGHT */}
          <button
            onClick={() => toggleMute({ conversationId })}
            className="text-blue-600"
          >
            {isMuted ? <BellOff size={20} /> : <Bell size={20} />}
          </button>
        </div>
      ) : (
        // 🔥 ACTION MODE
        <div className="flex items-center justify-between w-full">
          <button onClick={() => setSelectedMessage(null)}>
            <X size={20} />
          </button>

          <div className="flex gap-4 text-blue-600">

            {/* Reply */}
            <button onClick={() => setReplyMessage(selectedMessage)}>
              <Reply size={20} />
            </button>

            {/* Delete for me */}
            <button
              onClick={() => {
                deleteForMe({ messageId: selectedMessage.id });
                setSelectedMessage(null);
              }}
            >
              <EyeOff size={20} />
            </button>

            {/* Delete for everyone */}
            {selectedMessage?.senderId === user.id && (
              <button
                onClick={() => {
                  deleteForEveryone({ messageId: selectedMessage.id });
                  setSelectedMessage(null);
                }}
              >
                <Trash2 size={20} />
              </button>
            )}

            {/* Pin */}
            <button
              onClick={() => {
                togglePin({ messageId: selectedMessage.id });
                setSelectedMessage(null);
              }}
            >
              {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}