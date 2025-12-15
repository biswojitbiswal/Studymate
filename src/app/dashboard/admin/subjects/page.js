"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SubjectTable from "./SubjectTable";
import SubjectFormModal from "./SubjectFormModal";
import { useSubjects } from "@/hooks/admin/useSubject";
import { useDebounce } from "@/lib/utils";

export default function SubjectPage() {
  const [openForm, setOpenForm] = useState(false);
  const [editSubject, setEditSubject] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useSubjects({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Subject Management</h1>
        <p className="text-sm text-slate-600">
          Manage all academic Subject
        </p>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search Subject..."
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
            setEditSubject(null);
            setOpenForm(true);
          }}
        >
          Create Subject
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load subjects
        </p>
      )}

      {/* Table */}
      <SubjectTable
        data={data?.data.data ?? []}
        loading={isLoading}
        page={page}
        setPage={setPage}
        total={data?.data?.totalPages ?? 0}
        onEdit={(subject) => {
          setEditSubject(subject);
          setOpenForm(true);
        }}
      />

      {/* Create / Edit Modal */}
      <SubjectFormModal
        open={openForm}
        setOpen={setOpenForm}
        subject={editSubject}
      />
    </div>
  );
}
