import { io } from "socket.io-client";
import { getAuthToken } from "@/store/auth";

let socket;

export const getSocket = () => {
  if (!socket) {
    const token = getAuthToken();

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

  return socket;
};