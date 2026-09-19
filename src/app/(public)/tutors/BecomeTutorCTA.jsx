"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth";

export default function BecomeTutorCTA() {
  const user = useAuthStore((state) => state.user);

  if (user?.role === "STUDENT" && user?.signupIntent === "STUDENT") {
    return <section className="mt-10 rounded-2xl border border-blue-200 bg-blue-50 px-6 py-8 text-center sm:px-10"><h2 className="text-2xl font-bold text-slate-900">Tutor accounts are separate</h2><p className="mx-auto mt-2 max-w-xl text-slate-600">Your student account cannot apply as a tutor. Register a separate tutor account with a different email address if you want to teach.</p></section>;
  }

  const href = user?.role === "TUTOR" ? "/dashboard/tutor" : user ? "/tutor-apply" : "/signup";
  const label = user?.role === "TUTOR" ? "Tutor dashboard" : user ? "Application status" : "Create a tutor account";

  return <section className="mt-10 rounded-2xl bg-blue-600 px-6 py-8 text-center text-white sm:px-10"><h2 className="text-2xl font-bold">Want to teach on StudyMate?</h2><p className="mx-auto mt-2 max-w-xl text-blue-100">Share your knowledge, set your schedule, and help students reach their goals.</p><Link href={href} className="mt-5 inline-flex rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50">{label}</Link></section>;
}
