function Line({ className = "" }) {
  return <div className={`rounded bg-slate-200 ${className}`} />;
}

function ProfileSectionSkeleton({ children }) {
  return (
    <section className="mt-7">
      <Line className="h-4 w-24" />
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ContentSectionSkeleton({ itemHeight = "h-40" }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <Line className="h-4 w-24" />
      <Line className="mt-2 h-7 w-52 max-w-full" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className={`${itemHeight} rounded-xl bg-slate-100`} />
        ))}
      </div>
    </section>
  );
}

export default function TutorDetailsSkeleton() {
  return (
    <main
      className="min-h-screen animate-pulse bg-slate-50 px-4 pb-16 pt-28"
      role="status"
      aria-label="Loading tutor profile"
    >
      <div className="mx-auto max-w-5xl">
        <Line className="mb-5 h-5 w-32" />

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-32 w-32 shrink-0 rounded-full bg-slate-200" />

              <div className="min-w-0 flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <Line className="h-9 w-60 max-w-[65%]" />
                  <div className="h-8 w-20 rounded-lg bg-slate-100" />
                </div>
                <Line className="h-5 w-44" />
                <Line className="h-4 w-40" />
                <div className="flex flex-wrap gap-3">
                  <Line className="h-4 w-20" />
                  <Line className="h-4 w-24" />
                  <Line className="h-4 w-20" />
                </div>
              </div>
            </header>

            <div className="my-7 h-px bg-slate-200" />

            <ProfileSectionSkeleton>
              <div className="space-y-2">
                <Line className="h-4 w-full" />
                <Line className="h-4 w-11/12" />
                <Line className="h-4 w-3/4" />
              </div>
            </ProfileSectionSkeleton>

            <ProfileSectionSkeleton>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-24 rounded-full bg-slate-200" />
                <div className="h-8 w-28 rounded-full bg-slate-200" />
                <div className="h-8 w-20 rounded-full bg-slate-200" />
              </div>
            </ProfileSectionSkeleton>

            <ProfileSectionSkeleton>
              <div className="flex flex-wrap gap-2">
                <div className="h-8 w-20 rounded-full bg-slate-200" />
                <div className="h-8 w-24 rounded-full bg-slate-200" />
              </div>
            </ProfileSectionSkeleton>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div key={index} className="h-24 rounded-xl bg-slate-100" />
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <Line className="h-3 w-20" />
                <Line className="h-7 w-32" />
              </div>
              <div className="h-11 w-full rounded-lg bg-slate-200 sm:w-36" />
            </div>
          </div>
        </article>

        <div className="mt-7 space-y-7">
          <ContentSectionSkeleton />
          <ContentSectionSkeleton itemHeight="h-56" />
          <ContentSectionSkeleton itemHeight="h-48" />
        </div>
      </div>

      <span className="sr-only">Loading tutor profile…</span>
    </main>
  );
}
