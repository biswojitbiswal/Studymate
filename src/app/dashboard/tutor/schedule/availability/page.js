"use client";

import { useState } from "react";
import { useAvailability, useDeleteAvailability, useToggleAvailability } from "@/hooks/tutor/useAvailability";
import AvailabilityToolbar from "./AvailabilityToolbar";
import AvailabilityTable from "./AvailabilityTable";
import CreateAvailabilityDialog from "./CreateAvailabilityDialog";
import { toast } from "sonner";
import EditAvailabilityDialog from "./EditAvailabilityDialog";
import DeleteAvailabilityDialog from "./DeleteAvailabilityDialog";

export default function AvailabilityPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [editRow, setEditRow] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [dayOfWeek, setDayOfWeek] = useState("ALL");



    const safePage = Math.max(1, page);

    const { data, isLoading } = useAvailability({
        page: safePage,
        limit: 10,
        search,
        dayOfWeek: dayOfWeek !== "ALL" ? dayOfWeek : undefined,
    });

    const { mutate: toggleAvailability } = useToggleAvailability();

    function handleToggleAvailability(id) {
        toggleAvailability(id, {
            onSuccess: () => {
                toast.success("Availability status updated");
            },
            onError: (err) => {
                toast.error(
                    err?.response?.data?.message ||
                    "Failed to update availability"
                );
            },
        });
    }


    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                    Availability
                </h1>
                <p className="text-sm text-gray-500">
                    Manage your weekly availability slots
                </p>
            </div>

            {/* Toolbar */}
            <AvailabilityToolbar
                search={search}
                onSearchChange={(v) => {
                    setSearch(v);
                    setPage(1);
                }}
                onAdd={() => setOpen(true)}
                day={dayOfWeek}
                onDayChange={(day) => {
                    setPage(1); // reset pagination
                    setDayOfWeek(day);
                }}
            />

            {/* Table */}
            <AvailabilityTable
                loading={isLoading}
                data={data?.data?.data ?? []}
                page={page}
                totalPages={data?.totalPages ?? 1}
                onPageChange={setPage}
                onToggle={handleToggleAvailability}
                onEdit={(row) => setEditRow(row)}
                onDelete={(id) => setDeleteId(id)}
            />

            {
                open && <CreateAvailabilityDialog
                    open={open}
                    onClose={() => setOpen(false)}
                />
            }

            {editRow && (
                <EditAvailabilityDialog
                    open={!!editRow}
                    data={editRow}
                    onClose={() => setEditRow(null)}
                />
            )}

            {deleteId && (
                <DeleteAvailabilityDialog
                    open={!!deleteId}
                    availabilityId={deleteId}
                    onClose={() => setDeleteId(null)}
                />
            )}
        </div>


    );
}
