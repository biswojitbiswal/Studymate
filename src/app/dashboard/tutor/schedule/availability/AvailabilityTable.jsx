"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import LoadingScreen from "@/components/common/LoadingScreen";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { SquarePen, Trash2 } from "lucide-react";

export default function AvailabilityTable({
  data = [],
  loading,
  page,
  totalPages,
  onPageChange,
  onToggle,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return <TableSkeleton />;
  }

  return (
    <div className="rounded-md border overflow-hidden">
      {/* ───────── TABLE ───────── */}
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead>Day</TableHead>
            <TableHead>Time</TableHead>
            {/* <TableHead>Timezone</TableHead> */}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                No availability found
              </TableCell>
            </TableRow>
          ) : (data.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">
                {row.dayOfWeek}
              </TableCell>

              <TableCell>
                {row.startTime} – {row.endTime}
              </TableCell>

              {/* <TableCell>{row.timeZone}</TableCell> */}

              {/* Status */}
              <TableCell>
                <Switch
                  checked={row.isActive}
                  onCheckedChange={() => onToggle(row.id)}
                  className="data-[state=checked]:bg-blue-600 hover:cursor-pointer"
                />
              </TableCell>

              {/* Actions */}
              <TableCell className="text-right space-x-2">
                <Button
                  variant="link"
                  className="px-2.5 text-blue-600 bg-blue-100 hover:cursor-pointer"
                  onClick={() => onEdit(row)}
                >
                  <SquarePen size={16} />
                </Button>

                <Button
                  variant="link"
                  className="px-2.5 text-red-600 bg-red-100 hover:cursor-pointer"
                  onClick={() => onDelete(row.id)}
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          )))}
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
