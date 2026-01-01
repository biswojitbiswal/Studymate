"use client";

import { TableSkeleton } from "@/components/common/TableSkeleton";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import DeleteClassDialog from "./DeleteDialog";
import { useState } from "react";


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

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Class Title</th>
              <th className="px-4 py-3 text-left font-medium">Type</th>
              <th className="px-4 py-3 text-left font-medium">Visibility</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium"> Joining Date</th>
              <th className="px-4 py-3 text-left font-medium">Start/End Date</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {data?.data?.map((cls) => (
              <tr key={cls.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {cls.title}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {cls.type}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {cls.visibility}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles[cls.status]}`}
                  >
                    {cls.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {cls.joiningStartDate.split("T")[0]} <br />
                  {cls.joiningEndDate.split("T")[0]}
                </td>

                <td className="px-4 py-3 text-gray-700">
                  {cls.startDate.split("T")[0]} <br />
                  {cls.endDate.split("T")[0]}
                </td>

                <td className="px-4 py-3">
                  ₹{cls.price}
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      title="Edit"
                      onClick={() => router.push(`/dashboard/tutor/classes/${cls.id}/edit`)}
                      className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 hover:cursor-pointer text-white transition"
                    >
                      <Pencil size={16} />
                    </button>

                    {
                      cls.status !== 'ARCHIVED' && (
                        <button
                          onClick={() => handleDeleteClick(cls.id)}
                          title="Delete"
                          className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition hover:cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </button>
                      )
                    }

                    <button
                      title="View"
                      onClick={() => router.push(`/dashboard/tutor/classes/${cls.id}/overview`)}
                      className="p-2 rounded-md border border-blue-600 text-blue-600 hover:bg-blue-50 transition hover:cursor-pointer"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


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
