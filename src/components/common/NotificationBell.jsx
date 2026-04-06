"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotificationBell({ count, onOpen }) {
  const router = useRouter();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      router.push("/dashboard/notifications");
    } else {
      onOpen();
    }
  };

  return (
    <div
      className="relative me-2 cursor-pointer"
      onClick={handleClick}
    >
      <Bell className="w-5 h-5 text-slate-500" />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </div>
  );
}