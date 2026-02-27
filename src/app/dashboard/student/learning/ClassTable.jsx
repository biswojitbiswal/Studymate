"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteClassDialog from "./DeleteDialog";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";


const statusStyles = {
  PUBLISHED: "bg-green-100 text-green-700",
  ACTIVE: "bg-blue-100 text-blue-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  ARCHIVED: "bg-red-100 text-red-700",
};


export default function ClassTable({ data, isLoading, isError, page, totalPages, setPage }) {
  const [open, setOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const router = useRouter()

  const handleDeleteClick = (id) => {
    setSelectedClassId(id);
    setOpen(true)
  }

  if (isLoading) {
    return (
      <div className="text-sm text-gray-500">
        <TableSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-sm text-red-500">
        Failed to load classes
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Class Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Visibility</TableHead>
               <TableHead>Tutor</TableHead>
              {/* <TableHead className="text-center">Status</TableHead> */}
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              {/* <TableHead className="text-center">Price</TableHead> */}
              {/* <TableHead>Publish</TableHead> */}
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No class found
                </TableCell>
              </TableRow>
            ) : (data?.map((cls) => (
              <TableRow
                key={cls?.id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell className="font-medium text-gray-900">
                  {cls?.title}
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls?.type}
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls?.visibility}
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls?.tutor?.user?.name}
                </TableCell>

                {/* <TableCell className="text-center">
                  <Badge
                    className={`text-xs ${statusStyles[cls?.status]}`}
                  >
                    {cls?.status}
                  </Badge>
                </TableCell> */}

                <TableCell className="text-gray-700">
                  {cls?.startDate?.split("T")[0]}
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls?.endDate?.split("T")[0]}
                </TableCell>

                {/* <TableCell className="text-center text-md font-bold text-green-600">
                  ₹{cls?.paidAmount.toFixed(2)}
                </TableCell> */}


                <TableCell>
                  <div className="flex items-center justify-center gap-2">

                    {/* View */}
                    <Button
                      size="icon"
                      variant="outline"
                      title="View"
                      onClick={() =>
                        router.push(
                          `/dashboard/student/learning/${cls?.id}/overview`
                        )
                      }
                      className="border-blue-600 text-blue-600 hover:cursor-pointer hover:bg-blue-50"
                    >
                      <Eye size={16} />
                    </Button>
                  </div>
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
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <DeleteClassDialog
        open={open}
        setOpen={setOpen}
        classId={selectedClassId}
      />
    </>
  );
}
