import { TableSkeleton } from "@/components/common/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUpdateReviewStatus } from "@/hooks/public/useReview";
import { Eye, SquarePen, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function ReviewsTable({
    data,
    loading,
    page,
    setPage,
    total,
}) {

    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const truncate = (text, limit = 20) => {
        if (!text) return "-";
        return text.length > limit ? text.slice(0, limit) + "..." : text;
    };

    const { mutate, isPending } = useUpdateReviewStatus();

    const toggleStatus = (row) => {
        const newStatus =
            row.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

        mutate(
            {
                id: row.id,
                data: { status: newStatus },
            },
            {
                onSuccess: () => {
                    toast.success("Status updated");
                },
                onError: () => {
                    toast.error("Failed to update status");
                },
            }
        );
    };

    return (
        loading ? (
            <TableSkeleton />
        ) : (
            <div className="border rounded-lg overflow-x-auto bg-white">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead className="text-center">Rating</TableHead>
                            <TableHead className="text-center">Reviews</TableHead>
                            <TableHead className="text-center">Class/Tutor</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-right">View</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-6">
                                    No rating & reviews found
                                </TableCell>
                            </TableRow>
                        ) : (
                            data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row?.student?.user?.name}</TableCell>

                                    <TableCell className="text-center">
                                        <div className="flex justify-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-4 h-4 ${row.rating >= star
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </TableCell>

                                    <TableCell className="text-center max-w-[200px]">
                                        <span title={row.reviewText}>
                                            {truncate(row.reviewText, 30)}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <p title={row?.klass?.title}>
                                            {truncate(row?.klass?.title, 25)}
                                        </p>
                                        <p title={row?.klass?.tutor?.user?.name}>
                                            {truncate(row?.klass?.tutor?.user?.name, 25)}
                                        </p>
                                    </TableCell>


                                    <TableCell className="text-center">
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={row.status === "ACTIVE"}
                                                disabled={isPending}
                                                onChange={() => toggleStatus(row)}
                                            />

                                            <div className={`w-11 h-6 rounded-full transition relative
                                                ${row.status === "ACTIVE" ? "bg-blue-600" : "bg-gray-300"}
                                                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
                                                `}>
                                                <div
                                                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition
                                                    ${row.status === "ACTIVE" ? "translate-x-5" : ""}
                                                    `}
                                                />
                                            </div>
                                        </label>
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
                                            onClick={() => {
                                                setSelectedReview(row);
                                                setIsModalOpen(true);
                                            }}
                                            size="sm"
                                            variant="outline"
                                            className="p-2 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-600 transition hover:cursor-pointer"
                                        >
                                            <Eye size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-3 border-t text-sm">
                    <span className="text-slate-500">
                        Page {page} of {total}
                    </span>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <button
                            disabled={page === total}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

                <ReviewDetailsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    review={selectedReview}
                />
            </div>
        )
    );
}


export function ReviewDetailsModal({ isOpen, onClose, review }) {
    if (!isOpen || !review) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* 🔲 Overlay */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* 📦 Modal */}
            <div className="relative bg-white w-full max-w-lg rounded-xl shadow-lg p-6 z-10">
                {/* ❌ Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    <X size={20} />
                </button>

                {/* 🧑 Student Info */}
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {review?.student?.user?.name || "Student"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {review?.klass?.title}
                    </p>
                </div>

                {/* ⭐ Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-5 h-5 ${review.rating >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                                }`}
                        />
                    ))}
                </div>

                {/* 📝 Review Text */}
                <div className="mb-4">
                    <p className="text-gray-700 text-sm leading-relaxed">
                        {review.reviewText || "No review provided."}
                    </p>
                </div>

                {/* 🔄 Status */}
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Status</span>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${review.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                            }`}
                    >
                        {review.status}
                    </span>
                </div>

                {/* 📅 Created Date (optional) */}
                {review.createdAt && (
                    <div className="mt-4 text-xs text-gray-400">
                        {new Date(review.createdAt).toLocaleString()}
                    </div>
                )}
            </div>
        </div>
    );
}
