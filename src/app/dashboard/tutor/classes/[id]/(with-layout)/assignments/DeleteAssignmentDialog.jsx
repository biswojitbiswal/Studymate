"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteAssignmentDialog({
  open,
  onClose,
  onConfirm,
  loading,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-none p-4 sm:p-6
    rounded-t-2xl sm:rounded-lg top-auto left-0 right-0 bottom-0 translate-x-0 translate-y-0 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] max-h-[90vh] overflow-y-auto sm:max-w-sm sm:max-h-fit pb-18">
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-600">
          Are you sure you want to delete this task?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="ghost" className="hover:cursor-pointer" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 hover:cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
