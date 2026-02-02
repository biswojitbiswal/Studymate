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
import {
  useCreateCoupon,
  useUpdateCoupon,
} from "@/hooks/admin/useCoupon";

const DEFAULT_FORM = {
  code: "",
  description: "",
  discountType: "PERCENTAGE",
  discountValue: "",
  appliesTo: "CLASS",
  classId: "",
  minOrderValue: "",
  maxDiscount: "",
  usageLimit: "",
  perUserLimit: "",
  startsAt: "",
  endsAt: "",
  status: "INACTIVE",
};

export default function CouponFormModal({
  open,
  setOpen,
  coupon,
}) {
  const isEdit = !!coupon;

  const [form, setForm] = useState(DEFAULT_FORM);

  const createMutation = useCreateCoupon();
  const updateMutation = useUpdateCoupon();

  /* =========================
     PREFILL ON EDIT
  ========================= */
  useEffect(() => {
    if (coupon) {
      const {
        code,
        description,
        discountType,
        discountValue,
        appliesTo,
        classId,
        minOrderValue,
        maxDiscount,
        usageLimit,
        perUserLimit,
        startsAt,
        endsAt,
        status,
      } = coupon;

      setForm({
        code,
        description: description ?? "",
        discountType,
        discountValue,
        appliesTo,
        classId: classId ?? "",
        minOrderValue: minOrderValue ?? "",
        maxDiscount: maxDiscount ?? "",
        usageLimit: usageLimit ?? "",
        perUserLimit: perUserLimit ?? "",
        startsAt: startsAt ? startsAt.slice(0, 10) : "",
        endsAt: endsAt ? endsAt.slice(0, 10) : "",
        status,
      });
    } else {
      setForm(DEFAULT_FORM);
    }
  }, [coupon, open]);

  /* =========================
     SUBMIT
  ========================= */
  const submit = async () => {
    if (!form.code.trim()) {
      toast.error("Coupon code is required");
      return;
    }

    if (Number(form.discountValue) <= 0) {
      toast.error("Discount value must be greater than 0");
      return;
    }

    if (
      form.discountType === "PERCENTAGE" &&
      Number(form.discountValue) > 100
    ) {
      toast.error("Percentage discount cannot exceed 100");
      return;
    }

    if (
      form.startsAt &&
      form.endsAt &&
      new Date(form.startsAt) > new Date(form.endsAt)
    ) {
      toast.error("Start date cannot be after end date");
      return;
    }

    const payload = {
      code: form.code.trim().toUpperCase(),
      description: form.description || undefined,
      discountType: form.discountType,
      discountValue: Number(form.discountValue),
      appliesTo: form.appliesTo,
      classId: form.appliesTo === "CLASS" ? form.classId || undefined : undefined,
      minOrderValue: form.minOrderValue
        ? Number(form.minOrderValue)
        : undefined,
      maxDiscount: form.maxDiscount
        ? Number(form.maxDiscount)
        : undefined,
      usageLimit: form.usageLimit
        ? Number(form.usageLimit)
        : undefined,
      perUserLimit: form.perUserLimit
        ? Number(form.perUserLimit)
        : undefined,
      startsAt: form.startsAt || undefined,
      endsAt: form.endsAt || undefined,
      status: form.status,
    };

    try {
      if (isEdit) {
        await updateMutation.mutateAsync({
          id: coupon.id,
          payload,
        });

        toast.success("Coupon updated successfully");
      } else {
        await createMutation.mutateAsync(payload);

        toast.success("Coupon created successfully");
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
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Coupon" : "Create Coupon"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Code */}
          <Input
            placeholder="Coupon Code (e.g. SAVE10)"
            value={form.code}
            disabled={isEdit}
            onChange={(e) =>
              setForm({ ...form, code: e.target.value })
            }
          />

          {/* Description */}
          <Input
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* Discount Type */}
          <select
            className="w-full border p-2 rounded"
            value={form.discountType}
            onChange={(e) =>
              setForm({ ...form, discountType: e.target.value })
            }
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="FIXED">Fixed</option>
          </select>

          {/* Discount Value */}
          <Input
            type="number"
            placeholder="Discount value"
            value={form.discountValue}
            onChange={(e) =>
              setForm({ ...form, discountValue: e.target.value })
            }
          />

          {/* Applies To */}
          <select
            className="w-full border p-2 rounded"
            value={form.appliesTo}
            onChange={(e) =>
              setForm({ ...form, appliesTo: e.target.value })
            }
          >
            <option value="CLASS">Class</option>
            <option value="RESOURCES">Resources</option>
          </select>

          {/* Class ID (optional) */}
          {form.appliesTo === "CLASS" && (
            <Input
              placeholder="Class ID (optional)"
              value={form.classId}
              onChange={(e) =>
                setForm({ ...form, classId: e.target.value })
              }
            />
          )}

          {/* Min Order */}
          <Input
            type="number"
            placeholder="Min order value (optional)"
            value={form.minOrderValue}
            onChange={(e) =>
              setForm({ ...form, minOrderValue: e.target.value })
            }
          />

          {/* Max Discount */}
          <Input
            type="number"
            placeholder="Max discount (optional)"
            value={form.maxDiscount}
            onChange={(e) =>
              setForm({ ...form, maxDiscount: e.target.value })
            }
          />

          {/* Usage Limit */}
          <Input
            type="number"
            placeholder="Usage limit (optional)"
            value={form.usageLimit}
            onChange={(e) =>
              setForm({ ...form, usageLimit: e.target.value })
            }
          />

          {/* Per User Limit */}
          <Input
            type="number"
            placeholder="Per user limit (optional)"
            value={form.perUserLimit}
            onChange={(e) =>
              setForm({ ...form, perUserLimit: e.target.value })
            }
          />

          {/* Start Date */}
          <Input
            type="date"
            value={form.startsAt}
            onChange={(e) =>
              setForm({ ...form, startsAt: e.target.value })
            }
          />

          {/* End Date */}
          <Input
            type="date"
            value={form.endsAt}
            onChange={(e) =>
              setForm({ ...form, endsAt: e.target.value })
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
