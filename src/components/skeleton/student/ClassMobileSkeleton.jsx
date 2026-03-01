export function ClassesMobileSkeleton() {
  return (
    <div className="md:hidden space-y-4 animate-pulse">

      <ClassCardSkeleton />
      <ClassCardSkeleton />
      <ClassCardSkeleton />
      <ClassCardSkeleton />
      <ClassCardSkeleton />

      {/* pagination skeleton */}
      <div className="flex items-center justify-between gap-2 p-3 border-t text-sm">
        <div className="h-4 w-32 bg-gray-200 rounded" />

        <div className="flex gap-2">
          <div className="h-8 w-16 bg-gray-200 rounded" />
          <div className="h-8 w-16 bg-gray-200 rounded" />
        </div>
      </div>

    </div>
  );
}


function ClassCardSkeleton() {
  return (
    <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">

      {/* left status strip */}
      <div className="absolute top-0 left-0 h-full w-1.5 bg-gray-200" />

      <div className="flex flex-col sm:flex-row">

        {/* thumbnail */}
        <div className="relative w-full sm:w-44 h-40 sm:h-auto bg-gray-200 shrink-0" />

        {/* content */}
        <div className="flex-1 p-4 space-y-3">

          {/* title + badges */}
          <div className="space-y-2">
            <div className="h-5 w-3/4 bg-gray-200 rounded" />
            <div className="flex gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>

          {/* meta info grid */}
          <div className="grid grid-cols-2 gap-y-2 pt-2">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded ml-auto" />

            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-24 bg-gray-200 rounded ml-auto" />
          </div>

        </div>
      </div>
    </div>
  );
}