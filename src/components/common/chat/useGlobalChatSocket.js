"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth";

const updatePages = (old, updater) => {
  if (!old) return old;
  return { ...old, pages: old.pages.map(updater) };
};

export default function useGlobalChatSocket(currentConversationId) {
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (!userId) return;
    const socket = getSocket();

    const handleNewMessage = ({ data: newMessage }) => {
      if (!newMessage?.conversationId) return;

      const cachedConversations = queryClient.getQueryData(["conversations"]);
      if (
        cachedConversations?.data &&
        !cachedConversations.data.some(
          (conversation) => conversation.id === newMessage.conversationId,
        )
      ) {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      }

      queryClient.setQueryData(["messages", newMessage.conversationId], (old) =>
        updatePages(old, (page, index) => {
          if (index !== 0) return page;
          if (page.messages.some((message) => message.id === newMessage.id)) return page;
          return { ...page, messages: [...page.messages, newMessage] };
        }),
      );

      queryClient.setQueryData(["conversations"], (old) => {
        if (!old?.data) return old;
        const conversations = old.data.map((conversation) =>
          conversation.id === newMessage.conversationId
            ? {
                ...conversation,
                lastMessage: newMessage,
                updatedAt: newMessage.createdAt,
                unreadCount:
                  newMessage.senderId === userId
                    ? conversation.unreadCount
                    : conversation.id === currentConversationId
                      ? 0
                    : (conversation.unreadCount || 0) + 1,
              }
            : conversation,
        );
        conversations.sort((a, b) =>
          a.id === newMessage.conversationId
            ? -1
            : b.id === newMessage.conversationId
              ? 1
              : 0,
        );
        return { ...old, data: conversations };
      });
    };

    const handleDeleted = ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) =>
        updatePages(old, (page) => ({
          ...page,
          messages: page.messages.map((message) =>
            message.id === messageId
              ? {
                  ...message,
                  content: "This message was deleted",
                  isDeleted: true,
                  replyTo: null,
                }
              : message,
          ),
          conversation:
            page.conversation.pinnedMessageId === messageId
              ? { ...page.conversation, pinnedMessageId: null, pinnedMessage: null }
              : page.conversation,
        })),
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    };

    const handleHidden = ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) =>
        updatePages(old, (page) => ({
          ...page,
          messages: page.messages.filter((message) => message.id !== messageId),
          conversation:
            page.conversation.pinnedMessageId === messageId
              ? { ...page.conversation, pinnedMessageId: null, pinnedMessage: null }
              : page.conversation,
        })),
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    };

    const updatePinned = (conversationId, messageId) => {
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;
        const pinnedMessage = old.pages
          .flatMap((page) => page.messages)
          .find((message) => message.id === messageId);
        return updatePages(old, (page) => ({
          ...page,
          conversation: {
            ...page.conversation,
            pinnedMessageId: messageId,
            pinnedMessage: pinnedMessage || null,
          },
        }));
      });
    };

    const handlePinned = ({ messageId, conversationId }) =>
      updatePinned(conversationId, messageId);
    const handleUnpinned = ({ conversationId }) =>
      updatePinned(conversationId, null);

    socket.on("new_message", handleNewMessage);
    socket.on("message_deleted", handleDeleted);
    socket.on("message_hidden", handleHidden);
    socket.on("message_pinned", handlePinned);
    socket.on("message_unpinned", handleUnpinned);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("message_deleted", handleDeleted);
      socket.off("message_hidden", handleHidden);
      socket.off("message_pinned", handlePinned);
      socket.off("message_unpinned", handleUnpinned);
    };
  }, [currentConversationId, queryClient, userId]);
}
