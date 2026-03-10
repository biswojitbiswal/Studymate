"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export default function AssignmentDetailsModal({
    open,
    onClose,
    assignment
}) {

    const statusColor = {
        TODO: "bg-gray-100 text-gray-600",
        ONGOING: "bg-yellow-100 text-yellow-700",
        COMPLETED: "bg-green-100 text-green-700",
    };

    if (!assignment) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-full max-w-none p-4 sm:p-6
    rounded-t-2xl sm:rounded-lg top-auto left-0 right-0 bottom-0 translate-x-0 translate-y-0 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] max-h-[90vh] overflow-y-auto sm:max-w-sm sm:max-h-fit pb-18">

                <DialogHeader>
                    <DialogTitle>
                        {assignment.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {assignment.dueDate && (
                        <p className="text-sm text-blue-600">
                            Due: {new Date(assignment.dueDate).toDateString()}
                        </p>
                    )}

                    <span
                        className={`text-xs font-medium px-3 py-1 rounded-md ${statusColor[assignment.status]}`}
                    >
                        {assignment.status}
                    </span>

                    <p className="text-gray-600 pt-2">
                        {assignment.description || "---"}
                    </p>

                </div>

            </DialogContent>
        </Dialog>
    );
}