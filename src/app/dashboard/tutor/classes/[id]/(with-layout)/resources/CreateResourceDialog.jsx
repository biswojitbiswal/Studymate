"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateResource } from "@/hooks/tutor/useResources";
import { toast } from "sonner";

function detectFileType(file) {
  if (file.type.includes("pdf")) return "PDF";
  if (file.type.startsWith("video/")) return "VIDEO";
  if (file.type.startsWith("image/")) return "IMAGE";
  return "OTHER";
}

export default function CreateResourceDialog({ open, onClose, classId }) {

  const { mutateAsync, isPending } = useCreateResource();

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState(null);

  function resetForm() {
    setForm({
      title: "",
      description: "",
    });
    setFile(null);
  }

  async function uploadToCloudinary(file) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "studynest");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dxwqz0hkv/auto/upload`,
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

    if (!form.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!file) {
      toast.error("Please upload a file");
      return;
    }

    try {

      const upload = await uploadToCloudinary(file);

      const type = detectFileType(file);

      await mutateAsync({
        title: form.title.trim(),
        description: form.description?.trim(),
        classId,
        type,
        fileUrl: upload.fileUrl,
        size: upload.size,
      });

      toast.success("Resource created successfully");

      resetForm();
      onClose();

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        "Failed to create resource"
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
          <DialogTitle>Add Resource</DialogTitle>
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
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
          />

          <Input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <div className="flex justify-end gap-2">

            <Button
              type="button"
              variant="outline"
              className="hover:cursor-pointer"
              onClick={() => {
                resetForm();
                onClose();
              }}
              disabled={isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 hover:bg-blue-700 hover:cursor-pointer"
            >
              {isPending ? "Uploading..." : "Create"}
            </Button>

          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}