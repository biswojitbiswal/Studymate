"use client";

import { useParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useStudentOrder } from "@/hooks/student/useOrder";
import { ArrowLeft } from "lucide-react";
import OrderDetailsSkeleton from "@/components/skeleton/student/OrderDetailsSkeleton";

export default function OrderDetailsPage() {
    const router = useRouter()
    const params = useParams();
    const orderId = params?.id;

    const { data, isLoading } = useStudentOrder(orderId);

    if (isLoading) {
        return <OrderDetailsSkeleton />;
    }

    const order = data?.data;

    return (
        <div className="p-2 md:p-6 space-y-2">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer mb-2"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Order #{order?.orderNo}
                </h1>

                <p className="text-gray-500">
                    View complete details of your order
                </p>
            </div>

            {/* Order Summary */}
            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="grid md:grid-cols-3 gap-2 lg:gap-6">

                    <div>
                        <p className="text-sm text-gray-500">Status</p>

                        <Badge className="bg-blue-600 text-white mt-1">
                            {order?.status}
                        </Badge>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p className="font-medium">
                            {new Date(order?.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-bold text-lg text-green-600">
                            ₹{order?.totalAmount.toFixed(2)}
                        </p>
                    </div>

                </CardContent>
            </Card>

            {/* Product Details */}
            <Card>
                <CardHeader>
                    <CardTitle>Product Details</CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">Product Type</p>
                        <p className="font-medium">{order?.productType}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Title</p>
                        <p className="font-medium">
                            {order?.product?.title || "Product"}
                        </p>
                    </div>

                </CardContent>
            </Card>

            {/* Price Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>Price Breakdown</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">

                    <div className="flex justify-between">
                        <span>Base Price</span>
                        <span>₹{order?.basePrice.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Commission</span>
                        <span>₹{order?.commissionAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Tax ({order?.tax}%)</span>
                        <span>₹{order?.taxAmount.toFixed(2)}</span>
                    </div>

                    {order?.discountAmount && (
                        <div className="flex justify-between text-red-500">
                            <span>Discount</span>
                            <span>-₹{order?.discountAmount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total Paid</span>
                        <span className="text-green-600">
                            ₹{order?.totalAmount.toFixed(2)}
                        </span>
                    </div>

                </CardContent>
            </Card>

            {/* Transactions */}
            <Card>
                <CardHeader>
                    <CardTitle>Payment Transactions</CardTitle>
                </CardHeader>

                <CardContent>

                    {/* Desktop Table */}
                    <div className="hidden md:block">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Provider</TableHead>
                                    <TableHead>Payment ID</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Date</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {order?.transactions?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6">
                                            No transactions found
                                        </TableCell>
                                    </TableRow>
                                )}

                                {order?.transactions?.map((tx) => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.provider}</TableCell>

                                        <TableCell>
                                            {tx.providerPaymentId || "-"}
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                className={
                                                    tx.status === "SUCCESS"
                                                        ? "bg-green-100 text-green-700"
                                                        : tx.status === "FAILED"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                }
                                            >
                                                {tx.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>₹{tx.amount}</TableCell>

                                        <TableCell>
                                            {new Date(tx.createdAt).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">

                        {order?.transactions?.length === 0 && (
                            <div className="text-center text-gray-500 py-6">
                                No transactions found
                            </div>
                        )}

                        {order?.transactions?.map((tx) => (
                            <div
                                key={tx.id}
                                className="p-2 space-y-2"
                            >
                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">Provider</span>
                                    <span className="font-medium">{tx.provider}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">
                                        Payment ID
                                    </span>
                                    <span className="font-medium text-xs">
                                        {tx.providerPaymentId || "-"}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">
                                        Status
                                    </span>

                                    <Badge
                                        className={
                                            tx.status === "SUCCESS"
                                                ? "bg-green-100 text-green-700"
                                                : tx.status === "FAILED"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                        }
                                    >
                                        {tx.status}
                                    </Badge>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">
                                        Amount
                                    </span>
                                    <span className="font-semibold">
                                        ₹{tx.amount}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500 text-sm">
                                        Date
                                    </span>
                                    <span>
                                        {new Date(tx.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        ))}

                    </div>

                </CardContent>
            </Card>

        </div>
    );
}