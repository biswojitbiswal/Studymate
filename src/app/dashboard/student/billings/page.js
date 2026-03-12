"use client";

import { useMyOrders } from "@/hooks/student/useOrder";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { TableSkeleton } from "@/components/common/TableSkeleton";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(null);

  const { data, isLoading } = useMyOrders({
    page,
    limit: 10,
    search,
    status,
  });

  const orders = data?.data?.orders || [];

  return (
    <div className="p-6">

      {/* Heading */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold">My Billings</h1>
        <p className="text-gray-500">
          View and manage all your purchases
        </p>
      </div>

      {/* Search + Filter */}
      <div className="w-full flex items-center justify-between gap-3 mb-4">

        <input
          type="text"
          placeholder="Search order number..."
          className="border flex-1 rounded-lg px-4 py-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-4 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="FAILED">Failed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? <TableSkeleton /> : <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Order No</TableHead>
              <TableHead className="text-center">Product Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Date</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

            {orders?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No orders found
                </TableCell>
              </TableRow>
            ) : (
              orders?.map((order) => (
                <TableRow
                  key={order?.id}
                  className="hover:bg-gray-50 transition"
                >
                  <TableCell className="font-medium text-gray-900">
                    {order?.orderNo}
                  </TableCell>

                  <TableCell className="text-gray-700 text-center">
                    {order?.productType}
                  </TableCell>

                  <TableCell>
                    <Badge
                      className={`text-xs ${order?.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : order?.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}
                    >
                      {order?.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-center font-semibold text-green-600">
                    ₹{order?.totalAmount.toFixed(2)}
                  </TableCell>

                  <TableCell className="text-gray-700 text-center">
                    {order?.createdAt?.split("T")[0]}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-2">

                      <Button
                        size="icon"
                        variant="outline"
                        title="View"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:cursor-pointer"
                        onClick={() => console.log(order?.id)}
                      >
                        <Eye size={16} />
                      </Button>

                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}

          </TableBody>
        </Table>}
      </div>

<div className="flex items-center justify-between p-3 border-t text-sm">
          <span className="text-slate-500">
            Page {page} of {data?.data?.totalPages}
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
              disabled={page === data?.data?.totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      {/* Pagination */}
      {/* <div className="flex justify-end gap-2 mt-4">
        <button
          className="px-4 py-2 border rounded-lg"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>

        <button
          className="px-4 py-2 border rounded-lg"
          disabled={page >= data?.totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>

      </div> */}

    </div>
  );
}