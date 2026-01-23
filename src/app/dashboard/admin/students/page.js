"use client";

import { useEffect, useState } from "react";
import { Eye, RefreshCw, RefreshCwOff, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDebounce } from "@/lib/utils";
import { toast } from "sonner";
import { useToggleUserStatus } from "@/hooks/public/useAuth";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { useStudents } from "@/hooks/student/useStudent";
import StudentDetailsModal from "./StudentDetails";


const statusColor = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING_REVIEW: "bg-yellow-100 text-yellow-700",
  REJECTED: "bg-red-100 text-red-700",
  SUSPENDED: "bg-gray-200 text-gray-700",
};

export default function AdminStudentPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [rows, setRows] = useState([]);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useStudents({
    page,
    limit: 10,
    search: debouncedSearch
  })

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const { mutate: toggleStatus } = useToggleUserStatus();


  const viewDetails = (student) => {
    setSelectedStudent(student)
    setOpen(true)
  };

  const handleToggle = (id) => {
    toggleStatus(id, {
      onSuccess: () => {
        setRows((prev) =>
          prev?.data?.map((t) =>
            t.id === id
              ? { ...t, isActive: !t.isActive }
              : t
          )
        );

        toast.success(
          "Student status updated successfully!"
        );
      },

      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
          "Failed to update student status. Please try again."
        );
      },
    });
  };


  if (isError) {
    return (
      <div className="border rounded-lg bg-white p-6 text-center text-sm text-slate-500">
        Failed to load students
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* ---------- PAGE HEADER ---------- */}
      <div>
        <h1 className="text-2xl font-semibold">
          Student Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage all registered students
        </p>
      </div>

      {/* ---------- SEARCH ---------- */}
      <Input
        placeholder="Search tutor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {isLoading ? <TableSkeleton/> : <Card className="rounded-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {rows?.data?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6">
                    No students found
                  </TableCell>
                </TableRow>
              ) : (rows?.data?.map((student) => (
                <TableRow key={student?.id}>
                  <TableCell className="font-medium">
                    {student?.name}
                  </TableCell>

                  <TableCell>{student?.email}</TableCell>

                  <TableCell>
                    {student?.phone}
                  </TableCell>


                  <TableCell>
                    {student.isActive ? (
                      <Badge variant="success">ACTIVE</Badge>
                    ) : (
                      <Badge className="text-white" variant="destructive">INACTIVE</Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                          viewDetails(student)
                        }
                        className="bg-blue-100 p-1 rounded-md hover:bg-blue-200 hover:cursor-pointer"
                      >
                        <Eye className="h-5 w-5 text-blue-600" />
                      </Button>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleToggle(student.userId)}
                        className={`p-1 rounded-md hover:cursor-pointer ${student.isActive
                          ? "bg-red-100 hover:bg-red-200"
                          : "bg-green-100 hover:bg-green-200"
                          }`}
                      >
                        {student.isActive ? (
                          <RefreshCwOff className="h-5 w-5 text-red-600" />
                        ) : (
                          <RefreshCw className="h-5 w-5 text-green-600" />
                        )}
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between p-3 border-t text-sm">
            <span className="text-slate-500">
              Page {page} of {data?.totalPages}
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
        </CardContent>
      </Card>}

      <StudentDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        student={selectedStudent}
      />

    </div>
  );
}
