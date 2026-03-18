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
import { Eye, SquarePen } from "lucide-react";

export default function ReviewsTable({
    data,
    loading,
    page,
    setPage,
    total,
}) {
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
                            <TableHead className="text-right">Tutor/Class</TableHead>
                            <TableHead className="text-right">Status</TableHead>
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
                                        {row.rating}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {row.reviewText}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {row.status}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button
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
            </div>
        )
    );
}
