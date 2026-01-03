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
import { Trash2 } from "lucide-react";

export default function LeaveTable({
    loading,
    data,
    page,
    totalPages,
    onPageChange,
    onDelete,
}) {

    if (loading) {
        return <TableSkeleton />
    }
    return (
        <div className="rounded-md border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Start Date</TableHead>
                        <TableHead>End Date</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                                No leaves found
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    {new Date(row.startDate)
                                        .toLocaleDateString("en-GB")
                                        .replace(/\//g, "-")}
                                </TableCell>
                                <TableCell>
                                    {new Date(row.endDate)
                                        .toLocaleDateString("en-GB")
                                        .replace(/\//g, "-")}
                                </TableCell>
                                <TableCell>{row.reason || "-"}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        onClick={() => onDelete(row.id)}
                                        className="text-red-600 px-2.5 bg-red-100 hover:bg-red-200 hover:cursor-pointer"
                                    >
                                        <Trash2 />
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
                    Page {page} of {totalPages}
                </span>

                <div className="flex gap-2">
                    <button
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
