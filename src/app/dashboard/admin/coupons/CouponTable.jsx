import { useState } from "react";
import { TableSkeleton } from "@/components/common/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Eye } from "lucide-react";
import CouponViewModal from "./CouponViewModal";

export default function CouponTable({
  data,
  loading,
  page,
  setPage,
  total,
  onEdit,
}) {
  const [openView, setOpenView] = useState(false);
  const [viewCoupon, setViewCoupon] = useState(null);

  return loading ? (
    <TableSkeleton />
  ) : (
    <>
      <div className="border rounded-lg overflow-x-auto bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Discount</TableHead>
              <TableHead className="text-center">Applies To</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No coupons found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.code}</TableCell>
                  <TableCell className="max-w-[250px] truncate">
                    {row.description || "-"}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.discountType === "PERCENTAGE"
                      ? `${row.discountValue}%`
                      : row.discountValue}
                  </TableCell>
                  <TableCell className="text-center">{row.appliesTo}</TableCell>

                  <TableCell className="text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${
                        row.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      {/* View */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setViewCoupon(row);
                          setOpenView(true);
                        }}
                        className="p-2 rounded-md text-green-600 hover:bg-green-100 hover:cursor-pointer"
                      >
                        <Eye size={16} />
                      </Button>

                      {/* Edit */}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(row)}
                        className="p-2 rounded-md text-blue-600 hover:bg-blue-100 hover:cursor-pointer"
                      >
                        <SquarePen size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-3 border-t text-sm">
          <span className="text-slate-500">
            Page {page} of {total}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <button
              disabled={page === total}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      <CouponViewModal
        open={openView}
        setOpen={setOpenView}
        coupon={viewCoupon}
      />
    </>
  );
}
