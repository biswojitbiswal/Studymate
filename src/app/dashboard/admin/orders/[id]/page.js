"use client";

import { useParams, useRouter } from "next/navigation";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import { useAdminOrder } from "@/hooks/admin/useOrder";
import AdminOrderDetailsSkeleton from "@/components/skeleton/admin/AdminOrderDetails";

export default function AdminOrderDetailsPage() {

    const router = useRouter();
    const params = useParams();
    const orderId = params?.id;

    const { data, isLoading } = useAdminOrder(orderId);

    if (isLoading) return <AdminOrderDetailsSkeleton />;
    
    const order = data?.data;

    return (
        <div className="p-4 md:p-6 space-y-6">

            {/* Header */}

            <div className="flex items-center justify-between">
                <Button
                    variant="outline"
                    onClick={() => router.back()}
                    className="flex gap-2"
                >
                    <ArrowLeft size={16} />
                    Back
                </Button>

                <Badge className="bg-blue-600 text-white">
                    {order?.status}
                </Badge>
            </div>

            <h1 className="text-2xl font-bold">
                Order #{order?.orderNo}
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>

                <CardContent className="grid md:grid-cols-3 gap-6">

                    <div>
                        <p className="text-sm text-gray-500">Product Type</p>
                        <p className="font-medium">{order?.productType}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Order Date</p>
                        <p>{new Date(order?.createdAt).toLocaleDateString()}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="font-bold text-green-600">
                            ₹{order?.totalAmount}
                        </p>
                    </div>

                </CardContent>
            </Card>



            <Card>
                <CardHeader>
                    <CardTitle>Student</CardTitle>
                </CardHeader>

                <CardContent className="flex items-center gap-4">

                    <img
                        src={order?.user?.avatar}
                        className="w-12 h-12 rounded-full"
                    />

                    <div>
                        <p className="font-semibold">{order?.user?.name}</p>
                        <p className="text-sm text-gray-500">
                            {order?.user?.email}
                        </p>
                    </div>

                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                </CardHeader>

                <CardContent className="flex gap-6">

                    <img
                        src={order?.product?.previewImg}
                        className="w-24 rounded-lg"
                    />

                    <div>
                        <p className="font-semibold">
                            {order?.product?.title}
                        </p>

                        <p className="text-sm text-gray-500 mt-2">
                            Tutor: {order?.product?.tutor?.user?.name}
                        </p>

                        <p className="text-sm text-gray-500">
                            {order?.product?.tutor?.user?.email}
                        </p>

                    </div>

                </CardContent>
            </Card>


            {order?.coupon && order?.couponId && (
                <Card>
                    <CardHeader>
                        <CardTitle>Coupon</CardTitle>
                    </CardHeader>

                    <CardContent>

                        <p className="font-semibold">
                            {order?.coupon?.code}
                        </p>

                        <p className="text-sm text-gray-500">
                            Discount: ₹{order?.discountAmount}
                        </p>

                    </CardContent>
                </Card>
            )}


            <Card>
                <CardHeader>
                    <CardTitle>Price Breakdown</CardTitle>
                </CardHeader>

                <CardContent className="space-y-2">

                    <div className="flex justify-between">
                        <span>Base Price</span>
                        <span>₹{(order?.basePrice - order?.commissionAmount).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Commission</span>
                        <span className="text-blue-600 font-semibold">₹{order?.commissionAmount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Tax</span>
                        <span>₹{order?.taxAmount.toFixed(2)}</span>
                    </div>

                    {order?.discountAmount && (
                        <div className="flex justify-between text-red-500">
                            <span>Discount</span>
                            <span>-₹{order?.discountAmount.toFixed(2)}</span>
                        </div>
                    )}

                    <div className="flex justify-between text-green-600 font-bold border-t pt-2">
                        <span>Total</span>
                        <span>₹{order?.totalAmount.toFixed(2)}</span>
                    </div>

                </CardContent>
            </Card>


            <Card>
                <CardHeader>
                    <CardTitle>Transactions</CardTitle>
                </CardHeader>

                <CardContent>

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
                                                    : "bg-red-100 text-red-700"
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

                </CardContent>
            </Card>

        </div>
    );
}