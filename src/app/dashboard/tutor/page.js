"use client";

import { Button } from "@/components/ui/button";
import { useMeetingLink, useUpcomingSessions } from "@/hooks/public/useSession";
import { useAuthStore } from "@/store/auth";
import {
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle,
  Wallet,
  Banknote,
  Hourglass,
  CreditCard,
  Users,
  Star,
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
import { useClassContext } from "./classes/[id]/(with-layout)/ClassContext";
import Link from "next/link";
import SessionCardSkeleton from "@/components/skeleton/SessionCardSkeleton";
import { toast } from "sonner";
import { useTutorAnalytics } from "@/hooks/tutor/useDashboard";
import { WalletCardSkeleton } from "@/components/skeleton/tutor/WalletSkeleton";


const earningsData = [
  { name: "1 May", earnings: 500 },
  { name: "5 May", earnings: 900 },
  { name: "10 May", earnings: 1200 },
  { name: "15 May", earnings: 1500 },
  { name: "20 May", earnings: 1900 },
  { name: "25 May", earnings: 2100 },
  { name: "30 May", earnings: 2450 },
  { name: "1 May", earnings: 500 },
  { name: "5 May", earnings: 900 },
  { name: "10 May", earnings: 1200 },
  { name: "15 May", earnings: 1500 },
  { name: "20 May", earnings: 1900 },
  { name: "25 May", earnings: 2100 },
  { name: "30 May", earnings: 2450 },
  { name: "1 May", earnings: 500 },
  { name: "5 May", earnings: 900 },
  { name: "10 May", earnings: 1200 },
  { name: "15 May", earnings: 1500 },
  { name: "20 May", earnings: 1900 },
  { name: "25 May", earnings: 2100 },
  { name: "30 May", earnings: 2450 },
  { name: "1 May", earnings: 500 },
  { name: "5 May", earnings: 900 },
  { name: "10 May", earnings: 1200 },
  { name: "15 May", earnings: 1500 },
  { name: "20 May", earnings: 1900 },
  { name: "25 May", earnings: 2100 },
  { name: "30 May", earnings: 2450 },
];

const sessionData = [
  { name: "Completed", value: 18 },
  { name: "Ongoing", value: 6 },
  { name: "Scheduled", value: 6 },
];

const COLORS = [
  "#2563eb", // blue-600
  "#a855f7", // purple-500
  "#ef4444", // red-500
  "#22c55e", // green-500
];

export default function TutorDashboard() {
  const parseMonthYear = (value) => {
    const date = new Date(value);
    return {
      month: date.getMonth() + 1, // 1–12
      year: date.getFullYear(),
    };
  };
  const user = useAuthStore(s => s.user);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const {
    data: upcomingSessionsData,
    isLoading: sessionsLoading,
  } = useUpcomingSessions();

  const sessions = upcomingSessionsData?.data ?? [];

  const currentDate = new Date();

  const formatMonth = (date) =>
    date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

  // ✅ Generate all 12 months of current year
  const generateMonths = () => {
    const year = currentDate.getFullYear();
    return Array.from({ length: 12 }, (_, i) =>
      formatMonth(new Date(year, i))
    );
  };

  const months = generateMonths();

  // ✅ Default → current month
  const [selectedMonth, setSelectedMonth] = useState(formatMonth(currentDate));

  const { month, year } = parseMonthYear(selectedMonth);

  const {
    data: analyticsData,
    isLoading: analyticsLoading,
  } = useTutorAnalytics({ month, year });

  // ✅ API trigger on change
  const handleChange = (value) => {
    setSelectedMonth(value);
  };



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
            <Card title="Total Earnings" value={`₹${analyticsData?.wallet?.totalEarnings.toFixed(2)}`} color="purple" Icon={Wallet} info="From Purchase" />
            <Card title="Total Withdrawn" value={`₹${analyticsData?.wallet?.totalWithdrawn.toFixed(2)}`} color="blue" Icon={Banknote} info="Processed payouts" />
            <Card title="Pending Amount" value={`₹${analyticsData?.wallet?.pendingBalance.toFixed(2)}`} color="red" Icon={Hourglass} info="Awaiting clearance" />
            <Card title="Available Balance" value={`₹${analyticsData?.wallet?.availableBalance.toFixed(2)}`} color="green" Icon={CreditCard} info="Ready to withdraw" />
            <Card title="Total Classes" value={String(analyticsData?.totalClasses).padStart(2, "0")} color="pink" Icon={BookOpen} info="" />
            <Card title="Ongoing Classes" value={String(analyticsData?.ongoingClasses).padStart(2, "0")} color="indigo" Icon={Clock} info="Currently Active" />

            <Card title="Completed Classes" value={String(analyticsData?.completedClasses).padStart(2, "0")} color="teal" Icon={CheckCircle} info="" />
            <Card title="Total Students" value={String(analyticsData?.totalStudents).padStart(2, "0")} color="orange" Icon={GraduationCap} info="Enrolled Students" />

          </>
        )}
      </div>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-semibold">Analytics</h2>
        <select
          value={selectedMonth}
          onChange={(e) => handleChange(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-2">

        {/* LINE CHART */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm col-span-1 md:col-span-2">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-900">
              Earning Overview
            </h2>
          </div>

          <ResponsiveContainer width="95%" height={300}>
            <LineChart data={analyticsData?.earningsOverview}>
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}   // smaller text
                interval="preserveStartEnd" // avoid crowding
              />
              <YAxis
                hide={isMobile}
                width={isMobile ? 0 : 40}
                tick={{ fontSize: 10 }}

              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm col-span-1">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-900">
              Sessions Overview
            </h2>
          </div>

          <div className="flex items-center justify-between px-2">

            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={analyticsData?.sessionOverview}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                >
                  {analyticsData?.sessionOverview?.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="space-y-2 text-sm">
              {analyticsData?.sessionOverview?.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[i] }}
                  />
                  <span className="text-gray-600">
                    {item.name} ({item.value})
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

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

        {/* Top performing classes */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm col-span-1">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-900">
              Top Performing Classes
            </h2>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 p-2 text-sm text-gray-500">

            {analyticsLoading ? (
              <div className="space-y-2">
                <div className="h-16 bg-gray-100 rounded-md animate-pulse" />
                <div className="h-16 bg-gray-100 rounded-md animate-pulse" />
              </div>
            ) : analyticsData?.topClasses?.length > 0 ? (
              analyticsData.topClasses.map((item) => (
                <TopClassCard key={item.id} item={item} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No top classes found
              </p>
            )}
          </div>
        </div>

        {/* Student Feedbacks */}
        <div className="bg-white border border-gray-200 rounded-md shadow-sm col-span-1">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-100 border-b border-gray-100">
            <h2 className="text-md font-semibold text-gray-900">
              Student Feedbacks
            </h2>
          </div>

          <div className="flex flex-col items-center justify-between gap-2 p-2 text-sm text-gray-500">

            {analyticsLoading ? (
              <div className="space-y-2">
                <div className="h-16 bg-gray-100 rounded-md animate-pulse" />
                <div className="h-16 bg-gray-100 rounded-md animate-pulse" />
              </div>
            ) : analyticsData?.studentFeedbacks?.length > 0 ? (
              analyticsData.studentFeedbacks.map((fb) => (
                <FeedbackCard key={fb.id} feedback={fb} />
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No feedback available
              </p>
            )}
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

          <span className="text-xs px-2 py-0.5 rounded-sm bg-blue-100 text-blue-700 font-medium">
            {session?.startTime}
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


function FeedbackCard({ feedback }) {
  const user = feedback?.student?.user;

  // 👉 First name only
  const firstName = user?.name?.split(" ")[0] || "Student";

  return (
    <div className="w-full flex gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition">

      {/* Avatar */}
      <img
        src={user?.avatar || "/default-avatar.png"}
        alt={firstName}
        className="w-9 h-9 rounded-full object-cover"
      />

      {/* Right Content */}
      <div className="flex-1 min-w-0">

        {/* Row 1: Name + Class | Stars */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate max-w-[90px]">
              {firstName}
            </p>

            <span className="text-xs text-blue-600 truncate max-w-[120px]">
              {feedback?.klass?.title}
            </span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: feedback.rating }).map((_, i) => (
              <Star key={i} size={13} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Row 2: Review | Date */}
        <div className="flex items-start justify-between gap-2 mt-0.5">

          {/* Review */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-tight flex-1 truncate max-w-[220px]">
            {feedback?.reviewText}
          </p>

          {/* Date */}
          <p className="text-[11px] text-gray-400 whitespace-nowrap">
            {new Date(feedback.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}


function TopClassCard({ item }) {
  return (
    <div className="w-full flex gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:shadow-sm transition">

      {/* Preview Image */}
      <img
        src={item.previewImage}
        alt={item.title}
        className="w-10 h-10 rounded-md object-cover"
      />

      {/* Content */}
      <div className="flex-1 min-w-0">

        {/* Row 1: Title + Rating */}
        <div className="flex items-center justify-between">

          <p className="text-sm font-medium text-gray-800 truncate max-w-[140px]">
            {item.title}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-yellow-500">
            {Array.from({ length: Math.round(item.avgRating) }).map((_, i) => (
              <Star key={i} size={13} fill="currentColor" />
            ))}
          </div>
        </div>

        {/* Row 2: Reviews + Avg */}
        <div className="flex items-center justify-between mt-1 text-xs text-gray-500">

          <p>
            {item.totalReviews} review
            {item.totalReviews > 1 ? "s" : ""}
          </p>

          <p className="font-medium text-gray-700">
            {item.avgRating.toFixed(1)}
          </p>
        </div>
      </div>
    </div>
  );
}