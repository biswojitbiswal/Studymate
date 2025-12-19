import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, MoreVertical, Eye } from "lucide-react";

export function TaskItem({ task, onEdit, onDelete, onComplete }) {
  const isCompleted = task.status === "COMPLETED";
  return (
    <div
      className={`flex items-center justify-between rounded-lg px-4 py-3 border transition
    ${isCompleted
          ? "bg-slate-50 border-slate-200 opacity-80"
          : "bg-white border-slate-100 shadow-sm"
        }`}
    >

      {/* LEFT: Checkbox + Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Checkbox
          checked={isCompleted}
          disabled={isCompleted}
          onChange={() => onComplete(task.id, task.status)}
          className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
        />


        <div className="min-w-0">
          <p
            className={`text-sm font-medium truncate
    ${isCompleted
                ? "text-slate-400 line-through"
                : "text-slate-800"
              }`}
          >
            {task.title}
          </p>
          {task.dueDate && (
            <p className="text-xs text-blue-500">
              Due:{" "}
              {new Date(task.dueDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          )}

        </div>
      </div>

      {/* RIGHT: Status + Actions */}
      <div className="flex items-center gap-5">

        {/* Status Badge (fixed width) */}
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-sm text-center w-24
            ${task.status === "ONGOING"
              ? "bg-blue-100 text-blue-700"
              : task.status === "COMPLETED"
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-600"
            }`}
        >
          {task.status}
        </span>

        {/* Actions */}
        <button className="text-green-600 p-1 bg-green-200 cursor-pointer rounded-sm transition">
          <Eye size={16} />
        </button>

        <button onClick={() => onEdit(task)} className="p-1 rounded-sm text-blue-600 bg-blue-200 cursor-pointer transition">
          <Pencil size={16} />
        </button>

        <button onClick={() => onDelete(task.id)} className="p-1 rounded-sm text-slate-500 hover:bg-red-200 hover:text-red-600 cursor-pointer transition">
          <Trash2 size={16} />
        </button>


      </div>
    </div >
  );
}
