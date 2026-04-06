"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { useMarkAllNotificationsAsRead, useMarkNotificationAsRead, useNotifications } from "@/hooks/public/useNotification";
import { toast } from "sonner";
import { getAuthToken, useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function NotificationDropdown({ open, onClose }) {
  const token = getAuthToken();
  const router = useRouter()

  const qc = useQueryClient();

  const { data: notifications } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAll } = useMarkAllNotificationsAsRead();


  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
      path: "/socket.io",
      auth: {
        token,
      },
      transports: ["websocket"],
    });



    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Connect error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });



    socket.on("notification", (newNotification) => {

      qc.setQueryData(["notifications"], (old) => {
        if (!old) {
          return {
            data: [newNotification],
            message: "Request successful",
            error: 0,
          };
        }

        return {
          ...old,
          data: [newNotification, ...(old.data || [])],
        };
      });

      // update count
      qc.setQueryData(["notifications", "count"], (old) => {
        return (old || 0) + 1;
      });

      // 🔥 SHOW TOAST
      toast.success(newNotification.title || "New Notification");
    });

    return () => socket.disconnect();
  }, []);


  if (!open) return null;

  const handleClick = (n) => {
    console.log(n);

    markAsRead(n.id);

    // redirect immediately
    if (n.type === "SESSION") {
      router.push(`/dashboard/student/learning/${n?.metadata?.classId}/session`);
    } else if (n.type === "RESOURCE") {
      router.push(`/dashboard/student/learning/${n?.metadata?.classId}/resources`);
    } else if (n.type === "ASSIGNMENT") {
      router.push(`/dashboard/student/learning/${n?.metadata?.classId}/assignments`);
    } else if (n.type === "MESSAGE") {
      router.push(`/dashboard/student/chats`);
    }
  }


  return (
    <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-md border z-50">

      {/* Header */}
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="text-sm font-semibold">Notifications</h3>

        <button
          onClick={markAll}
          className="text-xs text-blue-600 hover:underline hover:cursor-pointer"
        >
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto">
        {notifications?.data?.length === 0 && (
          <p className="text-center text-sm text-gray-500 p-4">
            No notifications
          </p>
        )}

        {notifications?.data?.map((n) => (
          <div
            key={n.id}
            onClick={() => handleClick(n)}
            className="p-3 border-b hover:bg-gray-50 cursor-pointer"
          >
            <p className="text-sm font-medium text-gray-800">
              {n.title}
            </p>
            <p className="text-xs text-gray-500">
              {n.message}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-2 text-center border-t">
        <a
          href="/dashboard/notifications"
          className="text-sm text-blue-600 hover:underline"
        >
          View all
        </a>
      </div>
    </div>
  );
}