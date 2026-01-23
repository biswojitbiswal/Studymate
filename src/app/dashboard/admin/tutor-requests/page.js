"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Eye, RefreshCw, RefreshCwOff, Trash2, XCircle } from "lucide-react";

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
import { useApproveTutor, useRejectTutor, useTutorRequests } from "@/hooks/tutor/useTutor";
import { useDebounce } from "@/lib/utils";
import TutorDetailsModal from "./TutorDetails";
import { toast } from "sonner";
import { useToggleUserStatus } from "@/hooks/public/useAuth";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import ConfirmDialog from "@/components/common/ConfirmDialog";


const statusColor = {
  APPROVED: "bg-green-100 text-green-700",
  PENDING_REVIEW: "bg-yellow-100 text-yellow-700",
  REJECTED: "bg-red-100 text-red-700",
  SUSPENDED: "bg-gray-200 text-gray-700",
};

export default function AdminselectedTutoruestsPage() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [rows, setRows] = useState([]);

  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError } = useTutorRequests({
    page,
    limit: 10,
    search: debouncedSearch
  })

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const { mutate: approveTutor, isLoading: isApproving } = useApproveTutor();

  const { mutate: rejectTutor, isLoading: isRejecting } = useRejectTutor();



  const viewDetails = (tutor) => {
    setSelectedTutor(tutor)
    setOpen(true)
  };

  const handleApprove = () => {
    approveTutor(selectedTutor?.id, {
      onSuccess: () => {
        toast.success("Tutor approved successfully!");
        setOpenApprove(false);
        setSelectedTutor(null);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
          "Failed to approve tutor"
        );
      },
    });
  };
  console.log(selectedTutor);


  const handleReject = () => {
    rejectTutor(selectedTutor?.id, {
      onSuccess: () => {
        toast.success("Tutor rejected successfully!");
        setOpenReject(false);
        setSelectedTutor(null);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
          "Failed to reject tutor"
        );
      },
    });
  };



  if (isError) {
    return (
      <div className="border rounded-lg bg-white p-6 text-center text-sm text-slate-500">
        Failed to load tutor requests
      </div>
    );
  }


  return (
    <div className="space-y-6">
      {/* ---------- PAGE HEADER ---------- */}
      <div>
        <h1 className="text-2xl font-semibold">
          Tutor Request Management
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage all requested tutor applications
        </p>
      </div>

      {/* ---------- SEARCH ---------- */}
      <Input
        placeholder="Search tutor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      {isLoading ? <TableSkeleton /> : <Card className="rounded-xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Account Status</TableHead>
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
                    No tutors found
                  </TableCell>
                </TableRow>
              ) : (rows?.data?.map((tutor) => (
                <TableRow key={tutor?.id}>
                  <TableCell className="font-medium">
                    {tutor?.name}
                  </TableCell>

                  <TableCell>{tutor?.email}</TableCell>

                  <TableCell>
                    {tutor?.phone}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[tutor.tutorStatus]
                        }`}
                    >
                      {tutor.tutorStatus.replace("_", " ")}
                    </span>
                  </TableCell>

                  <TableCell>
                    {tutor.isActive ? (
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
                          viewDetails(tutor)
                        }
                        className="bg-blue-100 p-1 rounded-md hover:bg-blue-200 hover:cursor-pointer"
                      >
                        <Eye className="h-5 w-5 text-blue-600" />
                      </Button>

                      {
                        tutor.tutorStatus === 'PENDING_REVIEW' && (
                          <>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setSelectedTutor(tutor);
                                setOpenApprove(true);
                              }}
                              className={`p-1 rounded-md hover:cursor-pointer text-green-600 bg-green-100 hover:bg-green-200 hover:text-green-700`}
                            >
                              <CheckCircle />
                            </Button>

                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setSelectedTutor(tutor);
                                setOpenReject(true);
                              }}
                              className={`p-1 rounded-md hover:cursor-pointer text-red-600 bg-red-100 hover:bg-red-200 hover:text-red-700`}
                            >
                              <XCircle />
                            </Button>
                          </>
                        )
                      }

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

      <TutorDetailsModal
        open={open}
        onClose={() => setOpen(false)}
        tutor={selectedTutor}
      />

      <ConfirmDialog
        open={openApprove}
        onOpenChange={setOpenApprove}
        title="Approve Tutor Application?"
        description="This tutor will be approved and allowed to teach on the platform."
        onConfirm={handleApprove}
        confirmLoading={isApproving}
        confirmVariant=""
      />


      <ConfirmDialog
        open={openReject}
        onOpenChange={setOpenReject}
        title="Reject Tutor Application?"
        description="This action cannot be undone. Please review carefully."
        onConfirm={handleReject}
        confirmLoading={isRejecting}
        confirmVariant="destructive"
      />


    </div>
  );
}
