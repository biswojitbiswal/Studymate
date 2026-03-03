import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useArchiveClass } from "@/hooks/tutor/useClass";
import { toast } from "sonner";

export default function DeleteClassDialog({ open, setOpen, classId }) {
  const deleteClass = useArchiveClass();

  const handleConfirm = () => {
    console.log("Entry");
    
    if (!classId) return;

    deleteClass.mutate(classId, {
      onSuccess: () => {
        toast.success("Class arvhived/deleted successfully");
        setOpen(false);
      },
      onError: () => {
        toast.error("Failed to delete class");
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-full max-w-none p-4 sm:p-6
    rounded-t-2xl sm:rounded-lg top-auto left-0 right-0 bottom-0 translate-x-0 translate-y-0 sm:top-[50%] sm:left-[50%] sm:translate-x-[-50%] sm:translate-y-[-50%] max-h-[90vh] overflow-y-auto sm:max-w-sm sm:max-h-fit pb-18">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Delete Class
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone.
            All sessions, enrollments, and assignments related to this class
            will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteClass.isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={deleteClass.isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {deleteClass.isPending ? "Confirming..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
