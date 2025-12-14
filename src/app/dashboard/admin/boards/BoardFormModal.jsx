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
import { useCreateBoard, useUpdateBoard } from "@/hooks/admin/useBoard";
import { toast } from "sonner";

export default function BoardFormModal({ open, setOpen, board }) {
  const [form, setForm] = useState({
    name: "",
    priority: "",
    status: "ACTIVE",
    icon: null,
  });

  const [preview, setPreview] = useState(null); // 👈 NEW

  const createBoard = useCreateBoard();
  const updateBoard = useUpdateBoard();

  /* Populate form when editing */
  useEffect(() => {
    if (board) {
      setForm({
        name: board.name || "",
        priority: board.priority || "",
        status: board.status || "ACTIVE",
        icon: null,
      });
      setPreview(board.icon || null); // 👈 show existing icon
    } else {
      setForm({
        name: "",
        priority: "",
        status: "ACTIVE",
        icon: null,
      });
      setPreview(null);
    }
  }, [board, open]);

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
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("priority", form.priority);
    formData.append("status", form.status);

    if (form.icon) {
      formData.append("icon", form.icon);
    }

    const mutation = board
      ? updateBoard.mutate(
          { id: board.id, formData },
          {
            onSuccess: () => {
              toast.success("Board updated successfully");
              setOpen(false);
            },
            onError: (err) => {
              toast.error(
                err.response?.data?.message || "Failed to update board"
              );
            },
          }
        )
      : createBoard.mutate(formData, {
          onSuccess: () => {
            toast.success("Board created successfully");
            setOpen(false);
          },
          onError: (err) => {
            toast.error(
              err.response?.data?.message || "Failed to create board"
            );
          },
        });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {board ? "Edit Board" : "Create Board"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            name="name"
            placeholder="Board name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            name="priority"
            type="number"
            placeholder="Priority"
            value={form.priority}
            onChange={handleChange}
          />

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
              disabled={createBoard.isPending || updateBoard.isPending}
            >
              {board
                ? updateBoard.isPending
                  ? "Updating..."
                  : "Update"
                : createBoard.isPending
                ? "Creating..."
                : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
