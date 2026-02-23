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
import ClassCardSkeleton from "@/components/skeleton/tutor/TutorClassCardSkeleton";
import MobilePagination from "@/components/common/MobilePagination";


const statusStyles = {
  PUBLISHED: "bg-green-100 text-green-700",
  ACTIVE: "bg-blue-100 text-blue-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  COMPLETED: "bg-gray-100 text-gray-700",
  ARCHIVED: "bg-red-100 text-red-700",
};


export default function ClassTable({ data, isLoading, isError, page, setPage, onPublish }) {
  const [open, setOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const router = useRouter()

  const handleDeleteClick = (id) => {
    setSelectedClassId(id);
    setOpen(true)
  }

  if (isLoading) {
    return (
      <>
        {/* mobile skeleton */}
        <ClassCardSkeleton />

        {/* desktop skeleton */}
        <div className="hidden md:block text-sm text-gray-500">
          <TableSkeleton />
        </div>
      </>
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
      {/* MOBILE VIEW */}
      <div className="md:hidden space-y-4">
        {data?.data?.map((cls) => {
          const joiningStart = cls.joiningStartDate.split("T")[0];
          const startDate = cls.startDate.split("T")[0];

          return (
            <div
              key={cls.id}
              className="relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200"
            >

              {/* STATUS STRIP */}
              <div className={`absolute top-0 left-0 h-full w-1.5 rounded-l-2xl ${statusStyles[cls.status]?.replace("text", "bg") || "bg-gray-300"}`} />

              {/* HEADER */}
              <div className="flex justify-between items-start gap-3">
                <div className="space-y-1">
                  <h3 className="font-semibold text-gray-900 leading-tight">
                    {cls.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Badge className={`text-xs ${statusStyles[cls.status]}`}>
                      {cls.status}
                    </Badge>
                    <span className="px-2 py-0.5 rounded bg-gray-100">
                      {cls.type}
                    </span>

                    <span className={`px-2 py-0.5 rounded ${cls.visibility === "PUBLIC"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                      }`}>
                      {cls.visibility}
                    </span>
                  </div>
                </div>

                <Switch
                  checked={cls.status !== "DRAFT"}
                  onCheckedChange={() => onPublish(cls.id)}
                  className="data-[state=checked]:bg-blue-600"
                />

              </div>

              {/* CLASS META */}
              <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-gray-500">Joining</div>
                <div className="text-right font-medium text-gray-800">
                  {joiningStart}
                </div>

                <div className="text-gray-500">Start Date</div>
                <div className="text-right font-medium text-gray-800">
                  {startDate}
                </div>

                <div className="text-gray-500">Price</div>
                <div className="text-right font-semibold text-blue-600">
                  ₹{cls.price.toFixed(2)}
                </div>
              </div>

              {/* PUBLISH SWITCH */}
              {/* <div className="flex items-center justify-between mt-4 pt-3 border-t">
                <span className="text-sm text-gray-600 font-medium">
                  Published
                </span>

                <Switch
                  checked={cls.status !== "DRAFT"}
                  onCheckedChange={() => onPublish(cls.id)}
                  className="data-[state=checked]:bg-blue-600"
                />
              </div> */}

              {/* ACTIONS */}
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() =>
                    router.push(`/dashboard/tutor/classes/${cls.id}/overview`)
                  }
                >
                  View
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-blue-600"
                  onClick={() =>
                    router.push(`/dashboard/tutor/classes/${cls.id}/edit`)
                  }
                >
                  Edit
                </Button>

                {cls.status !== "ARCHIVED" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="text-white"
                    onClick={() => handleDeleteClick(cls.id)}
                  >
                    Delete
                  </Button>
                )}
              </div>

            </div>
          );
        })}

        {/* MOBILE PAGINATION */}
        <div className="flex items-center justify-between gap-2 p-3 border-t text-sm">
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

      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Class Title</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Visibility</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Joining Date</TableHead>
              <TableHead className="text-center">Start / End Date</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Publish</TableHead>
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
                className="hover:bg-gray-50 transition text-center"
              >
                <TableCell className="font-medium text-gray-900 text-start">
                  {cls.title}
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls.type}
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls.visibility}
                </TableCell>

                <TableCell>
                  <Badge
                    className={`text-xs ${statusStyles[cls.status]}`}
                  >
                    {cls.status}
                  </Badge>
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls.joiningStartDate.split("T")[0]}
                  <br />
                  {cls.joiningEndDate.split("T")[0]}
                </TableCell>

                <TableCell className="text-gray-700">
                  {cls.startDate.split("T")[0]}
                  <br />
                  {cls.endDate.split("T")[0]}
                </TableCell>

                <TableCell className="font-medium">
                  ₹{cls.price.toFixed(2)}
                </TableCell>

                <TableCell>
                  <Switch
                    checked={cls.status !== 'DRAFT'}
                    onCheckedChange={() => onPublish(cls.id)}
                    className="data-[state=checked]:bg-blue-600 hover:cursor-pointer"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center justify-center gap-2">
                    {/* Edit */}
                    <Button
                      size="icon"
                      title="Edit"
                      onClick={() =>
                        router.push(
                          `/dashboard/tutor/classes/${cls.id}/edit`
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                    >
                      <Pencil size={16} />
                    </Button>

                    {/* Delete */}
                    {cls.status !== "ARCHIVED" && (
                      <Button
                        size="icon"
                        title="Delete"
                        onClick={() => handleDeleteClick(cls.id)}
                        className="bg-red-500 hover:bg-red-600 text-white hover:cursor-pointer"
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
                          `/dashboard/tutor/classes/${cls.id}/overview`
                        )
                      }
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:cursor-pointer"
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 border-t text-sm">
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
        <div className="px-4">
          <DeleteClassDialog
            open={open}
            setOpen={setOpen}
            classId={selectedClassId}
          />
        </div>
      </div>
    </>
  );
}
