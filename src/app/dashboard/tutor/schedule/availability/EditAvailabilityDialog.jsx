"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUpdateAvailability } from "@/hooks/tutor/useAvailability";
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

export default function EditAvailabilityDialog({ open, onClose, data }) {
    const { mutateAsync, isPending } = useUpdateAvailability();

    const [form, setForm] = useState({
        dayOfWeek: "",
        startTime: "",
        endTime: "",
        timeZone: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (data) {
            setForm({
                dayOfWeek: data.dayOfWeek,
                startTime: data.startTime,
                endTime: data.endTime,
                timeZone: data.timeZone,
            });
        }
    }, [data]);

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
            await mutateAsync({
                id: data.id,
                data: form,
            });
            toast.success("Availability updated");
            onClose();
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                "Failed to update availability"
            );
        }
    }

    if (!data) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="
    w-full max-w-none
    p-4 sm:p-6
    rounded-t-2xl sm:rounded-lg

    top-auto left-0 right-0 bottom-0 translate-x-0 translate-y-0
    sm:top-[50%] sm:left-[50%]
    sm:translate-x-[-50%] sm:translate-y-[-50%]

    max-h-[90vh] overflow-y-auto
    sm:max-w-sm sm:max-h-fit">
                <DialogHeader>
                    <DialogTitle>Edit Availability</DialogTitle>
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

                    {/* Timezone */}
                    <Input value={form.timeZone} disabled />

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>

                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Saving..." : "Update"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
