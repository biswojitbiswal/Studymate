"use client";

import { useParams } from "next/navigation";
import { BookOpenText, CheckCircle, Users } from "lucide-react";
import LoadingScreen from "@/components/common/LoadingScreen";
import { useMemo } from "react";
import { useAdminClass } from "@/hooks/admin/useClass";
import ClassDetailPage from "./ClassDetail";


const STATUS_BASE =
    "inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium border";


export const STATUS_STYLES = {
    PUBLISHED: "bg-green-50 border-green-200 text-green-700",
    ACTIVE: "bg-blue-50 border-blue-200 text-blue-700",
    DRAFT: "bg-yellow-50 border-yellow-200 text-yellow-700",
    COMPLETED: "bg-gray-50 border-gray-200 text-gray-700",
    ARCHIVED: "bg-red-50 border-red-200 text-red-700",
};


export default function ClassLayout() {
    const { id } = useParams();

    const { data, isLoading } = useAdminClass(id);
    const klass = data?.data;
    // console.log(data);
    


    if (isLoading) return <LoadingScreen />;
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-xl text-white">
                <h1 className="text-2xl font-semibold">
                    {`${klass?.title}-[${klass?.subject?.name}, ${klass?.level?.name}]` || "Tuition Class"}
                </h1>
                <p className="text-sm opacity-90">
                    Tutor - {klass?.tutor?.user?.name}
                </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-3">
                {/* Visibility */}
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                    <BookOpenText size={14} />
                    {/* <span>Visibility:</span> */}
                    <span className="font-semibold">{klass?.visibility}</span>
                </div>

                {/* Class Type */}
                <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-md px-3 py-1.5 text-sm font-medium">
                    <Users size={14} />
                    {/* <span>Class Type:</span> */}
                    <span className="font-semibold">{klass?.type}</span>
                </div>

                {/* Status */}
                <div
                    className={`${STATUS_BASE} ${STATUS_STYLES[klass?.status] || "bg-gray-50 border-gray-200 text-gray-700"
                        }`}
                >
                    <CheckCircle size={14} />
                    <span className="font-semibold">{klass?.status}</span>
                </div>


            </div>

            <ClassDetailPage klass={klass} />

        </div>
    );
}
