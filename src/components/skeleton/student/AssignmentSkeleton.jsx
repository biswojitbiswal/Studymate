export function AssignmentCardSkeleton() {
  return (
    <div className="flex items-center justify-between bg-white border rounded-md gap-2 px-2 sm:px-3 lg:px-4 py-2 shadow-sm animate-pulse">

      {/* Checkbox */}
      <div className="w-6 h-6 bg-gray-200 rounded" />

      {/* Left Side */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  
        <div className="flex flex-col gap-1.5 w-full">

          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-[60%] sm:w-[180px] lg:w-[250px]" />

          {/* Due badge */}
          <div className="h-3 bg-gray-200 rounded w-[80px] sm:w-[110px] lg:w-[140px]" />

        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">

        {/* Status */}
        <div className="hidden sm:block w-20 lg:w-28 h-6 bg-gray-200 rounded-md" />

        {/* View button */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-md" />

      </div>

    </div>
  );
}


export function AssignmentDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-3 animate-pulse">

      {/* Assignment Info */}
      <div className="bg-white border rounded-lg py-3 px-5 space-y-2">

        <div className="h-6 w-[60%] bg-gray-200 rounded"></div>

        <div className="h-4 w-[80%] bg-gray-200 rounded"></div>

        <div className="h-4 w-[140px] bg-gray-200 rounded"></div>

      </div>


      {/* Progress Summary */}
      <div className="grid grid-cols-3 gap-4">

        {[1,2,3].map((i) => (
          <div
            key={i}
            className="bg-gray-50 border rounded-lg py-2 px-4 text-center space-y-2"
          >
            <div className="h-6 w-10 mx-auto bg-gray-200 rounded"></div>
            <div className="h-4 w-16 mx-auto bg-gray-200 rounded"></div>
          </div>
        ))}

      </div>


      {/* Student List */}
      <div className="bg-white border rounded-lg divide-y">

        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4"
          >

            {/* Left */}
            <div className="flex items-center gap-3">

              <div className="w-9 h-9 rounded-full bg-gray-200"></div>

              <div className="h-4 w-[120px] bg-gray-200 rounded"></div>

            </div>


            {/* Right */}
            <div className="flex items-center gap-3">

              <div className="h-6 w-[80px] bg-gray-200 rounded-md"></div>

              <div className="w-8 h-8 bg-gray-200 rounded-md"></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}