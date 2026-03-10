"use client";

import { useAssignments, useStudentAssignments, useUpdateAssignmentStatus } from "@/hooks/tutor/useAssignments";
import { useState } from "react";
import { toast } from "sonner";
import AssignmentCard from "./AssignmentCard";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/lib/utils";
import { AssignmentCardSkeleton } from "@/components/skeleton/student/AssignmentSkeleton";
import { useEnrolledClassContext } from "../EnrolledClassContext";
import AssignmentDetailsModal from "./AssignmentDetails";

export default function AssignmentList() {
  const router = useRouter();

  const { klass } = useEnrolledClassContext();

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");

  const [openDetails, setOpenDetails] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);


  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useStudentAssignments({
    page,
    limit: 10,
    search: debouncedSearch,
    classId: klass?.id,
  });


  const updateStatus = useUpdateAssignmentStatus();

  const handleToggleComplete = (assignment) => {
    const newStatus =
      assignment.status === "COMPLETED"
        ? "TODO"
        : "COMPLETED";

    updateStatus.mutate(
      { id: assignment.id, data: { status: newStatus } },
      {
        onSuccess: () => toast.success("Status updated"),
        onError: () => toast.error("Failed to update status"),
      }
    );
  };


  const handleUpdateStatus = (assignment, newStatus) => {
    updateStatus.mutate(
      {
        id: assignment.id,
        data: { status: newStatus }
      },
      {
        onSuccess: () => toast.success("Status updated successfully"),
        onError: () => toast.error("Failed to update status")
      }
    );
  };


  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setOpenDetails(true);
  };

  const assignments = data?.data?.data?.tasks || [];

  return (
    <div className="space-y-2 lg:space-y-6 max-w-3xl mx-auto">

      {/* Top Bar */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search assignments..."
          className="flex-1 border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col gap-2">
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
          <AssignmentCardSkeleton />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-red-500">Failed to load assignments</p>
      )}

      {/* Empty */}
      {!isLoading && assignments.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          No assignments found.
        </div>
      )}


      {/* Assignment List */}
      <div className="space-y-3">
        {assignments?.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            handleView={handleView}
            onToggleComplete={handleToggleComplete}
            onUpdateStatus={handleUpdateStatus}
          />
        ))}


        {openDetails && <AssignmentDetailsModal
          open={openDetails}
          onClose={setOpenDetails}
          assignment={selectedAssignment}
        />}

        {!isLoading && data?.data?.data?.totalPages > 0 && (
          <div className="flex items-center justify-between pt-3">

            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              ← Previous
            </button>

            <div className="text-sm text-gray-600">
              Page <span className="font-medium">{page}</span> of{" "}
              <span className="font-medium">{data?.data?.data?.totalPages}</span>
            </div>

            <button
              onClick={() => setPage(p => Math.min(p + 1, data?.data?.data?.totalPages))}
              disabled={page === data?.data?.data?.totalPages}
              className="px-3 py-1.5 text-sm rounded-md border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next →
            </button>

          </div>
        )}
      </div>
    </div>
  );
}