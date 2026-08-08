"use client";

import Image from "next/image";
import { Award, GraduationCap, Star, Users } from "lucide-react";

export default function TutorCard({ tutor }) {
  const initials = tutor.name?.split(" ").map((part) => part[0]).join("").slice(0, 2) || "T";
  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center">
      <div className="relative h-30 w-30 shrink-0 overflow-hidden rounded-full bg-blue-100 sm:h-28 sm:w-28">
        {tutor.avatar ? <Image src={tutor.avatar} alt={tutor.name || "Tutor"} fill className="object-cover" sizes="112px" /> : <span className="flex h-full items-center justify-center text-2xl font-bold text-blue-700">{initials}</span>}
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h2 className="truncate text-xl font-bold text-slate-950">{tutor.name}</h2>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700"><Award className="h-3 w-3" /> Verified tutor</span>
          </div>
        {tutor.title && <p className="font-medium text-slate-700">{tutor.title}</p>}
        {/* {tutor.qualification && <p className="mt-1 text-sm text-slate-500">{tutor.qualification}</p>} */}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span className="inline-flex items-center gap-1.5"><GraduationCap className="h-4 w-4 text-slate-400" />{tutor.yearsOfExp ?? 0}+ years experience</span>
          <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-slate-400" />{tutor.totalStudents ?? 0} students</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-600"><Star className="h-4 w-4 fill-current" />{Number(tutor.rating ?? 0).toFixed(1)}</span>
        </div>
        {/* {tutor.bio && <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{tutor.bio}</p>} */}
      </div>
    </article>
  );
}
