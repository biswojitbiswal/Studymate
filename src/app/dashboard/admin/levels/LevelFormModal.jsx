"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useCreateLevel, useUpdateLevel } from "@/hooks/admin/useLevel";
import { toast } from "sonner";

export default function LevelFormModal({ open, setOpen, level }) {
  const [form, setForm] = useState({
    name: "",
    priority: "",
    status: "ACTIVE",
    icon: null,
  });

  const [preview, setPreview] = useState(null); // 👈 NEW

  const createLevel = useCreateLevel();
  const updateLevel = useUpdateLevel();

  /* Populate form when editing */
  useEffect(() => {
    if (level) {
      setForm({
        name: level.name || "",
        priority: level.priority || "",
        status: level.status || "ACTIVE",
        icon: null,
      });
      setPreview(level.icon || null); // 👈 show existing icon
    } else {
      setForm({
        name: "",
        priority: "",
        status: "ACTIVE",
        icon: null,
      });
      setPreview(null);
    }
  }, [level, open]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    // create local preview
    const objectUrl = URL.createObjectURL(file);

    setForm((prev) => ({ ...prev, icon: file }));
    setPreview(objectUrl);
  }

  function handleSubmit() {
    if (!form.name.trim()) {
      toast.error("Level name is required");
      return;
    }

    if (!form.priority) {
      toast.error("Priority is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("priority", form.priority);
    formData.append("status", form.status);

    if (form.icon) {
      formData.append("icon", form.icon);
    }

    const mutation = level
      ? updateLevel.mutate(
        { id: level.id, formData },
        {
          onSuccess: () => {
            toast.success("Level updated successfully");
            setOpen(false);
          },
          onError: (err) => {
            toast.error(
              err.response?.data?.message || "Failed to update level"
            );
          },
        }
      )
      : createLevel.mutate(formData, {
        onSuccess: () => {
          toast.success("Level created successfully", {
            
          });
          setOpen(false);
        },
        onError: (err) => {
          toast.error(
            err.response?.data?.message || "Failed to create level"
          );
        },
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {level ? "Edit Level" : "Create Level"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label className="text-sm font-medium">
            Level Name <span className="text-red-500">*</span>
          </label>

          <Input
            name="name"
            placeholder="Level name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="text-sm font-medium">
            Priority <span className="text-red-500">*</span>
          </label>
          <Input
            name="priority"
            type="number"
            placeholder="Priority"
            value={form.priority}
            onChange={handleChange}
            required
          />

          <label className="text-sm font-medium">
            Status
          </label>
          <Select
            value={form.status}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, status: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>

          {/* FILE INPUT */}
          <label className="text-sm font-medium">
            Icon
          </label>

          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* IMAGE PREVIEW */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="h-20 w-20 rounded border object-cover"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSubmit}
              disabled={createLevel.isPending || updateLevel.isPending}
            >
              {level
                ? updateLevel.isPending
                  ? "Updating..."
                  : "Update"
                : createLevel.isPending
                  ? "Creating..."
                  : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
