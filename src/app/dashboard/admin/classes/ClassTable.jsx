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


export default function ClassTable({ data, isLoading, isError, page, setPage }) {
  const [open, setOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const router = useRouter()

  const handleDeleteClick = (id) => {
    setSelectedClassId(id);
    setOpen(true)
  }

  if (isError) {
    return (
      <div className="text-sm text-red-500">
        Failed to load classes
      </div>
    );
  }

  return (
    isLoading ? <TableSkeleton /> : <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Class Title</TableHead>
              <TableHead className="text-center">Tutor</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Visibility</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No class found
                </TableCell>
              </TableRow>
            ) : (data?.data?.map((cls) => (
              <TableRow
                key={cls.id}
                className="hover:bg-gray-50 transition"
              >
                <TableCell className="font-medium text-gray-900">
                  {cls.title}
                </TableCell>

                <TableCell className="text-gray-700 text-center">
                  {cls.tutor.user.name}
                  <br />
                  {cls.tutor.user.email}
                </TableCell>

                <TableCell className="text-gray-700 text-center">
                  {cls.type}
                </TableCell>

                <TableCell className="text-gray-700 text-center">
                  {cls.visibility}
                </TableCell>

                <TableCell className="text-center">
                  <Badge
                    className={`text-xs ${statusStyles[cls.status]}`}
                  >
                    {cls.status}
                  </Badge>
                </TableCell>

                <TableCell className="font-medium text-center">
                  ₹{cls.price}
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {/* Delete */}
                    {cls.status !== "ARCHIVED" && (
                      <Button
                        size="icon"
                        title="Delete"
                        onClick={() => handleDeleteClick(cls.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}

                    {/* View */}
                    <Button
                      size="icon"
                      variant="outline"
                      title="View"
                      onClick={() =>
                        router.push(
                          `/dashboard/admin/classes/${cls.id}`
                        )
                      }
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
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
            Page {page} of {data.totalPages}
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
              disabled={page === data?.totalPages}
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
