"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LogOut, LayoutDashboard, User } from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";


export default function NavAuthActions() {
  const user = useAuthStore((s) => s.user);

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
        <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
          <div
          className="rounded-full"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
          <DropdownMenuTrigger asChild>
            <button 
              className="focus:outline-none hover:cursor-pointer rounded-full"
            >
              <Image
                src={user?.avatar || "/avatar-placeholder.png"}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full object-cover border-2 border-blue-600"
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" sideOffset={10}
            className="z-9999 w-48 rounded-md">
            {/* <div className="px-3 py-2 hover:cursor-pointer">
              <p className="text-sm font-medium">
                {user?.name || "User"}
              </p>
            </div>
            <DropdownMenuSeparator /> */}

            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex items-center gap-2 hover:cursor-pointer">
                <User size={20} className="text-blue-600"/>
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
