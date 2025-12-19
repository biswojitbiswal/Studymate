"use client";

import { Search, Bell, LogOut, Power } from "lucide-react";
import { useAuthStore } from "@/store/auth";

export default function TopBar() {
    const { user, logout } = useAuthStore();

    return (
        <header className="h-14 w-full bg-white border-b flex items-center justify-between px-6">
            {/* Left */}
            <div className="hidden sm:block font-bold text-lg text-blue-600">
                Studymate
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

                <div className="relative me-3">
                    <Bell className="w-5 h-5 text-slate-500 cursor-pointer" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                        2
                    </span>
                </div>


                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                        {user.avatar ?? user?.name?.[0].toUpperCase() ?? "A"}
                    </div>
                    {/* <span className="text-sm text-slate-700">
            {user?.name ?? "Admin"}
          </span> */}
                </div>
            </div>
        </header>
    );
}
