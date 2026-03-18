"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToggleWishlist, useWishlist } from "@/hooks/public/useWishlist";
import { toast } from "sonner";
import { WishlistSkeleton } from "@/components/skeleton/WishlistSkeleton";

export default function WishlistPage() {
    const router = useRouter();

    const { data, isLoading, isFetching } = useWishlist({
        page: 1,
        limit: 10,
    });

    const { mutate, isPending } = useToggleWishlist();

    const toggleWishlist = (classId) => {
        mutate(classId, {
            onSuccess: (res) => {
                toast.success(res?.data?.data?.message);
            },
            onError: (err) => {
                console.log(err);
                
                toast.error(
                    err?.response?.data?.message || "Something went wrong"
                );
            },
        });
    };

    const classes = data?.items?.data || [];

    return (
        <div className="max-w-3xl mx-auto px-4 py-6">
            {/* Header */}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                My Wishlist ❤️
            </h1>

            {/* Loading */}
            {(isLoading || isFetching) && <WishlistSkeleton />}

            {/* Empty State */}
            {!isLoading && classes.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500 text-center">
                    <p className="text-base sm:text-lg font-medium mb-3">
                        No classes in wishlist
                    </p>
                    <button
                        onClick={() => router.push("/classes")}
                        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer"
                    >
                        Browse Classes
                    </button>
                </div>
            )}

            {/* Wishlist Items */}
            <div className="space-y-4">
                {classes?.map((classItem) => (
                    <div
                        key={classItem?.id}
                        className="bg-white rounded-md border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition"
                    >
                        {/* 🔥 Main Container */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">

                            {/* Thumbnail */}
                            <div className="relative w-full sm:w-36 h-44 sm:h-28 rounded-md overflow-hidden shrink-0">
                                <img
                                    src={classItem?.previewImg || "/Logo.png"}
                                    alt={classItem?.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col flex-1">

                                {/* Top */}
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                            {classItem?.title?.length > 25
                                                ? classItem.title.slice(0, 25) + "..."
                                                : classItem?.title}
                                        </h3>

                                        <div className="text-xs sm:text-sm text-gray-500 mt-1">
                                            {classItem?.subject?.name} • {classItem?.level?.name}
                                        </div>
                                    </div>

                                    {/* Wishlist Remove */}
                                    <button
                                        onClick={() => toggleWishlist(classItem.id)}
                                        className="p-2 rounded-full hover:bg-red-100 shrink-0 hover:cursor-pointer"
                                    >
                                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                                    </button>
                                </div>

                                {/* Tutor */}
                                <div className="flex items-center gap-2 mt-2 sm:mt-3">
                                    <img
                                        src={classItem?.tutor?.user?.avatar}
                                        alt=""
                                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
                                    />
                                    <span className="text-xs sm:text-sm font-medium text-gray-800">
                                        {classItem?.tutor?.user?.name}
                                    </span>
                                </div>

                                {/* Bottom */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 sm:mt-auto pt-2 sm:pt-3">

                                    <div className="text-base sm:text-lg font-bold text-gray-900">
                                        ₹{classItem?.price.toFixed(2)}
                                    </div>

                                    <button
                                        onClick={() =>
                                            router.push(`/classes/${classItem?.seo_name}`)
                                        }
                                        className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer"
                                    >
                                        View Class
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}