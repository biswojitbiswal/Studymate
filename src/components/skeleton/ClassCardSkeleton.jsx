export const ClassCardSkeleton = () => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4 border border-gray-200 animate-pulse">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-48 h-44 bg-gray-200 rounded-md shrink-0" />

        {/* Details */}
        <div className="flex-1 flex flex-col">
          {/* Title */}
          <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />

          {/* Meta */}
          <div className="flex gap-2 mb-3">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-16 bg-gray-200 rounded" />
          </div>

          {/* Tutor */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-gray-200 rounded mb-1" />
              <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto flex justify-between items-center pt-3 border-t">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-8 w-28 bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};
