"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateSession } from "@/hooks/public/useSession";
import { toast } from "sonner";
import { useEnrolledClassContext } from "@/app/dashboard/student/learning/[id]/(with-layout)/EnrolledClassContext";

export default function CreateSessionModal({ open, onClose, type }) {
    const { klass } = useEnrolledClassContext();
    const { mutate, isPending } = useCreateSession();

    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [durationMin, setDurationMin] = useState(60);

    if (!open) return null;

    const handleSubmit = () => {
        if (!date || !startTime || !durationMin) return;

        mutate(
            {
                classId: klass.id,
                date,
                startTime,
                durationMin: Number(durationMin),
                sessionType: type, // EXTRA or DOUBT or REGULAR(PRIVATE)
            },
            {
                onSuccess: () => {
                    onClose();
                    toast.success(`${type} session created successfully`)
                    setDate("");
                    setDurationMin(null)
                    setStartTime(null)
                },
                onError: (error) => {
                    const message =
                        error?.response?.data?.message ||
                        "Something went wrong. Please try again.";

                    toast.error(message);
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

            {/* Modal */}
            <div className="bg-white rounded-xl w-full max-w-md p-5 space-y-4">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-lg">
                        {type === "EXTRA" ? "Create Extra Session" : "Create Doubt Session"}
                    </h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Date */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />
                </div>

                {/* Time */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Start Time</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />
                </div>

                {/* Duration */}
                <div className="space-y-1">
                    <label className="text-sm text-gray-600">Duration (minutes)</label>
                    <input
                        type="number"
                        min={15}
                        step={5}
                        value={durationMin}
                        onChange={(e) => setDurationMin(e.target.value)}
                        className="w-full border rounded-md px-3 py-2 text-sm"
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-2 pt-2 hover:cursor-pointer">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                    >
                        {isPending ? "Creating..." : "Create Session"}
                    </Button>
                </div>
            </div>
        </div>
    );
}