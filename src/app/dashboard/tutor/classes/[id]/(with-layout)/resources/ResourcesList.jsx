"use client";

import { ResourceListSkeleton } from "@/components/skeleton/tutor/ResourceListSkeleton";
import { Button } from "@/components/ui/button";
import { Eye, FileText, ImageIcon, Link2, MoreVertical, Pencil, Trash, Video } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ResourcesList({
    data,
    loading,
    totalPages,
    page,
    setPage,
    onView,
    onEdit,
    onDelete,
}) {
    if (loading) {
        return <ResourceListSkeleton />;
    }
    

    if (!data?.length) {
        return (
            <p className="text-sm text-gray-500 text-center">
                No resources found
            </p>
        );
    }

    return (
        <div className="space-y-3">
            {data.map((r) => (
                <ResourceCard
                    key={r.id}
                    resource={r}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}

            {/* Pagination */}
            {!loading && totalPages > 0 && (
                <div className="flex items-center justify-between pt-3">

                    <button
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        ← Previous
                    </button>

                    <div className="text-sm text-gray-600">
                        Page <span className="font-medium">{page}</span> of{" "}
                        <span className="font-medium">{totalPages}</span>
                    </div>

                    <button
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                        Next →
                    </button>

                </div>
            )}
        </div>
    );
}

function getResourceIcon(type) {
    switch (type) {
        case "PDF":
        case "DOC":
            return <FileText size={18} />;
        case "VIDEO":
            return <Video size={18} />;
        case "IMAGE":
            return <ImageIcon size={18} />;
        case "LINK":
            return <Link2 size={18} />;
        default:
            return <FileText size={18} />;
    }
}

function formatFileSize(bytes) {
    if (!bytes) return "";

    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

function ResourceCard({
    resource,
    // onView,
    onEdit,
    onDelete,
}) {
    const router = useRouter();
    return (
        <div className="bg-white border rounded-md px-1.5 lg:px-3 py-2 flex items-center gap-3 hover:shadow-sm transition">

            {/* File Icon */}
            <div className="w-10 h-10 shrink-0 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center">
                {getResourceIcon(resource?.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">

                <div className="flex items-center gap-2 min-w-0">

                    <h3 className="font-medium text-gray-900 truncate max-w-[220px]">
                        {resource?.title}
                    </h3>

                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium shrink-0">
                        {resource?.type}
                    </span>

                    <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-blue-700 font-medium shrink-0">
                        {formatFileSize(resource?.size)}
                    </span>

                </div>

                <p className="text-xs text-gray-500 truncate max-w-[320px] mt-0.5">
                    {resource?.description || "No description provided"}
                </p>

            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 lg:gap-2">

                <Button
                    size="icon"
                    // variant="outline"
                    className="bg-green-200 text-green-600 hover:bg-green-600 hover:text-white hover:cursor-pointer"
                    onClick={() => router.push(`/dashboard/tutor/resources/${resource?.seo_name}`)}
                >
                    <Eye size={16} />
                </Button>

                <Button
                    size="icon"
                    // variant="outline"
                    className="bg-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:cursor-pointer"
                    onClick={() => onEdit(resource)}
                >
                    <Pencil size={16} />
                </Button>

                <Button
                    size="icon"
                    // variant="destructive"
                    className="bg-red-200 text-red-600 hover:bg-red-600 hover:text-white hover:cursor-pointer"
                    onClick={() => onDelete(resource.id)}
                >
                    <Trash size={16} />
                </Button>

            </div>

        </div>
    );
}