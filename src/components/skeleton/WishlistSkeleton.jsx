export function WishlistSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-md border border-gray-200 p-3 sm:p-4 shadow-sm"
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

            {/* Thumbnail Skeleton */}
            <div className="w-full sm:w-36 h-44 sm:h-28 bg-gray-200 animate-pulse rounded-md" />

            {/* Content */}
            <div className="flex flex-col flex-1">

              {/* Top */}
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 space-y-2">

                  {/* Title */}
                  <div className="h-4 sm:h-5 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />

                  {/* Subject */}
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/3 animate-pulse mt-2" />
                </div>

                {/* Heart Icon */}
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse shrink-0" />
              </div>

              {/* Tutor */}
              <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-24 animate-pulse" />
              </div>

              {/* Bottom */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-4">

                {/* Price */}
                <div className="h-4 sm:h-5 bg-gray-200 rounded w-16 animate-pulse" />

                {/* Button */}
                <div className="h-9 w-full sm:w-28 bg-gray-200 rounded-md animate-pulse" />
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}