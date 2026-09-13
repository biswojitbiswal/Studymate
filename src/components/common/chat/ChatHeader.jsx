"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { EyeOff, Loader2, Pin, PinOff, Reply, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthStore } from "@/store/auth";
import {
  useDeleteForEveryone,
  useDeleteForMe,
  useTogglePin,
} from "@/hooks/public/useChat";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const errorMessage = (error, fallback) =>
  error?.response?.data?.message || fallback;

export default function ChatHeader({
  conversation,
  pinnedMessage,
  selectedMessage,
  setSelectedMessage,
  setReplyMessage,
  onNavigateToMessage,
}) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteForMe = useDeleteForMe();
  const deleteForEveryone = useDeleteForEveryone();
  const togglePin = useTogglePin();
  const isBusy = deleteForMe.isPending || deleteForEveryone.isPending || togglePin.isPending;
  const isPinned = conversation?.pinnedMessageId === selectedMessage?.id;

  const runDeleteForMe = async () => {
    try {
      await deleteForMe.mutateAsync({ messageId: selectedMessage.id });
      setSelectedMessage(null);
      toast.success("Message removed for you");
    } catch (error) {
      toast.error(errorMessage(error, "Could not remove the message"));
    }
  };

  const runTogglePin = async () => {
    try {
      await togglePin.mutateAsync({ messageId: selectedMessage.id });
      setSelectedMessage(null);
      toast.success(isPinned ? "Message unpinned" : "Message pinned");
    } catch (error) {
      toast.error(errorMessage(error, "Could not update the pinned message"));
    }
  };

  const runDeleteForEveryone = async () => {
    try {
      await deleteForEveryone.mutateAsync({ messageId: selectedMessage.id });
      setConfirmDelete(false);
      setSelectedMessage(null);
      toast.success("Message deleted for everyone");
    } catch (error) {
      toast.error(errorMessage(error, "Could not delete the message"));
    }
  };

  return (
    <header className="shrink-0 border-b bg-white">
      <div className="flex min-h-16 items-center justify-between gap-3 px-3 py-2">
        {!selectedMessage ? (
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full p-2 text-blue-600 hover:bg-blue-50 md:hidden"
              aria-label="Back to conversations"
            >
              ←
            </button>

            {conversation?.displayImage ? (
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-blue-100">
                <Image
                  src={conversation.displayImage}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                {conversation?.displayName?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}

            <div className="min-w-0">
              <p className="truncate font-semibold text-gray-900">
                {conversation?.displayName || "Conversation"}
              </p>
              <p className="text-xs text-gray-500">
                {conversation?.type === "GROUP" ? "Class group" : "Direct message"}
              </p>
            </div>
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setSelectedMessage(null)}
              className="rounded-full p-2 hover:bg-gray-100"
              aria-label="Cancel message selection"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-blue-600">
              {isBusy && <Loader2 size={18} className="animate-spin" />}
              {!selectedMessage.isDeleted && (
                <ActionButton
                  label="Reply"
                  disabled={isBusy}
                  onClick={() => {
                    setReplyMessage(selectedMessage);
                    setSelectedMessage(null);
                  }}
                >
                  <Reply size={20} />
                </ActionButton>
              )}
              <ActionButton label="Delete for me" disabled={isBusy} onClick={runDeleteForMe}>
                <EyeOff size={20} />
              </ActionButton>
              {!selectedMessage.isDeleted && selectedMessage.senderId === user?.id && (
                <ActionButton
                  label="Delete for everyone"
                  disabled={isBusy}
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 size={20} />
                </ActionButton>
              )}
              {!selectedMessage.isDeleted && (
                <ActionButton
                  label={isPinned ? "Unpin" : "Pin"}
                  disabled={isBusy}
                  onClick={runTogglePin}
                >
                  {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
                </ActionButton>
              )}
            </div>
          </>
        )}
      </div>

      {pinnedMessage && !pinnedMessage.isDeleted && (
        <button
          type="button"
          onClick={() => onNavigateToMessage(pinnedMessage.id)}
          className="flex w-full items-center gap-2 border-t bg-amber-50 px-4 py-2 text-left hover:bg-amber-100"
        >
          <Pin size={15} className="shrink-0 text-amber-600" />
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-amber-800">
              Pinned message{pinnedMessage.sender?.name ? ` · ${pinnedMessage.sender.name}` : ""}
            </span>
            <span className="block truncate text-xs text-gray-600">{pinnedMessage.content}</span>
          </span>
        </button>
      )}

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete message for everyone?"
        description="This message will be replaced with a deleted-message notice for every participant."
        onConfirm={runDeleteForEveryone}
        confirmLoading={deleteForEveryone.isPending}
      />
    </header>
  );
}

function ActionButton({ label, children, ...props }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="rounded-full p-2 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label={label}
          {...props}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{label}</TooltipContent>
    </Tooltip>
  );
}
