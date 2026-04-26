"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { getAuthToken } from "@/store/auth";

let socket;

export default function useChatSocket(conversationId) {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = getAuthToken();

    if (!conversationId || !token) return;

    if (!socket) {
      socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
        auth: { token },
      });

      socket.on("connect", () => {
        console.log("✅ Socket connected:", socket.id);
      });

      socket.on("connect_error", (err) => {
        console.error("❌ Socket error:", err.message);
      });
    }

    socket.emit("join_conversation", conversationId);

    socket.off("new_message");

    socket.on("new_message", () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", conversationId],
      });

      queryClient.invalidateQueries({
        queryKey: ["conversations"],
      });
    });

    return () => {
      socket.emit("leave_conversation", conversationId);
    };
  }, [conversationId]);
}