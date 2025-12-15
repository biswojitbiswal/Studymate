"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteLevel } from "@/hooks/admin/useLevel";
import { toast } from "sonner";

export default function DeleteDialog({ level, children }) {
  const deleteLevel = useDeleteLevel({
    page: 1,     // or pass from parent if dynamic
    limit: 10,
    search: "",
  });

  function handleDelete() {
    deleteLevel.mutate(level.id, {
      onSuccess: () => {
        toast.success("Level deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete level");
      },
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Delete "{level.name}"?
          </AlertDialogTitle>
        </AlertDialogHeader>

        <p className="text-sm text-slate-600">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteLevel.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
