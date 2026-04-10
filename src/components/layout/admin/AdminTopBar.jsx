"use client";

import { Search, Bell, LogOut, Power } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import { useUnreadNotificationCount } from "@/hooks/public/useNotification";
import NotificationBell from "@/components/common/NotificationBell";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdminTopBar() {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const { data: count } = useUnreadNotificationCount();

    return (
        <header className="h-14 bg-white border-b flex items-center justify-between px-6">
            {/* Left */}
            <div className="text-sm text-slate-600">
                Welcome back <span className="text-lg font-bold">
                    {user?.name ?? "Admin"}
                </span> 👋
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Logout */}
                <button
                    onClick={logout}
                    className="flex items-center text-sm cursor-pointer text-red-600 hover:bg-gray-200 rounded p-2"
                >
                    <Power size={20} />
                    {/* Logout */}
                </button>

                <div className="relative">
                    <NotificationBell
                        count={count}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                    />
                </div>


                {/* <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                        {user?.avatar ?? user?.name?.[0] ?? "A"}
                    </div>
                </div> */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/profile"
                        className="relative w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-white text-sm font-medium border-2 border-blue-600 hover:cursor-pointer"
                    >
                        {user?.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user?.name || "User avatar"}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <span>
                                {user?.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
