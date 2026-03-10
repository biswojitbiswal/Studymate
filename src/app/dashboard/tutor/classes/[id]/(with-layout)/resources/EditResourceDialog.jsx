"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUpdateResource } from "@/hooks/tutor/useResources";
import { toast } from "sonner";

function detectFileType(file) {
  if (file.type.includes("pdf")) return "PDF";
  if (file.type.startsWith("video/")) return "VIDEO";
  if (file.type.startsWith("image/")) return "IMAGE";
  return "OTHER";
}

export default function EditResourceDialog({
  open,
  onClose,
  resource,
}) {

  const { mutateAsync, isPending } = useUpdateResource();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (resource) {
      setForm({
        title: resource.title,
        description: resource.description || "",
      });
    }
  }, [resource]);

  async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "studynest");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    return {
      fileUrl: data.secure_url,
      size: data.bytes,
    };
  }

  async function onSubmit(e) {
    e.preventDefault();

    try {
      let payload = {
        title: form.title,
        description: form.description,
      };

      if (file) {
        const upload = await uploadToCloudinary(file);

        payload = {
          ...payload,
          type: detectFileType(file),
          fileUrl: upload.fileUrl,
          size: upload.size,
        };
      }

      await mutateAsync({
        id: resource.id,
        data: payload,
      });

      toast.success("Resource updated");

      onClose();

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        "Failed to update resource"
      );
    }
  }

  if (!resource) return null;

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
          <DialogTitle>Edit Resource</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">

          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm((f) => ({ ...f, title: e.target.value }))
            }
          />

          <Input
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />

          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />

          <div className="flex justify-end gap-2">

            <Button
              type="button"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button className="hover:cursor-pointer" disabled={isPending}>
              {isPending ? "Saving..." : "Update"}
            </Button>

          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
}