"use client";

import { CalendarDays, Users, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useClassSessions } from "@/hooks/public/useSession";
import { useClassContext } from "../ClassContext";
import { useEffect, useState } from "react";
import SessionCardSkeleton from "@/components/skeleton/SessionCardSkeleton";


export default function SessionsPage() {
    const { klass } = useClassContext()
    const [page, setPage] = useState(1);
    const limit = 10;

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [page]);

    const { data, isLoading } = useClassSessions({
        classId: klass.id,
        page,
        limit,
    });

    const sessions = data?.data?.data || [];
    const totalPages = data?.data?.totalPages || 1;



    return (
        <div className="space-y-3">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                    Sessions
                </h2>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer">
                    + Doubt Session
                </Button>
            </div>

            {/* Sessions List */}
            <div className="space-y-2">
                {isLoading &&
                    Array.from({ length: 10 }).map((_, i) => (
                        <SessionCardSkeleton key={i} />
                    ))
                }

                {!isLoading && sessions.length <= 0 ? (
                    <div className="py-14 flex flex-col items-center justify-center text-center bg-gray-50">

                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                            <Video className="w-7 h-7 text-blue-600" />
                        </div>

                        <h3 className="text-sm font-semibold text-gray-800">
                            No sessions found
                        </h3>

                        {/* <p className="text-xs text-gray-500 mt-1">
                            you have not scheduled any classes yet.
                        </p> */}
                    </div>

                ) : sessions?.map((session) => (
                    <SessionCard key={session?.id} session={session} />
                ))}
            </div>

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
                <div className="flex items-center justify-between pt-3">

                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ← Previous
                    </button>

                    <div className="text-sm text-gray-600">
                        Page <span className="font-medium">{page}</span> of{" "}
                        <span className="font-medium">{totalPages}</span>
                    </div>

                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next →
                    </button>

                </div>
            )}
        </div>
    );
}


function formatTimeRange(startTime) {
    if (!startTime) return null;

    const [h, m] = startTime.split(":").map(Number);

    const start = new Date();
    start.setHours(h, m, 0, 0);

    // const end = new Date(start.getTime() + durationMin * 60 * 1000);

    const format = (date) =>
        date.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    return `${format(start)}`;
}


function SessionCard({ session }) {
    return (
        <div className="bg-white border rounded-lg px-4 py-3 flex items-center gap-4">

            {/* Date Box */}
            <div className="w-14 shrink-0 rounded-md bg-blue-50 text-blue-600 text-center py-2">
                <div className="text-xs uppercase font-medium">
                    {session?.monthLabel}
                </div>
                <div className="text-md font-bold leading-tight">
                    {session?.dateLabel}
                </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-gray-900 truncate">
                        {session?.klass?.title}
                    </h3>

                    {/* Session Type */}
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-blue-600 font-medium">
                        {session?.sessionType}
                    </span>

                    <span className="text-sm px-2 rounded bg-gray-100 text-blue-600 font-medium">
                        {formatTimeRange(session?.klass?.startTime)}
                    </span>
                </div>

                <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-sm bg-blue-100 text-blue-700 font-medium">
                        {session?.dayLabel}
                    </span>
                    <span>
                        ⏱ {session?.klass?.durationMin} min
                    </span>
                    <span>
                        👥 {session?.totalEnrollment} students
                    </span>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-sm
            ${session?.status === "SCHEDULED"
                            ? "bg-green-100 text-green-700"
                            : session?.status === "COMPLETED"
                                ? "bg-blue-100 text-blue-700"
                                : session?.status?.includes("CANCELLED")
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {session?.status?.replaceAll("_", " ")}
                </span>

                <button className="text-sm bg-blue-600 px-4 py-1.5 rounded-md cursor-pointer text-white hover:bg-blue-700">
                    Join
                </button>
            </div>
        </div>
    );
}


