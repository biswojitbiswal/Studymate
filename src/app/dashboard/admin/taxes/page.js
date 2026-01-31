"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useDebounce } from "@/lib/utils";
import TaxTable from "./TaxTable";
import TaxFormModal from "./TaxFormModal";
import { useTaxes } from "@/hooks/admin/useTax";

export default function TaxSettingPage() {
  const [openForm, setOpenForm] = useState(false);
  const [editTax, setEditTax] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useTaxes
  ({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold">Tax Settings</h1>
        <p className="text-sm text-slate-600">
          Manage platform tax configurations
        </p>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search tax..."
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
            setEditTax(null);
            setOpenForm(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Tax</span>
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load tax settings
        </p>
      )}

      {/* Table */}
      <TaxTable
        data={data?.data?.data ?? []}
        loading={isLoading}
        page={page}
        setPage={setPage}
        total={Math.ceil((data?.data?.total ?? 0) / 10)}
        onEdit={(row) => {
          setEditTax(row);
          setOpenForm(true);
        }}
      />

      {/* Create / Edit Modal */}
      <TaxFormModal
        open={openForm}
        setOpen={setOpenForm}
        tax={editTax}
      />
    </div>
  );
}
