"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import BoardTable from "./BoardTable";
import BoardFormModal from "./BoardFormModal";
import { useBoards } from "@/hooks/admin/useBoard";
import { useDebounce } from "@/lib/utils";

export default function BoardPage() {
  const [openForm, setOpenForm] = useState(false);
  const [editBoard, setEditBoard] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useBoards({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Board Management</h1>
        <p className="text-sm text-slate-600">
          Manage all academic boards
        </p>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search board..."
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
            setEditBoard(null);
            setOpenForm(true);
          }}
        >
          Create Board
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load boards
        </p>
      )}

      {/* Table */}
      <BoardTable
        data={data?.data.data ?? []}
        loading={isLoading}
        page={page}
        setPage={setPage}
        total={data?.data?.totalPages ?? 0}
        onEdit={(board) => {
          setEditBoard(board);
          setOpenForm(true);
        }}
      />

      {/* Create / Edit Modal */}
      <BoardFormModal
        open={openForm}
        setOpen={setOpenForm}
        board={editBoard}
      />
    </div>
  );
}
