"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageTable from "./LanguageTable";
import LanguageFormModal from "./LanguageFormModal";
import { useLanguages } from "@/hooks/admin/useLanguage";
import { useDebounce } from "@/lib/utils";

export default function LanguagePage() {
  const [openForm, setOpenForm] = useState(false);
  const [editLanguage, setEditLanguage] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useLanguages({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Language Management</h1>
        <p className="text-sm text-slate-600">
          Manage all academic languages
        </p>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search language..."
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
            setEditLanguage(null);
            setOpenForm(true);
          }}
        >
          Create Language
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load languages
        </p>
      )}

      {/* Table */}
      <LanguageTable
        data={data?.data.data ?? []}
        loading={isLoading}
        page={page}
        setPage={setPage}
        total={data?.data?.totalPages ?? 0}
        onEdit={(language) => {
          setEditLanguage(language);
          setOpenForm(true);
        }}
      />

      {/* Create / Edit Modal */}
      <LanguageFormModal
        open={openForm}
        setOpen={setOpenForm}
        language={editLanguage}
      />
    </div>
  );
}
