import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function DeleteLeaveDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Leave</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this leave? This action cannot be
          undone.
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
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
