"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpenText, CheckCircle, Users } from "lucide-react";

const tabs = [
    { name: "Overview", href: "overview" },
    { name: "Sessions", href: "session" },
    { name: "Attendance", href: "attendance" },
    { name: "Assignments", href: "assignment" },
    { name: "Chat", href: "chat" },
];

export default function ClassLayout({ children }) {
    const { id } = useParams();
    const pathname = usePathname();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl text-white">
                <h1 className="text-2xl font-semibold">
                    Mathematics – Grade 10
                </h1>
                <p className="text-sm opacity-90">
                    Tutor: Mr. Ajay Sharma
                </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
                {/* Subject */}
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                    <BookOpenText size={14} />
                    <span>Subject:</span>
                    <span className="font-semibold">Mathematics</span>
                </div>

                {/* Class Type */}
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                    <Users size={14} />
                    <span>Class Type:</span>
                    <span className="font-semibold">Group</span>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-md px-3 py-1.5 text-sm font-medium">
                    <CheckCircle size={14} />
                    <span className="font-semibold">Active</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
                {tabs.map((tab) => {
                    const href = `/dashboard/tutor/classes/${id}/${tab.href}`;
                    const isActive = pathname === href || (tab.href === "" && pathname.endsWith(id));

                    return (
                        <Link
                            key={tab.name}
                            href={href}
                            className={cn(
                                "px-6 py-1.5 text-sm font-semibold rounded-t-sm",
                                isActive
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-600 hover:text-blue-600"
                            )}
                        >
                            {tab.name}
                        </Link>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div>{children}</div>
        </div>
    );
}
