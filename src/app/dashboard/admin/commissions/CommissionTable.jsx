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
import { SquarePen } from "lucide-react";

export default function CommissionTable({
    data,
    loading,
    page,
    setPage,
    total,
    onEdit,
}) {
    //   if (!data.length) return <p>No commissions found.</p>;

    return (
        loading ? (<TableSkeleton />) : <div className="border rounded-lg overflow-x-auto bg-white">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Applies To</TableHead>
                        <TableHead className="text-center">Type</TableHead>
                        <TableHead className="text-center">Value</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-6">
                                No commisson found
                            </TableCell>
                        </TableRow>
                    ) : (data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.appliesTo}</TableCell>
                            <TableCell className="text-center">{row.type}</TableCell>
                            <TableCell className="text-center">
                                {row.type === "PERCENTAGE"
                                    ? `${row.value}%`
                                    : row.value}
                            </TableCell>
                            <TableCell className="text-center">
                                <span
                                    className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${row.status === "ACTIVE"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {row.status}
                                </span>
                            </TableCell>


                            <TableCell className="text-right">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => onEdit(row)}
                                    className="p-2 rounded-md text-blue-600 hover:bg-blue-100 hover:text-blue-600 transition hover:cursor-pointer"
                                >
                                    <SquarePen size={16} />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )))}
                </TableBody>
            </Table>

            {/* {Pagination} */}
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
    );
}
