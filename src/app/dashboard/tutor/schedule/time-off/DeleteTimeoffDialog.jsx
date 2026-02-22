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
      <DialogContent
        className="
                w-full max-w-none
                p-4 sm:p-6
                rounded-t-2xl sm:rounded-lg

                top-auto left-0 right-0 bottom-0 translate-x-0 translate-y-0
                sm:top-[50%] sm:left-[50%]
                sm:translate-x-[-50%] sm:translate-y-[-50%]

                max-h-[90vh] overflow-y-auto
                sm:max-w-sm sm:max-h-fit">
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
