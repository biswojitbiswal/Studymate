"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { useBrowseClasses } from "@/hooks/public/useClass";

export default function RelatedClassesSection({ subjectId, tutorId, tutorSlug, excludeId, title = "Related classes", viewAllHref = "/classes" }) {
  const { data, isLoading, isError } = useBrowseClasses({
    subjectIds: subjectId ? [subjectId] : undefined,
    tutorId,
    tutorSlug,
    page: 1,
    limit: excludeId ? 5 : 4,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const classes = (data?.data?.items ?? []).filter((item) => item.id !== excludeId).slice(0, 4);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-blue-600">Keep learning</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">{title}</h2>
        </div>
        <Link href={viewAllHref} className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
          View all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-64 animate-pulse rounded-xl bg-slate-100" />)}
        </div>
      ) : isError ? (
        <p className="rounded-xl bg-red-50 p-5 text-sm text-red-700">Related classes could not be loaded.</p>
      ) : classes.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No other published classes are available yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((item) => (
            <Link key={item.id} href={`/classes/${item.seo_name}`} className="group overflow-hidden rounded-xl border border-slate-200 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
              <div className="h-36 overflow-hidden bg-slate-100">
                <img src={item.previewImg || "/Logo.png"} alt={item.title} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">{item.subject?.name}</p>
                <h3 className="mt-1 line-clamp-2 font-bold text-slate-900">{item.title}</h3>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{item.totalEnrolment || 0}</span>
                  <span className="font-bold text-slate-900">₹{Number(item.price || 0).toFixed(0)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
