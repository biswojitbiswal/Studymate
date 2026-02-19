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
      <AlertDialogContent>
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
