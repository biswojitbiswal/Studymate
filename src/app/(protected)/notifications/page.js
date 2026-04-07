"use client";

import { useState } from "react";
import { useNotifications, useMarkAllNotificationsAsRead, useMarkNotificationAsRead } from "@/hooks/public/useNotification";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { getAuthToken, useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";

export default function NotificationsPage() {
    const [filter, setFilter] = useState("ALL");
    const user = useAuthStore((s) => s.user);

    const token = getAuthToken();

    const router = useRouter()

    const qc = useQueryClient();

    const { data: notifications } = useNotifications();
    const { mutateAsync: markAsRead } = useMarkNotificationAsRead();
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

    const filtered = notifications?.data?.filter((n) => {
        if (filter === "UNREAD") return !n.read;
        if (filter === "SESSION") return n.type === "SESSION";
        if (filter === "MESSAGE") return n.type === "MESSAGE";
        return true;
    });

    const handleClick = async (n) => {
        try {
            await markAsRead(n.id);
        } catch (err) {
            console.error(err);
        }

        // redirect immediately
        if (user.role === 'STUDENT') {
            if (n.type === "SESSION") {
                router.push(`/dashboard/student/learning/${n?.metadata?.classId}/session`);
            } else if (n.type === "RESOURCE") {
                router.push(`/dashboard/student/learning/${n?.metadata?.classId}/resources`);
            } else if (n.type === "ASSIGNMENT") {
                router.push(`/dashboard/student/learning/${n?.metadata?.classId}/assignments`);
            } else if (n.type === "MESSAGE") {
                router.push(`/dashboard/student/chats`);
            }
        } else if (user.role === "TUTOR") {
            if (n.type === "SESSION") {
                router.push(`/dashboard/tutor/classes/${n?.metadata?.classId}/session`);
            } else if (n.type === "RESOURCE") {
                router.push(`/dashboard/tutor/classes/${n?.metadata?.classId}/resources`);
            } else if (n.type === "ASSIGNMENT") {
                router.push(`/dashboard/tutor/classes/${n?.metadata?.classId}/assignments`);
            } else if (n.type === "MESSAGE") {
                router.push(`/dashboard/tutor/chats`);
            }
        } else if (user.role === "ADMIN") {
            if (n.type === "CLASS") {
                router.push(`/dashboard/admin/classes/${n?.metadata?.classId}`);
            } else if (n.type === "MESSAGE") {
                router.push(`/dashboard/admin/chats`);
            }
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-2 lg:p-4 min-h-screen mb-2 lg:border-2 border-blue-600 rounded-sm">

            {/* Header */}
            <div className="flex justify-between items-center mb-4 border-b-2 border-blue-600">
                <h1 className="text-xl font-semibold">Notifications</h1>

                <button
                    onClick={markAll}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Mark all as read
                </button>
            </div>

            {/* Filters */}
            {/* <div className="flex gap-2 mb-4">
        {["ALL", "UNREAD", "SESSION", "MESSAGE"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 text-sm rounded-full border ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div> */}

            {/* List */}
            <div className="flex flex-col gap-1 bg-white">

                {filtered?.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No notifications
                    </div>
                )}

                {filtered?.map((n) => (
                    <div
                        key={n.id}
                        onClick={() => handleClick(n)}
                        className={`p-2 cursor-pointer hover:bg-gray-50 rounded-sm ${!n.read ? "bg-blue-50" : ""
                            }`}
                    >
                        <p className="text-sm font-medium text-gray-800">
                            {n.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                            {n.message}
                        </p>

                        <p className="text-[10px] text-gray-400 mt-1">
                            {(() => {
                                const d = new Date(n.createdAt);

                                const day = String(d.getDate()).padStart(2, "0");
                                const month = String(d.getMonth() + 1).padStart(2, "0");
                                const year = d.getFullYear();

                                const time = d.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });

                                return `${day}-${month}-${year} ${time}`;
                            })()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}