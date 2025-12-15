"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LevelTable from "./LevelTable";
import LevelFormModal from "./LevelFormModal";
import { useLevels } from "@/hooks/admin/useLevel";
import { useDebounce } from "@/lib/utils";

export default function LevelPage() {
  const [openForm, setOpenForm] = useState(false);
  const [editLevel, setEditLevel] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useLevels({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Level Management</h1>
        <p className="text-sm text-slate-600">
          Manage all academic Level
        </p>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search level..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset pagination on search
          }}
          className="flex-1"
        />

        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => {
            setEditLevel(null);
            setOpenForm(true);
          }}
        >
          Create Level
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load levels
        </p>
      )}

      {/* Table */}
      <LevelTable
        data={data?.data.data ?? []}
        loading={isLoading}
        page={page}
        setPage={setPage}
        total={data?.data?.totalPages ?? 0}
        onEdit={(level) => {
          setEditLevel(level);
          setOpenForm(true);
        }}
      />

      {/* Create / Edit Modal */}
      <LevelFormModal
        open={openForm}
        setOpen={setOpenForm}
        level={editLevel}
      />
    </div>
  );
}
