export default function ClassCardSkeleton() {
    return (
        <div className="md:hidden space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm animate-pulse">

                    {/* status strip */}
                    <div className="absolute top-0 left-0 h-full w-1.5 rounded-l-2xl bg-gray-200" />

                    {/* header */}
                    <div className="flex justify-between items-start gap-3">
                        <div className="space-y-2 flex-1">
                            <div className="h-4 w-40 bg-gray-200 rounded" />
                            <div className="flex gap-2">
                                <div className="h-5 w-16 bg-gray-200 rounded" />
                                <div className="h-5 w-20 bg-gray-200 rounded" />
                                <div className="h-5 w-20 bg-gray-200 rounded" />
                            </div>
                        </div>

                        <div className="h-5 w-16 bg-gray-200 rounded" />
                    </div>

                    {/* meta info */}
                    <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                        <div className="h-3 w-20 bg-gray-200 rounded" />
                        <div className="h-3 w-24 bg-gray-200 rounded ml-auto" />

                        <div className="h-3 w-20 bg-gray-200 rounded" />
                        <div className="h-3 w-24 bg-gray-200 rounded ml-auto" />

                        <div className="h-3 w-20 bg-gray-200 rounded" />
                        <div className="h-3 w-16 bg-gray-200 rounded ml-auto" />
                    </div>

                    {/* publish toggle */}
                    {/* <div className="flex items-center justify-between mt-4 pt-3 border-t">
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-6 w-11 bg-gray-200 rounded-full" />
                    </div> */}

                    {/* buttons */}
                    <div className="flex gap-2 mt-4">
                        <div className="h-9 flex-1 bg-gray-200 rounded-md" />
                        <div className="h-9 flex-1 bg-gray-200 rounded-md" />
                        <div className="h-9 w-20 bg-gray-200 rounded-md" />
                    </div>

                </div>
            ))}
        </div>

    );
}