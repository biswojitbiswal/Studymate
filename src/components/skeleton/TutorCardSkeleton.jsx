export default function TutorCardSkeleton() {
  return (
    <article className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
      <div className="h-28 w-28 shrink-0 rounded-full bg-slate-200" />

      <div className="min-w-0 flex-1 space-y-3">
        <div className="h-6 w-28 rounded-full bg-slate-100" />
        <div className="h-6 w-2/5 rounded-md bg-slate-200" />
        <div className="h-4 w-1/3 rounded bg-slate-100" />

        <div className="flex flex-wrap gap-5">
          <div className="h-4 w-28 rounded bg-slate-100" />
          <div className="h-4 w-24 rounded bg-slate-100" />
        </div>

        <div className="h-4 w-36 rounded bg-slate-100" />

        <div className="flex gap-2">
          <div className="h-7 w-20 rounded-md bg-slate-100" />
          <div className="h-7 w-24 rounded-md bg-slate-100" />
          <div className="h-7 w-16 rounded-md bg-slate-100" />
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-between gap-4 border-t border-slate-100 pt-4 sm:w-38 sm:flex-col sm:items-stretch sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
        <div className="h-6 w-28 rounded bg-slate-200" />
        <div className="h-10 w-32 rounded-lg bg-slate-200 sm:w-full" />
      </div>
    </article>
  );
}

export function TutorListSkeleton({ count = 4 }) {
  return (
    <div
      className="animate-pulse space-y-4"
      role="status"
      aria-label="Loading tutors"
    >
      {Array.from({ length: count }, (_, index) => (
        <TutorCardSkeleton key={index} />
      ))}
      <span className="sr-only">Loading tutors…</span>
    </div>
  );
}
