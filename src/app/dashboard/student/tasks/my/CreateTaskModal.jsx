"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CreateTaskModal({ open, onClose, onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // 🔥 Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [open]);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error("Task title is required");
      return;
    }

    onSubmit({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
    });
  };



  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Create a new personal task and optionally set a due date.
          </DialogDescription>
        </DialogHeader>

        {/* Title */}
        <input
          type="text"
          placeholder="Task title"
          className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <textarea
          placeholder="Description (optional)"
          rows={3}
          className="w-full border rounded-md px-3 py-2 text-sm mt-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Due Date */}
        <input
          type="date"
          className="w-full border rounded-md px-3 py-2 text-sm mt-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
