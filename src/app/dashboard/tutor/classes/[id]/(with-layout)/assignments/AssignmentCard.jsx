"use client";

import { useDeleteAssignment } from "@/hooks/tutor/useAssignments";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AssignmentCard({
    assignment,
    onView,
    onEdit,
    onDelete
}) {


    const statusColor = {
        TODO: "bg-gray-100 text-gray-600",
        ONGOING: "bg-yellow-100 text-yellow-700",
        COMPLETED: "bg-green-100 text-green-700"
    };

    return (
        <div className="flex items-center justify-between bg-white border rounded-md px-2 lg:px-4 py-2 shadow-sm">

            {/* Left Side */}
            <div className="flex items-center gap-3">


                <div>
                    <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800 max-w-[250px] truncate">
                            {assignment.title}
                        </p>

                        {assignment.dueDate && (
                            <div className="flex text-sm text-blue-600 px-2 bg-blue-100 rounded-sm">
                                <span className="hidden lg:block">Due:</span>
                                <span>{" "}{new Date(assignment.dueDate).toDateString()}
                                </span>
                            </div>
                        )}
                    </div>

                    {assignment.description && (
                        <p className="text-sm text-gray-600">
                            {assignment.description}
                        </p>
                    )}
                </div>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1 lg:gap-3">
                {/* View */}
                <button
                    onClick={() => onView?.(assignment)}
                    className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 hover:cursor-pointer"
                >
                    <Eye size={16} />
                </button>

                {/* Edit */}
                <button
                    onClick={() => onEdit?.(assignment)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 hover:cursor-pointer"
                >
                    <Pencil size={16} />
                </button>

                {/* Delete */}
                <button
                    onClick={() => onDelete?.(assignment)}
                    className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 hover:cursor-pointer"
                >
                    <Trash2 size={16} />
                </button>


            </div>

        </div>
    );
}