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
import { useDeleteSubject } from "@/hooks/admin/useSubject";
import { toast } from "sonner";

export default function DeleteDialog({ subject, children }) {
  const deleteSubject = useDeleteSubject({
    page: 1,     // or pass from parent if dynamic
    limit: 10,
    search: "",
  });

  function handleDelete() {
    deleteSubject.mutate(subject.id, {
      onSuccess: () => {
        toast.success("Subject deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete subject");
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
            Delete "{subject.name}"?
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
            {deleteSubject.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
