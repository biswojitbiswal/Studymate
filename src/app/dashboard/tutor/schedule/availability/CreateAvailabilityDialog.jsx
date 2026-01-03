"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateAvailability } from "@/hooks/tutor/useAvailability";
import { toast } from "sonner";


export const DAYS_OF_WEEK = [
  { label: "Monday", value: "MON" },
  { label: "Tuesday", value: "TUE" },
  { label: "Wednesday", value: "WED" },
  { label: "Thursday", value: "THU" },
  { label: "Friday", value: "FRI" },
  { label: "Saturday", value: "SAT" },
  { label: "Sunday", value: "SUN" },
];


export default function CreateAvailabilityDialog({ open, onClose }) {
  const { mutateAsync, isPending } = useCreateAvailability();

  const [form, setForm] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const [error, setError] = useState("");

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.dayOfWeek || !form.startTime || !form.endTime) {
      setError("All fields are required");
      return;
    }

    if (form.startTime >= form.endTime) {
      setError("Start time must be before end time");
      return;
    }

    try {
      await mutateAsync(form);
      toast.success("Availability created successfully")
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        "Failed to update availability"
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Availability</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Day */}
          <Select
            value={form.dayOfWeek}
            onValueChange={(v) => update("dayOfWeek", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select day" />
            </SelectTrigger>
            <SelectContent>
              {DAYS_OF_WEEK.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Time */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="time"
              value={form.startTime}
              onChange={(e) => update("startTime", e.target.value)}
            />
            <Input
              type="time"
              value={form.endTime}
              onChange={(e) => update("endTime", e.target.value)}
            />
          </div>

          {/* Timezone (readonly) */}
          <Input value={form.timeZone} disabled />

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button className="bg-blue-600 hover:bg-blue-700" type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
