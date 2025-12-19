import { Button } from "@/components/ui/button";

export function TaskHeader({ taskType, onAddTask }) {
  const isPrivate = taskType === "PRIVATE";

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {isPrivate ? "My Tasks" : "Assigned Tasks"}
        </h1>

        <p className="text-sm text-slate-500">
          {isPrivate
            ? "Manage your personal study tasks"
            : "Tasks assigned by your tutor"}
        </p>
      </div>

      {/* Right */}
      {isPrivate && (
        <Button
          onClick={onAddTask}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-md text-sm font-medium transition"
        >
          <span className="font-bold">+</span>
          Add Task
        </Button>
      )}
    </div>
  );
}
