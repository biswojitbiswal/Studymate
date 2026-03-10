"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function EditAssignmentModal({ open, assignment, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    if (assignment) {
      setForm({
        title: assignment.title ?? "",
        description: assignment.description ?? "",
        dueDate: assignment.dueDate
          ? new Date(assignment.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [assignment]);

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error("Assignment title is required");
      return;
    }

    if (!assignment) return;

    onSubmit(assignment.id, {
      title: form.title,
      description: form.description,
      dueDate: form.dueDate ? new Date(form.dueDate) : null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-none p-4 sm:p-6
        rounded-t-2xl sm:rounded-lg top-auto left-0 right-0 bottom-0
        translate-x-0 translate-y-0 sm:top-[50%] sm:left-[50%]
        sm:translate-x-[-50%] sm:translate-y-[-50%]
        max-h-[90vh] overflow-y-auto sm:max-w-sm sm:max-h-fit pb-18"
      >
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
          <DialogDescription>
            Update assignment details.
          </DialogDescription>
        </DialogHeader>

        {/* Title */}
        <input
          type="text"
          placeholder="Assignment title"
          className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        {/* Description */}
        <textarea
          rows={3}
          placeholder="Description"
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

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" className="hover:cursor-pointer" onClick={() => onClose(false)}>
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}