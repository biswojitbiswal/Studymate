"use client";

import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, GraduationCap, Star, Users } from "lucide-react";

const STATIC_HOURLY_RATE = 800;

export default function TutorCard({ tutor }) {
  const initials = tutor.name?.split(" ").map((part) => part[0]).join("").slice(0, 2) || "T";
  const subjects = toStringArray(tutor.subjects);

  return (
    <article className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all hover:border-blue-100 hover:shadow-lg sm:flex-row sm:items-center">
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full bg-blue-100">
        {tutor.avatar ? <Image src={tutor.avatar} alt={tutor.name || "Tutor"} fill className="object-cover" sizes="112px" /> : <span className="flex h-full items-center justify-center text-2xl font-bold text-blue-700">{initials}</span>}
        <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" aria-label="Tutor is active" />
      </div>

      <div className="min-w-0 flex-1">
        <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
          <BadgeCheck className="h-3.5 w-3.5" /> Verified tutor
        </span>
        <div className="flex min-w-0 items-center gap-1.5">
          <h2 className="truncate text-xl font-bold text-slate-950">{tutor.name}</h2>
          <span className="shrink-0" title="Verified tutor" aria-label="Verified tutor">
            <BadgeCheck className="h-5 w-5 fill-blue-600 text-white" />
          </span>
        </div>
        {tutor.title && <p className="mt-1 font-medium text-slate-700">{tutor.title}</p>}

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
          <TutorMetric icon={GraduationCap} iconClassName="text-slate-400" value={`${tutor.yearsOfExp ?? 0}+ years exp.`} />
          <TutorMetric icon={Users} iconClassName="text-blue-500" value={`${tutor.totalStudents ?? 0} students`} />
        </div>
        <div className="mt-2 inline-flex items-center gap-1.5 text-sm">
          <Star className="h-5 w-5 fill-current text-amber-500" />
          <span className="font-bold text-amber-600">{Number(tutor.rating ?? 0).toFixed(1)}</span>
          <span className="text-slate-500">({tutor.totalReviews ?? 0} reviews)</span>
        </div>

        <div className="mt-3">
          {subjects.length > 0 && <TutorTags
            values={subjects}
            limit={3}
            chipClassName="border-blue-600 bg-white text-blue-700"
          />}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:w-38 sm:flex-col sm:items-stretch sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <p className="whitespace-nowrap text-xl font-bold text-slate-950">₹{STATIC_HOURLY_RATE}<span className="text-xs font-normal text-slate-500"> / hour</span></p>
        <Link href={`/tutors/${tutor.id}`} className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-lg border border-blue-600 px-4 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white">View profile</Link>
      </div>
    </article>
  );
}

function TutorMetric({ icon: Icon, iconClassName, value }) {
  return <span className="inline-flex min-w-0 items-center gap-1.5 whitespace-nowrap">
    <Icon className={`h-4 w-4 shrink-0 ${iconClassName}`} />
    <span className="truncate">{value}</span>
  </span>;
}

function TutorTags({ values, limit = values.length, chipClassName }) {
  const visibleValues = values.slice(0, limit);
  const remaining = values.length - visibleValues.length;

  return <div className="flex min-w-0 flex-wrap gap-1.5" aria-label="Tutor subjects">
      {visibleValues.map((value, index) => <span
        key={`${value}-${index}`}
        className={`inline-flex max-w-full rounded-md border px-2 py-1 text-xs font-medium ${chipClassName}`}
      >
        <span className="truncate">{value}</span>
      </span>)}
      {remaining > 0 && <span className="inline-flex rounded-md border border-blue-600 bg-blue-600 px-2 py-1 text-xs font-semibold text-white">+{remaining}</span>}
  </div>;
}

function toStringArray(value) {
  if (Array.isArray(value)) {
    return value.filter((item) => typeof item === "string" && item.trim());
  }

  return typeof value === "string" && value.trim() ? [value] : [];
}
