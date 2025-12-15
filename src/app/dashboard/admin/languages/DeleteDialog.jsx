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
import { useDeleteLanguage } from "@/hooks/admin/useLanguage";
import { toast } from "sonner";

export default function DeleteDialog({ language, children }) {
  const deleteLanguage = useDeleteLanguage({
    page: 1,     // or pass from parent if dynamic
    limit: 10,
    search: "",
  });

  function handleDelete() {
    deleteLanguage.mutate(language.id, {
      onSuccess: () => {
        toast.success("Language deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete language");
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
            Delete "{language.name}"?
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
            {deleteLanguage.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
