"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCommissions } from "@/hooks/admin/useCommission";
import { useDebounce } from "@/lib/utils";
import CommissionTable from "./CommissionTable";
import CommissionFormModal from "./CommissionFormModal";
import { Plus } from "lucide-react";

export default function CommissionPage() {
    const [openForm, setOpenForm] = useState(false);
    const [editCommission, setEditCommission] = useState(null);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, 400);

    const { data, isLoading, isError } = useCommissions({
        page,
        limit: 10,
        search: debouncedSearch,
    });
    console.log(data);


    return (
        <div className="space-y-6">
            {/* Title */}
            <div>
                <h1 className="text-2xl font-semibold">Commission Settings</h1>
                <p className="text-sm text-slate-600">
                    Manage platform commission rules
                </p>
            </div>

            {/* Search + Create */}
            <div className="flex flex-col sm:flex-row gap-3">
                <Input
                    placeholder="Search commission..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="flex-1"
                />

                <Button
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    onClick={() => {
                        setEditCommission(null);
                        setOpenForm(true);
                    }}
                >
                    <Plus className="h-4 w-4" />
                    <span className="hidden sm:inline">Create Commission</span>
                </Button>

            </div>

            {/* Error */}
            {isError && (
                <p className="text-sm text-red-600">
                    Failed to load commissions
                </p>
            )}

            {/* Table */}
            <CommissionTable
                data={data?.data?.data ?? []}
                loading={isLoading}
                page={page}
                setPage={setPage}
                total={data?.data?.totalPages ?? 0}
                onEdit={(row) => {
                    setEditCommission(row);
                    setOpenForm(true);
                }}
            />

            {/* Create / Edit Modal */}
            <CommissionFormModal
                open={openForm}
                setOpen={setOpenForm}
                commission={editCommission}
            />
        </div>
    );
}
