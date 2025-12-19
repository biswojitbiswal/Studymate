"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function EditTaskModal({ open, task, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "TODO",
  });

  // Prefill when task changes
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title ?? "",
        description: task.description ?? "",
        dueDate: task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : "",
        status: task.status ?? "TODO",
      });
    }
  }, [task]);

  const handleSave = () => {
    if (!task) return;

    onSubmit(task.id, {
      ...form,
      dueDate: form.dueDate ? new Date(form.dueDate) : null,
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        {/* Title */}
        <input
          type="text"
          className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* Description */}
        <textarea
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm mt-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        {/* Due Date */}
        <input
          type="date"
          className="w-full border rounded-md px-3 py-2 text-sm mt-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={form.dueDate}
          onChange={(e) =>
            setForm({ ...form, dueDate: e.target.value })
          }
        />

        {/* Status */}
        <select
          className="w-full border rounded-md px-3 py-2 text-sm mt-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={form.status}
          onChange={(e) =>
            setForm({ ...form, status: e.target.value })
          }
        >
          <option value="TODO">Todo</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
