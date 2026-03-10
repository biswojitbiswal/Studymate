"use client";

import { useParams } from "next/navigation";
import { useAssignment } from "@/hooks/tutor/useAssignments";
import { MessageCircle } from "lucide-react";
import { AssignmentDetailsSkeleton } from "@/components/skeleton/tutor/AssignmentSkeleton";

export default function AssignmentDetailsPage() {

  const { task_id } = useParams();

  const { data, isLoading, error } = useAssignment(task_id);

  if (isLoading) {
    return <AssignmentDetailsSkeleton />
  }

  if (error) {
    return <p className="text-red-500">Failed to load assignment</p>;
  }

  const assignment = data?.data?.assignment;
  const summary = data?.data?.summary;
  const students = data?.data?.students || [];

  const statusColor = {
    TODO: "bg-gray-100 text-gray-600",
    ONGOING: "bg-yellow-100 text-yellow-700",
    COMPLETED: "bg-green-100 text-green-700",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-3">

      {/* Assignment Info */}
      <div className="bg-white border rounded-lg py-3 px-5">
        <h2 className="text-xl font-semibold">
          {assignment?.title}
        </h2>

        {assignment?.description && (
          <p className="text-gray-600 mt-1">
            {assignment.description}
          </p>
        )}

        {assignment?.dueDate && (
          <p className="text-sm text-blue-600 mt-1">
            Due: {new Date(assignment.dueDate).toDateString()}
          </p>
        )}
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-3 gap-4">

        <div className="bg-green-50 border rounded-lg py-2 px-4 text-center">
          <p className="text-lg font-semibold text-green-700">
            {summary?.completed}
          </p>
          <p className="text-sm text-green-600">Completed</p>
        </div>

        <div className="bg-yellow-50 border rounded-lg p-4 text-center">
          <p className="text-lg font-semibold text-yellow-700">
            {summary?.ongoing}
          </p>
          <p className="text-sm text-yellow-600">Ongoing</p>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4 text-center">
          <p className="text-lg font-semibold text-gray-700">
            {summary?.todo}
          </p>
          <p className="text-sm text-gray-600">Todo</p>
        </div>

      </div>

      {/* Student List */}
      <div className="bg-white border rounded-lg divide-y">

        {students.map((student) => (
          <div
            key={student.studentId}
            className="flex items-center justify-between p-4"
          >

            {/* Left */}
            <div className="flex items-center gap-3">

              <img
                src={student.avatar || "/avatar.png"}
                alt={student.name}
                className="w-9 h-9 rounded-full object-cover hover:cursor-pointer"
              />

              <p className="font-medium text-gray-800">
                {student.name}
              </p>

            </div>

            {/* Right */}
            <div className="flex items-center gap-3">

              <span
                className={`text-xs font-medium px-3 py-1 rounded-md ${statusColor[student.status]}`}
              >
                {student.status}
              </span>

              <button
                className="p-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 hover:cursor-pointer"
              >
                <MessageCircle size={16} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}