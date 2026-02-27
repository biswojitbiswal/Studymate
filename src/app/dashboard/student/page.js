"use client";

import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { MdExplore } from "react-icons/md";

export default function StudentDashboardPage() {
  const user = useAuthStore((s) => s.user);

  return (
    <div>
      <h1 className="text-xl font-semibold">Student Dashboard</h1>
      <p>Welcome, {user?.name ?? user?.email ?? "Student"}.</p>
      <Link
        href="/classes"
        className="
        md:hidden
        fixed right-3 bottom-18
        flex items-center gap-2
        text-blue-600 p-1 bg-gray-100 rounded-full
        shadow-lg
        transition-all duration-200
        z-50
      "
      >
        <MdExplore size={44} />
        {/* <span className="text-sm font-medium">Explore</span> */}
      </Link>
    </div>
  );
}
