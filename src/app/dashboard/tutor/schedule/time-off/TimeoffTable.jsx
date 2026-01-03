import { TableSkeleton } from "@/components/common/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

export default function TimeoffTable({
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
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                No time-offs found
              </TableCell>
            </TableRow>
          )}

          {data?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {new Date(row.date).toLocaleDateString().replaceAll("/", "-")}
              </TableCell>
              <TableCell>
                {row.startTime} – {row.endTime}
              </TableCell>
              <TableCell>{row.reason || "-"}</TableCell>
              <TableCell className="text-right">
                <Button
                  onClick={() => onDelete(row.id)}
                  className="text-red-600 px-2 bg-red-100 hover:bg-red-200 hover:cursor-pointer text-sm"
                >
                  <Trash2 size={18} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
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
