"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BookOpenText, CheckCircle, Users } from "lucide-react";
import { useClass } from "@/hooks/tutor/useClass";
import LoadingScreen from "@/components/common/LoadingScreen";
import { ClassProvider } from "./ClassContext";
import { useMemo } from "react";

const tabs = [
    { name: "Overview", href: "overview" },
    { name: "Sessions", href: "session" },
    { name: "Attendance", href: "attendance" },
    { name: "Assignments", href: "assignment" },
    { name: "Chat", href: "chat" },
];

const STATUS_BASE =
    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium border";


export const STATUS_STYLES = {
    PUBLISHED: "bg-green-50 border-green-200 text-green-700",
    ACTIVE: "bg-blue-50 border-blue-200 text-blue-700",
    DRAFT: "bg-yellow-50 border-yellow-200 text-yellow-700",
    COMPLETED: "bg-gray-50 border-gray-200 text-gray-700",
    ARCHIVED: "bg-red-50 border-red-200 text-red-700",
};


export default function ClassLayout({ children }) {
    const { id } = useParams();
    const pathname = usePathname();

    const { data, isLoading } = useClass(id);
    const klass = data?.data;

    const contextValue = useMemo(() => ({
        klass,
        classId: id,
        isDraft: klass?.status === "DRAFT",
        isGroup: klass?.type === "GROUP",
    }), [klass, id]);

    if (isLoading) return <LoadingScreen />;
    return (
        <ClassProvider value={contextValue}>
            <div className="space-y-6">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl text-white">
                    <h1 className="text-2xl font-semibold">
                        {klass?.title || "Tuition Class"}
                    </h1>
                    <p className="text-sm opacity-90">
                        {`${klass?.subject?.name}-${klass?.level?.name}`}
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mt-3">
                    {/* Visibility */}
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                        <BookOpenText size={14} />
                        {/* <span>Visibility:</span> */}
                        <span className="font-semibold">{klass?.visibility}</span>
                    </div>

                    {/* Class Type */}
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                        <Users size={14} />
                        {/* <span>Class Type:</span> */}
                        <span className="font-semibold">{klass?.type}</span>
                    </div>

                    {/* Status */}
                    <div
                        className={`${STATUS_BASE} ${STATUS_STYLES[klass.status] || "bg-gray-50 border-gray-200 text-gray-700"
                            }`}
                    >
                        <CheckCircle size={14} />
                        <span className="font-semibold">{klass?.status}</span>
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
        </ClassProvider>
    );
}
