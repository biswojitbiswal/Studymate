"use client";

import { CalendarDays, Users, Clock, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCancelSession, useClassSessions } from "@/hooks/public/useSession";
import { useEnrolledClassContext } from "../EnrolledClassContext";
import { useEffect, useRef, useState } from "react";
import SessionCardSkeleton from "@/components/skeleton/SessionCardSkeleton";
import CreateSessionModal from "@/components/student/CreateSessionModal";
import StudentRescheduleModal from "@/components/student/StudentRescheduleModal";
import { useAuthStore } from "@/store/auth";
import ConfirmDialog from "@/components/common/ConfirmDialog";


export default function SessionsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [sessionType, setSessionType] = useState(null);

    const [studentRescheduleOpen, setStudentRescheduleOpen] = useState(false);
    const [tutorRescheduleOpen, setTutorRescheduleOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const [page, setPage] = useState(1);
    const limit = 10;

    const { klass } = useEnrolledClassContext()

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

    // const {data} = useCreateExtraSession()

    const sessions = data?.data?.data || [];
    const totalPages = data?.data?.totalPages || 1;



    return (
        <div className="space-y-3">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                    Sessions
                </h2>

                {
                    klass?.type === 'PRIVATE' && (<Button
                        onClick={() => {
                            setSessionType("REGULAR");
                            setModalOpen(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer">
                        + Scheddule Session
                    </Button>)
                }
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
                    <SessionCard
                        key={session.id}
                        session={session}
                        onRescheduleStudent={(s) => {
                            setSelectedSession(s);
                            setStudentRescheduleOpen(true);
                        }}
                        onRescheduleTutor={(s) => {
                            setSelectedSession(s);
                            setTutorRescheduleOpen(true);
                        }}
                    />
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


            <CreateSessionModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                type={sessionType}
            />

            <StudentRescheduleModal
                open={studentRescheduleOpen}
                onClose={() => setStudentRescheduleOpen(false)}
                session={selectedSession}
            />
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

function getTutorActions(session) {
    const actions = [];
    const type = session.klass.type;
    const status = session.status;

    // ---------- PRIVATE ----------
    if (type === "PRIVATE") {

        if (status === "SCHEDULED") {
            actions.push(
                { key: "reschedule", label: "Reschedule Session" },
                { key: "cancel", label: "Cancel Session" }
            );
        }
    }

    return actions;
}


function SessionCard({ session, onRescheduleStudent, onRescheduleTutor }) {
    const { user } = useAuthStore();
    const [openMenu, setOpenMenu] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [targetSessionId, setTargetSessionId] = useState(null);
    const menuRef = useRef(null);

    const cancelMutation = useCancelSession();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpenMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    const handleCancel = () => {
        if (!targetSessionId) return;

        cancelMutation.mutate(targetSessionId, {
            onSuccess: () => {
                toast.success("Session cancelled");
                setConfirmOpen(false);
                setTargetSessionId(null);
            },
            onError: (error) => {
                const msg = error?.response?.data?.message || "Failed to cancel session";
                toast.error(Array.isArray(msg) ? msg[0] : msg);
            },
        });
    };

    return (
        <div className="bg-white border rounded-lg px-4 py-2 flex items-center gap-4">

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
                        {formatTimeRange(session?.startTime) || formatTimeRange(session?.klass?.startTime)}
                    </span>
                </div>

                <div className="mt-1 flex items-center gap-2 flex-wrap">
                    <span className="text-xs px-2 py-0.5 rounded-sm bg-blue-100 text-blue-700 font-medium">
                        {session?.dayLabel}
                    </span>
                    <span>
                        ⏱ {session?.klass?.durationMin || session?.durationMin} min
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

                {session?.status === "SCHEDULED" && session?.meetingLink ? (
                    <button className="text-sm bg-blue-600 px-4 py-1 rounded-md cursor-pointer text-white hover:bg-blue-700  hover:cursor-pointer">
                        Join
                    </button>
                ) : (
                    session?.status === "PENDING_TUTOR_APPROVAL" && (
                        <span className="text-xs text-orange-600 font-medium">
                            Student requested session
                        </span>
                    )
                )
                }

                {
                    session.klass.type === 'PRIVATE' && session.status === 'SCHEDULED' && getTutorActions(session).length > 0 && <div ref={menuRef} className="relative">
                        <button
                            onClick={() => setOpenMenu(prev => !prev)}
                            className="px-1 py-0.5 rounded text-blue-600 hover:bg-blue-100 font-bold cursor-pointer"
                        >
                            ⋯
                        </button>

                        {openMenu && (
                            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-10 hover:cursor-pointer">
                                {getTutorActions(session).map(action => (
                                    <button
                                        key={action.key}
                                        onClick={() => {
                                            switch (action.key) {
                                                case "cancel":
                                                    setOpenMenu(false);
                                                    setTargetSessionId(session.id);
                                                    setConfirmOpen(true);
                                                    break;

                                                case "reschedule":
                                                    onRescheduleStudent(session);
                                                    break;
                                            }

                                            setOpenMenu(false);
                                        }}
                                        className="block w-full text-left px-2 py-2 text-sm hover:bg-gray-50 hover:cursor-pointer"
                                    >
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                }
            </div>

            <ConfirmDialog
                open={confirmOpen}
                onOpenChange={(v) => {
                    setConfirmOpen(v);
                    if (!v) setTargetSessionId(null);
                }}
                title="Cancel this session?"
                description="This will remove the meeting link and notify participants. This action cannot be undone."
                onConfirm={handleCancel}
                confirmLoading={cancelMutation.isPending}
            />
        </div>
    );
}


