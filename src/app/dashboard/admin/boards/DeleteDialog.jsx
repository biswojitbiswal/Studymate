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
import { useDeleteBoard } from "@/hooks/admin/useBoard";
import { toast } from "sonner";

export default function DeleteBoardDialog({ board, children }) {
  const deleteBoard = useDeleteBoard({
    page: 1,     // or pass from parent if dynamic
    limit: 10,
    search: "",
  });

  function handleDelete() {
    deleteBoard.mutate(board.id, {
      onSuccess: () => {
        toast.success("Board deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete board");
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
            Delete "{board.name}"?
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
            {deleteBoard.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
