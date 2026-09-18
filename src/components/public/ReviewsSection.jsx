"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, MessageSquareText, Star } from "lucide-react";
import { useBrowseReviews } from "@/hooks/public/useReview";

const PAGE_SIZE = 6;

function initials(name) {
  return (name || "Student")
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function ReviewsSection({ classId, tutorId, rating = 0, title = "Student reviews" }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, refetch } = useBrowseReviews({
    classId,
    tutorId,
    page,
    limit: PAGE_SIZE,
  });

  const reviews = data?.reviews ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-blue-600">Feedback</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-950">{title}</h2>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <span className="font-bold text-slate-900">{Number(rating || 0).toFixed(1)}</span>
          <span>({total} {total === 1 ? "review" : "reviews"})</span>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">Reviews could not be loaded.</p>
          <button onClick={() => refetch()} className="mt-3 text-sm font-semibold text-red-700 underline">
            Try again
          </button>
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 px-6 py-10 text-center">
          <MessageSquareText className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-3 font-semibold text-slate-800">No reviews yet</p>
          <p className="mt-1 text-sm text-slate-500">The first student review will appear here.</p>
        </div>
      ) : (
        <>
          <div className={`grid gap-4 md:grid-cols-2 ${isFetching ? "opacity-60" : ""}`}>
            {reviews.map((review) => {
              const student = review.student?.user;
              return (
                <article key={review.id} className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
                  <div className="flex items-center gap-3">
                    {student?.avatar ? (
                      <img src={student.avatar} alt={student.name || "Student"} className="h-11 w-11 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                        {initials(student?.name)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-slate-900">{student?.name || "Student"}</p>
                      <p className="text-xs text-slate-500">
                        {new Date(review.createdAt).toLocaleDateString(undefined, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-slate-800">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {review.rating}
                    </div>
                  </div>
                  <p className="mt-4 whitespace-pre-line text-sm leading-6 text-slate-700">
                    {review.reviewText || "The student left a rating without a written review."}
                  </p>
                </article>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5">
              <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page === 1 || isFetching}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  className="rounded-lg border border-slate-300 p-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous reviews page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  disabled={page === totalPages || isFetching}
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  className="rounded-lg border border-slate-300 p-2 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next reviews page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
