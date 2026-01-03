import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteTimeoffDialog({
  open,
  onClose,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Time Off</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this time-off? This action
          cannot be undone.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
