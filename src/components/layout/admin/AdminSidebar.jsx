"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { adminNavItems } from "./sidebarNav";
import Image from "next/image";

export default function AdminSidebar() {
    const pathname = usePathname();
    const [openGroup, setOpenGroup] = useState("Master");

    const baseItem = "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition";
    const activeItem = "bg-white text-blue-600 shadow-sm";
    const inactiveItem = "text-white/90 hover:bg-white/10 hover:text-white";


    return (
        <aside className="w-56 bg-blue-600 text-white flex flex-col shadow-lg shadow-black/10 min-h-screen">
            <div className="h-14 bg-white flex items-center px-6 font-semibold border-b border-white/10">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="StudyNest Logo"
                        unoptimized
                        width={140}
                        height={100}
                        priority
                    />
                </Link>
            </div>


            <nav className="flex-1 px-3 py-1.5 space-y-1 overflow-y-scroll scrollbar-gutter-stable no-scrollbar">
                {adminNavItems.map((item) => {
                    const Icon = item.icon;

                    if (!item.children) {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`${baseItem} ${active ? activeItem : inactiveItem
                                    }`}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    }

                    const isOpen = openGroup === item.label;

                    return (
                        <div key={item.label}>
                            <button
                                onClick={() =>
                                    setOpenGroup(isOpen ? null : item.label)
                                }
                                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium transition ${isOpen ? "bg-white/10" : "hover:bg-white/10"}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon size={18} />
                                    {item.label}
                                </div>
                                <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {isOpen && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {item.children.map((child) => {
                                        const ChildIcon = child.icon;
                                        const active = pathname === child.href;

                                        return (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className={`flex items-center gap-3 font-semibold px-4 py-2 rounded-md text-sm transition ${active ? "bg-white text-blue-600" : "text-white/80 hover:bg-white/10"}`}
                                            >
                                                <ChildIcon size={16} />
                                                {child.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
