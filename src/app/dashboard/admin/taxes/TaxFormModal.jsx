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
import { toast } from "sonner";
import { useCreateTax, useUpdateTax } from "@/hooks/admin/useTax";

const DEFAULT_FORM = {
  name: "",
  value: "",
  status: "ACTIVE",
};

export default function TaxFormModal({
  open,
  setOpen,
  tax,
}) {
  const isEdit = !!tax;

  const [form, setForm] = useState(DEFAULT_FORM);

  const createMutation = useCreateTax();
  const updateMutation = useUpdateTax();

  /* =========================
     PREFILL ON EDIT
  ========================= */
  useEffect(() => {
    if (tax) {
      const { name, value, status } = tax;

      setForm({
        name,
        value,
        status,
      });
    } else {
      setForm(DEFAULT_FORM);
    }
  }, [tax, open]);

  /* =========================
     SUBMIT
  ========================= */
  const submit = async () => {
    if (Number(form.value) < 0) {
      toast.error("Tax value cannot be negative");
      return;
    }

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: tax.id,
          payload: {
            name: form.name.trim(),
            value: Number(form.value),
            status: form.status,
          },
        });

        toast.success("Tax updated successfully");
      } else {
        await createMutation.mutateAsync({
          name: form.name.trim(),
          value: Number(form.value),
          status: form.status,
        });

        toast.success("Tax created successfully");
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

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Tax" : "Create Tax"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
          <Input
            placeholder="Tax name (e.g. GST, VAT)"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          {/* Value */}
          <Input
            type="number"
            placeholder="Tax value (%)"
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
