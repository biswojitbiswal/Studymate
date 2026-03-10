"use client";

import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function ResourceDetailsPage() {
    const router = useRouter()

    const { seo_name } = useParams();
    const queryClient = useQueryClient();

    const queries = queryClient.getQueriesData({
        queryKey: ["resources"],
    });

    const resources = queries
        ?.map((q) => q[1]?.data?.resources)
        ?.flat()
        ?.filter(Boolean);


    const resource = resources?.find((r) => r?.seo_name === seo_name);

    if (!resource) {
        return <p>Resource not found</p>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg backdrop-blur-sm transition shrink-0 hover:cursor-pointer border border-gray-400"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* <div>
                <h1 className="text-xl font-semibold">{resource.title}</h1>
                <p className="text-gray-500 text-sm">
                    {resource.description || "No description"}
                </p>
            </div> */}

            <ResourceViewer resource={resource} />

        </div>
    );
}


function ResourceViewer({ resource }) {
    return (
        <div className="w-full max-w-5xl mx-auto sm:px-2 lg:px-8 py-6 space-y-6">

            {/* Header */}
            <div className="space-y-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    {resource.title}
                </h1>

                {resource.description && (
                    <p className="text-sm text-gray-500">
                        {resource.description}
                    </p>
                )}
            </div>

            {/* Viewer */}
            <div className="w-full rounded-lg overflow-hidden border bg-black">

                {resource.type === "VIDEO" && (
                    <video
                        src={resource.fileUrl}
                        controls
                        controlsList="nodownload"
                        className="w-full h-auto max-h-[70vh]"
                    />
                )}

                {resource.type === "IMAGE" && (
                    <img
                        src={resource.fileUrl}
                        className="w-full h-auto"
                    />
                )}

                {resource.type === "PDF" && (
                    <iframe
                        src={resource.fileUrl}
                        className="w-full h-[75vh]"
                    />
                )}

            </div>

        </div>
    );
}