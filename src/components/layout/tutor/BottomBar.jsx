"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./sidebarNav";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0
        pb-[env(safe-area-inset-bottom)]
        h-16 bg-blue-600  border-t
        flex justify-around items-center
        z-100 md:hidden"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center text-xs transition rounded-full p-2.5
              ${active ? "bg-white text-blue-600" : "text-white"}`}
          >
            <Icon size={30} />
            <span className="hidden md:block mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}