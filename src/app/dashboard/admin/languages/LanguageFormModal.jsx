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
import { useCreateLanguage, useUpdateLanguage } from "@/hooks/admin/useLanguage";
import { toast } from "sonner";

export default function LanguageFormModal({ open, setOpen, language }) {
  const [form, setForm] = useState({
    name: "",
    priority: "",
    status: "ACTIVE",
    icon: null,
  });

  const [preview, setPreview] = useState(null); // 👈 NEW

  const createLanguage = useCreateLanguage();
  const updateLanguage = useUpdateLanguage();

  /* Populate form when editing */
  useEffect(() => {
    if (language) {
      setForm({
        name: language.name || "",
        priority: language.priority || "",
        status: language.status || "ACTIVE",
        icon: null,
      });
      setPreview(language.icon || null); // 👈 show existing icon
    } else {
      setForm({
        name: "",
        priority: "",
        status: "ACTIVE",
        icon: null,
      });
      setPreview(null);
    }
  }, [language, open]);

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
      toast.error("Language name is required");
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

    const mutation = language
      ? updateLanguage.mutate(
        { id: language.id, formData },
        {
          onSuccess: () => {
            toast.success("Language updated successfully");
            setOpen(false);
          },
          onError: (err) => {
            toast.error(
              err.response?.data?.message || "Failed to update language"
            );
          },
        }
      )
      : createLanguage.mutate(formData, {
        onSuccess: () => {
          toast.success("Language created successfully");
          setOpen(false);
        },
        onError: (err) => {
          toast.error(
            err.response?.data?.message || "Failed to create language"
          );
        },
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {language ? "Edit Language" : "Create Language"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <label className="text-sm font-medium">
            Language Name <span className="text-red-500">*</span>
          </label>

          <Input
            name="name"
            placeholder="Language name"
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
              disabled={createLanguage.isPending || updateLanguage.isPending}
            >
              {language
                ? updateLanguage.isPending
                  ? "Updating..."
                  : "Update"
                : createLanguage.isPending
                  ? "Creating..."
                  : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
