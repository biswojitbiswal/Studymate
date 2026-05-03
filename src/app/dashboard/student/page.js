"use client";

import { Button } from "@/components/ui/button";
import { useMeetingLink, useUpcomingSessions } from "@/hooks/public/useSession";
import { useAuthStore } from "@/store/auth";
import {
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
  PlayCircle,
  Timer,
  FileText,
  ClipboardList,
  Hourglass,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Link from "next/link";
import SessionCardSkeleton from "@/components/skeleton/SessionCardSkeleton";
import { toast } from "sonner";
import { useTutorAnalytics } from "@/hooks/tutor/useDashboard";
import { useStudentAnalytics } from "@/hooks/student/useDashboard";
import { WalletCardSkeleton } from "@/components/skeleton/tutor/WalletSkeleton";
import { ResourceCardSkeleton } from "@/components/skeleton/student/ResourceListSkeleton";
import { AssignmentCardSkeleton } from "@/components/skeleton/student/AssignmentSkeleton";
import AssignmentDetailsModal from "./tasks/assigned/AssignmentDetails";



export default function StudentDashboard() {
  const user = useAuthStore(s => s.user);


  const {
    data: upcomingSessionsData,
    isLoading: sessionsLoading,
  } = useUpcomingSessions();

  const sessions = upcomingSessionsData?.data ?? [];

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
  } = useStudentAnalytics();


  return (
    <div className="p-0 md:py-0 md:px-2 bg-gray-50 min-h-screen space-y-3">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        {/* LEFT */}
        <div>
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
            {`Good morning, ${user.name} 👋`}
          </h1>
          <p className="text-gray-500 text-sm">
            Here's what's happening with your classes
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {analyticsLoading ? (
          <>
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
            <WalletCardSkeleton />
          </>
        ) : (
          <>
            <Card title="Enrolled Classes" value={String(analyticsData?.totalClasses).padStart(2, "0")} color="purple" Icon={BookOpen} info="Total Classes joined" />
            <Card title="Ongoing Classes" value={String(analyticsData?.ongoingClasses).padStart(2, "0")} color="blue" Icon={PlayCircle} info="Currently in progress" />
            <Card title="Completed Classes" value={String(analyticsData?.completedClasses).padStart(2, "0")} color="green" Icon={CheckCircle} info="Successfully finished" />
            <Card title="Total Study Hours" value={`${String(analyticsData?.totalHours).padStart(2, "0")} Hr`} color="orange" Icon={Timer} info="Time spent learning" />
            <Card title="Total Assignments" value={String(analyticsData?.totalAssignments).padStart(2, "0")} color="teal" Icon={FileText} info="Assigned across classes" />
            <Card title="Pending Assignments" value={String(analyticsData?.pendingAssignments).padStart(2, "0")} color="red" Icon={Hourglass} info="Yet to be submitted" />
            <Card title="Ongoing Assignments" value={String(analyticsData?.ongoingAssignments
            ).padStart(2, "0")} color="indigo" Icon={Clock} info="Work in progress" />
            <Card title="Completed Assignments" value={String(analyticsData?.completedAssignments
            ).padStart(2, "0")} color="pink" Icon={GraduationCap} info="Submitted successfully" />

          </>
        )}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-2">

        {/* Updcoming Sessions */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm col-span-1">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-900">
              Upcoming Sessions
            </h2>
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
        <div className="bg-white border border-gray-200 rounded-md shadow-sm col-span-1">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-900">
              Recent Resources
            </h2>
          </div>

          <div className="flex flex-col item-center p-2 text-sm text-gray-500 gap-1">

            {
              analyticsLoading ? <div className="p-2 space-y-2">
                <ResourceCardSkeleton />
                <ResourceCardSkeleton />
                <ResourceCardSkeleton />
              </div> : analyticsData?.recentResources?.length > 0 ? (analyticsData?.recentResources?.slice(0, 3)?.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))) : (<p>No resource found</p>)
            }
          </div>
        </div>

        {/* Recent Assignments */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm col-span-1">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-900">
              Recent Assignments
            </h2>
          </div>

          <div className="flex flex-col item-center p-2 text-sm text-gray-500 gap-1">

            {
              analyticsLoading ? <div className="p-2 space-y-2">
                <AssignmentCardSkeleton />
                <AssignmentCardSkeleton />
                <AssignmentCardSkeleton />
              </div> : analyticsData?.recentAssignments?.length > 0 ? (analyticsData?.recentAssignments?.slice(0, 3)?.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))) : (<p>No assignment found</p>)
            }
          </div>
        </div>
      </div>

    </div>
  );
}


function Card({ title, value = 0, color, info, Icon }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    purple: "bg-purple-50 text-purple-600",
    pink: "bg-pink-50 text-pink-600",
    indigo: "bg-indigo-50 text-indigo-600",
    teal: "bg-teal-50 text-teal-600",
    orange: "bg-orange-50 text-orange-600",
  };

  const icons = {
    blue: "bg-blue-200 text-blue-700",
    green: "bg-green-200 text-green-700",
    red: "bg-red-200 text-red-700",
    purple: "bg-purple-200 text-purple-700",
    pink: "bg-pink-200 text-pink-700",
    indigo: "bg-indigo-200 text-indigo-700",
    teal: "bg-teal-200 text-teal-700",
    orange: "bg-orange-200 text-orange-700",
  };

  return (
    <div className={`flex items-start gap-2 p-4 rounded-xl shadow-sm ${colors[color]}`}>
      <div className={`p-2.5 rounded-md ${icons[color]}`}>
        {Icon && <Icon size={18} />}
      </div>
      <div className="gap-1">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className={`text-xl font-semibold`}>
          {((value || 0))}
        </h2>
        <p className="text-sm text-gray-500">{info}</p>
      </div>
    </div>
  );
}


function SessionCard({ session }) {
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

      {session?.status === "SCHEDULED" ? (
        <button onClick={handleJoin} disabled={isPending} className="text-sm bg-blue-600 px-3 py-1 rounded-md cursor-pointer text-white hover:bg-blue-700  hover:cursor-pointer">
          {/* <Video /> */}
          {isPending ? 'Joining' : 'Join'}
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