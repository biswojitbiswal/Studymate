"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useDeleteResource } from "@/hooks/tutor/useResources";
import { toast } from "sonner";

export default function DeleteResourceDialog({
  open,
  onClose,
  resourceId,
}) {

  const { mutateAsync, isPending } = useDeleteResource();

  async function handleDelete() {
    try {

      await mutateAsync(resourceId);

      toast.success("Resource deleted successfully");

      onClose();

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        "Failed to delete resource"
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
          sm:max-w-sm sm:max-h-fit pb-18"
      >

        <DialogHeader>
          <DialogTitle>Delete Resource</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete this resource?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-2 mt-4">

          <Button
            variant="outline"
            className="hover:cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:cursor-pointer hover:bg-red-700"
            disabled={isPending}
            onClick={handleDelete}
          >
            Delete
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}