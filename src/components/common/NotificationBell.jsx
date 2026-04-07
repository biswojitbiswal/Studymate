"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import NotificationDropdown from "./NotificationDrpdown";

export default function NotificationBell({ count, open, onOpen, onClose }) {
  const router = useRouter();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      router.push("/notifications");
    }
  };

  return (
    <div
      className="relative me-2"
      onMouseEnter={() => {
        if (window.innerWidth >= 768) onOpen();
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) onClose();
      }}
    >
      {/* Bell */}
      <div className="cursor-pointer" onClick={handleClick}>
        <Bell className="w-5 h-5 text-slate-500" />

        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </div>

      {/* Dropdown MUST be inside same wrapper */}
      <NotificationDropdown open={open} />
    </div>
  );
}