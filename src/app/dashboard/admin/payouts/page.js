"use client";

import { useState } from "react";
import { ArrowLeft, Clock, Eye, Wallet, ArrowLeftRight, ChartNoAxesColumn } from "lucide-react";
import { useAllWithdrawals, useTutorWithdrawals, useWithdraw } from "@/hooks/tutor/useWallet";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/common/LoadingScreen";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { WalletCardSkeleton, WalletTableSkeleton } from "@/components/skeleton/tutor/WalletSkeleton";



function formatDate(date) {
    if (!date) return "-";

    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function maskAccountNumber(acc) {
    if (!acc) return "-";

    const str = acc.toString();
    const last4 = str.slice(-4);

    return "X".repeat(str.length - 4) + last4;
}

export default function PayoutPage() {
    const [openWithdraw, setOpenWithdraw] = useState(false);
    const [page, setPage] = useState(1);

    const router = useRouter()

    const { data, isLoading } = useAllWithdrawals({
        page,
        limit: 5,
    });
    

    const withdrawals = data?.data?.data?.withdrawals || [];



    return (
        <div className="p-2 space-y-4">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition cursor-pointer mb-2"
            >
                <ArrowLeft size={18} />
                <span className="text-sm font-medium">Back</span>
            </button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold">Tutor Payouts</h1>
                    <p className="text-gray-500 text-sm">
                        Track tutor earnings and manage withdrawals
                    </p>
                </div>

                {/* <button
                    onClick={() => setOpenWithdraw(true)}
                    disabled={wallet?.availableBalance <= 0}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow hover:cursor-pointer"
                >
                    Withdraw
                </button> */}
            </div>

            {/* Cards */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {isLoading ? (
                    <>
                        <WalletCardSkeleton />
                        <WalletCardSkeleton />
                        <WalletCardSkeleton />
                        <WalletCardSkeleton />
                    </>
                ) : (
                    <>
                        <Card title="Pending Amount" value={wallet?.pendingBalance} color="yellow" info="From purchased classes" Icon={Clock} />
                        <Card title="Available Balance" value={wallet?.availableBalance} color="green" info="Ready to withdraw" Icon={Wallet} />
                        <Card title="Total Withdrawn" value={wallet?.totalWithdrawn} color="blue" info="Total Withdrawls" Icon={ArrowLeftRight} />
                        <Card title="Total Earnings" value={wallet?.totalEarnings} color="purple" info="Total Earnings" Icon={ChartNoAxesColumn} />
                    </>
                )}

            </div> */}

            {/* Table */}
            <div className="bg-white rounded-xl shadow border overflow-hidden">
                <div className="p-4 border-b font-medium">Tutors Withdrawal History</div>

                <div className="overflow-x-auto">

                    <Table className="w-full text-sm">
                        <TableHeader className="bg-gray-50">
                            <TableRow className="text-gray-600">
                                <TableHead>Amount</TableHead>
                                <TableHead className="text-center">Method</TableHead>
                                <TableHead className="text-center">Account Holder Name</TableHead>
                                <TableHead className="text-center">Account Number</TableHead>
                                <TableHead className="text-center">IFSC Code</TableHead>
                                <TableHead className="text-center">Status</TableHead>
                                <TableHead className="text-center">Processed At</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading ? (
                                <WalletTableSkeleton rows={5} />
                            ) : withdrawals.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6">
                                        No withdrawals found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                withdrawals.map((w) => (
                                    <TableRow key={w.id}>
                                        <TableCell>₹{w.amount.toFixed(2)}</TableCell>

                                        <TableCell className="text-center">
                                            <span className="px-2 py-1 text-xs bg-gray-100 rounded">
                                                {w.method === 'BANK_TRANSFER' ? 'BANK' : 'UPI'}
                                            </span>
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {w.upiId || w.accountName}
                                        </TableCell>

                                        <TableCell className="text-center">{maskAccountNumber(w.accountNumber) || "__"}</TableCell>
                                        <TableCell className="text-center">{w.ifsc || "__"}</TableCell>

                                        <TableCell className="text-center">
                                            <StatusBadge status={w.status} />
                                        </TableCell>

                                        <TableCell className="text-center">
                                            {formatDate(w.processedAt)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center p-4 text-sm">
                    <span>
                        Page {data?.page} of {data?.totalPages}
                    </span>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <button
                            disabled={page === data?.totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


function Card({ title, value = 0, color, info, Icon }) {
    const colors = {
        yellow: "bg-yellow-50 text-yellow-600",
        green: "bg-green-50 text-green-600",
        blue: "bg-blue-50 text-blue-600",
        purple: "bg-purple-50 text-purple-600",
    };

    const icons = {
        yellow: "bg-yellow-200 text-yellow-600",
        green: "bg-green-200 text-green-600",
        blue: "bg-blue-200 text-blue-600",
        purple: "bg-purple-200 text-purple-600",
    };

    return (
        <div className={`flex items-start gap-2 p-4 rounded-xl shadow-sm ${colors[color]}`}>
            <div className={`p-2.5 rounded-md ${icons[color]}`}>
                {Icon && <Icon size={18} />}
            </div>
            <div className="gap-1">
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className={`text-xl font-semibold`}>
                    ₹{((value || 0)).toFixed(2)}
                </h2>
                <p className="text-sm text-gray-500">{info}</p>
            </div>
        </div>
    );
}



function StatusBadge({ status }) {
    const styles = {
        SUCCESS: "bg-green-100 text-green-600",
        FAILED: "bg-red-100 text-red-600",
    };

    return (
        <span className={`px-2 py-1 text-xs rounded ${styles[status]}`}>
            {status}
        </span>
    );
}