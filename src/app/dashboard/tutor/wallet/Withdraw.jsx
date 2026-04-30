"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useWithdraw } from "@/hooks/tutor/useWallet";
import { toast } from "sonner";

export default function WithdrawModal({ open, onClose, wallet }) {
    const { mutate, isPending } = useWithdraw();

    const [form, setForm] = useState({
        amount: "",
        method: "UPI",
        accountName: "",
        accountNumber: "",
        ifsc: "",
        upiId: "",
    });

    const handleChange = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = () => {
        const amount = Number(form.amount);

        if (!amount || amount <= 0) {
            return toast.error("Enter valid amount");
        }

        // if (amount * 100 > (wallet?.availableBalance || 0)) {
        //     return toast.error("Insufficient balance");
        // }

        if (form.method === "UPI") {
            if (!form.upiId) {
                return toast.error("UPI ID required");
            }
        }

        if (form.method === "BANK_TRANSFER") {
            if (!form.accountName || !form.accountNumber || !form.ifsc) {
                return toast.error("Complete bank details required");
            }
        }

        if(form.method === "BANK_TRANSFER" && form.accountNumber.length !== 16){
            return toast.error("Account number must be 16 digit");
        }

        mutate(
            {
                amount: amount,
                method: form.method,
                accountName: form.accountName,
                accountNumber: form.accountNumber,
                ifsc: form.ifsc,
                upiId: form.upiId,
            },
            {
                onSuccess: () => {
                    toast.success("Withdrawal successful");
                    onClose();
                },
                onError: (err) => {
                    toast.error(err?.response?.data?.message || "Failed to withdraw");
                }
            }
        );
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg px-3 md:px-6 py-3 space-y-1 m-2">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Withdraw Money</h2>
                    <button onClick={onClose} className="hover:cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* Wallet Details */}
                <div className="bg-gray-50 border rounded-lg p-3 flex justify-between text-sm">
                    <div>
                        <p className="text-gray-500">Available</p>
                        <p className="font-semibold text-green-600">
                            ₹{((wallet?.availableBalance || 0)).toFixed(2)}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Pending</p>
                        <p className="font-semibold text-yellow-600">
                            ₹{((wallet?.pendingBalance || 0)).toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Amount */}
                <div>
                    <label className="text-sm">Amount (₹)</label>
                    <input
                        type="number"
                        value={form.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2"
                    />
                </div>

                {/* Method */}
                <div>
                    <label className="text-sm">Method</label>
                    <select
                        value={form.method}
                        onChange={(e) => handleChange("method", e.target.value)}
                        className="w-full mt-1 border rounded-lg px-3 py-2"
                    >
                        <option value="UPI">UPI</option>
                        <option value="BANK_TRANSFER">Bank Transfer</option>
                    </select>
                </div>

                {/* UPI */}
                {form.method === "UPI" && (
                    <div>
                        <label className="text-sm">UPI ID</label>
                        <input
                            value={form.upiId}
                            onChange={(e) => handleChange("upiId", e.target.value)}
                            className="w-full mt-1 border rounded-lg px-3 py-2"
                        />
                    </div>
                )}

                {/* Bank Fields */}
                {form.method === "BANK_TRANSFER" && (
                    <>
                        <Input label="Account Name" value={form.accountName} onChange={(v) => handleChange("accountName", v)} />
                        <Input label="Account Number" value={form.accountNumber} onChange={(v) => handleChange("accountNumber", v)} />
                        <Input label="IFSC Code" value={form.ifsc} onChange={(v) => handleChange("ifsc", v)} />
                    </>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="px-4 py-2 border rounded hover:cursor-pointer">
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:cursor-pointer"
                    >
                        {isPending ? "Processing..." : "Withdraw"}
                    </button>
                </div>
            </div>
        </div>
    );
}


function Input({ label, value, onChange }) {
    return (
        <div>
            <label className="text-sm">{label}</label>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2"
            />
        </div>
    );
}