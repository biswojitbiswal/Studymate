export function ResourceListSkeleton({ count = 6 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <ResourceCardSkeleton key={i} />
      ))}
    </div>
  );
}


export function ResourceCardSkeleton() {
  return (
    <div className="bg-white border rounded-md px-1.5 lg:px-3 py-2 flex items-center gap-3 animate-pulse">

      {/* Icon */}
      <div className="w-10 h-10 shrink-0 rounded-md bg-blue-100 flex items-center justify-center">
        <div className="w-4 h-4 bg-blue-300 rounded"></div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1.5">

        {/* Title + badges */}
        <div className="flex items-center gap-2">

          <div className="h-4 w-32 sm:w-40 bg-gray-200 rounded"></div>

          <div className="h-4 w-10 bg-blue-200 rounded"></div>

          <div className="h-4 w-12 bg-gray-200 rounded"></div>

        </div>

        {/* Description */}
        <div className="h-3 w-52 sm:w-72 bg-gray-200 rounded"></div>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 lg:gap-2">

        <div className="w-8 h-8 rounded-md bg-green-200"></div>

      </div>

    </div>
  );
}