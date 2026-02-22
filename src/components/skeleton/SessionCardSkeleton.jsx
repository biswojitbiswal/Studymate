export default function SessionCardSkeleton() {
  return (
    <div className="relative bg-white border rounded-xl px-2 py-3 lg:px-4 sm:py-2 animate-pulse">

      {/* Main container */}
      <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-2 w-full lg:w-auto">

          {/* Date Box */}
          <div className="w-14 shrink-0 rounded-md bg-blue-50 text-center py-3 lg:py-2 space-y-2">
            <div className="h-3 w-8 mx-auto bg-blue-200 rounded"></div>
            <div className="h-5 w-6 mx-auto bg-blue-300 rounded"></div>
          </div>

          {/* Info Block */}
          <div className="flex-1 min-w-0 space-y-2">

            {/* Title + tags */}
            <div className="flex items-center gap-2">
              <div className="h-4 w-40 sm:w-52 bg-gray-200 rounded"></div>
              <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
              <div className="h-5 w-14 bg-gray-200 rounded"></div>
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-2">
              <div className="h-5 w-12 bg-blue-200 rounded-full"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center w-full gap-2 sm:justify-end">

          {/* Status */}
          <div className="w-full sm:w-28 h-9 bg-green-200 rounded-md"></div>

          {/* Join Button */}
          <div className="w-full sm:w-28 h-9 bg-blue-300 rounded-md"></div>

          {/* 3 Dot Menu */}
          <div className="w-8 h-10 bg-blue-300 rounded-md shrink-0"></div>
        </div>

      </div>
    </div>
  );
}