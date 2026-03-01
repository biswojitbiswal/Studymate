"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { MobNavItems, navItems } from "./sidebarNav";

export default function BottomNav() {
  const segments = useSelectedLayoutSegments();
  const section = segments[0] ?? "dashboard";

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0
        pb-[env(safe-area-inset-bottom)]
        h-14 bg-white border-t
        flex justify-around items-stretch
        z-100 md:hidden"
    >
      {MobNavItems.map((item) => {
        const Icon = item.icon;
        const active = section === item.key;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`relative flex flex-col items-center justify-center text-xs transition
              ${active ? "text-blue-600" : "text-slate-600"}`}
          >
            {active && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1.5 rounded-b-md bg-blue-600" />
            )}
            <Icon size={24} />
            {/* <span className="hidden md:block mt-0.5">{item.label}</span> */}
          </Link>
        );
      })}
    </nav>
  );
}