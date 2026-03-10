"use client";

import {
    Calendar,
    Clock,
    Users,
    IndianRupee,
    Eye,
    Layers,
    EyeOff,
    X,
    MemoryStick,
} from "lucide-react";
import { useEnrolledClassContext } from "../EnrolledClassContext";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useUpcomingSessions } from "@/hooks/public/useSession";
import { FileText, Video, Link2, Image as ImageIcon } from "lucide-react";
import { AssignmentCardSkeleton, ResourceCardSkeleton, SessionCardSkeleton } from '@/components/skeleton/student/StudentClassOverviewSkeleton'
import { useStudentResources } from "@/hooks/tutor/useResources";
import { useStudentAssignments } from "@/hooks/tutor/useAssignments";
import { Button } from "@/components/ui/button";
import AssignmentDetailsModal from "../assignments/AssignmentDetails";


const DAY_LABELS = {
    SUN: "Sun",
    MON: "Mon",
    TUE: "Tue",
    WED: "Wed",
    THU: "Thu",
    FRI: "Fri",
    SAT: "Sat",
};


function formatTimeRange(startTime, durationMin) {
    if (!startTime || !durationMin) return null;

    const [h, m] = startTime.split(":").map(Number);

    const start = new Date();
    start.setHours(h, m, 0, 0);

    const end = new Date(start.getTime() + durationMin * 60 * 1000);

    const format = (date) =>
        date.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });

    return `${format(start)} – ${format(end)}`;
}


function formatDate(dateString) {
    if (!dateString) return "—";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
}


export const resources = [
    {
        id: "res_101",
        title: "Algebra Formulas Cheat Sheet",
        description: "All important algebra identities and shortcuts for quick revision before exams.",
        fileType: "PDF",
        fileUrl: "/dummy/algebra.pdf",
        klassTitle: "Class 10 Mathematics",
        createdAt: "2026-02-25T10:30:00Z",
        size: "1.2 MB"
    },
    {
        id: "res_102",
        title: "Newton's Laws Explained",
        description: "Conceptual explanation of Newton’s 3 laws of motion with real life examples.",
        fileType: "VIDEO",
        fileUrl: "https://youtube.com/watch?v=example",
        klassTitle: "Physics - Mechanics",
        createdAt: "2026-02-26T14:15:00Z",
        size: "15 min"
    },
    {
        id: "res_103",
        title: "Periodic Table Chart",
        description: "High resolution periodic table for memorization and daily practice.",
        fileType: "IMAGE",
        fileUrl: "/dummy/periodic-table.png",
        klassTitle: "Chemistry Basics",
        createdAt: "2026-02-27T09:00:00Z",
        size: "800 KB"
    },
    {
        id: "res_104",
        title: "Essay Writing Format",
        description: "Standard format for writing essays in English examinations.",
        fileType: "DOC",
        fileUrl: "/dummy/essay-format.docx",
        klassTitle: "English Grammar",
        createdAt: "2026-02-27T18:45:00Z",
        size: "350 KB"
    },
    {
        id: "res_105",
        title: "Trigonometry Notes",
        description: "Complete trigonometry notes including identities and solved examples.",
        fileType: "PDF",
        fileUrl: "/dummy/trigonometry.pdf",
        klassTitle: "Class 11 Mathematics",
        createdAt: "2026-02-28T11:20:00Z",
        size: "2.4 MB"
    }
];


export const assignments = [
    {
        id: "ass_201",
        title: "Quadratic Equations Worksheet",
        description: "Solve all 20 questions using factorization and quadratic formula.",
        dueDate: "2026-03-03T23:59:00Z",
        maxMarks: 20,
        status: "NOT_SUBMITTED",
        klassTitle: "Class 10 Mathematics",
        submittedAt: null
    },
    {
        id: "ass_202",
        title: "Motion Numericals",
        description: "Numerical problems based on velocity, acceleration and displacement.",
        dueDate: "2026-03-02T23:59:00Z",
        maxMarks: 25,
        status: "SUBMITTED",
        klassTitle: "Physics - Mechanics",
        submittedAt: "2026-02-28T16:20:00Z"
    },
    {
        id: "ass_203",
        title: "Chemical Reactions Balancing",
        description: "Balance the following chemical equations and write reaction types.",
        dueDate: "2026-02-28T23:59:00Z",
        maxMarks: 15,
        status: "LATE",
        klassTitle: "Chemistry Basics",
        submittedAt: "2026-03-01T08:00:00Z"
    },
    {
        id: "ass_204",
        title: "Letter Writing",
        description: "Write a formal letter to the principal requesting leave.",
        dueDate: "2026-03-05T23:59:00Z",
        maxMarks: 10,
        status: "NOT_SUBMITTED",
        klassTitle: "English Grammar",
        submittedAt: null
    },
    {
        id: "ass_205",
        title: "Trigonometry Problems",
        description: "Solve the identity based trigonometry questions.",
        dueDate: "2026-02-27T23:59:00Z",
        maxMarks: 20,
        status: "GRADED",
        klassTitle: "Class 11 Mathematics",
        submittedAt: "2026-02-27T20:10:00Z",
        marksObtained: 18
    }
];


export default function ClassOverviewPage() {
    const [preview, setPreview] = useState(null);

    const { klass } = useEnrolledClassContext();

    const {
        data: upcomingSessionsData,
        isLoading: sessionsLoading,
    } = useUpcomingSessions({ classId: klass?.id });

    const {
        data: resourcesData,
        isLoading: resourcesLoading,
    } = useStudentResources({
        classId: klass?.id
    });


    const {
        data: assignmentsData,
        isLoading: assignmentsLoading,
    } = useStudentAssignments({
        page: 1,
        limit: 3,
        classId: klass?.id
    });


    const sessions = upcomingSessionsData?.data ?? [];
    const resources = resourcesData?.data?.resources ?? [];
    const assignments = assignmentsData?.data?.data?.tasks ?? [];

    const handleView = (assignment) => {
        setSelectedAssignment(assignment);
        setOpenDetails(true);
    };


    return (
        <div className="space-y-2">
            {/* Upcoming Classes, Resources, Assignment */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                {/* Upcoming Sessions */}
                <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                    <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
                        <h2 className="text-md font-semibold text-gray-900">
                            Upcoming Sessions
                        </h2>
                        <Link href="session" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View All →
                        </Link>
                    </div>

                    <div className="flex flex-col items-center justify-between gap-2 p-2 text-sm text-gray-500">

                        {
                            sessionsLoading ? <div className="p-2 space-y-2">
                                <SessionCardSkeleton />
                                <SessionCardSkeleton />
                                <SessionCardSkeleton />
                            </div> : sessions?.length > 0 ? (sessions?.slice(0, 3)?.map((session) => (
                                <SessionCard key={session.id} session={session} />
                            ))) : (<p>No upcoming session found</p>)
                        }
                    </div>
                </div>

                {/* Recent Resources */}
                <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                    <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-100 ">
                        <h2 className="text-md font-semibold text-gray-900">
                            Recent Resources
                        </h2>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:cursor-pointer">
                            View All →
                        </button>
                    </div>

                    <div className="flex flex-col item-center p-2 text-sm text-gray-500 gap-1">
                        {resourcesLoading ? <div className="p-2 space-y-2">
                            <ResourceCardSkeleton />
                            <ResourceCardSkeleton />
                            <ResourceCardSkeleton />
                        </div> : resources?.length > 0 ? (
                            resources.slice(0, 3).map((resource) => (
                                <ResourceCard key={resource.id} resource={resource} />
                            ))
                        ) : (
                            <p>No recent resources found</p>
                        )}
                    </div>
                </div>

                {/* New Assignments */}
                <div className="bg-white border border-gray-200 rounded-md shadow-sm">
                    <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-100">
                        <h2 className="text-md font-semibold text-gray-900">
                            New Assignments
                        </h2>
                        <Link href="/assignments" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View All →
                        </Link>
                    </div>

                    <div className="flex flex-col item-center p-2 text-sm text-gray-500 gap-1">
                        {assignmentsLoading ? <div className="p-2 space-y-2">
                            <AssignmentCardSkeleton />
                            <AssignmentCardSkeleton />
                            <AssignmentCardSkeleton />
                        </div> : assignments?.length > 0 ? (
                            assignments.slice(0, 3).map((assignment) => (
                                <AssignmentCard key={assignment.id} assignment={assignment} />
                            ))
                        ) : (
                            <p>No new assignments found</p>
                        )}
                    </div>
                </div>

            </div>

            {/* Description + Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {/* Schedule & Joining Window */}
                <div className="lg:col-span-2 bg-white border rounded-md p-5">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Schedule & Availability
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">

                        {/* Class Schedule */}
                        <div className="space-y-2">
                            <p className="font-medium text-gray-900">Class Schedule</p>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">📅</span>
                                {klass?.daysOfWeek?.length
                                    ? klass.daysOfWeek.map(d => DAY_LABELS[d]).join(", ")
                                    : "No schedule"}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">⏰</span>
                                <span className="text-gray-700">
                                    {klass?.startTime && klass?.durationMin
                                        ? formatTimeRange(klass.startTime, klass.durationMin)
                                        : "Time not set"}

                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600">⏳</span>
                                Duration: {klass?.durationMin && `${klass?.durationMin} min`}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-blue-600"><MemoryStick size={20} /></span>
                                Capacity: {klass?.capacity && `${klass?.capacity} students`}
                            </div>
                        </div>

                        {/* Joining Window */}
                        <div className="space-y-2">
                            <p className="font-medium text-gray-900">Joining Window</p>
                            <div>
                                <span className="font-medium">Start:</span> {formatDate(klass?.joiningStartDate)}
                            </div>
                            <div>
                                <span className="font-medium">End:</span> {formatDate(klass?.joiningEndDate)}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <p className="font-medium text-gray-900">Class Window</p>
                            <div>
                                <span className="font-medium">Start:</span> {formatDate(klass?.startDate)}
                            </div>
                            <div>
                                <span className="font-medium">End:</span> {formatDate(klass?.endDate)}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Class Preview */}
                <div className="bg-white border rounded-md p-5">
                    {/* <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Class Preview
                    </h2> */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* Preview Image */}
                        <div
                            onClick={() =>
                                klass?.previewImg &&
                                setPreview({ type: "image", url: klass.previewImg })
                            }
                            className="relative h-44 w-full rounded-lg border bg-blue-50 overflow-hidden cursor-pointer hover:scale-[1.02] transition"
                        >

                            <span className="absolute top-2 left-2 z-10 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                Image
                            </span>

                            {klass?.previewImg ? (
                                <Image
                                    src={klass.previewImg}
                                    alt="Class preview image"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-blue-600 text-sm font-medium">
                                    No preview image
                                </div>
                            )}
                        </div>

                        {/* Preview Video */}
                        <div
                            onClick={() =>
                                klass?.previewVdo &&
                                setPreview({ type: "video", url: klass.previewVdo })
                            }
                            className="relative h-44 w-full rounded-lg border bg-blue-50 overflow-hidden cursor-pointer hover:scale-[1.02] transition"
                        >

                            <span className="absolute top-2 left-2 z-10 text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                                Video
                            </span>

                            {klass?.previewVdo ? (
                                <video
                                    src={klass.previewVdo}
                                    controls
                                    className="h-full w-full object-cover"
                                    preload="metadata"
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center text-blue-600">
                                    <p className="text-sm font-medium">Preview Video</p>
                                    <p className="text-xs opacity-70">No video uploaded</p>
                                </div>
                            )}
                        </div>


                    </div>
                    {preview && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

                            {/* Close button */}
                            <button
                                onClick={() => setPreview(null)}
                                className="absolute top-6 right-6 text-white hover:scale-110 transition hover:cursor-pointer"
                            >
                                <X size={32} />
                            </button>

                            {/* Content */}
                            <div className="relative w-[90%] max-w-4xl max-h-[85vh]">

                                {preview.type === "image" ? (
                                    <Image
                                        src={preview.url}
                                        alt="Preview"
                                        width={1200}
                                        height={800}
                                        className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                                        unoptimized
                                    />
                                ) : (
                                    <video
                                        src={preview.url}
                                        controls
                                        autoPlay
                                        className="w-full max-h-[85vh] rounded-lg bg-black"
                                    />
                                )}

                            </div>
                        </div>
                    )}

                </div>

            </div>

            {/* Quick Stats */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                    icon={<Users size={18} />}
                    label="Enrolled Students"
                    value={format2Digit(klass?.totalEnrollment)}
                />
                <StatCard
                    icon={<Layers size={18} />}
                    label="Capacity"
                    value={format2Digit(klass?.capacity)}
                />
                <StatCard
                    icon={<IndianRupee size={18} />}
                    label="Price"
                    value={`₹${klass?.price.toFixed(2)}`}
                />
                <StatCard
                    icon={klass?.visibility === 'PUBLIC' ? <Eye size={18} /> : <EyeOff size={18} />}
                    label="Visibility"
                    value={klass?.visibility}
                />
            </div> */}

            {/* Description */}
            <div className="bg-white border rounded-md p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                    Class Description
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    {klass?.description}
                </p>
            </div>

            {/* Syllabus */}
            <div className="bg-white border rounded-md p-5">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">
                    Syllabus
                </h2>
                <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                    {
                        klass?.syllabus && klass?.syllabus.map((s, idx) => {
                            return <li key={idx}>{s}</li>
                        })
                    }
                </ul>
            </div>

        </div>
    );
}


function SessionCard({ session }) {
    return (
        <div className="w-full bg-white border rounded-md px-2 py-2 flex items-center justify-between gap-2">

            {/* Date Box */}
            <div className="w-14 shrink-0 rounded-md bg-blue-50 text-blue-600 text-center py-1">
                <div className="text-lg font-bold leading-tight">
                    {session?.dateLabel}
                </div>
                <div className="text-xs uppercase font-medium">
                    {session?.monthLabel}
                </div>

            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="hidden md:block font-medium text-gray-900 truncate">
                        {session?.klass?.title}
                    </h3>

                    {/* Session Type */}
                    <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-blue-600 font-medium">
                        {session?.sessionType}
                    </span>

                    <span
                        className={`md:hidden text-[.5rem] font-small px-1 py-1 rounded-sm
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
                </div>

                <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-sm bg-blue-100 text-blue-700 font-medium">
                        {session?.dayLabel}
                    </span>
                    <span>
                        ⏱ {session?.klass?.durationMin || session?.durationMin} min
                    </span>
                    <span
                        className={`hidden md:block text-[.5rem] font-small px-1 py-1 rounded-sm
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
                </div>
            </div>

            {session?.status === "SCHEDULED" && session?.meetingLink ? (
                <button className="text-sm bg-blue-600 px-3 py-1 rounded-md cursor-pointer text-white hover:bg-blue-700  hover:cursor-pointer">
                    {/* <Video /> */}
                    Join
                </button>
            ) : (
                session?.status === "PENDING_TUTOR_APPROVAL" && (
                    <span className="text-xs text-orange-600 font-medium hidden">
                        Student requested session
                    </span>
                )
            )
            }


        </div>
    );
}


function getResourceIcon(type) {
    switch (type) {
        case "PDF":
        case "DOC":
            return <FileText size={18} />;
        case "VIDEO":
            return <Video size={18} />;
        case "IMAGE":
            return <ImageIcon size={18} />;
        case "LINK":
            return <Link2 size={18} />;
        default:
            return <FileText size={18} />;
    }
}

function ResourceCard({ resource }) {
    return (
        <div className="bg-white border rounded-md px-2 py-2.5 flex items-center gap-2">

            {/* Left Icon Box (replaces session date box) */}
            <div className="w-10 h-10 shrink-0 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                {getResourceIcon(resource?.fileType)}
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900 truncate">
                        {resource?.title}
                    </h3>

                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-blue-600 font-medium">
                        {resource?.fileType}
                    </span>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-500 truncate mt-0.5">
                    {resource?.description || "No description provided"}
                </p>
            </div>

            {/* Right Action */}
            <Link
                href={`/dashboard/student/resources/${resource?.seo_name}`}
                className="text-sm bg-blue-600 px-2 py-1 rounded-md text-white hover:bg-blue-700"
            >
                View
                {/* <Eye /> */}
            </Link>

        </div>
    );
}


function AssignmentCard({ assignment }) {
    const [openDetails, setOpenDetails] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);

    const dueDate = new Date(assignment?.dueDate);
    const today = new Date();

    const isOverdue = today > dueDate && assignment?.status === "NOT_SUBMITTED";

    const handleView = (assignment) => {
        setSelectedAssignment(assignment);
        setOpenDetails(true);
    };

    return (
        <div className="bg-white border rounded-md px-2 py-2 flex items-center gap-2">

            {/* Due Date Box */}
            <div className={`w-12 shrink-0 rounded-md text-center py-1 
                ${isOverdue ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-700"}`}>

                <div className="text-lg font-bold leading-tight">
                    0{dueDate.getDate()}
                </div>
                <div className="text-xs uppercase font-medium">
                    {dueDate.toLocaleString('default', { month: 'short' })}
                </div>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                    {/* Title (flexible element) */}
                    <h3 className="font-medium text-gray-900 truncate flex-1 min-w-0">
                        {assignment?.title}
                    </h3>

                    {/* {assignment.dueDate && (
                        <div className="flex text-sm text-blue-600 px-2 bg-blue-100 rounded-sm">
                            <span>{" "}{new Date(assignment.dueDate).toDateString()}
                            </span>
                        </div>
                    )} */}
                </div>

                <p className="text-xs text-gray-500 truncate mt-0.5">
                    {assignment?.description}
                </p>

            </div>

            {/* Action */}
            <button
                onClick={() => handleView(assignment)}
                className="text-sm bg-blue-600 px-2 py-1  rounded-md text-white hover:bg-blue-700 hover:cursor-pointer"
            >
                View
            </button>

            {openDetails && <AssignmentDetailsModal
                open={openDetails}
                onClose={setOpenDetails}
                assignment={selectedAssignment}
            />}
        </div>
    );
}