// import React from 'react';

// export default function ClassDetailsSkeleton() {
//     return (
//         <div className="min-h-screen px-4 lg:px-22 py-25 pb-32 lg:pb-8 bg-gradient-to-b from-gray-50 to-white">
//             {/* Header Section */}
//             <div className="relative bg-white overflow-hidden mb-4">
//                 {/* Subtle Background Accent */}
//                 <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-100 to-transparent rounded-md"></div>

//                 <div className="relative max-w-7xl mx-auto px-2 lg:px-6 py-6 animate-pulse">
//                     <div className="grid lg:grid-cols-2 gap-4 items-start">
//                         {/* Left: Class Info */}
//                         <div className="space-y-3">
//                             {/* Badge Skeleton */}
//                             <div className="inline-flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full w-32 h-8"></div>

//                             {/* Title Skeleton */}
//                             <div className="space-y-2">
//                                 <div className="h-10 lg:h-12 bg-gray-200 rounded-md w-full"></div>
//                                 <div className="h-10 lg:h-12 bg-gray-200 rounded-md w-3/4"></div>
//                             </div>

//                             {/* Meta Info Skeleton */}
//                             <div className="flex flex-wrap gap-4 pt-2">
//                                 <div className="h-4 w-24 bg-gray-200 rounded"></div>
//                                 <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
//                                 <div className="h-4 w-20 bg-gray-200 rounded"></div>
//                                 <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
//                                 <div className="h-4 w-16 bg-gray-200 rounded"></div>
//                             </div>

//                             {/* Quick Stats Skeleton */}
//                             <div className="grid grid-cols-3 gap-4 pt-4">
//                                 {[1, 2, 3].map((i) => (
//                                     <div key={i} className="bg-gray-100 border border-gray-200 rounded-xl p-4">
//                                         <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
//                                         <div className="h-6 w-12 bg-gray-300 rounded"></div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Right: Video Preview Skeleton */}
//                         <div className="relative">
//                             <div className="relative bg-gray-300 rounded-2xl overflow-hidden h-64 border-2 border-gray-200">
//                                 {/* Play button skeleton */}
//                                 <div className="absolute inset-0 flex items-center justify-center">
//                                     <div className="w-20 h-20 bg-gray-400 rounded-full"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto py-4">
//                 <div className="grid lg:grid-cols-[1fr_380px] gap-10">
//                     {/* Left Content */}
//                     <div className="space-y-2 lg:space-y-4 animate-pulse">
//                         {/* What You'll Learn Skeleton */}
//                         <section className="bg-white rounded-md border border-gray-200 p-4 lg:p-8 shadow-sm">
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
//                                 <div className="h-6 w-48 bg-gray-200 rounded"></div>
//                             </div>

//                             <div className="grid sm:grid-cols-2 gap-4">
//                                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                                     <div key={i} className="flex items-start gap-3">
//                                         <div className="w-5 h-5 bg-gray-200 rounded-full shrink-0 mt-0.5"></div>
//                                         <div className="h-4 bg-gray-200 rounded flex-1"></div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* About This Class Skeleton */}
//                         <section className="bg-white rounded-md border border-gray-200 p-4 lg:p-8 shadow-sm">
//                             <div className="flex items-center gap-3 mb-6">
//                                 <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
//                                 <div className="h-6 w-48 bg-gray-200 rounded"></div>
//                             </div>

//                             <div className="space-y-2">
//                                 <div className="h-4 bg-gray-200 rounded w-full"></div>
//                                 <div className="h-4 bg-gray-200 rounded w-full"></div>
//                                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//                             </div>
//                         </section>

//                         {/* Schedule & Timing Skeleton */}
//                         <section className="bg-white rounded-md border border-gray-200 p-5">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
//                                 <div className="h-5 w-40 bg-gray-200 rounded"></div>
//                             </div>

//                             <div className="grid grid-cols-2 gap-3">
//                                 {[1, 2, 3, 4].map((i) => (
//                                     <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
//                                         <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>
//                                         <div className="h-4 w-24 bg-gray-300 rounded"></div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>

//                         {/* Tutor Details Skeleton */}
//                         <section className="bg-white rounded-md border border-gray-200 p-5">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
//                                 <div className="h-5 w-40 bg-gray-200 rounded"></div>
//                             </div>

//                             <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                                 <div className="flex items-start gap-4">
//                                     {/* Avatar Skeleton */}
//                                     <div className="w-14 h-14 bg-gray-300 rounded-full shrink-0"></div>

//                                     {/* Info Skeleton */}
//                                     <div className="flex-1 space-y-2">
//                                         <div className="h-5 w-32 bg-gray-200 rounded"></div>
//                                         <div className="flex gap-3">
//                                             <div className="h-3 w-16 bg-gray-200 rounded"></div>
//                                             <div className="h-3 w-12 bg-gray-200 rounded"></div>
//                                             <div className="h-3 w-20 bg-gray-200 rounded"></div>
//                                         </div>
//                                         <div className="space-y-1">
//                                             <div className="h-3 bg-gray-200 rounded w-full"></div>
//                                             <div className="h-3 bg-gray-200 rounded w-4/5"></div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Stats Skeleton */}
//                                 <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200">
//                                     {[1, 2].map((i) => (
//                                         <div key={i} className="text-center">
//                                             <div className="h-5 w-12 bg-gray-200 rounded mx-auto mb-1"></div>
//                                             <div className="h-3 w-16 bg-gray-200 rounded mx-auto"></div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Contact Button Skeleton */}
//                                 <div className="w-full mt-4 h-10 bg-gray-200 rounded-md"></div>
//                             </div>
//                         </section>

//                         {/* Syllabus Skeleton */}
//                         <section className="bg-white rounded-md border border-gray-200 p-5">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <div className="w-8 h-8 bg-gray-200 rounded-md"></div>
//                                 <div className="h-5 w-32 bg-gray-200 rounded"></div>
//                             </div>

//                             <div className="space-y-2">
//                                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                                     <div
//                                         key={i}
//                                         className="flex items-center gap-3 p-3 rounded-lg border border-gray-200"
//                                     >
//                                         <div className="w-7 h-7 bg-gray-200 rounded-md shrink-0"></div>
//                                         <div className="h-4 bg-gray-200 rounded flex-1"></div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </section>
//                     </div>

//                     {/* Right Sidebar - Sticky Enrollment Card Skeleton (Desktop Only) */}
//                     <aside className="hidden lg:block lg:sticky lg:top-6 h-fit">
//                         <div className="bg-white rounded-md border-2 border-blue-100 shadow-lg overflow-hidden animate-pulse">
//                             {/* Price Header Skeleton */}
//                             <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-6">
//                                 <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
//                                 <div className="h-8 w-32 bg-gray-200 rounded mb-2"></div>
//                                 <div className="h-3 w-28 bg-gray-200 rounded"></div>
//                             </div>

//                             <div className="p-6 space-y-6">
//                                 {/* Enrollment Window Skeleton */}
//                                 <div className="bg-gray-100 border border-gray-200 rounded-lg p-3">
//                                     <div className="h-3 w-32 bg-gray-200 rounded mb-2"></div>
//                                     <div className="h-4 w-40 bg-gray-200 rounded"></div>
//                                 </div>

//                                 {/* What's Included Skeleton */}
//                                 <div className="space-y-3">
//                                     <div className="h-4 w-32 bg-gray-200 rounded"></div>
//                                     {[1, 2, 3, 4, 5, 6].map((i) => (
//                                         <div key={i} className="flex items-center gap-2">
//                                             <div className="w-4 h-4 bg-gray-200 rounded-full shrink-0"></div>
//                                             <div className="h-3 bg-gray-200 rounded flex-1"></div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* CTA Buttons Skeleton */}
//                                 <div className="space-y-3">
//                                     <div className="w-full h-12 bg-gray-300 rounded-xl"></div>
//                                     <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
//                                 </div>
//                             </div>
//                         </div>
//                     </aside>
//                 </div>
//             </div>

//             {/* Fixed Bottom Bar Skeleton for Mobile */}
//             <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t-2 border-gray-200 shadow-2xl z-50 p-4 animate-pulse">
//                 <div className="flex gap-3 max-w-7xl mx-auto">
//                     <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
//                     <div className="flex-1 h-12 bg-gray-300 rounded-xl"></div>
//                 </div>
//             </div>
//         </div>
//     );
// }


export default function ClassDetailsSkeleton() {
    return (
        <div className="min-h-screen px-4 lg:px-22 py-24 pb-32 bg-linear-to-b from-gray-50 to-white animate-pulse">

            {/* ================= HEADER SECTION ================= */}
            <div className="relative bg-white overflow-hidden rounded-md">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-100 rounded-md"></div>

                <div className="relative max-w-7xl mx-auto px-2 lg:px-6 py-6">
                    <div className="grid lg:grid-cols-2 gap-4 items-start">

                        {/* Left */}
                        <div className="space-y-3">
                            {/* Badge */}
                            <div className="h-8 w-36 bg-gray-200 rounded-full" />

                            {/* Title */}
                            <div className="h-12 w-4/5 bg-gray-200 rounded-md" />

                            {/* Meta */}
                            <div className="flex flex-wrap gap-4">
                                <div className="h-4 w-28 bg-gray-200 rounded" />
                                <div className="h-4 w-20 bg-gray-200 rounded" />
                                <div className="h-4 w-24 bg-gray-200 rounded" />
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <div className="h-20 bg-gray-200 rounded-xl" />
                                <div className="h-20 bg-gray-200 rounded-xl" />
                                <div className="h-20 bg-gray-200 rounded-xl" />
                            </div>
                        </div>

                        {/* Video Preview */}
                        <div className="h-64 bg-gray-300 rounded-2xl" />
                    </div>
                </div>
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="max-w-7xl mx-auto py-4">
                <div className="grid lg:grid-cols-[1fr_380px] gap-10">

                    {/* LEFT CONTENT */}
                    <div className="space-y-4">

                        {/* What You'll Learn */}
                        <section className="bg-white rounded-md border border-gray-200 p-4 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                                <div className="h-6 w-52 bg-gray-200 rounded" />
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                                ))}
                            </div>
                        </section>

                        {/* About */}
                        <section className="bg-white rounded-md border border-gray-200 p-4 lg:p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                                <div className="h-6 w-48 bg-gray-200 rounded" />
                            </div>

                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded w-full" />
                                <div className="h-4 bg-gray-200 rounded w-5/6" />
                                <div className="h-4 bg-gray-200 rounded w-4/6" />
                            </div>
                        </section>

                        {/* Schedule */}
                        <section className="bg-white rounded-md border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-md" />
                                <div className="h-5 w-40 bg-gray-200 rounded" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-16 bg-gray-200 rounded-lg" />
                                ))}
                            </div>
                        </section>

                        {/* Tutor */}
                        <section className="bg-white rounded-md border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-md" />
                                <div className="h-5 w-48 bg-gray-200 rounded" />
                            </div>

                            <div className="bg-gray-100 rounded-lg p-4 space-y-3">
                                <div className="flex gap-4">
                                    <div className="w-14 h-14 bg-gray-300 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded" />
                                        <div className="h-3 w-48 bg-gray-200 rounded" />
                                        <div className="h-3 w-40 bg-gray-200 rounded" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="h-10 bg-gray-200 rounded" />
                                    <div className="h-10 bg-gray-200 rounded" />
                                </div>

                                <div className="h-10 bg-gray-300 rounded-md" />
                            </div>
                        </section>

                        {/* Syllabus */}
                        <section className="bg-white rounded-md border border-gray-200 p-5">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-md" />
                                <div className="h-5 w-40 bg-gray-200 rounded" />
                            </div>

                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-12 bg-gray-200 rounded-lg" />
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* RIGHT SIDEBAR (DESKTOP) */}
                    <aside className="hidden lg:block">
                        <div className="bg-white rounded-md border-2 border-blue-100 shadow-lg overflow-hidden">
                            <div className="h-32 bg-gray-300" />

                            <div className="p-6 space-y-4">
                                <div className="h-6 w-1/2 bg-gray-200 rounded" />
                                <div className="h-4 w-2/3 bg-gray-200 rounded" />

                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                                ))}

                                <div className="h-12 bg-gray-300 rounded-xl" />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ================= MOBILE CTA ================= */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t-2 border-gray-200 p-4">
                <div className="flex gap-3 max-w-7xl mx-auto">
                    <div className="h-12 w-14 bg-gray-300 rounded-xl" />
                    <div className="h-12 flex-1 bg-gray-300 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
