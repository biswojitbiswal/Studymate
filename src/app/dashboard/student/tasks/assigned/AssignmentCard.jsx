"use client";

import { Eye } from "lucide-react";

export default function AssignmentCard({
    assignment,
    handleView,
    onToggleComplete,
    onUpdateStatus
}) {


    const statusColor = {
        TODO: "bg-gray-100 text-gray-600",
        ONGOING: "bg-yellow-100 text-yellow-700",
        COMPLETED: "bg-green-100 text-green-700"
    };

    const statusOptions = ["TODO", "ONGOING", "COMPLETED"].filter(
        (status) => status !== assignment.status
    );

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        if (!newStatus) return;

        onUpdateStatus?.(assignment, newStatus);
    };


    return (
        <div className="flex items-center justify-between bg-white border rounded-md px-2 lg:px-4 py-1 shadow-sm">

            {/* Left Side */}
            <div className="flex items-center gap-3">

                {/* Complete Checkbox */}
                <input
                    type="checkbox"
                    checked={assignment.status === "COMPLETED"}
                    onChange={() => onToggleComplete?.(assignment)}
                    className="w-4 h-4 accent-blue-600 cursor-pointer"
                />

                <div>
                    {/* <div className="flex items-center gap-2"> */}

                    <p
                        className={`font-medium max-w-[250px] truncate ${assignment.status === "COMPLETED"
                            ? "text-gray-400 line-through"
                            : "text-gray-800"
                            }`}
                    >
                        {assignment.title}
                    </p>
                    {/* </div> */}
                    {assignment.dueDate && (
                        <div className="flex text-xs text-blue-600 rounded-sm">
                            <span className="hidden lg:block">Due:</span>
                            <span>
                                {" "}
                                {new Date(assignment.dueDate).toDateString()}
                            </span>
                        </div>
                    )}

                </div>

            </div>

            {/* Right Side */}
            <div className="flex items-center gap-1 lg:gap-3">
                <select
                    onChange={handleStatusChange}
                    value={assignment.status}
                    className={`text-xs border rounded-md px-2 py-1 cursor-pointer
                        ${assignment.status === "TODO" ? "border border-gray-700 bg-gray-100 text-gray-700" : ""}
                        ${assignment.status === "ONGOING" ? "border border-blue-700 bg-blue-100 text-blue-700" : ""}
                        ${assignment.status === "COMPLETED" ? "border border-green-700 bg-green-100 text-green-700" : ""}
                    `}                    
                >
                    <option value="TODO">TODO</option>
                    <option value="ONGOING">ONGOING</option>
                    <option value="COMPLETED">COMPLETED</option>
                </select>
                {/* <StatusDropdown
                    assignment={assignment}
                    onUpdateStatus={onUpdateStatus}
                /> */}

                <span
                    className={`hidden w-28 text-center text-xs font-medium px-3 py-1 rounded-md ${statusColor[assignment.status]}`}
                >
                    {assignment.status}
                </span>

                {/* View */}
                <button
                    onClick={() => handleView(assignment)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-md hover:bg-green-200 cursor-pointer"
                >
                    <Eye size={16} />
                </button>

            </div>

        </div>
    );
}