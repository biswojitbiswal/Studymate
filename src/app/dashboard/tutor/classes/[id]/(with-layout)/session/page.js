"use client";

import { CalendarDays, Users, Clock, Video, VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApproveSession, useCancelSession, useClassSessions, useCreateExtraSession, useMeetingLink, useRejectSession } from "@/hooks/public/useSession";
import { useClassContext } from "../ClassContext";
import { useEffect, useRef, useState } from "react";
import SessionCardSkeleton from "@/components/skeleton/SessionCardSkeleton";
import CreateSessionModal from "@/components/tutor/CreateSessionModal";
import TutorRescheduleModal from "@/components/tutor/TutorRescheduleModal";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import ConfirmDialog from "@/components/common/ConfirmDialog";


export default function SessionsPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [sessionType, setSessionType] = useState(null);

    const [studentRescheduleOpen, setStudentRescheduleOpen] = useState(false);
    const [tutorRescheduleOpen, setTutorRescheduleOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState(null);

    const [page, setPage] = useState(1);
    const limit = 10;

    const { klass } = useClassContext()

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
            <div className="flex items-center justify-between gap-2">

                {/* TITLE */}
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 whitespace-nowrap">
                    Sessions
                </h2>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2 shrink-0">

                    {klass?.type === "GROUP" ? (
                        <>
                            <Button
                                onClick={() => {
                                    setSessionType("EXTRA");
                                    setModalOpen(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
                            >
                                <span className="hidden xs:inline">+ Extra</span>
                                <span className="xs:hidden">+ Extra</span>
                                <span className="hidden sm:inline"> Session</span>
                            </Button>

                            <Button
                                onClick={() => {
                                    setSessionType("DOUBT");
                                    setModalOpen(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
                            >
                                <span className="hidden xs:inline">+ Doubt</span>
                                <span className="xs:hidden">+ Doubt</span>
                                <span className="hidden sm:inline"> Session</span>
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={() => {
                                setSessionType("REGULAR");
                                setModalOpen(true);
                            }}
                            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-3 sm:px-4 text-xs sm:text-sm whitespace-nowrap"
                        >
                            <span className="sm:hidden">+ Schedule</span>
                            <span className="hidden sm:inline">+ Schedule Session</span>
                        </Button>
                    )}
                </div>
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
            {!isLoading && totalPages > 0 && (
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

            <TutorRescheduleModal
                open={tutorRescheduleOpen}
                onClose={() => setTutorRescheduleOpen(false)}
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

        if (status === "PENDING_TUTOR_APPROVAL") {
            actions.push(
                { key: "approve", label: "Approve Session" },
                { key: "reject", label: "Reject Session" },
                // { key: "reschedule", label: "Propose New Time" }
            );
        }

        if (status === "SCHEDULED") {
            actions.push(
                { key: "reschedule", label: "Reschedule Session" },
                { key: "cancel", label: "Cancel Session" }
            );
        }
    }

    // ---------- GROUP ----------
    if (type === "GROUP") {
        if (status === "SCHEDULED") {
            actions.push(
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

    const approveMutation = useApproveSession();
    const rejectMutation = useRejectSession();
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


    const handleApprove = (sessionId) => {
        approveMutation.mutate(sessionId, {
            onSuccess: () => toast.success("Session approved successfully"),
            onError: (error) => {
                const msg = error?.response?.data?.message || "Failed to approve session";
                toast.error(Array.isArray(msg) ? msg[0] : msg);
            },
        });
    };

    const handleReject = (sessionId) => {
        rejectMutation.mutate(sessionId, {
            onSuccess: () => toast.success("Session rejected"),
            onError: (error) => {
                const msg = error?.response?.data?.message || "Failed to reject session";
                toast.error(Array.isArray(msg) ? msg[0] : msg);
            },
        });
    };

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


    const { mutate: getMeetingLink, isPending } = useMeetingLink();

    const handleJoin = () => {
        getMeetingLink(session.id, {
            onSuccess: (data) => {
                // console.log(data?.data?.meetingLink);
                window.open(data?.data?.meetingLink, "_blank");
            },
            onError: (err) => {
                toast.error(
                    err?.response?.data?.message || "Unable to join session"
                );
            },
        });
    };

    return (
        <div className="relative bg-white border rounded-lg px-1.5 py-1.5 lg:py-3 lg:px-4 flex flex-col md:flex-row gap-2 sm:gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-2">
                {/* Date Box */}
                <div className="w-14 shrink-0 rounded-md bg-blue-50 text-blue-600 text-center py-3 lg:py-2">
                    <div className="text-lg font-bold leading-tight">
                        {session?.dateLabel}
                    </div>
                    <div className="text-xs uppercase font-medium">
                        {session?.monthLabel}
                    </div>

                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 w-full min-w-0">

                        {/* Title */}
                        <h3 className="flex-1 min-w-0 font-medium text-gray-900 truncate">
                            {session?.klass?.title}
                        </h3>

                        {/* Session Type */}
                        <span className="shrink-0 text-xs px-2 py-0.5 rounded bg-gray-100 text-blue-600 font-medium whitespace-nowrap">
                            {session?.sessionType}
                        </span>

                        <span className="text-xs px-3 lg:px-2 py-0.5 rounded-sm bg-blue-100 text-blue-700 font-medium shrink-0">
                            {session?.dayLabel}
                        </span>


                    </div>

                    <div className="mt-1 flex items-center gap-2 flex-wrap text-sm text-gray-600">
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-blue-600 font-medium whitespace-nowrap">
                            {formatTimeRange(session?.startTime) || formatTimeRange(session?.klass?.startTime)}
                        </span>

                        <span className="shrink-0 whitespace-nowrap">
                            ⏱ {session?.klass?.durationMin || session?.durationMin} min
                        </span>

                        <span className="shrink-0 whitespace-nowrap">
                            👥 {session?.totalEnrollment} students
                        </span>

                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center w-full gap-2 md:justify-end">
                <span
                    className={`w-full sm:w-auto flex-1 sm:flex-none text-center text-sm font-medium px-2 py-2.5 rounded-md whitespace-nowrap ${session?.status === "SCHEDULED"
                        ? "bg-green-200 text-green-700"
                        : session?.status === "COMPLETED"
                            ? "bg-blue-200 text-blue-700"
                            : session?.status?.includes("CANCELLED")
                                ? "bg-red-200 text-red-700"
                                : "bg-yellow-200 text-yellow-700"
                        }`}
                >
                    {session?.status?.replaceAll("_", " ")}
                </span>

                {session?.status === "SCHEDULED" ? (
                    <button
                        onClick={handleJoin}
                        disabled={isPending}
                        className="w-full sm:w-auto
                            flex-1 sm:flex-none
                            flex items-center justify-center
                            text-sm bg-blue-600 px-3 py-2 rounded-md
                            text-white gap-2 hover:bg-blue-700 hover:cursor-pointer
                            whitespace-nowrap">
                        <VideoIcon />
                        <span className="font-semibold">Join</span>
                    </button>
                ) : (
                    session?.status === "PENDING_TUTOR_APPROVAL" && (
                        <span className="text-xs text-orange-600 font-medium">
                            Student requested session
                        </span>
                    )
                )
                }

                {getTutorActions(session).length > 0 && (
                    <div ref={menuRef} className="relative shrink-0">
                        <button
                            onClick={() => setOpenMenu(prev => !prev)}
                            className="w-8 h-10 flex items-center justify-center rounded-md hover:bg-blue-700 hover:cursor-pointer bg-blue-600 text-white text-lg"
                        >
                            ⋯
                        </button>

                        {openMenu && (
                            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-10 ">
                                {getTutorActions(session).map(action => (
                                    <button
                                        key={action.key}
                                        onClick={() => {
                                            switch (action.key) {
                                                case "approve":
                                                    handleApprove(session.id);
                                                    break;

                                                case "reject":
                                                    handleReject(session.id);
                                                    break;

                                                case "cancel":
                                                    setOpenMenu(false);
                                                    setTargetSessionId(session.id);
                                                    setConfirmOpen(true);
                                                    break;

                                                case "reschedule":
                                                    onRescheduleTutor(session);
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
                )}
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


