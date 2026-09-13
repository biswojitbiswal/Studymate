import { io } from "socket.io-client";
import { getAuthToken } from "@/store/auth";

let socket;
let socketToken;

export const getSocket = () => {
  const token = getAuthToken();

  if (!socket || socketToken !== token) {
    socket?.disconnect();
    socketToken = token;

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
