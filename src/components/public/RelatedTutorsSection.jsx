"use client";

import Link from "next/link";
import { ArrowRight, Star, Users } from "lucide-react";
import { useBrowseTutors } from "@/hooks/public/useTutor";

function initials(name) {
  return (name || "Tutor").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
}

export default function RelatedTutorsSection({ subjectId, excludeId, title = "Related tutors" }) {
  const { data, isLoading, isError } = useBrowseTutors({ subjectId, page: 1, limit: 5 });
  const tutors = (data?.data ?? []).filter((tutor) => tutor.id !== excludeId).slice(0, 4);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-600">More experts</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">{title}</h2>
        </div>
        <Link href="/tutors" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-52 animate-pulse rounded-xl bg-slate-100" />)}
        </div>
      ) : isError ? (
        <p className="rounded-xl bg-red-50 p-5 text-sm text-red-700">Related tutors could not be loaded.</p>
      ) : tutors.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No other tutors are available for this subject yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tutors.map((tutor) => (
            <Link key={tutor.id} href={`/tutors/${tutor.slug}`} className="group rounded-xl border border-slate-200 p-5 text-center transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
              {tutor.avatar ? (
                <img src={tutor.avatar} alt={tutor.name} className="mx-auto h-16 w-16 rounded-full object-cover" />
              ) : (
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">{initials(tutor.name)}</span>
              )}
              <h3 className="mt-3 truncate font-bold text-slate-900">{tutor.name}</h3>
              <p className="mt-1 line-clamp-1 text-sm text-slate-500">{tutor.title || tutor.subjects?.join(", ")}</p>
              <div className="mt-3 flex items-center justify-center gap-3 text-xs text-slate-600">
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{Number(tutor.rating || 0).toFixed(1)}</span>
                <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{tutor.totalStudents || 0}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
