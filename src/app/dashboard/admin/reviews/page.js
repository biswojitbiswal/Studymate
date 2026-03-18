"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useDebounce } from "@/lib/utils";
import ReviewsTable from "./ReviewsTable";
import { useGetAllReviews } from "@/hooks/public/useReview";

export default function TaxSettingPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useGetAllReviews
  ({
    page,
    limit: 10,
    search: debouncedSearch,
  });
  

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold">Rating & Reviews</h1>
        <p className="text-sm text-slate-600">
          Manage platform rating & reviews
        </p>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search reviews..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="flex-1"
        />

      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load tax settings
        </p>
      )}

      {/* Table */}
      <ReviewsTable
        data={data?.data?.data?.reviews ?? []}
        loading={isLoading}
        page={page}
        setPage={setPage}
        total={Math.ceil((data?.data?.data?.total ?? 0) / 10)}
      />
    </div>
  );
}
