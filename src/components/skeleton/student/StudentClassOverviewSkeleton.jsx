export default function StudentClassOverviewSkeleton() {
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

            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2">
                <div className="h-7 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-200 rounded" />
                <div className="h-7 w-24 bg-gray-200 rounded" />
            </div>

            <div className="space-y-4 animate-pulse">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">

                    {/* Sessions */}
                    <div className="bg-white border rounded-md shadow-sm">
                        <div className="px-3 py-2 bg-gray-100 border-b">
                            <div className="h-4 w-40 bg-gray-200 rounded" />
                            {/* <div className="h-4 w-20 bg-gray-200 rounded" /> */}
                        </div>

                        <div className="p-2 space-y-2">
                            <SessionCardSkeleton />
                            <SessionCardSkeleton />
                            <SessionCardSkeleton />
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-white border rounded-md shadow-sm">
                        <div className="px-3 py-2 bg-gray-100 border-b">
                            <div className="h-4 w-36 bg-gray-200 rounded" />
                        </div>

                        <div className="p-2 space-y-2">
                            <ResourceCardSkeleton />
                            <ResourceCardSkeleton />
                            <ResourceCardSkeleton />
                        </div>
                    </div>

                    {/* Assignments */}
                    <div className="bg-white border rounded-md shadow-sm">
                        <div className="px-3 py-2 bg-gray-100 border-b">
                            <div className="h-4 w-36 bg-gray-200 rounded" />
                        </div>

                        <div className="p-2 space-y-2">
                            <AssignmentCardSkeleton />
                            <AssignmentCardSkeleton />
                            <AssignmentCardSkeleton />
                        </div>
                    </div>

                </div>

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


export function SessionCardSkeleton() {
    return (
        <div className="bg-white border rounded-md px-2 py-2 flex items-center gap-2">

            {/* Date box */}
            <div className="w-14 shrink-0 rounded-md bg-gray-200 h-12" />

            {/* Content */}
            <div className="flex-1 space-y-2">
                <div className="h-3 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
            </div>

            {/* Button */}
            <div className="w-14 h-7 bg-gray-200 rounded-md" />
        </div>
    );
}


export function ResourceCardSkeleton() {
    return (
        <div className="bg-white border rounded-md px-2 py-2.5 flex items-center gap-2">

            {/* icon */}
            <div className="w-10 h-10 rounded-md bg-gray-200 shrink-0" />

            {/* text */}
            <div className="flex-1 space-y-2">
                <div className="h-3 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>

            {/* view button */}
            <div className="w-12 h-7 bg-gray-200 rounded-md" />
        </div>
    );
}


export function AssignmentCardSkeleton() {
    return (
        <div className="bg-white border rounded-md px-2 py-2 flex items-center gap-2">

            {/* due date */}
            <div className="w-12 h-12 rounded-md bg-gray-200 shrink-0" />

            {/* text */}
            <div className="flex-1 space-y-2">
                <div className="h-3 w-44 bg-gray-200 rounded" />
                <div className="h-3 w-28 bg-gray-200 rounded" />
            </div>

            {/* button */}
            <div className="w-12 h-7 bg-gray-200 rounded-md" />
        </div>
    );
}