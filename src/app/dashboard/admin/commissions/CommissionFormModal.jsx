"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    useCreateCommission,
    useUpdateCommission,
} from "@/hooks/admin/useCommission";
import { toast } from "sonner";

const DEFAULT_FORM = {
    appliesTo: "CLASS",
    type: "PERCENTAGE",
    value: "",
    status: "ACTIVE",
};

export default function CommissionFormModal({
    open,
    setOpen,
    commission,
}) {
    const isEdit = !!commission;

    const [form, setForm] = useState(DEFAULT_FORM);

    const createMutation = useCreateCommission();
    const updateMutation = useUpdateCommission();

    /* =========================
       PREFILL ON EDIT
    ========================= */
    useEffect(() => {
        if (commission) {
            const { appliesTo, type, value, status } = commission;

            setForm({
                appliesTo,
                type,
                value,
                status,
            });
        } else {
            setForm(DEFAULT_FORM);
        }
    }, [commission, open]);

    /* =========================
       SUBMIT
    ========================= */
    const submit = async () => {
        if (form.type === "PERCENTAGE" && Number(form.value) > 100) {
            toast.error("Percentage cannot exceed 100");
            return;
        }

        try {
            if (isEdit) {
                await updateMutation.mutateAsync({
                    id: commission.id,
                    payload: {
                        appliesTo: form.appliesTo,
                        type: form.type,
                        value: Number(form.value),
                        status: form.status,
                    },
                });

                toast.success("Commission updated successfully");
            } else {
                await createMutation.mutateAsync({
                    appliesTo: form.appliesTo,
                    type: form.type,
                    value: Number(form.value),
                    status: form.status,
                });

                toast.success("Commission created successfully");
            }

            setOpen(false);
            setForm(DEFAULT_FORM);
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                "Something went wrong";

            toast.error(message);
        }
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    console.log(isSubmitting);


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Commission" : "Create Commission"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Applies To */}
                    <select
                        className="w-full border p-2 rounded"
                        value={form.appliesTo}
                        onChange={(e) =>
                            setForm({ ...form, appliesTo: e.target.value })
                        }
                    >
                        <option value="CLASS">Class</option>
                        <option value="RESOURCE">Resource</option>
                    </select>

                    {/* Type */}
                    <select
                        className="w-full border p-2 rounded"
                        value={form.type}
                        onChange={(e) =>
                            setForm({ ...form, type: e.target.value })
                        }
                    >
                        <option value="PERCENTAGE">Percentage</option>
                        <option value="FIXED">Fixed</option>
                    </select>

                    {/* Value */}
                    <Input
                        type="number"
                        placeholder="Value"
                        value={form.value}
                        onChange={(e) =>
                            setForm({ ...form, value: e.target.value })
                        }
                    />

                    {/* Status */}
                    <select
                        className="w-full border p-2 rounded"
                        value={form.status}
                        onChange={(e) =>
                            setForm({ ...form, status: e.target.value })
                        }
                    >
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>

                    {/* Submit */}
                    <Button
                        className="w-full bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-70"
                        onClick={submit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting && (
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        )}

                        {isSubmitting
                            ? isEdit
                                ? "Updating..."
                                : "Creating..."
                            : isEdit
                                ? "Update"
                                : "Create"}
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    );
}
