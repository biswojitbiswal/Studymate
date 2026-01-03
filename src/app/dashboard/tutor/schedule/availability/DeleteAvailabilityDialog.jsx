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
      <DialogContent>
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
