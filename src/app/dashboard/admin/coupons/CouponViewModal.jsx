"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function CouponViewModal({ open, setOpen, coupon }) {
  if (!coupon) return null;

  const Row = ({ label, value }) => (
    <div className="flex justify-between gap-4">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-right">
        {value ?? "-"}
      </span>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Coupon Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Row label="Code" value={coupon.code} />
          <Row label="Description" value={coupon.description} />

          <hr />

          <Row
            label="Discount"
            value={
              coupon.discountType === "PERCENTAGE"
                ? `${coupon.discountValue}%`
                : coupon.discountValue
            }
          />
          <Row label="Applies To" value={coupon.appliesTo} />
          <Row label="Class ID" value={coupon.classId} />

          <hr />

          <Row label="Min Order Value" value={coupon.minOrderValue} />
          <Row label="Max Discount" value={coupon.maxDiscount} />
          <Row label="Usage Limit" value={coupon.usageLimit} />
          <Row label="Per User Limit" value={coupon.perUserLimit} />

          <hr />

          <Row label="Starts At" value={coupon.startsAt?.slice(0, 10)} />
          <Row label="Ends At" value={coupon.endsAt?.slice(0, 10)} />

          <hr />

          <Row label="Status" value={coupon.status} />
          <Row label="Created At" value={coupon.createdAt?.slice(0, 10)} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
