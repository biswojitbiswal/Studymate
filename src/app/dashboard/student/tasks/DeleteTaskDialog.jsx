"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteTaskDialog({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-600">
          Are you sure you want to delete this task?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
