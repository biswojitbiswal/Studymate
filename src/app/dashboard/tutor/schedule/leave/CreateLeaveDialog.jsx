import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function CreateLeaveDialog({ open, onClose, onSubmit, isPending }) {
    const [form, setForm] = useState({
        startDate: "",
        endDate: "",
        reason: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(form);
    };

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
                    <DialogTitle>Add Leave</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Start Date</label>
                        <input
                            type="date"
                            value={form.startDate}
                            onChange={(e) =>
                                setForm({ ...form, startDate: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">End Date</label>
                        <input
                            type="date"
                            value={form.endDate}
                            onChange={(e) =>
                                setForm({ ...form, endDate: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Reason</label>
                        <textarea
                            value={form.reason}
                            onChange={(e) =>
                                setForm({ ...form, reason: e.target.value })
                            }
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                        />
                    </div>

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
