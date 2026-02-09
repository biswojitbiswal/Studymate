"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard, User, Power, Bell } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


export default function NavAuthActions() {
  const user = useAuthStore((s) => s.user);
  const { logout } = useAuthStore();

  const [open, setOpen] = useState(false);

  // Compute dashboard URL using role
  const dashboardUrl =
    user?.role === "TUTOR"
      ? "/dashboard/tutor"
      : user?.role === "STUDENT"
        ? "/dashboard/student"
        : user?.role === "ADMIN"
          ? "/dashboard/admin"
          : "/dashboard"; // fallback

  // If logged in → show Logout + Dashboard Link
  if (user) {
    return (
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

        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
          <div
            className="rounded-full"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none hover:cursor-pointer rounded-full">
                {user?.avatar ? (
                  <Image
                    src={user.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full object-cover border-2 border-blue-600"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-600">
                    <User size={20} className="text-blue-600" />
                  </div>
                )}
              </button>
            </DropdownMenuTrigger>


            <DropdownMenuContent align="end" sideOffset={10}
              className="z-9999 w-48 rounded-md">


              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center gap-2 hover:cursor-pointer">
                  <User size={20} className="text-blue-600" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href={dashboardUrl} className="flex items-center gap-2 hover:cursor-pointer">
                  <LayoutDashboard size={20} className="text-blue-600" />
                  Dashboard
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                <LogOut size={16} />
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </div>
        </DropdownMenu >
      </div >
    );
  }

  // If NOT logged in → show Sign in / Sign up
  return (
    <nav className="flex items-center gap-4 text-sm">
      <Link href="/signin" className="text-blue-600 px-2 py-1 rounded-sm hover:bg-blue-600 hover:text-white">
        Sign in
      </Link>
      {/* <a href="/signup" className="text-blue-600 px-2 py-1 rounded-sm hover:bg-blue-600 hover:text-white">
        Sign up
      </a> */}
    </nav>
  );
}
