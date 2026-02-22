"use client";
import { useCreateTimeoff, useDeleteTimeoff, useTimeoff } from "@/hooks/tutor/useTimeoff";
import { useState } from "react";
import CreateTimeoffDialog from "./CreateTimeoffDialog";
import TimeoffTable from "./TimeoffTable";
import TimeoffToolbar from "./TimeoffToolbar";
import DeleteTimeoffDialog from "./DeleteTimeoffDialog";
import { toast } from "sonner";

export default function TimeOffPage() {
  const [page, setPage] = useState(1);
  const [openCreate, setOpenCreate] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const { data, isLoading } = useTimeoff({
    page,
    limit: 10,
    fromDate: fromDate || undefined,
    toDate: toDate || undefined,
  });
  const { mutateAsync: createTimeoff, isPending } = useCreateTimeoff();
  const { mutateAsync: deleteTimeoff } = useDeleteTimeoff();

  const handleCreate = async (form) => {
    try {
      await createTimeoff(form);
      toast.success("Time-off created successfully");
      setOpenCreate(false);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to create time-off"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTimeoff(deleteId);
      toast.success("Time-off deleted successfully");
      setDeleteId(null);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to delete time-off"
      );
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row items-start justify-between gap-3">
        <div className="">
          <h1 className="text-2xl font-semibold text-gray-900">
            Time Off
          </h1>
          <p className="text-sm text-gray-500">
            Add partial breaks for specific dates and time ranges.
          </p>
        </div>

        <TimeoffToolbar
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

      <TimeoffTable
        loading={isLoading}
        data={data?.data?.data ?? []}
        page={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={setPage}
        onDelete={(id) => setDeleteId(id)}
      />

      {openCreate && (
        <CreateTimeoffDialog
          open={openCreate}
          onClose={() => setOpenCreate(false)}
          onSubmit={handleCreate}
          isPending={isPending}
        />
      )}

      {deleteId && (
        <DeleteTimeoffDialog
          open={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
