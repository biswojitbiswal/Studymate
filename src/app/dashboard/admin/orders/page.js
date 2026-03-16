"use client";

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
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/admin/useOrder";

export default function OrdersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState('ALL');

  const router = useRouter()

  const { data, isLoading } = useOrders({
    page,
    limit: 10,
    search,
    status,
  });


  const orders = data?.data?.orders || [];

  return (
    <div className="p-1 lg:p-6">

      <div className="mb-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
        <p className="text-gray-500">
          View and manage all orders
        </p>
      </div>

      <div className="w-full flex items-center justify-between gap-1 lg:gap-3 mb-4">

        <input
          type="text"
          placeholder="Search order number..."
          className="border flex-1 rounded-lg px-4 py-2 w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-2 lg:px-4 py-2"
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

      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Order No</TableHead>
                <TableHead>Customer</TableHead>
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
                  <TableRow key={order.id} className="hover:bg-gray-50 transition">
                    <TableCell className="font-medium text-gray-900">
                      {order?.orderNo}
                    </TableCell>

                    <TableCell>
                      {order?.user?.name}
                    </TableCell>

                    <TableCell className="text-center">
                      <p>{order?.productType}</p>
                      <p>{order?.product?.title}</p>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={`text-xs hover:cursor-pointer ${order.status === "PAID"
                          ? "bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
                          : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-600 hover:text-black"
                            : "bg-red-100 text-red-700 hover:bg-red-600 hover:text-white"
                          }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-center font-semibold text-green-600">
                      ₹{order.totalAmount.toFixed(2)}
                    </TableCell>

                    <TableCell className="text-center">
                      {order.createdAt.split("T")[0]}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-center">
                        <Button
                          size="icon"
                          variant="outline"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50 hover:cursor-pointer"
                          onClick={() =>
                            router.push(`/dashboard/admin/orders/${order.id}`)
                          }
                        >
                          <Eye size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <div className="md:hidden space-y-4">

        {orders?.length === 0 && (
          <div className="text-center text-gray-500 py-6">
            No orders found
          </div>
        )}

        {orders?.map((order) => (
          <div
            key={order.id}
            className="bg-white border rounded-xl p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-gray-900">
                {order.orderNo}
              </p>

              <Badge
                className={`text-xs ${order.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
              >
                {order.status}
              </Badge>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Product</span>
              <span>{order.productType}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold text-green-600">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span>{order.createdAt.split("T")[0]}</span>
            </div>

            <Button
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() =>
                router.push(`/dashboard/admin/orders/${order.id}`)
              }
            >
              View Order
            </Button>
          </div>
        ))}
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

    </div>
  );
}