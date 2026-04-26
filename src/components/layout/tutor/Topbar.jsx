"use client";

import { Search, Bell, LogOut, Power } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";
import NotificationBell from "@/components/common/NotificationBell";
import { useUnreadNotificationCount } from "@/hooks/public/useNotification";
import { useState } from "react";

export default function TopBar() {
    const { user, logout } = useAuthStore();
    const [open, setOpen] = useState(false);
    const { data: count } = useUnreadNotificationCount();

    return (
        <header className="h-14 w-full bg-white border-b flex items-center justify-between px-2 lg:px-6">
            <Link href="/" className="flex items-center">
                <Image
                    src="/Logo.png"
                    alt="StudyNest Logo"
                    unoptimized
                    width={120}
                    height={120}
                    priority
                />
            </Link>

            {/* Right */}
            <div className="flex items-center gap-2 lg:gap-4">

                {/* Logout */}
                <button
                    onClick={logout}
                    className="flex items-center text-sm cursor-pointer text-red-600 hover:bg-gray-200 rounded p-2"
                >
                    <Power size={24} />
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


                <div className="flex items-center gap-2">
                    <Link
                        href="/profile"
                        className="relative w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white text-sm font-medium border-2 border-blue-600 hover:cursor-pointer"
                    >
                        {user?.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user?.name || "User avatar"}
                                fill
                                className="object-cover"
                                sizes="100"
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
