"use client";

import { CalendarDays, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const sessions = [
    {
        id: 1,
        date: "24",
        day: "Wed",
        month: "Apr",
        title: "Quadratic Equations",
        time: "4:00 PM – 5:00 PM",
        students: 18,
        status: "Scheduled",
        type: "REGULAR",
    },
    {
        id: 2,
        date: "26",
        day: "Fri",
        month: "Apr",
        title: "Triangles and Their Properties",
        time: "4:00 PM – 5:00 PM",
        students: 18,
        status: "Scheduled",
        type: "REGULAR",
    },
    {
        id: 3,
        date: "29",
        day: "Mon",
        month: "Apr",
        title: "Exam Preparation",
        time: "4:00 PM – 5:00 PM",
        students: 12,
        status: "Extra Session",
        type: "EXTRA",
    },
];

export default function SessionsPage() {
    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                    Sessions
                </h2>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    + Doubt Session
                </Button>
            </div>

            {/* Sessions List */}
            <div className="space-y-4">
                {sessions.map((session) => (
                    <SessionCard key={session.id} session={session} />
                ))}
            </div>

        </div>
    );
}

/* ---------------- Session Card ---------------- */

function SessionCard({ session }) {
    return (
        <div className="bg-white border rounded-lg px-4 py-3 flex items-center gap-4">

            {/* Date Box */}
            <div className="w-14 shrink-0 rounded-md bg-blue-50 text-blue-600 text-center py-2">
                <div className="text-xs uppercase font-medium">
                    {session.month}
                </div>
                <div className="text-lg font-bold leading-tight">
                    {session.date}
                </div>
                <div className="text-[11px] font-medium">
                    {session.day}
                </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-gray-900 truncate">
                        {session.title}
                    </h3>

                    {/* Session Type */}
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                        {session.sessionType}
                    </span>
                </div>

                <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                    <span>
                        60 min
                    </span>
                    <span>
                        {session.students} students
                    </span>
                    {/* {session.meetingLink && ( */}
                        <span className="text-blue-600 font-medium">
                            {session.sessionType}
                        </span>
                    {/* )} */}
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                <span
                    className={`text-xs font-medium px-2 py-1 rounded-full
            ${session.status === "SCHEDULED"
                            ? "bg-green-100 text-green-700"
                            : session.status === "COMPLETED"
                                ? "bg-blue-100 text-blue-700"
                                : session.status.includes("CANCELLED")
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {session.status.replaceAll("_", " ")}
                </span>

                <button className="text-sm bg-blue-600 px-4 py-1.5 rounded-md cursor-pointer text-white hover:bg-blue-700">
                    Join
                </button>
            </div>
        </div>
    );
}


