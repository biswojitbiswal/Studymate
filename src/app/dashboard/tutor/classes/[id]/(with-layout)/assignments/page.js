"use client";

import { useAssignments, useCreateAssignment, useDeleteAssignment, useUpdateAssignment } from "@/hooks/tutor/useAssignments";
import { useState } from "react";
import { toast } from "sonner";
import AssignmentCard from "./AssignmentCard";
import { useRouter } from "next/navigation";
import { CreateAssignmentModal } from "./CreateAssignmentModal";
import { useClassContext } from "../ClassContext";
import { EditAssignmentModal } from "./EditAssignmentModal";
import { DeleteAssignmentDialog } from "./DeleteAssignmentDialog";
import { useDebounce } from "@/lib/utils";
import {AssignmentCardSkeleton} from "@/components/skeleton/tutor/AssignmentSkeleton";

export default function AssignmentList() {
  const router = useRouter();

  const { klass } = useClassContext();

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, error } = useAssignments(klass?.id, {
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const createAssignment = useCreateAssignment();
  const updateAssignment = useUpdateAssignment();
  const deleteAssignment = useDeleteAssignment();


  const assignments = data?.data?.data?.assignments || [];


  const handleCreateAssignment = (data) => {
    createAssignment.mutate(
      {
        ...data,
        classId: klass?.id,
      },
      {
        onSuccess: () => {
          toast.success("Assignment created successfully");
          setOpenModal(false);
        },
        onError: () => {
          toast.error("Failed to create assignment");
        },
      }
    );
  };


  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setEditOpen(true);
  };

  const handleUpdateAssignment = (id, data) => {
    updateAssignment.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Assignment updated successfully");
          setEditOpen(false);
        },
        onError: () => {
          toast.error("Failed to update assignment");
        },
      }
    );
  };


  const handleDeleteClick = (assignment) => {
    setSelectedAssignment(assignment);
    setDeleteOpen(true);
  };


  const handleDeleteConfirm = () => {
    if (!selectedAssignment) return;

    deleteAssignment.mutate(selectedAssignment.id, {
      onSuccess: () => {
        toast.success("Assignment deleted successfully");
        setDeleteOpen(false);
        setSelectedAssignment(null);
      },
      onError: () => {
        toast.error("Failed to delete assignment");
      },
    });
  };

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

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:cursor-pointer"
        >
          <span>+ Add</span>
          <span className="hidden md:blocj">Assignment</span>
        </button>
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
            onView={(a) => router.push(`/dashboard/tutor/classes/${klass?.id}/assignments/${a.id}`)}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}

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


      {/* Create Assignment Modal */}
      <CreateAssignmentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateAssignment}
      />


      <EditAssignmentModal
        open={editOpen}
        assignment={selectedAssignment}
        onClose={setEditOpen}
        onSubmit={handleUpdateAssignment}
      />

      <DeleteAssignmentDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        loading={deleteAssignment.isPending}
      />

    </div>
  );
}