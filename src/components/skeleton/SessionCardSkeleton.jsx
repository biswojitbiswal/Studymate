export default function SessionCardSkeleton() {
    return (
        <div className="bg-white border rounded-lg px-4 py-3 flex items-center gap-4 animate-pulse">

            {/* Date Box */}
            <div className="w-14 shrink-0 rounded-md bg-blue-50 text-center py-2 space-y-2">
                <div className="h-3 bg-blue-200 rounded w-8 mx-auto"></div>
                <div className="h-5 bg-blue-300 rounded w-6 mx-auto"></div>
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0 space-y-2">

                {/* Title */}
                <div className="h-4 bg-gray-200 rounded w-48"></div>

                {/* Tags row */}
                <div className="flex items-center gap-2">
                    <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                </div>

                {/* Meta info */}
                <div className="flex items-center gap-4">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-3">
                <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
                <div className="h-8 w-16 bg-blue-200 rounded-md"></div>
            </div>
        </div>
    );
}
