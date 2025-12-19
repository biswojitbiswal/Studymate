import { CheckCircle, Trash2, Pencil } from "lucide-react";
import { TaskItem } from "./TaskItem";
import { TableSkeleton } from "@/components/common/TableSkeleton";

export function TaskList({
  tasks,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onComplete,
  onView
}) {
  /* 1️⃣ Loading */
  if (isLoading) {
    return (
      <TableSkeleton />
    );
  }

  /* 2️⃣ Error */
  if (isError) {
    return (
      <div className="text-center text-red-600 py-10">
        Failed to load tasks.
      </div>
    );
  }

  /* 3️⃣ Empty */
  if (!tasks.length) {
    return (
      <div className="text-center text-slate-500 py-10">
        No tasks found.
      </div>
    );
  }

  /* 4️⃣ List */
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onComplete={onComplete}
          onView={onView}
        />
      ))}
    </div>
  );
}
