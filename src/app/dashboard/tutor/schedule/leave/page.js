"use client";

import { useState } from "react";
import { useLeave, useCreateLeave, useDeleteLeave } from "@/hooks/tutor/useLeave";
import LeaveToolbar from "./LeaveToolbar";
import LeaveTable from "./LeaveTable";
import CreateLeaveDialog from "./CreateLeaveDialog";
import DeleteLeaveDialog from "./DeleteLeaveDialog";
import { toast } from "sonner";

export default function LeavePage() {
  const [page, setPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data, isLoading } = useLeave({
    page,
    limit: 10,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });
  const { mutateAsync: createLeave, isPending } = useCreateLeave();
  const { mutateAsync: deleteLeave } = useDeleteLeave();

  const handleCreate = async (form) => {
    try {
      await createLeave(form);
      toast.success("Leave added successfully");
      setOpenCreate(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create leave");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteLeave(deleteId);
      toast.success("Leave deleted");
      setDeleteId(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete leave");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Leave</h1>
          <p className="text-sm text-gray-500">
            Manage full-day and multi-day leaves
          </p>
        </div>

        <LeaveToolbar
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={(val) => {
            setPage(1);
            setFromDate(val);
          }}
          onToDateChange={(val) => {
            setPage(1);
            setToDate(val);
          }}
          onAdd={() => setOpenCreate(true)}
        />
      </div>

      <LeaveTable
        loading={isLoading}
        data={data?.data?.data ?? []}
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        onDelete={(id) => setDeleteId(id)}
      />

      {openCreate && (
        <CreateLeaveDialog
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onSubmit={handleCreate}
          isPending={isPending}
        />
      )}

      {deleteId && (
        <DeleteLeaveDialog
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
