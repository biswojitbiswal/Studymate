export default function ClassLayoutSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">

            {/* Header */}
            <div className="bg-blue-500/80 p-4 rounded-xl text-white">
                <div className="flex items-center gap-3">

                    {/* Back Button */}
                    <div className="h-9 w-24 bg-white/30 rounded-lg" />

                    {/* Title + subtitle */}
                    <div className="flex flex-col gap-2">
                        <div className="h-6 w-64 bg-white/40 rounded" />
                        <div className="h-4 w-40 bg-white/30 rounded" />
                    </div>

                </div>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap gap-3 mt-3">
                <div className="h-10 w-28 bg-gray-200 rounded-md" />
                <div className="h-10 w-28 bg-gray-200 rounded-md" />
                <div className="h-10 w-28 bg-gray-200 rounded-md" />
            </div>

            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2">
                <div className="h-7 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-200 rounded" />
            </div>

            {/* Page Content */}
            {/* <div className="space-y-3">
        <div className="h-24 bg-gray-200 rounded-lg" />
        <div className="h-24 bg-gray-200 rounded-lg" />
        <div className="h-24 bg-gray-200 rounded-lg" />
      </div> */}
            <div className="space-y-4 animate-pulse">

                {/* Schedule + Preview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Schedule Card */}
                    <div className="lg:col-span-2 bg-white border rounded-xl p-5 space-y-4">
                        <div className="h-6 w-52 bg-gray-200 rounded" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                            {/* Column 1 */}
                            <div className="space-y-3">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-40 bg-gray-200 rounded" />
                                <div className="h-3 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-28 bg-gray-200 rounded" />
                            </div>

                            {/* Column 2 */}
                            <div className="space-y-3">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-36 bg-gray-200 rounded" />
                                <div className="h-3 w-36 bg-gray-200 rounded" />
                            </div>

                            {/* Column 3 */}
                            <div className="space-y-3">
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                                <div className="h-3 w-36 bg-gray-200 rounded" />
                                <div className="h-3 w-36 bg-gray-200 rounded" />
                            </div>

                        </div>
                    </div>

                    {/* Preview Card */}
                    <div className="bg-white border rounded-xl p-2 lg:p-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <div className="h-44 w-full bg-gray-200 rounded-lg" />
                            <div className="h-44 w-full bg-gray-200 rounded-lg" />

                        </div>
                    </div>

                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="h-20 bg-gray-200 rounded-xl" />
                    <div className="h-20 bg-gray-200 rounded-xl" />
                    <div className="h-20 bg-gray-200 rounded-xl" />
                    <div className="h-20 bg-gray-200 rounded-xl" />
                </div>

                {/* Description */}
                <div className="bg-white border rounded-xl p-5 space-y-3">
                    <div className="h-5 w-44 bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-4/5 bg-gray-200 rounded" />
                    <div className="h-3 w-3/5 bg-gray-200 rounded" />
                </div>

                {/* Syllabus */}
                <div className="bg-white border rounded-xl p-5 space-y-3">
                    <div className="h-5 w-28 bg-gray-200 rounded" />
                    <div className="space-y-2">
                        <div className="h-3 w-5/6 bg-gray-200 rounded" />
                        <div className="h-3 w-3/4 bg-gray-200 rounded" />
                        <div className="h-3 w-2/3 bg-gray-200 rounded" />
                        <div className="h-3 w-1/2 bg-gray-200 rounded" />
                    </div>
                </div>

            </div>

        </div>
    );
}