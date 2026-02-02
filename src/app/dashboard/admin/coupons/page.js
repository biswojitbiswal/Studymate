"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useDebounce } from "@/lib/utils";

// coupon-specific
import CouponTable from "./CouponTable";
import CouponFormModal from "./CouponFormModal";
import { useCoupons } from "@/hooks/admin/useCoupon";

export default function CouponPage() {
  const [openForm, setOpenForm] = useState(false);
  const [editCoupon, setEditCoupon] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useCoupons({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold">Coupons</h1>
        <p className="text-sm text-slate-600">
          Manage discount coupons and promotions
        </p>
      </div>

      {/* Search + Create */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          placeholder="Search coupon by code or description..."
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
            setEditCoupon(null);
            setOpenForm(true);
          }}
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create Coupon</span>
        </Button>
      </div>

      {/* Error */}
      {isError && (
        <p className="text-sm text-red-600">
          Failed to load coupons
        </p>
      )}

      {/* Table */}
      <CouponTable
        data={data?.data?.data ?? []}
        loading={isLoading}
        page={page}
        setPage={setPage}
        total={Math.ceil((data?.data?.total ?? 0) / 10)}
        onEdit={(row) => {
          setEditCoupon(row);
          setOpenForm(true);
        }}
      />

      {/* Create / Edit Modal */}
      <CouponFormModal
        open={openForm}
        setOpen={setOpenForm}
        coupon={editCoupon}
      />
    </div>
  );
}
