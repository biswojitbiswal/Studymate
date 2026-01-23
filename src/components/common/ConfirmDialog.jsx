"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmLoading = false,
  confirmVariant = "destructive", // or "default"
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter className="gap-2">
          {/* CANCEL */}
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={confirmLoading}
            className="hover:cursor-pointer"
          >
            Cancel
          </Button>

          {/* CONFIRM */}
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={confirmLoading}
            className="text-white hover:cursor-pointer"
          >
            {confirmLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
