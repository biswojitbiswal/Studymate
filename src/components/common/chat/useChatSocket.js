"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthToken, useAuthStore } from "@/store/auth";
import { getSocket } from "@/lib/socket";

export default function useChatSocket(conversationId) {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    const token = getAuthToken();
    if (!conversationId || !token) return;

    const socket = getSocket();

    socket.emit("join_conversation", conversationId);

    // ============================
    // 🔵 NEW MESSAGE (ONLY THIS CHAT)
    // ============================
    const handleNewMessage = (payload) => {
      const newMessage = payload.data;

      if (newMessage.conversationId !== conversationId) return;

      console.log("💬 CHAT MESSAGE:", newMessage);

      queryClient.setQueryData(
        ["messages", conversationId],
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
    };

    // ============================
    // 🔵 SEEN (ONLY THIS CHAT)
    // ============================
    const handleSeen = ({ conversationId: cid, userId }) => {
      if (cid !== conversationId) return;

      queryClient.setQueryData(["messages", cid], (oldData) => {
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
                  if (msg.senderId === user.id) return msg;

                  return {
                    ...msg,
                    seenAt: new Date(),
                  };
                }),
              },
            },
          })),
        };
      });
    };

    socket.off("new_message", handleNewMessage);
    socket.on("new_message", handleNewMessage);

    socket.off("messages_seen");
    socket.on("messages_seen", handleSeen);

    return () => {
      socket.emit("leave_conversation", conversationId);
      socket.off("new_message", handleNewMessage);
      socket.off("messages_seen", handleSeen);
    };
  }, [conversationId, queryClient, user]);
}