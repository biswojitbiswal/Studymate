"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./sidebarNav";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="h-14 bg-white border-t flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center text-xs transition
              ${active ? "text-blue-600" : "text-slate-500"}`}
          >
            <Icon size={22} />
            <span className="mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
