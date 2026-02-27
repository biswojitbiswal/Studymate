"use client";

import { Search, Bell, LogOut, Power } from "lucide-react";
import { useAuthStore } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
    const { user, logout } = useAuthStore();

    return (
        <header className="h-14 w-full bg-white border-b flex items-center justify-between px-2 lg:px-6">
            <Link href="/" className="flex items-center">
                <Image
                    src="/Logo.png"
                    alt="StudyNest Logo"
                    unoptimized
                    width={140}
                    height={120}
                    priority
                />
            </Link>

            {/* Right */}
            <div className="flex items-center gap-2.5 lg:gap-4">

                {/* Logout */}
                <button
                    onClick={logout}
                    className="flex items-center text-sm cursor-pointer text-red-600 hover:bg-gray-200 rounded p-2"
                >
                    <Power size={20} />
                    {/* Logout */}
                </button>

                <div className="relative me-2">
                    <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        2
                    </span>
                </div>


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
