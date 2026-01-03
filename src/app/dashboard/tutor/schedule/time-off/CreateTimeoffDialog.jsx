"use client";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateTimeoffDialog({ open, onClose, onSubmit, isPending }) {
    const [form, setForm] = useState({
        date: "",
        startTime: "",
        endTime: "",
        reason: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(form);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Time Off</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                            setForm({ ...form, date: e.target.value })
                        }
                        required
                        className="w-full border rounded px-3 py-2"
                    />

                    <div className="flex gap-3">
                        <input
                            type="time"
                            value={form.startTime}
                            onChange={(e) =>
                                setForm({ ...form, startTime: e.target.value })
                            }
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                        <input
                            type="time"
                            value={form.endTime}
                            onChange={(e) =>
                                setForm({ ...form, endTime: e.target.value })
                            }
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <textarea
                        placeholder="Reason (optional)"
                        value={form.reason}
                        onChange={(e) =>
                            setForm({ ...form, reason: e.target.value })
                        }
                        className="w-full border rounded px-3 py-2"
                    />

                    <div className="flex justify-end gap-2">
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
