"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getSocket } from "@/lib/socket";
import { useAuthStore } from "@/store/auth";

export default function useGlobalChatSocket(currentConversationId) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const socket = getSocket();

    console.log("🧠 GLOBAL SOCKET ACTIVE");

    // ============================
    // 🔵 NEW MESSAGE
    // ============================
    const handleNewMessage = (payload) => {
      const newMessage = payload.data;

      // ✅ Update messages cache
      queryClient.setQueryData(
        ["messages", newMessage.conversationId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page, index) => {
              if (index === oldData.pages.length - 1) {
                const existing = page.data.data.messages;

                if (existing.some((m) => m.id === newMessage.id)) {
                  return page;
                }

                return {
                  ...page,
                  data: {
                    ...page.data,
                    data: {
                      ...page.data.data,
                      messages: [...existing, newMessage],
                    },
                  },
                };
              }
              return page;
            }),
          };
        }
      );

      // ✅ Update conversation list (unread logic FIXED)
      queryClient.setQueryData(["conversations"], (old) => {
        if (!old) return old;

        const list = old.data || old;

        const updated = list.map((conv) => {
          if (conv.id !== newMessage.conversationId) return conv;

          return {
            ...conv,
            lastMessage: newMessage,
            updatedAt: newMessage.createdAt,
            unreadCount:
              newMessage.senderId === user.id
                ? conv.unreadCount
                : conv.isMuted
                  ? conv.unreadCount // 🔕 don't increase
                  : conv.id === currentConversationId
                    ? 0
                    : (conv.unreadCount || 0) + 1
          };
        });

        const active = updated.find(
          (c) => c.id === newMessage.conversationId
        );
        const rest = updated.filter(
          (c) => c.id !== newMessage.conversationId
        );

        const sorted = active ? [active, ...rest] : updated;

        return old.data ? { ...old, data: sorted } : sorted;
      });
    };

    // ============================
    // 🔵 SEEN EVENT
    // ============================
    const handleSeen = ({ conversationId: eventConvId }) => {
      console.log(eventConvId, currentConversationId);

      if (!currentConversationId) return;
      if (eventConvId !== currentConversationId) return;

      // ✅ update message ticks
      queryClient.setQueryData(
        ["messages", eventConvId],
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                data: {
                  ...page.data.data,
                  messages: page.data.data.messages.map((msg) => {
                    if (
                      msg.senderId === user.id &&
                      !msg.seenAt
                    ) {
                      return {
                        ...msg,
                        seenAt: new Date().toISOString(),
                      };
                    }
                    return msg;
                  }),
                },
              },
            })),
          };
        }
      );

      // ✅ reset unread count
      queryClient.setQueryData(["conversations"], (old) => {
        if (!old) return old;

        const list = old.data || old;

        const updated = list.map((conv) => {
          if (conv.id !== eventConvId) return conv;

          return {
            ...conv,
            unreadCount: 0,
          };
        });

        return old.data ? { ...old, data: updated } : updated;
      });
    };


    const updatePinned = (conversationId, messageId) => {
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: {
                ...page.data.data,
                conversation: {
                  ...page.data.data.conversation,
                  pinnedMessageId: messageId,
                },
              },
            },
          })),
        };
      });
    };


    socket.on("message_deleted", ({ messageId, conversationId }) => {
      queryClient.setQueryData(["messages", conversationId], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              data: {
                ...page.data.data,
                messages: page.data.data.messages.map((m) =>
                  m.id === messageId
                    ? {
                      ...m,
                      content: "This message was deleted",
                      isDeleted: true,
                    }
                    : m
                ),
              },
            },
          })),
        };
      });
    });


    socket.on("message_pinned", ({ messageId, conversationId }) => {
      updatePinned(conversationId, messageId);
    });

    socket.on("message_unpinned", ({ conversationId }) => {
      updatePinned(conversationId, null);
    });

    socket.on("new_message", handleNewMessage);
    socket.on("messages_seen", handleSeen);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("messages_seen", handleSeen);
      socket.off("message_deleted");
      socket.off("message_pinned");
      socket.off("message_unpinned");
    };
  }, [queryClient, user, currentConversationId]);
}