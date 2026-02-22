"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useDeleteAvailability } from "@/hooks/tutor/useAvailability";

export default function DeleteAvailabilityDialog({
  open,
  onClose,
  availabilityId,
}) {
  const { mutateAsync, isLoading } = useDeleteAvailability();

  async function handleDelete() {
    try {
      await mutateAsync(availabilityId);
      toast.success("Availability deleted");
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        "Failed to delete availability"
      );
    }
  }

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
          <DialogTitle>Delete Availability</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this availability?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-600"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
