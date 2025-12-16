"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./sidebarNav";
import { Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-16 h-full bg-blue-600 flex flex-col shadow-lg">

      {/* Scrollable Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`w-10 h-10 mx-auto flex items-center justify-center rounded-lg transition
                    ${
                      active
                        ? "bg-white text-blue-600 shadow"
                        : "text-white hover:bg-white/10"
                    }`}
                >
                  <Icon size={20} />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Fixed Bottom Settings */}
      <div className="h-14 flex items-center justify-center border-t border-white/10">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg text-white hover:bg-white/10 transition">
              <Settings size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right">
            Settings
          </TooltipContent>
        </Tooltip>
      </div>
    </aside>
  );
}
